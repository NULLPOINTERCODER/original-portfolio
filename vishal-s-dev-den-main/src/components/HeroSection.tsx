import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import { Download, Mail, Sparkles, Github, Linkedin } from "lucide-react";

const typewriterTexts = [
  "Full Stack Developer",
  2000,
  "UI/UX Designer",
  2000,
  "Frontend Specialist",
  2000,
  "Backend Engineer",
  2000,
  "Problem Solver",
  2000,
  "ML Engineer",
  2000,
  "Tech Enthusiast",
  2000,
];

const HeroSection = () => {
  const [stats, setStats] = useState({
    leetcode: "1720",
    codechef: "1177",
    problems: "450+"
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/codolio');
        if (!res.ok) throw new Error('Failed to fetch codolio data');
        const json = await res.json();

        const platformProfiles = json?.payload?.data?.platformProfiles?.platformProfiles || [];

        let leetcodeRating = stats.leetcode;
        let codechefRating = stats.codechef;
        let totalProblems = 0;

        platformProfiles.forEach((profile: any) => {
          if (profile.platform === 'leetcode' && profile.userStats?.currentRating) {
            leetcodeRating = profile.userStats.currentRating.toString();
          }
          if (profile.platform === 'codechef' && profile.userStats?.currentRating) {
            codechefRating = profile.userStats.currentRating.toString();
          }

          // Sum up problems across all platforms
          const count = profile.totalQuestionStats?.totalQuestionCounts;
          if (count && typeof count === 'number') {
            totalProblems += count;
          }
        });

        setStats({
          leetcode: leetcodeRating,
          codechef: codechefRating,
          problems: totalProblems > 0 ? `${totalProblems}+` : stats.problems
        });
      } catch (error) {
        console.error("Error fetching Codolio stats for HeroSection:", error);
      }
    };

    fetchStats();
  }, []); // Run once on mount

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">

          {/* LEFT: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            {/* Welcome Pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-6"
            >
              <Sparkles size={14} />
              <span>👋 Welcome to My Portfolio</span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-4 leading-tight"
            >
              Hi, I'm{" "}
              <span className="gradient-text block mt-1">Vishal Choudhary</span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl md:text-2xl font-display text-muted-foreground mb-6 h-10"
            >
              <TypeAnimation
                sequence={typewriterTexts}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="gradient-text font-semibold"
              />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-muted-foreground text-base leading-relaxed mb-8 max-w-lg"
            >
              Passionate about building modern web applications with clean code and
              exceptional user experiences. Let's create something amazing together.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(139,92,246,0.6)" }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-white text-sm"
                style={{
                  background: "linear-gradient(135deg, #8B5CF6, #D946EF)",
                  boxShadow: "0 0 20px rgba(139, 92, 246, 0.4)",
                }}
              >
                <Mail size={16} />
                Hire Me
              </motion.a>

              <motion.a
                href="https://drive.google.com/file/d/16ptIYRLHJXm-wGDxf9CepucBl5ZaHYJG/view?usp=drivesdk"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline flex items-center gap-2 px-7 py-3 rounded-full text-sm"
              >
                <Download size={16} />
                Download CV
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex items-center gap-4"
            >
              <span className="text-muted-foreground text-sm">Find me on:</span>
              <a
                href="https://github.com/NULLPOINTERCODER"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-card border border-border hover:border-primary/50 hover:text-primary hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/vishal-choudhary-45a931344?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-card border border-border hover:border-primary/50 hover:text-primary hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all"
              >
                <Linkedin size={18} />
              </a>
            </motion.div>
          </motion.div>

          {/* RIGHT: Avatar */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center items-center relative"
          >
            {/* Outer glow ring */}
            <div className="absolute w-[330px] h-[330px] md:w-[400px] md:h-[400px] rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(139,92,246,0.25) 0%, rgba(217,70,239,0.1) 50%, transparent 70%)",
                filter: "blur(30px)",
              }}
            />

            {/* Rotating ring decoration */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute w-[300px] h-[300px] md:w-[370px] md:h-[370px] rounded-full border border-primary/20"
              style={{ borderStyle: "dashed" }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute w-[270px] h-[270px] md:w-[340px] md:h-[340px] rounded-full border border-secondary/20"
              style={{ borderStyle: "dotted" }}
            />

            {/* Avatar Image */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-[240px] h-[240px] md:w-[300px] md:h-[300px] rounded-full overflow-hidden border-4 border-primary/40"
              style={{
                boxShadow: "0 0 30px rgba(139, 92, 246, 0.4), 0 0 60px rgba(217, 70, 239, 0.2)",
              }}
            >
              <img
                src="/hero_avatar.jpeg"
                alt="Vishal Choudhary"
                className="w-full h-full object-cover"
              />
              {/* Inner glow overlay */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
            </motion.div>

            {/* Floating badge: LeetCode */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-4 right-0 md:right-4 glass-card px-3 py-2 rounded-xl border border-primary/30 shadow-lg text-xs font-medium text-foreground"
            >
              🏆 LeetCode <span className="text-primary font-bold">{stats.leetcode}</span>
            </motion.div>

            {/* Floating badge: CodeChef */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0 }}
              className="absolute top-4 left-0 md:left-4 glass-card px-3 py-2 rounded-xl border border-yellow-500/30 shadow-lg text-xs font-medium text-foreground"
            >
              ⭐ CodeChef <span className="text-yellow-400 font-bold">{stats.codechef}</span>
            </motion.div>

            {/* Floating badge: CGPA */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-8 left-0 md:left-4 glass-card px-3 py-2 rounded-xl border border-secondary/30 shadow-lg text-xs font-medium text-foreground"
            >
              🎓 CGPA <span className="text-secondary font-bold">8.45</span>
            </motion.div>

            {/* Floating badge: Problems */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute bottom-0 right-6 md:right-12 glass-card px-3 py-2 rounded-xl border border-primary/20 shadow-lg text-xs font-medium text-foreground"
            >
              💡 <span className="text-primary font-bold">{stats.problems}</span> Problems
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-3 bg-primary rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
