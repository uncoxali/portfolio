'use client';

import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FiDownload, FiLinkedin, FiGithub, FiTwitter, FiMail, FiCoffee, FiChevronDown } from 'react-icons/fi';
import MagneticButton from '@/components/MagneticButton';

export default function HeroSection() {
  const [isMounted, setIsMounted] = useState(false);
  const controls = useAnimation();
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    });

    // Show scroll indicator after a delay
    const timer = setTimeout(() => {
      setShowScrollIndicator(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Function to scroll to about section
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
      {/* Animated gradient background */}
      <div className='absolute inset-0 z-0'>
        <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 via-secondary/10 to-dark-bg'></div>
        <motion.div 
          className='absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl'
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-3xl'
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      {/* Floating elements */}
      <FloatingElements />

      <div className='container mx-auto px-4 z-10'>
        <motion.div 
          className='flex flex-col items-center text-center'
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
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

          {/* Animated title reveal with typing effect */}
          <motion.div
            className='text-2xl md:text-3xl font-light mb-8 text-gray-300 h-12'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <TypingEffect 
              texts={[
                "Senior Frontend Developer",
                "UI/UX Enthusiast",
                "React Specialist",
                "Problem Solver"
              ]} 
            />
          </motion.div>

          {/* Animated description */}
          <motion.p
            className='text-lg md:text-xl max-w-2xl mb-10 text-gray-400'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Crafting exceptional digital experiences with modern web technologies
            <br />
            <span className='text-primary'>Based in Tehran, Iran</span> • Available for remote opportunities
            worldwide
          </motion.p>

          {/* Call-to-action buttons */}
          <motion.div
            className='flex flex-wrap justify-center gap-4 mb-12'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <MagneticButton 
              className='glass px-8 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-primary/20 transition-all duration-300 group'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiDownload className='group-hover:animate-bounce' />
              Download Resume
            </MagneticButton>
            <MagneticButton 
              className='px-8 py-3 rounded-full font-medium bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 transition-all duration-300'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </MagneticButton>
          </motion.div>

          {/* Social links with enhanced animations */}
          <motion.div
            className='flex gap-6'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              { Icon: FiLinkedin, href: 'https://www.linkedin.com/in/ali-mohammadi20', label: 'LinkedIn' },
              { Icon: FiGithub, href: 'https://github.com/alimohamadi', label: 'GitHub' },
              { Icon: FiTwitter, href: 'https://twitter.com/alimohamadi', label: 'Twitter' },
              { Icon: FiMail, href: 'mailto:alif.mohamady20@gmail.com', label: 'Email' }
            ].map(({ Icon, href, label }, index) => (
              <MagneticButton
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className='glass w-14 h-14 rounded-full flex items-center justify-center hover:bg-primary/20 transition-all duration-300 group'
                whileHover={{ 
                  y: -5,
                  backgroundColor: "rgba(99, 102, 241, 0.2)"
                }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon className='text-xl group-hover:scale-110 transition-transform duration-300' />
              </MagneticButton>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced scroll indicator */}
      {showScrollIndicator && (
        <motion.div
          className='absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          onClick={scrollToAbout}
        >
          <div className='flex flex-col items-center gap-2 text-gray-400 hover:text-primary transition-colors'>
            <span className='text-sm'>Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <FiChevronDown className='text-2xl' />
            </motion.div>
          </div>
        </motion.div>
      )}
    </section>
  );
}

// Typing effect component
function TypingEffect({ texts }: { texts: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const current = texts[currentIndex];
      
      if (isDeleting) {
        // Deleting text
        setCurrentText(current.substring(0, currentText.length - 1));
        setTypingSpeed(100);
      } else {
        // Typing text
        setCurrentText(current.substring(0, currentText.length + 1));
        setTypingSpeed(150);
      }

      // If text is fully typed
      if (!isDeleting && currentText === current) {
        setTimeout(() => setIsDeleting(true), 1000);
        return;
      }

      // If text is deleted
      if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentIndex((currentIndex + 1) % texts.length);
        setTypingSpeed(500);
        return;
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentIndex, texts, typingSpeed]);

  return (
    <span>
      {currentText}
      <span className="ml-1 inline-block w-1 h-8 bg-primary align-middle animate-pulse"></span>
    </span>
  );
}

// Floating elements component
function FloatingElements() {
  return (
    <>
      {/* Floating coffee cup */}
      <motion.div
        className='absolute top-1/4 left-10 text-primary opacity-20'
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <FiCoffee className='text-4xl' />
      </motion.div>

      {/* Floating star */}
      <motion.div
        className='absolute bottom-1/4 right-10 text-yellow-400 opacity-30'
        animate={{
          y: [0, -15, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </motion.div>

      {/* Floating hexagon */}
      <motion.div
        className='absolute top-1/3 right-1/4 text-secondary opacity-20'
        animate={{
          y: [0, -10, 0],
          rotate: [0, 15, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </motion.div>
    </>
  );
}