import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

const socialLinks = [
  { icon: <Github size={20} />, href: "https://github.com/NULLPOINTERCODER", label: "GitHub" },
  { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/vishal-choudhary-45a931344?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", label: "LinkedIn" },
  { icon: <Mail size={20} />, href: "mailto:vishalchoudharyiitian1@gmail.com", label: "Email" },
];

const Footer = () => {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-4 text-center">
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} Vishal Choudhary. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
