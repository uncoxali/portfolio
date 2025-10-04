'use client';

import { useState, useEffect } from 'react';

export default function ScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div className='fixed top-0 left-0 right-0 h-1 z-50 pointer-events-none'>
      <div
        className='h-full bg-gradient-to-r from-primary to-secondary'
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
