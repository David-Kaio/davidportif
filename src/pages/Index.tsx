import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import CompanyLogosSection from "@/components/CompanyLogosSection";
import WorksSection from "@/components/WorksSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import type { PointerEvent } from "react";

const Index = () => {
  const moveGridFocus = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--grid-x", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--grid-y", `${event.clientY - bounds.top}px`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="interactive-grid-zone" onPointerMove={moveGridFocus}>
        <HeroSection />
        <AboutSection />
      </div>
      <CompanyLogosSection />
      <div className="interactive-grid-zone" onPointerMove={moveGridFocus}>
        <WorksSection />
        <ExperienceSection />
        <EducationSection />
        <ContactSection />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
