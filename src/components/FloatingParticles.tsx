'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;
      originalSize: number;
      angle: number;
      va: number; // velocity of angle
      oscillation: number;

      constructor(canvas: HTMLCanvasElement) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.originalSize = Math.random() * 3 + 1;
        this.size = this.originalSize;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = `hsl(${Math.random() * 60 + 220}, 70%, 60%)`;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.angle = 0;
        this.va = Math.random() * 0.05 - 0.025;
        this.oscillation = Math.random() * 10;
      }

      update(canvas: HTMLCanvasElement) {
        this.x += this.speedX;
        this.y += this.speedY;
        this.angle += this.va;
        
        // Oscillation effect
        this.x += Math.sin(this.angle) * 0.5;
        this.y += Math.cos(this.angle) * 0.5;

        // Bounce off edges
        if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
        if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;

        // Mouse interaction
        const dx = this.x - mousePosition.x;
        const dy = this.y - mousePosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const force = (100 - distance) / 100;
          this.x += dx * force * 0.05;
          this.y += dy * force * 0.05;
        }

        // Pulsing effect
        this.size = this.originalSize + Math.sin(Date.now() / 1000 + this.oscillation) * 0.5;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        
        // Draw different shapes
        if (this.originalSize > 2.5) {
          // Circle
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        } else if (this.originalSize > 1.5) {
          // Square
          ctx.rect(this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
        } else {
          // Triangle
          ctx.moveTo(this.x, this.y - this.size);
          ctx.lineTo(this.x - this.size, this.y + this.size);
          ctx.lineTo(this.x + this.size, this.y + this.size);
        }
        
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    // Create particles
    const particles: Particle[] = [];
    const particleCount = Math.min(150, Math.floor((window.innerWidth * window.innerHeight) / 5000));

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas));
    }

    // Connect nearby particles
    const connectParticles = () => {
      if (!ctx) return;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const opacity = (1 - distance / 100) * 0.2;
            ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop
    let animationFrameId: number;
    
    const animate = () => {
      if (!ctx || !canvas || !isActive) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections first
      connectParticles();

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(canvas);
        particles[i].draw();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePosition, isActive]);

  // Toggle particle activity on click
  const toggleActivity = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        className='absolute top-0 left-0 w-full h-full pointer-events-none z-0'
      />
      {/* Hidden toggle button for debugging */}
      <button 
        onClick={toggleActivity}
        className='hidden'
        aria-label="Toggle particles"
      />
    </>
  );
}