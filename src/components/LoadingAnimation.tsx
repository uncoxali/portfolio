'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCoffee, FiStar, FiHexagon } from 'react-icons/fi';

export default function LoadingAnimation() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentEmoji, setCurrentEmoji] = useState(0);

  const emojis = ['☕', '💻', '🚀', '✨', '🎨', '🔧'];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Cycle through emojis
    const emojiInterval = setInterval(() => {
      setCurrentEmoji(prev => (prev + 1) % emojis.length);
    }, 300);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
      clearInterval(emojiInterval);
    };
  }, [emojis.length]);

  if (!isLoading) return null;

  return (
    <div className='fixed inset-0 bg-dark-bg z-50 flex items-center justify-center'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='text-center w-full max-w-md px-4'
      >
        {/* Animated logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 0.8,
            ease: "easeOut"
          }}
          className='relative mb-12'
        >
          <div className='w-32 h-32 mx-auto relative'>
            {/* Outer ring */}
            <motion.div
              className='absolute inset-0 border-4 border-primary rounded-full'
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            
            {/* Middle ring */}
            <motion.div
              className='absolute inset-4 border-4 border-secondary rounded-full'
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, -180, -360],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5
              }}
            />
            
            {/* Inner ring */}
            <motion.div
              className='absolute inset-8 border-4 border-yellow-400 rounded-full'
              animate={{
                scale: [1, 1.15, 1],
                rotate: [0, 90, 180],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1
              }}
            />
            
            {/* Center content */}
            <div className='absolute inset-12 flex items-center justify-center'>
              <span className='text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary'>
                AM
              </span>
            </div>
            
            {/* Floating elements */}
            <motion.div
              className='absolute -top-4 -right-4 text-yellow-400'
              animate={{
                y: [0, -10, 0],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <FiStar className='text-2xl' />
            </motion.div>
            
            <motion.div
              className='absolute -bottom-4 -left-4 text-primary'
              animate={{
                y: [0, 10, 0],
                rotate: [0, -10, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              <FiHexagon className='text-2xl' />
            </motion.div>
          </div>
        </motion.div>

        {/* Loading text */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className='text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-8'
        >
          Ali Mohammadi
        </motion.h2>

        {/* Animated subtitle */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className='text-gray-400 mb-8 flex items-center justify-center gap-2'
        >
          <span className='text-2xl'>{emojis[currentEmoji]}</span>
          <span>Crafting digital experiences...</span>
        </motion.p>

        {/* Progress bar */}
        <div className='mb-6'>
          <div className='flex justify-between text-sm text-gray-400 mb-2'>
            <span>Loading portfolio...</span>
            <span>{progress}%</span>
          </div>
          <div className='h-2 bg-gray-800 rounded-full overflow-hidden'>
            <motion.div
              className='h-full bg-gradient-to-r from-primary to-secondary rounded-full'
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Animated dots */}
        <div className='flex justify-center gap-2'>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className='w-3 h-3 bg-primary rounded-full'
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}