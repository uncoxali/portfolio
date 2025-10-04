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
import ChaosToolbar from '@/components/ChaosToolbar';
import { motion } from 'framer-motion';

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
    <motion.main
      className='min-h-screen bg-dark-bg pt-16 md:pt-0'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navigation />
      <ScrollIndicator />
      <FloatingParticles />
      <CustomCursor />
      <ChaosToolbar />
      <HeroSection />

      {/* Section transitions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <AboutSection />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <SkillsSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <ExperienceSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <ProjectsSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <ContactSection />
        </motion.div>

        <Footer />
      </motion.div>
    </motion.main>
  );
}
