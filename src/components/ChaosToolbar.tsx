'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMousePointer, FiX, FiStar, FiCircle, FiHexagon } from 'react-icons/fi';

export default function ChaosToolbar() {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; type: string }>
  >([]);
  const [isToolbarVisible, setIsToolbarVisible] = useState(true);

  // Hide toolbar after 5 seconds of inactivity
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsToolbarVisible(false);
    }, 5000);

    const resetTimer = () => {
      clearTimeout(timer);
      setIsToolbarVisible(true);
      setTimeout(() => setIsToolbarVisible(false), 5000);
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('click', resetTimer);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('click', resetTimer);
    };
  }, []);

  const tools = [
    { id: 'grabber', icon: FiMousePointer, label: 'Grabber', color: 'text-blue-400' },
    { id: 'eraser', icon: FiStar, label: 'Eraser', color: 'text-yellow-400' },
    { id: 'bomb', icon: FiCircle, label: 'Bomb', color: 'text-red-400' },
    { id: 'wand', icon: FiHexagon, label: 'Wand', color: 'text-purple-400' },
  ];

  const handleToolClick = (toolId: string) => {
    setActiveTool(toolId === activeTool ? null : toolId);
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (!activeTool) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Create particles based on active tool
    if (activeTool === 'wand') {
      const newParticles: Array<{ id: number; x: number; y: number; type: string }> = [];
      const particleCount = 5 + Math.floor(Math.random() * 10);

      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: Date.now() + i,
          x: x + (Math.random() - 0.5) * 20,
          y: y + (Math.random() - 0.5) * 20,
          type: ['star', 'circle', 'sparkle'][Math.floor(Math.random() * 3)],
        });
      }

      setParticles((prev) => [...prev, ...newParticles]);

      // Remove particles after animation
      setTimeout(() => {
        setParticles((prev) => prev.slice(particleCount));
      }, 2000);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isToolbarVisible && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className='fixed top-1/2 right-4 z-50 bg-dark-card/80 backdrop-blur-lg rounded-2xl p-3 border border-gray-700/50 shadow-2xl'
          >
            <div className='flex flex-col gap-2'>
              {tools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <motion.button
                    key={tool.id}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleToolClick(tool.id)}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
                      activeTool === tool.id
                        ? `${tool.color} bg-primary/20 border-2 border-primary`
                        : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                    }`}
                    aria-label={tool.label}
                  >
                    <Icon className='text-xl' />
                  </motion.button>
                );
              })}

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsToolbarVisible(false)}
                className='w-12 h-12 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-200'
                aria-label='Close toolbar'
              >
                <FiX className='text-xl' />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click area for tools */}
      {activeTool && <div className='fixed inset-0 z-40 cursor-none' onClick={handleCanvasClick} />}

      {/* Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className='fixed w-2 h-2 z-45 pointer-events-none'
          initial={{
            x: particle.x,
            y: particle.y,
            scale: 0,
            opacity: 1,
          }}
          animate={{
            x: particle.x + (Math.random() - 0.5) * 100,
            y: particle.y + (Math.random() - 0.5) * 100,
            scale: [0, 1, 0],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 2,
            ease: 'easeOut',
          }}
        >
          {particle.type === 'star' && (
            <div className='w-full h-full bg-yellow-400 rounded-full rotate-45' />
          )}
          {particle.type === 'circle' && (
            <div className='w-full h-full bg-purple-400 rounded-full' />
          )}
          {particle.type === 'sparkle' && (
            <div className='w-full h-full bg-blue-400 rounded-full' />
          )}
        </motion.div>
      ))}

      {/* Active tool indicator */}
      {activeTool && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-dark-card/80 backdrop-blur-lg rounded-full px-4 py-2 text-sm text-gray-300 border border-gray-700/50'
        >
          Active: {tools.find((t) => t.id === activeTool)?.label}
        </motion.div>
      )}
    </>
  );
}
