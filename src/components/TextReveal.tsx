'use client';

import { motion } from 'framer-motion';

export default function TextReveal({
  text,
  className = '',
  delay = 0,
  duration = 0.5,
  stagger = 0.05,
}: {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
}) {
  const words = text.split(' ');

  return (
    <div className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: duration,
            delay: delay + i * stagger,
            ease: 'easeOut',
          }}
          className='inline-block mr-2'
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}
