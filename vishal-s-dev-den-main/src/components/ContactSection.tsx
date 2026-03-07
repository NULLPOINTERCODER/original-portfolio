import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, MapPin, Briefcase, GraduationCap, Send, User, Instagram } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const personalDetails = [
  { icon: <User size={20} />, label: "Name", value: "Vishal Choudhary" },
  { icon: <Mail size={20} />, label: "Email", value: "vpatel914235@gmail.com" },
  { icon: <Instagram size={20} />, label: "Instagram", value: "@i_m_v_patel", href: "https://www.instagram.com/i_m_v_patel?utm_source=qr&igsh=MXRncjQzbGh2Nmsydw==" },
  { icon: <MapPin size={20} />, label: "Location", value: "Vadodara, Gujarat, India" },
  { icon: <Briefcase size={20} />, label: "Freelance", value: "Available" },
  { icon: <GraduationCap size={20} />, label: "Education", value: "B.Tech CSE" },
];

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const whatsappNumber = "919142359287"; // format: countrycode + number
    const message = `*New Portfolio Message*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Message:* ${formData.message}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank");

    toast({
      title: "Redirecting to WhatsApp...",
      description: "Please complete the message send in the WhatsApp window.",
    });

    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-20 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Get In Touch</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Have a project in mind? Let's work together!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Personal Details */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold text-foreground mb-8">
              Personal Details
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {personalDetails.map((detail, index) => (
                <motion.div
                  key={detail.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                    rotate: index % 2 === 0 ? 1 : -1,
                    boxShadow: "0 10px 30px rgba(139, 92, 246, 0.2)",
                    borderColor: "rgba(139, 92, 246, 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="glass-card p-4 card-glow cursor-default transition-colors duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      {detail.icon}
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{detail.label}</p>
                      {detail.href ? (
                        <a
                          href={detail.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-primary hover:underline"
                        >
                          {detail.value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-foreground">{detail.value}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{
              boxShadow: "0 20px 50px rgba(139, 92, 246, 0.1)",
            }}
            className="glass-card p-8 card-glow"
          >
            <h3 className="text-2xl font-semibold text-foreground mb-8 text-center sm:text-left">
              Send Me a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">
                  Your Name
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:border-primary transition-all text-foreground"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
                  Your Email
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:border-primary transition-all text-foreground"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">
                  Your Message
                </label>
                <motion.textarea
                  whileFocus={{ scale: 1.01 }}
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:border-primary transition-all text-foreground resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
