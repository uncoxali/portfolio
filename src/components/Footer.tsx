'use client';

import { motion } from 'framer-motion';
import { FiLinkedin, FiGithub, FiTwitter, FiMail } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className='py-10 px-4 border-t border-gray-800'>
      <div className='container mx-auto'>
        <div className='flex flex-col md:flex-row justify-between items-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className='text-center md:text-left mb-6 md:mb-0'
          >
            <div className='text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-2'>
              Ali Mohammadi
            </div>
            <p className='text-gray-400'>Frontend Developer</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='flex gap-6 mb-6 md:mb-0'
          >
            {[FiLinkedin, FiGithub, FiTwitter, FiMail].map((Icon, index) => (
              <a
                key={index}
                href='#'
                className='text-gray-400 hover:text-primary transition-colors duration-300'
              >
                <Icon className='text-xl' />
              </a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className='text-center md:text-right'
          >
            <p className='text-gray-400'>
              © {new Date().getFullYear()} Ali Mohammadi. All rights reserved.
            </p>
            <p className='text-gray-500 text-sm mt-1'>Crafted with ❤️ and Next.js</p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
