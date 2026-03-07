import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Github, Star, GitFork, Code, ExternalLink, ChevronLeft, ChevronRight, Users, UserCheck } from "lucide-react";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  fork: boolean;
  updated_at: string;
}

interface UserProfile {
  followers: number;
  following: number;
  public_repos: number;
  avatar_url: string;
}

const languageColors: Record<string, string> = {
  Python: "#3572A5",
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  Kotlin: "#A97BFF",
  Shell: "#89e051",
  Jupyter: "#DA5B0B",
};

const GITHUB_USERNAME = "NULLPOINTERCODER";

const GitHubSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [repos, setRepos] = useState<Repo[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [repoRes, profileRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
        ]);
        const repoData: Repo[] = await repoRes.json();
        const profileData: UserProfile = await profileRes.json();
        setRepos(repoData.filter((r) => !r.fork));
        setProfile(profileData);
      } catch {
        // silent
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  const totalStars = repos.reduce((a, r) => a + r.stargazers_count, 0);
  const totalForks = repos.reduce((a, r) => a + r.forks_count, 0);

  return (
    <section id="github" className="py-20 relative overflow-hidden" ref={ref}>
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block mb-4"
          >
            <Github size={48} className="text-primary mx-auto" />
          </motion.div>
          <h2 className="section-title">GitHub Activity</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Open-source work, repositories, and contribution history
          </p>
        </motion.div>

        {/* Profile + Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {/* Avatar pill */}
          {profile && (
            <motion.a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="glass-card flex items-center gap-3 px-5 py-3 border border-primary/20 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.2)] transition-all"
            >
              <img src={profile.avatar_url} alt="GitHub Avatar" className="w-10 h-10 rounded-full border-2 border-primary/40" />
              <div>
                <p className="text-sm font-semibold text-foreground">@{GITHUB_USERNAME}</p>
                <p className="text-xs text-muted-foreground">GitHub Profile</p>
              </div>
            </motion.a>
          )}

          {[
            { label: "Repositories", value: profile?.public_repos ?? repos.length ?? "—", icon: <Code size={17} />, color: "text-primary" },
            { label: "Followers", value: profile?.followers ?? "—", icon: <Users size={17} />, color: "text-secondary" },
            { label: "Following", value: profile?.following ?? "—", icon: <UserCheck size={17} />, color: "text-blue-400" },
            { label: "Total Stars", value: totalStars || "—", icon: <Star size={17} />, color: "text-yellow-400" },
            { label: "Total Forks", value: totalForks || "—", icon: <GitFork size={17} />, color: "text-green-400" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 * i + 0.2 }}
              whileHover={{ scale: 1.05, y: -3 }}
              className="glass-card px-6 py-4 flex items-center gap-3 border border-primary/15 hover:border-primary/40 hover:shadow-[0_0_20px_rgba(139,92,246,0.2)] transition-all"
            >
              <span className={stat.color}>{stat.icon}</span>
              <div>
                <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contribution Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative max-w-4xl mx-auto mb-14"
        >
          <div className="absolute inset-0 rounded-3xl blur-xl pointer-events-none"
            style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(217,70,239,0.1))" }} />
          <div className="relative rounded-3xl overflow-hidden border border-primary/30"
            style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.08), rgba(0,0,0,0.4), rgba(217,70,239,0.06))" }}>
            <div className="h-1 w-full"
              style={{ background: "linear-gradient(90deg, transparent, #8B5CF6, #D946EF, #8B5CF6, transparent)" }} />
            <div className="p-7">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                    <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-400 animate-ping opacity-75" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">Contribution Graph</h3>
                </div>
                <div className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-medium">
                  ✨ Live Data
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden p-3"
                style={{ background: "rgba(0,0,0,0.3)", boxShadow: "inset 0 0 30px rgba(139,92,246,0.1), 0 0 0 1px rgba(139,92,246,0.15)" }}>
                <img
                  src={`https://ghchart.rshah.org/8B5CF6/${GITHUB_USERNAME}`}
                  alt="GitHub Contributions"
                  className="w-full min-w-[560px] rounded-xl"
                  style={{ filter: "saturate(1.4) brightness(1.1)" }}
                />
              </div>
              <div className="flex items-center justify-between mt-5">
                <span className="text-xs text-muted-foreground">Less active</span>
                <div className="flex items-center gap-1.5">
                  {["bg-primary/10", "bg-primary/25", "bg-primary/45", "bg-primary/70", "bg-primary"].map((c, i) => (
                    <motion.div key={i} whileHover={{ scale: 1.5 }} className={`w-3.5 h-3.5 rounded-sm ${c} cursor-pointer`} />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">More active</span>
              </div>
            </div>
            <div className="h-0.5 w-full"
              style={{ background: "linear-gradient(90deg, transparent, rgba(217,70,239,0.5), transparent)" }} />
          </div>
        </motion.div>

        {/* Repo Carousel */}
        {/* Repo Marquee */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full relative"
        >
          <h3 className="text-xl font-bold text-center text-foreground mb-10">
            All Repositories <span className="text-primary">({repos.length})</span>
          </h3>

          {loading ? (
            <div className="flex justify-center py-10">
              <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            </div>
          ) : repos.length > 0 ? (
            <div className="relative w-full flex overflow-hidden group">
              {/* Fade masks */}
              <div className="absolute top-0 bottom-0 left-0 w-12 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
              <div className="absolute top-0 bottom-0 right-0 w-12 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

              <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  repeat: Infinity,
                  ease: "linear",
                  duration: Math.max(repos.length * 4, 30), // adjust speed based on amount of repos, minimum 30s
                }}
                className="flex gap-6 w-max items-stretch px-4 sm:px-0 hover:[animation-play-state:paused]"
              >
                {[...repos, ...repos].map((r, i) => (
                  <div
                    key={`${r.id}-${i}`}
                    className="w-[280px] sm:w-[320px] md:w-[380px] flex-shrink-0 glass-card border border-primary/20 hover:border-primary/50 overflow-hidden flex flex-col group/card transition-all hover:shadow-[0_0_30px_rgba(139,92,246,0.2)] hover:-translate-y-1"
                  >
                    <div className="h-1" style={{ background: "linear-gradient(90deg, #8B5CF6, #D946EF)" }} />
                    <div className="p-6 flex flex-col gap-4 h-full">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2 overflow-hidden">
                          <Code size={18} className="text-primary shrink-0" />
                          <h4 className="text-lg font-bold gradient-text truncate" title={r.name}>{r.name}</h4>
                        </div>
                        <a
                          href={r.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-all group-hover/card:scale-110 group-hover/card:rotate-12 shrink-0"
                        >
                          <ExternalLink size={14} />
                        </a>
                      </div>

                      <p className="text-muted-foreground text-sm leading-relaxed flex-grow line-clamp-3">
                        {r.description || "No description provided."}
                      </p>

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                        {r.language ? (
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: languageColors[r.language] || "#8867a5" }} />
                            <span className="text-xs text-muted-foreground font-medium">{r.language}</span>
                          </div>
                        ) : <span />}
                        <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <Star size={13} className="text-yellow-400" />
                            {r.stargazers_count}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <GitFork size={13} />
                            {r.forks_count}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          ) : null}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="flex justify-center mt-12"
        >
          <motion.a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(139,92,246,0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-sm text-white"
            style={{ background: "linear-gradient(135deg, #8B5CF6, #D946EF)" }}
          >
            <Github size={17} />
            View Full GitHub Profile
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubSection;
