'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorInnerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [clickEffect, setClickEffect] = useState(false);
  const [cursorVariant, setCursorVariant] = useState('default');
  const positionRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    // Show cursor
    setIsVisible(true);

    // Throttle mouse move events for better performance
    let ticking = false;

    const moveCursor = (e: MouseEvent) => {
      positionRef.current = { x: e.clientX, y: e.clientY };

      if (!ticking) {
        animationFrameRef.current = requestAnimationFrame(() => {
          if (cursorRef.current) {
            cursorRef.current.style.left = `${positionRef.current.x}px`;
            cursorRef.current.style.top = `${positionRef.current.y}px`;
          }

          if (cursorInnerRef.current) {
            // Add slight delay for trailing effect without setTimeout
            const delayedX =
              positionRef.current.x -
              (positionRef.current.x - parseFloat(cursorInnerRef.current.style.left || '0')) * 0.3;
            const delayedY =
              positionRef.current.y -
              (positionRef.current.y - parseFloat(cursorInnerRef.current.style.top || '0')) * 0.3;

            cursorInnerRef.current.style.left = `${delayedX}px`;
            cursorInnerRef.current.style.top = `${delayedY}px`;
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    const handleMouseDown = () => {
      setClickEffect(true);
      if (cursorRef.current) {
        cursorRef.current.style.transform = 'scale(0.7)';
      }
      if (cursorInnerRef.current) {
        cursorInnerRef.current.style.transform = 'scale(0.7)';
      }
    };

    const handleMouseUp = () => {
      setClickEffect(false);
      if (cursorRef.current) {
        cursorRef.current.style.transform = 'scale(1)';
      }
      if (cursorInnerRef.current) {
        cursorInnerRef.current.style.transform = 'scale(1)';
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check for different types of interactive elements
      if (target.closest('button, a, .cursor-hover, input, textarea')) {
        setIsHovering(true);
        setCursorVariant('hover');
      } else if (target.closest('.cursor-drag')) {
        setIsHovering(true);
        setCursorVariant('drag');
      } else if (target.closest('.cursor-text')) {
        setIsHovering(true);
        setCursorVariant('text');
      } else {
        setIsHovering(false);
        setCursorVariant('default');
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
      setCursorVariant('default');
    };

    document.addEventListener('mousemove', moveCursor, { passive: true });
    document.addEventListener('mousedown', handleMouseDown, { passive: true });
    document.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  // Cursor variants
  const cursorVariants = {
    default: {
      width: '40px',
      height: '40px',
      borderWidth: '2px',
      borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    hover: {
      width: '60px',
      height: '60px',
      borderWidth: '2px',
      borderColor: '#6366f1',
    },
    drag: {
      width: '50px',
      height: '50px',
      borderWidth: '2px',
      borderColor: '#8b5cf6',
    },
    text: {
      width: '4px',
      height: '24px',
      borderWidth: '1px',
      borderColor: '#6366f1',
      borderRadius: '2px',
    },
  };

  const innerCursorVariants = {
    default: {
      width: '8px',
      height: '8px',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    hover: {
      width: '0px',
      height: '0px',
      backgroundColor: 'transparent',
    },
    drag: {
      width: '0px',
      height: '0px',
      backgroundColor: 'transparent',
    },
    text: {
      width: '0px',
      height: '0px',
      backgroundColor: 'transparent',
    },
  };

  return (
    <>
      {/* Outer cursor ring */}
      <motion.div
        ref={cursorRef}
        className='fixed top-0 left-0 rounded-full pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out'
        style={{ mixBlendMode: 'difference' }}
        variants={cursorVariants}
        animate={cursorVariant}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />

      {/* Inner cursor dot */}
      <motion.div
        ref={cursorInnerRef}
        className='fixed top-0 left-0 rounded-full pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-100 ease-out'
        style={{ mixBlendMode: 'difference' }}
        variants={innerCursorVariants}
        animate={cursorVariant}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />

      {/* Click effect */}
      {clickEffect && (
        <motion.div
          className='fixed top-0 left-0 rounded-full border-2 border-primary pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2'
          style={{
            mixBlendMode: 'difference',
            left: `${positionRef.current.x}px`,
            top: `${positionRef.current.y}px`,
          }}
          initial={{ scale: 0.5, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Special hover effects */}
      {isHovering && cursorVariant === 'hover' && (
        <>
          <motion.div
            className='fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-49'
            style={{
              left: `${positionRef.current.x}px`,
              top: `${positionRef.current.y}px`,
            }}
            initial={{ scale: 0, x: -10, y: -10 }}
            animate={{ scale: 1, x: -15, y: -15 }}
            transition={{ duration: 0.2 }}
          />
          <motion.div
            className='fixed top-0 left-0 w-2 h-2 bg-secondary rounded-full pointer-events-none z-49'
            style={{
              left: `${positionRef.current.x}px`,
              top: `${positionRef.current.y}px`,
            }}
            initial={{ scale: 0, x: 10, y: -10 }}
            animate={{ scale: 1, x: 15, y: -15 }}
            transition={{ duration: 0.2, delay: 0.1 }}
          />
        </>
      )}
    </>
  );
}
