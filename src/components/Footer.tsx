'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FiLinkedin,
  FiGithub,
  FiTwitter,
  FiMail,
  FiHeart,
  FiCoffee,
  FiCode,
  FiGlobe,
  FiMapPin,
  FiPhone,
} from 'react-icons/fi';

export default function Footer() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Simulate visitor count
    setVisitorCount(Math.floor(Math.random() * 1000) + 500);

    return () => clearInterval(timer);
  }, []);

  const socialLinks = [
    {
      Icon: FiLinkedin,
      href: 'https://www.linkedin.com/in/ali-mohammadi20',
      label: 'LinkedIn',
      color: 'hover:text-blue-500',
    },
    {
      Icon: FiGithub,
      href: 'https://github.com/alimohamadi',
      label: 'GitHub',
      color: 'hover:text-gray-300',
    },
    {
      Icon: FiTwitter,
      href: 'https://twitter.com/alimohamadi',
      label: 'Twitter',
      color: 'hover:text-blue-400',
    },
    {
      Icon: FiMail,
      href: 'mailto:alif.mohamady20@gmail.com',
      label: 'Email',
      color: 'hover:text-red-500',
    },
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className='py-10 px-4 border-t border-gray-800 relative overflow-hidden'>
      {/* Background elements */}
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-b from-dark-bg to-primary/5'></div>
      </div>

      <div className='container mx-auto relative z-10'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Brand section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className='md:col-span-1'
          >
            <div className='text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-4'>
              Ali Mohammadi
            </div>
            <p className='text-gray-400 mb-4'>
              Crafting exceptional digital experiences with modern web technologies.
            </p>
            <div className='flex gap-2 text-sm text-gray-500'>
              <span>Built with</span>
              <span className='text-primary flex items-center gap-1'>
                <FiCode className='text-xs' /> Next.js
              </span>
              <span>•</span>
              <span className='text-secondary flex items-center gap-1'>
                <FiGlobe className='text-xs' /> Framer Motion
              </span>
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className='md:col-span-1'
          >
            <h3 className='text-lg font-semibold mb-4'>Quick Links</h3>
            <ul className='space-y-2'>
              {quickLinks.map((link, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <a
                    href={link.href}
                    className='text-gray-400 hover:text-primary transition-colors flex items-center gap-2'
                  >
                    <span className='w-1 h-1 rounded-full bg-primary'></span>
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='md:col-span-1'
          >
            <h3 className='text-lg font-semibold mb-4'>Contact Info</h3>
            <div className='space-y-3'>
              <div className='flex items-center gap-2 text-gray-400'>
                <FiMail className='text-primary' />
                <span>alif.mohamady20@gmail.com</span>
              </div>
              <div className='flex items-center gap-2 text-gray-400'>
                <FiPhone className='text-primary' />
                <span>+98 910 486 6595</span>
              </div>
              <div className='flex items-center gap-2 text-gray-400'>
                <FiMapPin className='text-primary' />
                <span>Tehran, Iran</span>
              </div>
              <div className='flex items-center gap-2 text-gray-400'>
                <FiCoffee className='text-primary' />
                <span>Open to remote work</span>
              </div>
            </div>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className='md:col-span-1'
          >
            <h3 className='text-lg font-semibold mb-4'>Connect With Me</h3>
            <div className='flex gap-4 mb-4'>
              {socialLinks.map(({ Icon, href, label, color }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={label}
                  className={`glass w-12 h-12 rounded-full flex items-center justify-center text-gray-400 ${color} transition-colors duration-300`}
                  whileHover={{
                    y: -5,
                    backgroundColor: 'rgba(99, 102, 241, 0.2)',
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className='text-xl' />
                </motion.a>
              ))}
            </div>
            <div className='text-gray-500 text-sm flex items-center gap-2'>
              <FiHeart className='text-red-500' />
              <span>{visitorCount}+ visitors</span>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          className='h-px bg-gradient-to-r from-transparent via-primary to-transparent my-8'
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
        />

        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className='flex flex-col md:flex-row justify-between items-center gap-4'
        >
          <div className='text-gray-500 text-sm'>
            <p>© {new Date().getFullYear()} Ali Mohammadi. All rights reserved.</p>
          </div>
          <div className='text-gray-500 text-sm flex flex-wrap items-center gap-4'>
            <p>Current Time: {currentTime.toLocaleTimeString()}</p>
            <p className='flex items-center gap-1'>
              Made with <FiHeart className='inline text-red-500' /> and lots of{' '}
              <FiCoffee className='inline text-yellow-500' />
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
