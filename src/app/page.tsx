'use client';

import { useState, useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import LoadingAnimation from '@/components/LoadingAnimation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ScrollIndicator from '@/components/ScrollIndicator';
import FloatingParticles from '@/components/FloatingParticles';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ExperienceSection from '@/components/ExperienceSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import VisitorCounter from '@/components/VisitorCounter';
import { motion } from 'framer-motion';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reduce loading time for better performance
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <motion.main
      className='min-h-screen bg-dark-bg pt-16 md:pt-0'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      aria-label='Main content'
    >
      <Navigation />
      <ScrollIndicator />
      <FloatingParticles />
      <VisitorCounter />
      <HeroSection />

      {/* Main content sections */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <AboutSection />

        <SkillsSection />

        <ExperienceSection />

        <ProjectsSection />

        <ContactSection />

        <Footer />
      </motion.div>
    </motion.main>
  );
}
