'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const pathname = usePathname();
  const observerRef = useRef<IntersectionObserver | null>(null);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about' },
    { name: 'Skills', href: '/#skills' },
    { name: 'Experience', href: '/#experience' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Contact', href: '/#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Scrollspy functionality
  useEffect(() => {
    // Function to determine active section
    const getCurrentSection = () => {
      const sections = ['about', 'skills', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100; // Offset to detect section early

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element) {
          const offsetTop = element.offsetTop;
          if (scrollPosition >= offsetTop) {
            return sections[i];
          }
        }
      }
      return 'home';
    };

    // Update active section based on scroll position
    const handleScroll = () => {
      if (pathname === '/') {
        const currentSection = getCurrentSection();
        setActiveSection(currentSection);
      }
    };

    // Also check on load
    if (pathname === '/') {
      const currentSection = getCurrentSection();
      setActiveSection(currentSection);
    }

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    // If it's a hash link, scroll to the section
    if (href.startsWith('/#')) {
      const sectionId = href.substring(2); // Remove '/#' prefix
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(sectionId);
        // Update URL without page reload
        window.history.pushState(null, '', href);
      }
    } else {
      // For other links, use Next.js router
      window.location.href = href;
    }
  };

  // Determine if we're on the home page
  const isHomePage = pathname === '/';

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        className={`hidden md:flex fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-dark-bg/80 backdrop-blur-md py-4' : 'py-6'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className='container mx-auto px-4 flex justify-between items-center'>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className='text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary'
          >
            Ali M.
          </motion.div>

          <div className='flex gap-8'>
            {navItems.map((item, index) => {
              // Extract section name from hash link
              const sectionName = item.href.startsWith('/#')
                ? item.href.substring(2)
                : item.href === '/'
                ? 'home'
                : '';

              // Determine if this item should be active
              const isActive =
                isHomePage &&
                ((sectionName === '' && activeSection === 'home') ||
                  (sectionName !== '' && activeSection === sectionName));

              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`font-medium transition-colors duration-300 cursor-pointer relative py-2 ${
                      isActive ? 'text-primary' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <motion.div
                        className='absolute bottom-0 left-0 w-full h-0.5 bg-primary'
                        layoutId='navIndicator'
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    {!isActive && (
                      <div className='absolute bottom-0 left-0 w-0 h-0.5 bg-primary hover:w-full transition-all duration-300' />
                    )}
                  </a>
                </motion.div>
              );
            })}
          </div>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className='glass px-6 py-2 rounded-full font-medium hover:bg-primary/20 transition-all duration-300'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Hire Me
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <nav className='md:hidden fixed top-0 left-0 right-0 z-40 bg-dark-bg/80 backdrop-blur-md py-4'>
        <div className='container mx-auto px-4 flex justify-between items-center'>
          <div className='text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary'>
            Ali M.
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className='glass w-10 h-10 rounded-full flex flex-col items-center justify-center gap-1'
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <span
              className={`block w-5 h-0.5 bg-white transition-transform duration-300 ${
                isOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}
            ></span>
            <span
              className={`block w-5 h-0.5 bg-white transition-opacity duration-300 ${
                isOpen ? 'opacity-0' : 'opacity-100'
              }`}
            ></span>
            <span
              className={`block w-5 h-0.5 bg-white transition-transform duration-300 ${
                isOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}
            ></span>
          </button>
        </div>

        {/* Sidebar overlay */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className='fixed inset-0 bg-black/70 z-40 md:hidden'
                onClick={() => setIsOpen(false)}
              />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className='fixed top-0 right-0 h-full w-4/5 max-w-md bg-dark-card z-50 shadow-2xl overflow-hidden border-l border-primary/30'
              >
                {/* Background pattern */}
                <div className='absolute inset-0 bg-gradient-to-br from-dark-bg via-dark-bg/95 to-primary/10'></div>
                <div className='absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl -translate-y-32 translate-x-32'></div>
                <div className='absolute bottom-0 left-0 w-64 h-64 rounded-full bg-secondary/5 blur-3xl translate-y-32 -translate-x-32'></div>

                <div className='relative z-10 h-full flex flex-col'>
                  <div className='p-6 border-b border-gray-800'>
                    <div className='flex justify-between items-center'>
                      <div className='text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary'>
                        Ali Mohammadi
                      </div>
                      <button
                        onClick={() => setIsOpen(false)}
                        className='glass w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-all duration-300'
                        aria-label='Close menu'
                      >
                        <span className='text-2xl text-gray-300'>&times;</span>
                      </button>
                    </div>
                  </div>

                  <div className='flex-1 flex flex-col py-6 px-6'>
                    <nav className='flex-1'>
                      <ul className='space-y-2'>
                        {navItems.map((item) => {
                          // Extract section name from hash link
                          const sectionName = item.href.startsWith('/#')
                            ? item.href.substring(2)
                            : item.href === '/'
                            ? 'home'
                            : '';

                          // Determine if this item should be active
                          const isActive =
                            isHomePage &&
                            ((sectionName === '' && activeSection === 'home') ||
                              (sectionName !== '' && activeSection === sectionName));

                          return (
                            <li key={item.name}>
                              <a
                                href={item.href}
                                onClick={(e) => {
                                  handleNavClick(e, item.href);
                                  setIsOpen(false);
                                }}
                                className={`block py-4 px-4 rounded-xl font-medium text-lg transition-all duration-300 flex items-center justify-between ${
                                  isActive
                                    ? 'bg-primary/20 text-primary shadow-lg'
                                    : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                                }`}
                              >
                                <span>{item.name}</span>
                                {isActive && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className='w-2 h-2 rounded-full bg-primary'
                                  />
                                )}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </nav>

                    <div className='mt-auto pt-6 border-t border-gray-800'>
                      <motion.button
                        className='w-full py-4 px-6 bg-gradient-to-r from-primary to-secondary rounded-xl font-medium text-white hover:from-primary/80 hover:to-secondary/80 transition-all duration-300 shadow-lg shadow-primary/20'
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Hire Me
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
