import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Flame, Trophy, Star, Activity, ExternalLink, RefreshCw } from "lucide-react";

interface HeatmapDay {
  date: string;
  count: number;
}

interface CodolioStats {
  maxStreak: number;
  currentStreak: number;
  totalActiveDays: number;
  totalSubmissions: number;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

const getIntensityClass = (count: number) => {
  if (count === 0) return "bg-white/[0.04] border border-white/[0.06]";
  if (count <= 2) return "bg-violet-500/30 border border-violet-500/20";
  if (count <= 5) return "bg-violet-500/55 border border-violet-500/30";
  if (count <= 8) return "bg-violet-400/80 border border-violet-400/40 shadow-[0_0_6px_rgba(139,92,246,0.4)]";
  return "bg-violet-400 border border-violet-300/50 shadow-[0_0_10px_rgba(139,92,246,0.6)]";
};

const generateMockHeatmapData = (): HeatmapDay[] => {
  const data: HeatmapDay[] = [];
  const today = new Date();
  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const r = Math.random();
    let count = 0;
    if (r > 0.55) count = Math.floor(Math.random() * 3) + 1;
    if (r > 0.8) count = Math.floor(Math.random() * 5) + 3;
    if (r > 0.95) count = Math.floor(Math.random() * 6) + 8;
    data.push({ date: date.toISOString().split("T")[0], count });
  }
  return data;
};

const parseCodolioPayload = (payload: any): { heatmapData: HeatmapDay[]; stats: CodolioStats; leetCodeStats: any; codeChefStats: any } | null => {
  try {
    const platforms = payload?.data?.platformProfiles?.platformProfiles;
    if (!platforms || !Array.isArray(platforms)) {
      console.warn("Invalid Codolio payload structure:", payload);
      return null;
    }

    let leetCodeStats = null;
    let codeChefStats = null;
    let totalSubmissions = 0;
    let overallMaxStreak = 0;
    let overallCurrentStreak = 0;
    let overallTotalActiveDays = 0;

    // Timestamp to count map
    const aggregatedCalendar: { [timestamp: string]: number } = {};

    platforms.forEach((p: any) => {
      // Extract platforms specific stats
      if (p.platform === "leetcode") {
        leetCodeStats = {
          rating: p.userStats?.currentRating || p.userStats?.maxRating || 0,
          highestRating: p.userStats?.maxRating || 0,
          totalQuestions: p.totalQuestionStats?.totalQuestionCounts || 0,
          easy: p.totalQuestionStats?.easyQuestionCounts || 0,
          medium: p.totalQuestionStats?.mediumQuestionCounts || 0,
          hard: p.totalQuestionStats?.hardQuestionCounts || 0,
        };
      } else if (p.platform === "codechef") {
        codeChefStats = {
          rating: p.userStats?.currentRating || 0,
          highestRating: p.userStats?.maxRating || 0,
          stars: p.userStats?.stars ? `${p.userStats.stars}` : "",
          totalQuestions: p.totalQuestionStats?.totalQuestionCounts || 0,
        };
      }

      // Aggregate Submissions
      totalSubmissions += p.totalQuestionStats?.totalQuestionCounts || 0;

      // Aggregate Max Streak
      const maxStreak = p.dailyActivityStatsResponse?.maxStreak;
      if (maxStreak && maxStreak > overallMaxStreak) {
        overallMaxStreak = maxStreak;
      }

      // Aggregate Current Streak (from platforms that provide it)
      const currentStreak = p.dailyActivityStatsResponse?.currentStreak;
      if (currentStreak && currentStreak > overallCurrentStreak) {
        overallCurrentStreak = currentStreak;
      }

      // Aggregate Total Active Days (from platforms that provide it)
      const totalActiveDays = p.dailyActivityStatsResponse?.totalActiveDays;
      if (totalActiveDays && totalActiveDays > overallTotalActiveDays) {
        overallTotalActiveDays = totalActiveDays;
      }

      // Aggregate Calendar
      const cal = p.dailyActivityStatsResponse?.submissionCalendar;
      if (cal) {
        Object.entries(cal).forEach(([timestamp, count]) => {
          aggregatedCalendar[timestamp] = (aggregatedCalendar[timestamp] || 0) + (count as number);
        });
      }
    });

    // Convert calendar timestamps to HeatmapDay array
    const heatmapData: HeatmapDay[] = Object.entries(aggregatedCalendar).map(([timestamp, count]) => {
      // Codolio Unix timestamps are usually in seconds
      const date = new Date(parseInt(timestamp) * 1000);
      return {
        date: date.toISOString().split("T")[0],
        count: count,
      };
    });

    // Sort by date just to be clean
    heatmapData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // If totalActiveDays not provided by API, count unique days from calendar
    const activeDaysCount = overallTotalActiveDays || Object.keys(aggregatedCalendar).length;

    return {
      heatmapData,
      stats: {
        maxStreak: overallMaxStreak,
        currentStreak: overallCurrentStreak,
        totalActiveDays: activeDaysCount,
        totalSubmissions: totalSubmissions,
      },
      leetCodeStats,
      codeChefStats,
    };
  } catch (e) {
    console.error("Failed to parse Codolio payload:", e);
    return null;
  }
};


const CodolioActivitySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [heatmapData, setHeatmapData] = useState<HeatmapDay[]>([]);
  const [stats, setStats] = useState<CodolioStats>({
    maxStreak: 0,
    currentStreak: 0,
    totalActiveDays: 0,
    totalSubmissions: 0,
  });
  const [lcStats, setLcStats] = useState<any>(null);
  const [ccStats, setCcStats] = useState<any>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; date: string; count: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  const fetchCodolioData = async () => {
    setIsLoading(true);
    try {
      // Use the Vite dev server proxy with cache buster
      const response = await fetch(`/api/codolio?t=${new Date().getTime()}`);
      const result = await response.json();

      if (result.success && result.payload) {
        const parsed = parseCodolioPayload(result.payload);
        if (parsed && parsed.heatmapData.length > 0) {
          // Fill in missing days for 365-day view
          const today = new Date();
          const dayMap = new Map(parsed.heatmapData.map((d) => [d.date, d.count]));
          const fullData: HeatmapDay[] = [];

          for (let i = 364; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split("T")[0];
            fullData.push({ date: dateStr, count: dayMap.get(dateStr) || 0 });
          }

          setHeatmapData(fullData);
          setStats(parsed.stats);
          setLcStats(parsed.leetCodeStats);
          setCcStats(parsed.codeChefStats);
          setIsLive(true);
          setIsLoading(false);
          return;
        }
      }
      throw new Error("Proxy returned no usable data");
    } catch (error) {
      console.warn("Codolio proxy failed, using mock data:", error);
      const mockData = generateMockHeatmapData();
      setHeatmapData(mockData);
      const activeDays = mockData.filter((d) => d.count > 0).length;
      setStats({
        maxStreak: 42,
        currentStreak: 5,
        totalActiveDays: activeDays,
        totalSubmissions: mockData.reduce((a, b) => a + b.count, 0),
      });
      setIsLive(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCodolioData();
  }, []);

  // Group heatmap data into weeks (columns)
  const weeks: HeatmapDay[][] = [];
  const monthLabels: { month: string; weekIndex: number }[] = [];
  let currentMonth = -1;

  // Align to start on Sunday
  if (heatmapData.length > 0) {
    const firstDay = new Date(heatmapData[0].date).getDay(); // 0=Sun
    // Pad the beginning so the first column starts on Sunday
    const padded: HeatmapDay[] = [];
    for (let i = 0; i < firstDay; i++) {
      padded.push({ date: "", count: -1 }); // placeholder
    }
    const allDays = [...padded, ...heatmapData];

    for (let i = 0; i < allDays.length; i += 7) {
      const week = allDays.slice(i, i + 7);
      weeks.push(week);

      // Track month labels from the first valid day in each week
      const firstValid = week.find((d) => d.date !== "");
      if (firstValid) {
        const month = new Date(firstValid.date).getMonth();
        if (month !== currentMonth) {
          currentMonth = month;
          monthLabels.push({ month: MONTHS[month], weekIndex: weeks.length - 1 });
        }
      }
    }
  }

  const handleCellHover = (e: React.MouseEvent, day: HeatmapDay) => {
    if (day.count < 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      x: rect.left + rect.width / 2,
      y: rect.top - 8,
      date: day.date,
      count: day.count,
    });
  };

  const formatStars = (stars: string) => {
    if (!stars) return '1★';
    if (stars.includes('★') || stars.toLowerCase().includes('star')) return stars;
    return `${stars}★`;
  };

  const statCards = [
    { label: "LeetCode Rating", value: lcStats?.rating || "N/A", icon: Trophy, color: "text-yellow-400", bg: "bg-yellow-400/10" },
    { label: "LeetCode Solved", value: lcStats?.totalQuestions || "0", icon: Activity, color: "text-green-400", bg: "bg-green-400/10" },
    { label: "CodeChef Rating", value: ccStats ? `${ccStats.rating} (${formatStars(ccStats.stars)})` : "N/A", icon: Star, color: "text-amber-600", bg: "bg-amber-600/10" },
    { label: "CodeChef Solved", value: ccStats?.totalQuestions || "0", icon: Activity, color: "text-emerald-400", bg: "bg-emerald-400/10" },
    { label: "Total Submissions", value: stats.totalSubmissions, icon: Activity, color: "text-blue-400", bg: "bg-blue-400/10" },
    { label: "Max Streak", value: `${stats.maxStreak}`, icon: Flame, color: "text-orange-400", bg: "bg-orange-400/10" },
  ];

  return (
    <section id="code-activity" className="py-20 relative" ref={ref}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block mb-4"
          >
            <Activity size={48} className="text-primary mx-auto" />
          </motion.div>
          <h2 className="section-title text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
            Code Activity
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Real-time coding consistency and submission heatmap from{" "}
            <a
              href="https://codolio.com/profile/V_Patel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline inline-flex items-center gap-1"
            >
              Codolio <ExternalLink size={13} />
            </a>
          </p>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 mb-10">
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="glass-card p-5 md:p-6 flex flex-col items-center justify-center text-center group hover:bg-white/5 transition-all border border-white/10 hover:border-primary/30"
            >
              <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <h4 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                {isLoading ? (
                  <div className="w-12 h-7 rounded bg-white/10 animate-pulse" />
                ) : (
                  stat.value
                )}
              </h4>
              <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Heatmap */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="relative group"
        >
          {/* Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary via-purple-500 to-indigo-500 rounded-3xl blur opacity-15 group-hover:opacity-25 transition duration-1000" />

          <div className="relative glass-card rounded-3xl p-6 md:p-8 bg-card/60 backdrop-blur-xl border border-white/10">
            {/* Heatmap Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className={`w-2.5 h-2.5 rounded-full ${isLive ? "bg-green-400" : "bg-yellow-400"}`} />
                  {isLive && <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-green-400 animate-ping opacity-75" />}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Activity Heatmap</h3>
                  <p className="text-xs text-muted-foreground">Past 365 days of code</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={fetchCodolioData}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-foreground hover:bg-white/10 transition-colors disabled:opacity-50"
                  title="Live Sync"
                >
                  <RefreshCw size={12} className={isLoading ? "animate-spin" : ""} />
                  <span>Sync</span>
                </button>
                <div className="hidden md:flex px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-medium">
                  {isLive ? "✨ Live Data" : "📊 Sample Data"}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span>Less</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-sm bg-white/[0.04] border border-white/[0.06]" />
                    <div className="w-3 h-3 rounded-sm bg-violet-500/30 border border-violet-500/20" />
                    <div className="w-3 h-3 rounded-sm bg-violet-500/55 border border-violet-500/30" />
                    <div className="w-3 h-3 rounded-sm bg-violet-400/80 border border-violet-400/40" />
                    <div className="w-3 h-3 rounded-sm bg-violet-400 border border-violet-300/50 shadow-[0_0_6px_rgba(139,92,246,0.4)]" />
                  </div>
                  <span>More</span>
                </div>
              </div>
            </div>

            {/* Heatmap Grid */}
            {isLoading ? (
              <div className="flex justify-center items-center py-16">
                <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              </div>
            ) : (
              <div className="overflow-x-auto custom-scrollbar pb-2">
                <div className="inline-block min-w-max">
                  {/* Month labels */}
                  <div className="flex ml-8 mb-1.5">
                    {monthLabels.map((label, idx) => {
                      const prevWeekIdx = idx > 0 ? monthLabels[idx - 1].weekIndex : 0;
                      const gap = idx === 0 ? label.weekIndex : label.weekIndex - prevWeekIdx;
                      return (
                        <div
                          key={`${label.month}-${idx}`}
                          className="text-[10px] text-muted-foreground/70"
                          style={{ width: `${gap * 14}px` }}
                        >
                          {label.month}
                        </div>
                      );
                    })}
                  </div>

                  {/* Grid with day labels */}
                  <div className="flex gap-0">
                    {/* Day labels column */}
                    <div className="flex flex-col gap-[2px] pr-1.5 pt-0">
                      {DAY_LABELS.map((label, i) => (
                        <div key={i} className="h-[11px] flex items-center">
                          <span className="text-[9px] text-muted-foreground/60 w-6 text-right">{label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Weeks */}
                    <div className="flex gap-[2px]">
                      {weeks.map((week, colIndex) => (
                        <div key={colIndex} className="flex flex-col gap-[2px]">
                          {week.map((day, rowIndex) => (
                            <div
                              key={`${colIndex}-${rowIndex}`}
                              className={`w-[11px] h-[11px] rounded-[2px] transition-all duration-150 ${day.count < 0
                                ? "bg-transparent"
                                : `${getIntensityClass(day.count)} hover:scale-[1.6] hover:z-20 cursor-pointer`
                                }`}
                              onMouseEnter={(e) => day.count >= 0 && handleCellHover(e, day)}
                              onMouseLeave={() => setTooltip(null)}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-[100] pointer-events-none px-3 py-2 rounded-lg bg-gray-900/95 backdrop-blur border border-white/10 shadow-xl text-xs"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: "translate(-50%, -100%)",
          }}
        >
          <div className="font-semibold text-foreground">
            {tooltip.count} submission{tooltip.count !== 1 ? "s" : ""}
          </div>
          <div className="text-muted-foreground">
            {new Date(tooltip.date).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default CodolioActivitySection;
