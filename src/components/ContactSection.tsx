'use client';

import { motion } from 'framer-motion';
import { FiLinkedin, FiGithub, FiTwitter, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';

export default function ContactSection() {
  return (
    <section id='contact' className='py-20 px-4 relative overflow-hidden'>
      {/* Background elements */}
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-primary/5 to-transparent'></div>
        <div className='absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-secondary/5 to-transparent'></div>
      </div>

      <div className='container mx-auto relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className='text-center mb-16'
        >
          <h2 className='text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary'>
            Get In Touch
          </h2>
          <div className='w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full'></div>
        </motion.div>

        <div className='grid md:grid-cols-2 gap-12 max-w-6xl mx-auto'>
          {/* Contact information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className='space-y-8'
          >
            <div>
              <h3 className='text-2xl font-semibold mb-6'>Let's Connect</h3>
              <p className='text-gray-400 mb-8'>
                I'm currently available for freelance work and open to new opportunities. Feel free
                to reach out if you want to collaborate or just say hello! You can contact me
                directly using the information below.
              </p>
            </div>

            {/* Contact details */}
            <div className='space-y-6'>
              <motion.div className='flex items-start group' whileHover={{ x: 5 }}>
                <div className='glass w-12 h-12 rounded-full flex items-center justify-center mr-4 group-hover:bg-primary/20 transition-colors flex-shrink-0'>
                  <FiMail className='text-primary text-xl' />
                </div>
                <div>
                  <p className='text-gray-400 text-sm'>Email</p>
                  <a
                    href='mailto:alif.mohamady20@gmail.com'
                    className='hover:text-primary transition-colors'
                  >
                    alif.mohamady20@gmail.com
                  </a>
                </div>
              </motion.div>

              <motion.div className='flex items-start group' whileHover={{ x: 5 }}>
                <div className='glass w-12 h-12 rounded-full flex items-center justify-center mr-4 group-hover:bg-primary/20 transition-colors flex-shrink-0'>
                  <FiPhone className='text-primary text-xl' />
                </div>
                <div>
                  <p className='text-gray-400 text-sm'>Phone</p>
                  <a href='tel:+989104866595' className='hover:text-primary transition-colors'>
                    +98 910 486 6595
                  </a>
                </div>
              </motion.div>

              <motion.div className='flex items-start group' whileHover={{ x: 5 }}>
                <div className='glass w-12 h-12 rounded-full flex items-center justify-center mr-4 group-hover:bg-primary/20 transition-colors flex-shrink-0'>
                  <FiMapPin className='text-primary text-xl' />
                </div>
                <div>
                  <p className='text-gray-400 text-sm'>Location</p>
                  <p className='text-gray-300'>Tehran, Iran (Remote Worldwide)</p>
                </div>
              </motion.div>

              <motion.div className='flex items-start group' whileHover={{ x: 5 }}>
                <div className='glass w-12 h-12 rounded-full flex items-center justify-center mr-4 group-hover:bg-primary/20 transition-colors flex-shrink-0'>
                  <FiLinkedin className='text-primary text-xl' />
                </div>
                <div>
                  <p className='text-gray-400 text-sm'>LinkedIn</p>
                  <a
                    href='https://www.linkedin.com/in/ali-mohammadi20'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='hover:text-primary transition-colors'
                  >
                    linkedin.com/in/ali-mohammadi20
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Social links */}
            <div>
              <h4 className='text-lg font-semibold mb-4'>Follow Me</h4>
              <div className='flex gap-4'>
                {[
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
                ].map(({ Icon, href, label, color }, index) => (
                  <motion.a
                    key={index}
                    href={href}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={label}
                    className={`glass w-12 h-12 rounded-full flex items-center justify-center text-gray-400 ${color} transition-colors duration-300 group`}
                    whileHover={{
                      y: -5,
                      backgroundColor: 'rgba(99, 102, 241, 0.2)',
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className='text-xl group-hover:scale-110 transition-transform duration-300' />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact instructions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className='glass rounded-2xl p-8 border border-gray-800/50'
          >
            <h3 className='text-2xl font-semibold mb-6'>Contact Me Directly</h3>
            <p className='text-gray-400 mb-6'>
              For the fastest response, please reach out to me directly via email or phone. I'm
              available for freelance projects and full-time opportunities.
            </p>

            <div className='space-y-4 mb-6'>
              <div className='flex items-center gap-3'>
                <FiMail className='text-primary text-xl' />
                <span>
                  <a
                    href='mailto:alif.mohamady20@gmail.com'
                    className='hover:text-primary transition-colors'
                  >
                    alif.mohamady20@gmail.com
                  </a>
                </span>
              </div>
              <div className='flex items-center gap-3'>
                <FiPhone className='text-primary text-xl' />
                <span>
                  <a href='tel:+989104866595' className='hover:text-primary transition-colors'>
                    +98 910 486 6595
                  </a>
                </span>
              </div>
            </div>

            <div className='bg-primary/10 border border-primary/30 rounded-lg p-4'>
              <p className='text-primary text-sm'>
                <strong>Note:</strong> I respond to all direct messages within 24 hours. For project
                inquiries, please include details about your requirements and timeline.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
