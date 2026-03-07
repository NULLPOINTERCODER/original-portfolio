import { useMemo } from 'react';

interface HeatmapData {
  date: string;
  count: number;
  level: number;
}

const getIntensityClass = (level: number) => {
  const classes = [
    'bg-slate-800/50',
    'bg-green-900/70',
    'bg-green-700/80',
    'bg-green-500/90',
    'bg-green-400 shadow-[0_0_4px_rgba(74,222,128,0.4)]'
  ];
  return classes[level] || classes[0];
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function LeetCodeHeatmap({ heatmapData }: { heatmapData: HeatmapData[] }) {
  const { weeks, monthLabels, totalSubmissions, activeDays, currentStreak, maxStreak } = useMemo(() => {
    const result: HeatmapData[][] = [];
    const labels: { month: string; weekIndex: number }[] = [];
    let currentMonth = -1;
    
    // Group by weeks (7 days per column)
    for (let i = 0; i < heatmapData.length; i += 7) {
      const week = heatmapData.slice(i, i + 7);
      result.push(week);
      
      // Track month labels
      if (week[0]) {
        const date = new Date(week[0].date);
        const month = date.getMonth();
        if (month !== currentMonth) {
          currentMonth = month;
          labels.push({ month: MONTHS[month], weekIndex: result.length - 1 });
        }
      }
    }
    
    const total = heatmapData.reduce((sum, day) => sum + day.count, 0);
    const active = heatmapData.filter(day => day.count > 0).length;
    
    // Calculate streaks
    let current = 0;
    let max = 0;
    let temp = 0;
    
    for (let i = heatmapData.length - 1; i >= 0; i--) {
      if (heatmapData[i].count > 0) {
        temp++;
        if (i === heatmapData.length - 1 || current === 0) current = temp;
      } else {
        max = Math.max(max, temp);
        temp = 0;
      }
    }
    max = Math.max(max, temp);
    
    return {
      weeks: result,
      monthLabels: labels,
      totalSubmissions: total,
      activeDays: active,
      currentStreak: current,
      maxStreak: max
    };
  }, [heatmapData]);

  return (
    <div className="mt-6 p-6 rounded-2xl bg-slate-900/40 border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h4 className="text-lg font-semibold text-foreground mb-2">Submission Activity</h4>
          <div className="flex gap-6 text-sm">
            <div>
              <span className="text-muted-foreground">Total: </span>
              <span className="text-foreground font-semibold">{totalSubmissions}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Active Days: </span>
              <span className="text-foreground font-semibold">{activeDays}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Current Streak: </span>
              <span className="text-foreground font-semibold">{currentStreak} days</span>
            </div>
            <div>
              <span className="text-muted-foreground">Max Streak: </span>
              <span className="text-foreground font-semibold">{maxStreak} days</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Less</span>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map(level => (
              <div key={level} className={`w-3 h-3 rounded-sm ${getIntensityClass(level)}`} />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          {/* Month labels */}
          <div className="flex gap-[3px] mb-2 ml-8">
            {monthLabels.map((label, idx) => (
              <div
                key={idx}
                className="text-xs text-muted-foreground"
                style={{ marginLeft: idx === 0 ? 0 : `${(label.weekIndex - (monthLabels[idx - 1]?.weekIndex || 0)) * 11}px` }}
              >
                {label.month}
              </div>
            ))}
          </div>
          
          {/* Heatmap grid */}
          <div className="flex gap-[3px]">
            {/* Day labels */}
            <div className="flex flex-col gap-[3px] justify-around pr-2">
              <div className="h-[10px] text-xs text-muted-foreground">Mon</div>
              <div className="h-[10px]"></div>
              <div className="h-[10px] text-xs text-muted-foreground">Wed</div>
              <div className="h-[10px]"></div>
              <div className="h-[10px] text-xs text-muted-foreground">Fri</div>
              <div className="h-[10px]"></div>
            </div>
            
            {/* Weeks */}
            {weeks.map((week, colIndex) => (
              <div key={colIndex} className="flex flex-col gap-[3px]">
                {week.map((day, rowIndex) => (
                  <div
                    key={day.date}
                    className={`w-[10px] h-[10px] rounded-sm transition-all hover:scale-150 hover:ring-1 hover:ring-white/50 cursor-pointer ${getIntensityClass(day.level)}`}
                    title={`${day.count} submissions on ${new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
