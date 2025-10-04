'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
      
      // Hide scroll indicator when at top of page
      setIsVisible(scrollTop > 50);
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <motion.div 
      className='fixed top-0 left-0 right-0 h-1 z-50 pointer-events-none'
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className='h-full bg-gradient-to-r from-primary to-secondary'
        style={{ width: `${scrollProgress}%` }}
      />
      
      {/* Scroll to top button appears when scrolled down */}
      {scrollProgress > 10 && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className='glass fixed bottom-8 right-8 w-12 h-12 rounded-full flex items-center justify-center text-gray-400 hover:text-primary transition-colors duration-300 z-50'
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          aria-label='Scroll to top'
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </motion.button>
      )}
    </motion.div>
  );
}