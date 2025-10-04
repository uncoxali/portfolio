'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiX } from 'react-icons/fi';

export default function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return;
    }

    const handler = (e: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      setShowInstallBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handler as any);

    return () => window.removeEventListener('beforeinstallprompt', handler as any);
  }, []);

  const installApp = () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      setDeferredPrompt(null);
      setShowInstallBanner(false);
    });
  };

  const closeBanner = () => {
    setShowInstallBanner(false);
  };

  if (!showInstallBanner) return null;

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
            <FiDownload className='text-primary text-xl mt-1 flex-shrink-0' />
            <div>
              <h3 className='font-semibold text-lg mb-1'>Install Portfolio App</h3>
              <p className='text-gray-400 text-sm'>
                Install this application on your device for a better experience.
              </p>
            </div>
          </div>
          
          <div className='flex gap-3'>
            <button
              onClick={closeBanner}
              className='px-4 py-2 text-gray-400 hover:text-white transition-colors'
            >
              Later
            </button>
            <button
              onClick={installApp}
              className='px-4 py-2 bg-primary hover:bg-primary/80 text-white rounded-lg transition-colors flex items-center gap-2'
            >
              <FiDownload />
              Install
            </button>
          </div>
          
          <button
            onClick={closeBanner}
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