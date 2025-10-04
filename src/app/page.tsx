'use client';

import { useState, useEffect } from 'react';
import HeroSection from '@/components/HeroSection';

import LoadingAnimation from '@/components/LoadingAnimation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ScrollIndicator from '@/components/ScrollIndicator';
import FloatingParticles from '@/components/FloatingParticles';
import CustomCursor from '@/components/CustomCursor';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ExperienceSection from '@/components/ExperienceSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <main className='min-h-screen bg-dark-bg pt-16 md:pt-0'>
      <Navigation />
      <ScrollIndicator />
      <FloatingParticles />
      <CustomCursor />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
