'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // Check system preference
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedPreference = localStorage.getItem('darkMode');
    
    if (storedPreference !== null) {
      setDarkMode(storedPreference === 'true');
    } else {
      setDarkMode(systemPrefersDark);
    }
  }, []);

  useEffect(() => {
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Save preference
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <motion.button
      onClick={toggleDarkMode}
      className='glass w-12 h-12 rounded-full flex items-center justify-center text-gray-400 hover:text-primary transition-colors duration-300'
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? (
        <FiSun className='text-xl' />
      ) : (
        <FiMoon className='text-xl' />
      )}
    </motion.button>
  );
}