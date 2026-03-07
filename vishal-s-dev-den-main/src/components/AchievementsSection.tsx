import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, Star, Rocket, Zap } from "lucide-react";

const achievements = [
  {
    title: "Smart India Hackathon (SIH) 2025",
    subtitle: "Institute-level Qualifier",
    description: "Parul Institute of Technology — Qualified at the institute level, competing against top teams to solve national-level problem statements.",
    date: "Sep 2025",
    emoji: "🏆",
    icon: <Trophy size={22} />,
    gradient: "from-yellow-500/20 to-amber-800/10",
    glow: "rgba(234,179,8,0.3)",
    border: "border-yellow-500/30",
    badge: "#EAB308",
    tag: "Hackathon",
  },
  {
    title: "Ignita Startup Fest 2025",
    subtitle: "Top 25 Startup Pitcher",
    description: "Recognized among the Top 25 Startup Pitchers for innovation, entrepreneurial excellence, and presenting a compelling business idea to industry experts.",
    date: "Sep 2025",
    emoji: "🚀",
    icon: <Rocket size={22} />,
    gradient: "from-pink-500/20 to-rose-800/10",
    glow: "rgba(236,72,153,0.3)",
    border: "border-pink-500/30",
    badge: "#EC4899",
    tag: "Startup",
  },
  {
    title: "PU Code Hackathon 2.0 & 3.0",
    subtitle: "Grand Finale Qualifier",
    description: "Selected for the Grand Finale in both editions of the PU Code Hackathon, showcasing strong problem-solving and coding abilities under time pressure.",
    date: "Jan 2025 & Jan 2026",
    emoji: "⚡",
    icon: <Zap size={22} />,
    gradient: "from-violet-500/20 to-purple-800/10",
    glow: "rgba(139,92,246,0.3)",
    border: "border-violet-500/30",
    badge: "#8B5CF6",
    tag: "Hackathon",
  },
];

const AchievementsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="achievements" className="py-20 relative overflow-hidden" ref={ref}>
      {/* Ambient glows */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-500/10 border border-yellow-500/30 mb-6 mx-auto"
          >
            <Star size={30} className="text-yellow-400" />
          </motion.div>
          <h2 className="section-title">Achievements</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Hackathons and Recognitions
          </p>
        </motion.div>

        {/* Achievement cards */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent pointer-events-none" />

          <div className="flex flex-col gap-12">
            {achievements.map((achievement, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.18 }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.4 }}
                    className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-background z-10"
                    style={{ backgroundColor: achievement.badge, boxShadow: `0 0 12px ${achievement.glow}` }}
                  />

                  {/* Date pill (hidden on mobile, shown on desktop beside the card) */}
                  <div className={`hidden md:flex md:w-[calc(50%-2rem)] ${isLeft ? "justify-end pr-8" : "justify-start pl-8"}`}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white"
                      style={{ background: achievement.badge, boxShadow: `0 0 15px ${achievement.glow}` }}
                    >
                      <span className="text-lg">{achievement.emoji}</span>
                      {achievement.date}
                    </motion.div>
                  </div>

                  {/* Card */}
                  <div className={`md:w-[calc(50%-2rem)] ${isLeft ? "md:pl-8" : "md:pr-8"} pl-16 md:pl-8`}>
                    <motion.div
                      whileHover={{ y: -6, scale: 1.01 }}
                      className={`relative rounded-2xl border ${achievement.border} overflow-hidden group`}
                      style={{ transition: "box-shadow 0.3s ease" }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${achievement.glow}, 0 8px 30px rgba(0,0,0,0.3)`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = "";
                      }}
                    >
                      {/* Top accent bar */}
                      <div className="h-1" style={{ background: `linear-gradient(90deg, ${achievement.badge}, transparent)` }} />

                      {/* Gradient overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${achievement.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                      <div className="relative z-10 p-6 flex flex-col gap-3">
                        {/* Mobile date */}
                        <div className="flex items-center justify-between md:hidden">
                          <span
                            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white"
                            style={{ backgroundColor: achievement.badge }}
                          >
                            {achievement.emoji} {achievement.date}
                          </span>
                          <span
                            className="px-2.5 py-1 rounded-full text-xs font-medium border"
                            style={{ color: achievement.badge, borderColor: `${achievement.badge}50` }}
                          >
                            {achievement.tag}
                          </span>
                        </div>

                        {/* Title row */}
                        <div className="flex items-start gap-3">
                          <div
                            className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-white mt-0.5"
                            style={{ background: achievement.badge, boxShadow: `0 0 15px ${achievement.glow}` }}
                          >
                            {achievement.icon}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                              {achievement.title}
                            </h3>
                            <p className="text-sm font-medium mt-0.5" style={{ color: achievement.badge }}>
                              {achievement.subtitle}
                            </p>
                          </div>
                        </div>

                        <p className="text-muted-foreground text-sm leading-relaxed ml-13">
                          {achievement.description}
                        </p>

                        {/* Desktop tag */}
                        <div className="hidden md:flex">
                          <span
                            className="px-3 py-1 rounded-full text-xs font-semibold border"
                            style={{ color: achievement.badge, borderColor: `${achievement.badge}50`, background: `${achievement.badge}10` }}
                          >
                            {achievement.tag}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
