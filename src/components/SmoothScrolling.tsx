'use client';

import { ReactNode, useEffect, useRef } from 'react';

export default function SmoothScrolling({ children }: { children: ReactNode }) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    // Check if we're in browser environment
    if (typeof window === 'undefined') return;

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      // Don't initialize smooth scrolling if user prefers reduced motion
      return;
    }

    let cleanup: (() => void) | undefined;

    // Import Lenis dynamically
    import('lenis').then((lenisModule) => {
      const Lenis = lenisModule.default;

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      });

      lenisRef.current = lenis;

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      cleanup = () => {
        lenis.destroy();
      };
    });

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return <>{children}</>;
}