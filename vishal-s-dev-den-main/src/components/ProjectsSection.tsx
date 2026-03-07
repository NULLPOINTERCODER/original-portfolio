import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Github, ExternalLink, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    title: "AI-Powered Crop Yield Prediction",
    description:
      "Developed an AI-powered Django web platform for crop yield prediction using real-world agricultural datasets. Implemented regression and ensemble machine learning models to analyze soil, rainfall, and climatic factors.",
    techStack: ["Python", "Django", "HTML", "CSS", "JavaScript", "Scikit-learn", "Pandas", "NumPy", "Matplotlib"],
    github: "https://github.com/NULLPOINTERCODER/Crop_Yield",
    live: "",
    date: "Sep – Oct 2025",
    gradient: "from-violet-500/20 to-purple-900/10",
    borderColor: "border-violet-500/30",
    glowColor: "rgba(139,92,246,0.3)",
    emoji: "🌾",
  },
  {
    title: "Movie Recommender System",
    description:
      "Built a content-based movie recommendation system using cosine similarity on preprocessed datasets. Developed an interactive Streamlit interface for personalized recommendations with real-time results. Integrated TMDB API for improved performance using efficient caching and Pickle-based serialization.",
    techStack: ["Python", "Streamlit", "Machine Learning", "Pandas", "NumPy", "Pickle", "TMDB API"],
    github: "https://github.com/NULLPOINTERCODER/movie-recommened",
    live: "",
    date: "Jan 2026",
    gradient: "from-pink-500/20 to-rose-900/10",
    borderColor: "border-pink-500/30",
    glowColor: "rgba(217,70,239,0.3)",
    emoji: "🎬",
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (isPaused || dragging) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % projects.length);
    }, 2500); // Auto advance every 2.5s
    return () => clearInterval(timer);
  }, [isPaused, dragging]);

  const prev = () => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + projects.length) % projects.length);
  };

  const next = () => {
    setDirection(1);
    setCurrent((c) => (c + 1) % projects.length);
  };

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x < -60) next();
    else if (info.offset.x > 60) prev();
    setDragging(false);
  };

  const project = projects[current];

  const slideVariants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 100 : -100, scale: 0.92, rotateY: dir > 0 ? 15 : -15 }),
    center: { opacity: 1, x: 0, scale: 1, rotateY: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -100 : 100, scale: 0.92, rotateY: dir > 0 ? -15 : 15 }),
  };

  return (
    <section id="projects" className="py-20 relative overflow-hidden" ref={ref}>
      {/* Background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">My Projects</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Drag or tap arrows to explore my projects
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div
          className="relative max-w-2xl mx-auto select-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Arrows */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prev}
            className="absolute -left-5 md:-left-14 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-card border border-border hover:border-primary/50 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all"
          >
            <ChevronLeft size={22} className="text-foreground" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={next}
            className="absolute -right-5 md:-right-14 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-card border border-border hover:border-primary/50 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all"
          >
            <ChevronRight size={22} className="text-foreground" />
          </motion.button>

          {/* Draggable Auto-Scrolling Card */}
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 24, duration: 0.5 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragStart={() => setDragging(true)}
              onDragEnd={handleDragEnd}
              whileDrag={{ scale: 0.97, cursor: "grabbing" }}
              style={{ cursor: "grab" }}
              className={`glass-card border ${project.borderColor} relative overflow-hidden`}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px ${project.glowColor}`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "";
              }}
            >
              {/* Gradient top accent */}
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ background: `linear-gradient(to right, ${project.glowColor}, transparent)` }}
              />

              {/* Gradient hover overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} pointer-events-none opacity-60`} />

              <div className="relative z-10 p-8 flex flex-col gap-5">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-5xl">{project.emoji}</span>
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                      {project.date}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => dragging && e.preventDefault()}
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        className="p-2 rounded-full bg-card border border-border hover:border-primary/50 hover:text-primary hover:shadow-[0_0_12px_rgba(139,92,246,0.4)] transition-all"
                      >
                        <Github size={17} />
                      </motion.a>
                    )}
                    {project.live && (
                      <motion.a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2 }}
                        className="p-2 rounded-full bg-card border border-border hover:border-secondary/50 hover:text-secondary transition-all"
                      >
                        <ExternalLink size={17} />
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold gradient-text">{project.title}</h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <motion.span
                      key={tech}
                      whileHover={{ scale: 1.1 }}
                      className="px-2.5 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/15 hover:bg-primary/20 hover:shadow-[0_0_8px_rgba(139,92,246,0.3)] transition-all"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                {/* GitHub CTA */}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => dragging && e.preventDefault()}
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors group"
                  >
                    <span>View on GitHub</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight size={15} />
                    </motion.span>
                  </a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dot Navigation */}
          <div className="flex justify-center gap-3 mt-8">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`transition-all duration-300 rounded-full ${i === current
                  ? "w-8 h-2.5 bg-primary shadow-[0_0_10px_rgba(139,92,246,0.5)]"
                  : "w-2.5 h-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                  }`}
              />
            ))}
          </div>

          {/* Swipe hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-center text-xs text-muted-foreground/50 mt-4"
          >
            ← Swipe or drag to navigate · Auto-playing →
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
