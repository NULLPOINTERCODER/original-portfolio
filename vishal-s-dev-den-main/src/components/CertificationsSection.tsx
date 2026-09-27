import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Award, ExternalLink, ChevronLeft, ChevronRight, Calendar, Building } from "lucide-react";

const certifications = [
  {
    title: "Building Agentic AI Applications with Large Language Models",
    issuer: "NVIDIA",
    date: "Sep 2026",
    description: "Certificate of Competency awarded by Howard Wright (Vice President, NVIDIA) for demonstrating competence in designing and building autonomous Agentic AI applications using LLMs.",
    link: "https://learn.nvidia.com/certificates?id=kiP-BDBuSaye11OPrF4KWg",
    emoji: "⚡",
    gradient: "from-emerald-500/20 to-green-900/10",
    glow: "rgba(118,185,0,0.35)",
    border: "border-emerald-500/40",
    badge: "#76B900",
  },
  {
    title: "Machine Learning, Data Science, DL and NLP",
    issuer: "Udemy",
    date: "Jan 2026",
    description: "Comprehensive machine learning course covering supervised and unsupervised learning, deep learning, and practical implementations with Python.",
    link: "https://udemy-certificate.s3.amazonaws.com/pdf/UC-137dd086-3706-4288-bc0f-da0dd56be077.pdf",
    emoji: "🧠",
    gradient: "from-violet-500/20 to-purple-800/10",
    glow: "rgba(139,92,246,0.3)",
    border: "border-violet-500/30",
    badge: "#8B5CF6",
  },
  {
    title: "AWS Academy Cloud Foundations Graduate",
    issuer: "AWS Academy",
    date: "Aug 2025",
    description: "Foundational understanding of AWS Cloud concepts, services, and terminology. Covers cloud architecture, security, and compliance fundamentals.",
    link: "https://www.credly.com/badges/206b6097-886d-48f8-9f1a-985c39553f4d/public_url",
    emoji: "☁️",
    gradient: "from-orange-500/20 to-yellow-800/10",
    glow: "rgba(249,115,22,0.3)",
    border: "border-orange-500/30",
    badge: "#F97316",
  },
  {
    title: "Smart Coder – Silver Certificate",
    issuer: "Smart Interviews",
    date: "July 2025",
    description: "Recognition for excellence in problem-solving and data structures & algorithms, demonstrating strong competitive programming skills.",
    link: "https://smartinterviews.in/certificate/6e9216cb",
    emoji: "🥈",
    gradient: "from-slate-400/20 to-blue-800/10",
    glow: "rgba(148,163,184,0.3)",
    border: "border-slate-400/30",
    badge: "#94A3B8",
  },
  {
    title: "Artificial Intelligence Fundamentals",
    issuer: "IBM SkillsBuilder",
    date: "July 2025",
    description: "Comprehensive understanding of artificial intelligence concepts, machine learning algorithms, and AI applications in real-world scenarios.",
    link: "https://www.credly.com/badges/44c97203-a982-4477-939f-0de130ae29ed/public_url",
    emoji: "🤖",
    gradient: "from-blue-500/20 to-cyan-800/10",
    glow: "rgba(59,130,246,0.3)",
    border: "border-blue-500/30",
    badge: "#3B82F6",
  },
  {
    title: "Computer Networks And Internet Protocol",
    issuer: "NPTEL",
    date: "July 2025",
    description: "In-depth understanding of computer networks, OSI models, and the intricacies of the Internet Protocol suite.",
    link: "",
    emoji: "🌐",
    gradient: "from-green-500/20 to-emerald-800/10",
    glow: "rgba(34,197,94,0.3)",
    border: "border-green-500/30",
    badge: "#22C55E",
  },
];

const CertificationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % certifications.length);
    }, 2500); // Auto advance every 2.5s
    return () => clearInterval(timer);
  }, [isPaused]);

  const cert = certifications[current];

  const slideVariants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 100 : -100, scale: 0.92, rotateY: dir > 0 ? 15 : -15 }),
    center: { opacity: 1, x: 0, scale: 1, rotateY: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -100 : 100, scale: 0.92, rotateY: dir > 0 ? -15 : 15 }),
  };

  return (
    <section id="certifications" className="py-20 relative overflow-hidden" ref={ref}>
      {/* Ambient glows */}
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
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/20 mb-6 mx-auto">
            <Award size={30} className="text-primary" />
          </div>
          <h2 className="section-title">Certifications</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Professional certifications and achievements
          </p>
        </motion.div>

        {/* Main single card */}
        <div
          className="relative max-w-3xl mx-auto select-none mt-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Arrow buttons */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => { setDirection(-1); setCurrent((c) => (c - 1 + certifications.length) % certifications.length); }}
            className="absolute -left-5 md:-left-16 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-card border border-border hover:border-primary/50 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all"
          >
            <ChevronLeft size={22} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => { setDirection(1); setCurrent((c) => (c + 1) % certifications.length); }}
            className="absolute -right-5 md:-right-16 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-card border border-border hover:border-primary/50 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all"
          >
            <ChevronRight size={22} />
          </motion.button>

          {/* Outer glow */}
          <div
            className="absolute inset-0 rounded-3xl blur-2xl pointer-events-none transition-all duration-700"
            style={{ background: `radial-gradient(circle, ${cert.glow}, transparent 70%)` }}
          />

          {/* Animated card */}
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 24, duration: 0.5 }}
              className={`relative rounded-3xl overflow-hidden border ${cert.border} glass-card`}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 50px ${cert.glow}`; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = ""; }}
            >
              {/* Top gradient accent */}
              <div className="h-1.5" style={{ background: `linear-gradient(90deg, transparent, ${cert.badge}, transparent)` }} />

              {/* Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cert.gradient} pointer-events-none`} />

              <div className="relative z-10 p-8 md:p-10 grid md:grid-cols-[auto,1fr] gap-8 items-start">
                {/* Left: Big emoji + badge */}
                <div className="flex flex-col items-center gap-3">
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="text-7xl"
                  >
                    {cert.emoji}
                  </motion.div>
                  <div
                    className="px-3 py-1 rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: cert.badge, boxShadow: `0 0 10px ${cert.glow}` }}
                  >
                    {cert.issuer}
                  </div>
                </div>

                {/* Right: Details */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-2xl font-bold text-foreground leading-tight">{cert.title}</h3>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Building size={14} className="text-primary" />
                      {cert.issuer}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-primary" />
                      Issued: {cert.date}
                    </span>
                  </div>

                  <p className="text-foreground/75 text-sm leading-relaxed">{cert.description}</p>

                  {cert.link && (
                    <motion.a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03, x: 4 }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-semibold w-fit transition-all"
                      style={{ background: `linear-gradient(135deg, ${cert.badge}, ${cert.badge}99)`, boxShadow: `0 0 15px ${cert.glow}` }}
                    >
                      <ExternalLink size={14} />
                      View Certificate
                    </motion.a>
                  )}

                  {/* Progress: cert X of N */}
                  <p className="text-xs text-muted-foreground/50 mt-2">
                    {current + 1} of {certifications.length} · Auto-playing
                  </p>
                </div>
              </div>

              {/* Bottom accent */}
              <div className="h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${cert.badge}66, transparent)` }} />
            </motion.div>
          </AnimatePresence>

          {/* Dot navigation */}
          <div className="flex justify-center gap-2.5 mt-8">
            {certifications.map((c, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                className={`transition-all duration-300 rounded-full ${i === current ? "w-8 h-2.5" : "w-2.5 h-2.5 bg-muted-foreground/25 hover:bg-muted-foreground/50"
                  }`}
                style={i === current ? { backgroundColor: c.badge, boxShadow: `0 0 10px ${c.glow}` } : {}}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
