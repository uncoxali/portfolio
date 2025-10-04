'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Show consent after a delay
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowConsent(false);
  };

  const rejectCookies = () => {
    localStorage.setItem('cookieConsent', 'false');
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      className='fixed bottom-0 left-0 right-0 glass p-4 z-50 border-t border-primary/30'
    >
      <div className='container mx-auto'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
          <div className='flex items-start gap-3'>
            <div className='text-primary text-xl mt-1 flex-shrink-0'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
            </div>
            <div>
              <h3 className='font-semibold text-lg mb-1'>Cookie Consent</h3>
              <p className='text-gray-400 text-sm'>
                This website uses cookies to enhance your browsing experience and analyze site traffic. 
                By clicking "Accept", you consent to our use of cookies.
              </p>
            </div>
          </div>
          
          <div className='flex gap-3'>
            <button
              onClick={rejectCookies}
              className='px-4 py-2 text-gray-400 hover:text-white transition-colors'
            >
              Reject
            </button>
            <button
              onClick={acceptCookies}
              className='px-4 py-2 bg-primary hover:bg-primary/80 text-white rounded-lg transition-colors'
            >
              Accept
            </button>
          </div>
          
          <button
            onClick={() => setShowConsent(false)}
            className='absolute top-2 right-2 text-gray-400 hover:text-white transition-colors'
            aria-label='Close'
          >
            <FiX />
          </button>
        </div>
      </div>
    </motion.div>
  );
}