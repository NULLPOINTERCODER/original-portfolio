import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import GitHubSection from "@/components/GitHubSection";
import CertificationsSection from "@/components/CertificationsSection";
import AchievementsSection from "@/components/AchievementsSection";
import CodolioAwardsSection from "@/components/CodolioAwardsSection";
import CodolioActivitySection from "@/components/CodolioActivitySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";

const Index = () => {
  return (
    <main className="min-h-screen relative overflow-hidden bg-transparent">
      <AnimatedBackground />
      <div className="relative z-10 text-foreground overflow-x-hidden">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <GitHubSection />
        <CertificationsSection />
        <AchievementsSection />
        <CodolioAwardsSection />
        <CodolioActivitySection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
};

export default Index;
