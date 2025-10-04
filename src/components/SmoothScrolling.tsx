'use client';

import { ReactNode, useEffect } from 'react';

export default function SmoothScrolling({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Check if we're in browser environment
    if (typeof window === 'undefined') return;

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

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      return () => {
        lenis.destroy();
      };
    });
  }, []);

  return <>{children}</>;
}
