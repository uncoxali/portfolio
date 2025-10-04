'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TextReveal from '@/components/TextReveal';

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState('summary');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const tabs = [
    { id: 'summary', label: 'Professional Summary' },
    { id: 'approach', label: 'My Approach' },
    { id: 'philosophy', label: 'Philosophy' },
  ];

  const content = {
    summary: {
      title: 'Professional Summary',
      text: 'Senior Frontend Developer with 6+ years of experience building responsive, user-friendly web applications using modern technologies like React, Next.js, and TypeScript. Passionate about creating exceptional digital experiences with clean, efficient code.',
      additionalText:
        'Experienced in working with international teams across Iran, Turkey, Germany, and Canada. Skilled in both frontend development and UI/UX design principles to deliver high-quality solutions that meet business requirements. Specialized in creating performant, accessible, and scalable web applications that provide seamless user experiences across all devices.',
    },
    approach: {
      title: 'My Approach',
      text: 'I believe in building products that not only look great but also solve real problems. My approach combines technical excellence with user-centered design principles to create solutions that are both functional and beautiful.',
      additionalText:
        'I focus on writing maintainable, scalable code while staying up-to-date with the latest industry trends and best practices. Collaboration and communication are key to delivering successful projects. I work closely with designers, backend developers, and stakeholders to ensure alignment and deliver exceptional results.',
    },
    philosophy: {
      title: 'Development Philosophy',
      text: 'Code is poetry, and every line should be written with intention. I strive to create clean, efficient solutions that stand the test of time while being easy to maintain and extend.',
      additionalText:
        'Continuous learning and improvement are at the core of my philosophy. I believe in pushing boundaries while maintaining a strong foundation in fundamentals. I embrace challenges as opportunities to grow and always strive to deliver more than expected.',
    },
  };

  return (
    <section id='about' className='py-20 px-4 relative overflow-hidden'>
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
            About Me
          </h2>
          <div className='w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full'></div>
        </motion.div>

        <div className='max-w-4xl mx-auto'>
          {/* Tab navigation */}
          <div className='flex flex-wrap justify-center gap-2 mb-12'>
            {tabs.map((tab, index) => (
              <motion.button
                key={tab.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30'
                    : 'glass text-gray-300 hover:text-white hover:bg-primary/10'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* Tab content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='glass p-8 rounded-2xl'
          >
            <h3 className='text-2xl font-semibold mb-6 text-primary'>
              {content[activeTab as keyof typeof content].title}
            </h3>
            <TextReveal
              text={content[activeTab as keyof typeof content].text}
              className='text-gray-300 mb-6 text-lg'
              delay={0.2}
            />
            <TextReveal
              text={content[activeTab as keyof typeof content].additionalText}
              className='text-gray-400 mb-6'
              delay={0.4}
            />
          </motion.div>

          {/* Stats section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-12'
          >
            {[
              { value: '6+', label: 'Years Experience' },
              { value: '50+', label: 'Projects Completed' },
              { value: '4', label: 'Countries Worked' },
              { value: '10+', label: 'Technologies Mastered' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className='glass p-6 rounded-xl text-center'
              >
                <div className='text-3xl font-bold text-primary mb-2'>{stat.value}</div>
                <div className='text-gray-400 text-sm'>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Skills tags */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className='flex flex-wrap justify-center gap-3 mt-12'
          >
            {[
              'Frontend Development',
              'UI/UX Design',
              'Performance Optimization',
              'Team Mentorship',
              'Responsive Design',
              'Cross-browser Compatibility',
              'Agile Methodology',
              'Code Review',
              'Accessibility',
              'Testing',
              'CI/CD',
              'Problem Solving',
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.8 + index * 0.05 }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: 'rgba(99, 102, 241, 0.2)',
                }}
                className='glass px-4 py-2 rounded-full text-sm'
              >
                {item}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
