'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGlobe } from 'react-icons/fi';

export default function LanguageSwitcher() {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fa', name: 'Persian', flag: '🇮🇷' },
  ];

  useEffect(() => {
    // Check stored language preference
    const storedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(storedLanguage);
  }, []);

  const switchLanguage = (languageCode: string) => {
    setCurrentLanguage(languageCode);
    localStorage.setItem('language', languageCode);
    setIsOpen(false);

    // In a real implementation, you would trigger a language change
    // For now, we'll just show an alert
    alert(`Language switched to ${languages.find((lang) => lang.code === languageCode)?.name}`);
  };

  return (
    <div className='relative'>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className='glass w-12 h-12 rounded-full flex items-center justify-center text-gray-400 hover:text-primary transition-colors duration-300'
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label='Switch language'
      >
        <FiGlobe className='text-xl' />
      </motion.button>

      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-40'
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className='absolute right-0 top-14 glass rounded-xl p-2 z-50 min-w-[150px]'
          >
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => switchLanguage(language.code)}
                className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-left transition-colors ${
                  currentLanguage === language.code
                    ? 'bg-primary/20 text-primary'
                    : 'hover:bg-gray-700/50'
                }`}
              >
                <span>{language.flag}</span>
                <span>{language.name}</span>
              </button>
            ))}
          </motion.div>
        </>
      )}
    </div>
  );
}
