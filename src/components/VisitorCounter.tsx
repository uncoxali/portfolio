'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiEye } from 'react-icons/fi';

export default function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState(0);

  useEffect(() => {
    // Simulate visitor count from localStorage or generate a random count
    const storedCount = localStorage.getItem('visitorCount');
    if (storedCount) {
      setVisitorCount(parseInt(storedCount, 10));
    } else {
      // Generate a random count between 500-1500 for demo purposes
      const initialCount = Math.floor(Math.random() * 1000) + 500;
      setVisitorCount(initialCount);
      localStorage.setItem('visitorCount', initialCount.toString());
    }

    // Simulate online users
    setOnlineUsers(Math.floor(Math.random() * 50) + 10);

    // Update visitor count
    const updateVisitorCount = () => {
      setVisitorCount(prev => {
        const newCount = prev + 1;
        localStorage.setItem('visitorCount', newCount.toString());
        return newCount;
      });
    };

    // Update visitor count on first visit
    updateVisitorCount();

    // Update online users periodically
    const onlineUsersInterval = setInterval(() => {
      setOnlineUsers(prev => {
        const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
        return Math.max(1, prev + change);
      });
    }, 10000);

    return () => {
      clearInterval(onlineUsersInterval);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='fixed bottom-4 left-4 glass rounded-full px-4 py-2 flex items-center gap-2 text-sm z-40'
    >
      <div className='flex items-center gap-1'>
        <FiEye className='text-primary' />
        <span>{visitorCount.toLocaleString()}+</span>
      </div>
      <div className='w-px h-4 bg-gray-600'></div>
      <div className='flex items-center gap-1'>
        <FiUsers className='text-green-500' />
        <span>{onlineUsers} online</span>
      </div>
    </motion.div>
  );
}