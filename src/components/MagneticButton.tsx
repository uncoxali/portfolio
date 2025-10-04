'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function MagneticButton({
  children,
  className = '',
  strength = 0.2,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  [key: string]: any;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setPosition({ x: (x - centerX) * strength, y: (y - centerY) * strength });
  };

  const resetPosition = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleHover = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouse}
      onMouseLeave={resetPosition}
      onMouseEnter={handleHover}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      whileHover={{
        scale: isHovered ? 1.05 : 1,
      }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
