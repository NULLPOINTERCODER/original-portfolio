import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "GitHub", href: "#github" },
  { name: "Certifications", href: "#certifications" },
  { name: "Code Activity", href: "#code-activity" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50"
          : "bg-transparent"
          }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="relative flex items-center justify-between">

            {/* Logo */}
            <motion.a
              href="#home"
              className="text-2xl font-bold font-display gradient-text"
              whileHover={{ scale: 1.05 }}
            >
              Vishal
            </motion.a>

            {/* Desktop Navigation (Centered in a glowing pill) */}
            <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-6 px-8 py-3 rounded-full bg-background/30 backdrop-blur-xl border border-primary/40 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium transition-all text-foreground/70 hover:text-foreground"
                  whileHover={{ textShadow: "0 0 15px rgba(255, 255, 255, 0.8)", scale: 1.05 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Animated Hire Me Button */}
              <motion.a
                href="#contact"
                className="hidden lg:flex items-center gap-2 relative px-6 py-2.5 rounded-full font-semibold text-sm overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: "linear-gradient(135deg, #8B5CF6, #D946EF, #8B5CF6)",
                  backgroundSize: "200% 200%",
                  boxShadow: "0 0 20px rgba(139, 92, 246, 0.5), 0 0 40px rgba(217, 70, 239, 0.3)",
                }}
              >
                {/* Animated shimmer overlay */}
                <motion.span
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)",
                  }}
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
                <Sparkles size={15} className="relative z-10 text-white" />
                <span className="relative z-10 text-white">Hire Me</span>
              </motion.a>

              {/* Mobile Hamburger Button */}
              <motion.button
                className="lg:hidden text-foreground p-2 rounded-lg bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-colors"
                onClick={() => setIsMobileMenuOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Menu size={22} />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Sidebar Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-72 z-[70] bg-background/95 backdrop-blur-2xl border-l border-primary/20 shadow-[-10px_0_40px_rgba(139,92,246,0.2)]"
            >
              {/* Sidebar Header */}
              <div className="flex items-center justify-between p-6 border-b border-border/50">
                <span className="text-xl font-bold gradient-text">Menu</span>
                <motion.button
                  onClick={() => setIsMobileMenuOpen(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-foreground transition-colors"
                >
                  <X size={20} />
                </motion.button>
              </div>

              {/* Sidebar Links */}
              <div className="flex flex-col gap-2 p-6">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index, duration: 0.3 }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground/80 hover:text-foreground hover:bg-primary/10 transition-all font-medium text-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60 group-hover:bg-primary transition-colors" />
                    {link.name}
                  </motion.a>
                ))}

                {/* Hire Me in Sidebar */}
                <motion.a
                  href="#contact"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * navLinks.length + 0.1, duration: 0.3 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-4 flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-white"
                  style={{
                    background: "linear-gradient(135deg, #8B5CF6, #D946EF)",
                    boxShadow: "0 0 20px rgba(139, 92, 246, 0.4)",
                  }}
                >
                  <Sparkles size={16} />
                  Hire Me
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
