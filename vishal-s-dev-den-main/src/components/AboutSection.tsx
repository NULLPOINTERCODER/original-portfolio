import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { GraduationCap, MapPin, Briefcase, Code2, Cpu, Globe } from "lucide-react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [totalProblems, setTotalProblems] = useState("450+");

  useEffect(() => {
    const fetchCodolioProblems = async () => {
      try {
        const res = await fetch('/api/codolio');
        if (!res.ok) return;
        const json = await res.json();

        const platformProfiles = json?.payload?.data?.platformProfiles?.platformProfiles || [];
        let total = 0;

        platformProfiles.forEach((profile: any) => {
          const count = profile.totalQuestionStats?.totalQuestionCounts;
          if (count && typeof count === 'number') {
            total += count;
          }
        });

        if (total > 0) {
          setTotalProblems(`${total}+`);
        }
      } catch (error) {
        console.error("Error fetching Codolio problems for About:", error);
      }
    };
    fetchCodolioProblems();
  }, []);

  const stats = [
    {
      icon: <GraduationCap size={22} />,
      label: "CGPA (5th Sem)",
      value: "8.45",
      color: "text-primary",
      bg: "bg-primary/10",
      border: "border-primary/20",
    },
    {
      icon: <Code2 size={22} />,
      label: "Problems Solved",
      value: totalProblems,
      color: "text-secondary",
      bg: "bg-secondary/10",
      border: "border-secondary/20",
    },
    {
      icon: <MapPin size={22} />,
      label: "Location",
      value: "Vadodara",
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      border: "border-blue-400/20",
    },
    {
      icon: <Briefcase size={22} />,
      label: "Status",
      value: "Available",
      color: "text-green-400",
      bg: "bg-green-400/10",
      border: "border-green-400/20",
    },
  ];

  const highlights = [
    { icon: <Globe size={18} />, text: "Full Stack Web Development" },
    { icon: <Cpu size={18} />, text: "Machine Learning & AI" },
    { icon: <Code2 size={18} />, text: "Competitive Programming (DSA)" },
  ];

  return (
    <section id="about" className="py-20 relative" ref={ref}>
      {/* Background Glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">About Me</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Get to know me better</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 items-start max-w-6xl mx-auto">
          {/* LEFT: About Text (spans 3 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 space-y-6"
          >
            {/* Main Bio Card */}
            <motion.div
              whileHover={{
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(139, 92, 246, 0.15)",
                borderColor: "rgba(139, 92, 246, 0.4)"
              }}
              transition={{ duration: 0.3 }}
              className="glass-card p-8 relative overflow-hidden transition-colors"
            >
              {/* Decorative corner glow */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-secondary/10 rounded-full blur-2xl pointer-events-none" />

              <p className="text-foreground/90 leading-relaxed text-base relative z-10">
                Hi! I'm{" "}
                <span className="gradient-text font-semibold text-lg">Vishal Choudhary</span>, a
                B.Tech CSE student at Parul Institute of Technology, currently in my{" "}
                <span className="text-primary font-medium">5th semester</span> with a CGPA of{" "}
                <span className="text-primary font-bold">8.45</span>.
              </p>
              <p className="text-foreground/80 leading-relaxed text-base mt-4 relative z-10">
                I have a solid foundation in full-stack web development, with hands-on experience
                in{" "}
                <span className="text-primary">React, Node.js, Django, and Flask</span>, and I
                enjoy building modern, responsive, and interactive web applications.
              </p>
              <p className="text-foreground/80 leading-relaxed text-base mt-4 relative z-10">
                I am deeply passionate about problem-solving and have solved{" "}
                <span className="text-secondary font-semibold">
                  {totalProblems} competitive programming problems
                </span>
                , actively strengthening my expertise in Data Structures and Algorithms using Java.
              </p>
              <p className="text-foreground/80 leading-relaxed text-base mt-4 relative z-10">
                I also have practical experience in{" "}
                <span className="text-primary">Machine Learning</span>, having built real-world
                projects like crop yield prediction systems and recommendation engines.
              </p>
            </motion.div>

            {/* Expertise Highlights */}
            <div className="flex flex-wrap gap-3">
              {highlights.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2, boxShadow: "0 10px 20px rgba(139, 92, 246, 0.2)" }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/20 text-sm text-foreground/80 cursor-default"
                >
                  <span className="text-primary">{h.icon}</span>
                  {h.text}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Stats (spans 2 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2 grid grid-cols-2 gap-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -8, rotate: index % 2 === 0 ? 1 : -1, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
                className={`glass-card p-5 text-center border ${stat.border} relative overflow-hidden group hover:border-${stat.color.replace('text-', '')}`}
              >
                {/* Glow on hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${stat.bg} blur-lg`} />

                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${stat.bg} ${stat.color} mb-3 relative z-10`}>
                  {stat.icon}
                </div>
                <div className={`text-2xl font-bold ${stat.color} relative z-10`}>{stat.value}</div>
                <div className="text-muted-foreground text-xs mt-1 relative z-10">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
