'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function LoadingAnimation() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className='fixed inset-0 bg-dark-bg z-50 flex items-center justify-center'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='text-center'
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className='w-16 h-16 border-4 border-primary border-t-secondary rounded-full mx-auto mb-8'
        />
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className='text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary'
        >
          Ali Mohammadi
        </motion.h2>
      </motion.div>
    </div>
  );
}
