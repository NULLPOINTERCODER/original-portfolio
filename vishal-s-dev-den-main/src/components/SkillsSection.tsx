import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const allSkills = [
  // Programming Languages
  { name: "C/C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", category: "Languages" },
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", category: "Languages" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", category: "Languages" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", category: "Languages" },
  { name: "Kotlin", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg", category: "Languages" },

  // Frameworks
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", category: "Frameworks" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", category: "Frameworks" },
  { name: "Django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg", category: "Frameworks" },
  { name: "Flask", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg", category: "Frameworks" },
  { name: "Streamlit", icon: "https://streamlit.io/images/brand/streamlit-mark-color.svg", category: "Frameworks" },

  // Databases
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", category: "Databases" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", category: "Databases" },

  // Tools
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", category: "Tools" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", category: "Tools" },
  { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg", category: "Tools" },
  { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", category: "Tools" },
  { name: "IntelliJ", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg", category: "Tools" },
  { name: "Android Studio", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg", category: "Tools" },
  { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", category: "Tools" },
  { name: "Jupyter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg", category: "Tools" },

  // AI/ML
  { name: "NumPy", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg", category: "AI/ML" },
  { name: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg", category: "AI/ML" },
  { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg", category: "AI/ML" },
  { name: "OpenCV", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg", category: "AI/ML" },
  { name: "Scikit-Learn", icon: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg", category: "AI/ML" },
];

// Split into two rows for opposite-direction marquees
const row1 = allSkills.slice(0, Math.ceil(allSkills.length / 2));
const row2 = allSkills.slice(Math.ceil(allSkills.length / 2));

const SkillCard = ({ skill }: { skill: typeof allSkills[0] }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.12, y: -6, rotate: [0, -2, 2, 0] }}
      transition={{ rotate: { duration: 0.3 } }}
      className="flex-shrink-0 flex flex-col items-center justify-center gap-2 px-5 py-4 w-28 rounded-2xl cursor-pointer relative overflow-hidden mx-2"
      style={{
        background: hovered
          ? "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(217,70,239,0.15))"
          : "rgba(255,255,255,0.03)",
        border: hovered
          ? "1px solid rgba(139,92,246,0.5)"
          : "1px solid rgba(255,255,255,0.08)",
        boxShadow: hovered
          ? "0 0 20px rgba(139,92,246,0.3), 0 8px 20px rgba(0,0,0,0.3)"
          : "0 2px 10px rgba(0,0,0,0.2)",
        transition: "all 0.3s ease",
      }}
    >
      {/* Glow behind icon on hover */}
      {hovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 rounded-2xl"
          style={{ background: "radial-gradient(circle at center, rgba(139,92,246,0.2), transparent 70%)" }}
        />
      )}
      <div className="w-10 h-10 relative z-10">
        <img
          src={skill.icon}
          alt={skill.name}
          className="w-full h-full object-contain"
          style={{ filter: hovered ? "brightness(1.3) drop-shadow(0 0 6px rgba(139,92,246,0.6))" : "brightness(0.9)" }}
        />
      </div>
      <span className="text-xs font-medium text-foreground/70 text-center relative z-10 group-hover:text-foreground transition-colors">
        {skill.name}
      </span>
    </motion.div>
  );
};

// A single infinite-marquee row
const MarqueeRow = ({ skills, direction = "left", speed = 30 }: {
  skills: typeof allSkills,
  direction?: "left" | "right",
  speed?: number
}) => {
  const doubled = [...skills, ...skills, ...skills]; // triple to ensure seamless loop

  return (
    <div className="overflow-hidden relative w-full">
      {/* Left fade */}
      <div className="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, hsl(var(--background)), transparent)" }} />
      {/* Right fade */}
      <div className="absolute right-0 top-0 h-full w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, hsl(var(--background)), transparent)" }} />

      <motion.div
        className="flex"
        animate={{
          x: direction === "left" ? ["0%", `-${100 / 3}%`] : [`-${100 / 3}%`, "0%"],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {doubled.map((skill, i) => (
          <SkillCard key={`${skill.name}-${i}`} skill={skill} />
        ))}
      </motion.div>
    </div>
  );
};

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const categories = ["All", "Languages", "Frameworks", "Databases", "Tools", "AI/ML"];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredSkills = activeCategory === "All"
    ? allSkills
    : allSkills.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="py-20 relative overflow-hidden" ref={ref}>
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-title">My Skills</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Technologies and tools I work with
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-14"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat
                ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(139,92,246,0.4)]"
                : "bg-card border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Carousel Marquee (shown when All is selected) */}
        {activeCategory === "All" ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Row 1 → left */}
            <MarqueeRow skills={row1} direction="left" speed={12} />
            {/* Row 2 → right */}
            <MarqueeRow skills={row2} direction="right" speed={8} />
          </motion.div>
        ) : (
          /* One-time left-to-right slide for filtered category */
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto"
          >
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.06, duration: 0.35 }}
              >
                <SkillCard skill={skill} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default SkillsSection;
