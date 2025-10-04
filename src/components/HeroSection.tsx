'use client';

import { motion } from 'framer-motion';
import { FiDownload, FiLinkedin, FiGithub, FiTwitter, FiMail } from 'react-icons/fi';
import MagneticButton from '@/components/MagneticButton';

export default function HeroSection() {
  return (
    <section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
      {/* Animated gradient background */}
      <div className='absolute inset-0 z-0'>
        <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 via-secondary/10 to-dark-bg'></div>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-3xl animate-pulse'></div>
      </div>

      <div className='container mx-auto px-4 z-10'>
        <div className='flex flex-col items-center text-center'>
          {/* Animated name reveal */}
          <motion.h1
            className='text-5xl md:text-7xl font-bold mb-6'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className='bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary'>
              Ali Mohammadi
            </span>
          </motion.h1>

          {/* Animated title reveal */}
          <motion.h2
            className='text-2xl md:text-3xl font-light mb-8 text-gray-300'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Frontend Developer
          </motion.h2>

          {/* Animated description */}
          <motion.p
            className='text-lg md:text-xl max-w-2xl mb-10 text-gray-400'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Senior Frontend Developer with 6+ years of experience building responsive, user-friendly
            web applications
            <br />
            <span className='text-primary'>Based in Iran</span> • Available for remote opportunities
            worldwide
          </motion.p>

          {/* Call-to-action buttons */}
          <motion.div
            className='flex flex-wrap justify-center gap-4 mb-12'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <MagneticButton className='glass px-8 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-primary/20 transition-all duration-300 group'>
              <FiDownload className='group-hover:animate-bounce' />
              Download Resume
            </MagneticButton>
            <MagneticButton className='px-8 py-3 rounded-full font-medium bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 transition-all duration-300'>
              View Projects
            </MagneticButton>
          </motion.div>

          {/* Social links */}
          <motion.div
            className='flex gap-6'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[FiLinkedin, FiGithub, FiTwitter, FiMail].map((Icon, index) => (
              <MagneticButton
                key={index}
                href='#'
                className='glass w-12 h-12 rounded-full flex items-center justify-center hover:bg-primary/20 transition-all duration-300 group'
              >
                <Icon className='text-xl group-hover:scale-110 transition-transform duration-300' />
              </MagneticButton>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
