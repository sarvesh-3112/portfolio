"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";

import LoadingScreen from "@/components/ui/LoadingScreen";
import Cursor from "@/components/ui/Cursor";
import SectionProgress from "@/components/ui/SectionProgress";
import MouseSpotlight from "@/components/ui/MouseSpotlight";
import { AuroraBackground, SectionDivider } from "@/components/ui/Background";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";

// Lazy-load heavy sections
const HeroSection       = dynamic(() => import("@/components/sections/HeroSection"),       { ssr: false });
const AboutSection      = dynamic(() => import("@/components/sections/AboutSection"));
const SkillsSection     = dynamic(() => import("@/components/sections/SkillsSection"));
const ProjectsSection   = dynamic(() => import("@/components/sections/ProjectsSection"));
const ExperienceSection = dynamic(() => import("@/components/sections/ExperienceSection"));
const ContactSection    = dynamic(() => import("@/components/sections/ContactSection"));

export default function Home() {
  return (
    <SmoothScrollProvider>
      {/* Custom cursor */}
      <Cursor />

      {/* Loading screen */}
      <LoadingScreen />

      {/* Global ambient aurora — fixed, z-0 */}
      <AuroraBackground />

      {/* Mouse spotlight */}
      <MouseSpotlight />

      {/* Navigation + scroll progress bar */}
      <Navbar />

      {/* Section dot nav — right side, xl screens only */}
      <SectionProgress />

      {/* Main content */}
      <main style={{ position: "relative", zIndex: 10 }}>
        <Suspense fallback={null}>
          <HeroSection />
        </Suspense>

        <SectionDivider />
        <AboutSection />

        <SectionDivider />
        <SkillsSection />

        <SectionDivider />
        <ProjectsSection />

        <SectionDivider />
        <ExperienceSection />

        <SectionDivider />
        <ContactSection />
      </main>

      <Footer />
    </SmoothScrollProvider>
  );
}
