'use client';

import { motion } from 'framer-motion';
import TextReveal from '@/components/TextReveal';

export default function AboutSection() {
  return (
    <section id='about' className='py-20 px-4'>
      <div className='container mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className='text-center mb-16'
        >
          <h2 className='text-4xl font-bold mb-4'>About Me</h2>
          <div className='w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto'></div>
        </motion.div>

        <div className='grid gap-12 items-center'>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className='text-2xl font-semibold mb-4'>Professional Summary</h3>
            <TextReveal
              text='Senior Frontend Developer with 6+ years of experience building responsive, user-friendly web applications using modern technologies like React, Next.js, and TypeScript. Passionate about creating exceptional digital experiences with clean, efficient code.'
              className='text-gray-400 mb-6'
              delay={0.2}
            />
            <TextReveal
              text='Experienced in working with international teams across Iran, Turkey, Germany, and Canada. Skilled in both frontend development and UI/UX design principles to deliver high-quality solutions that meet business requirements.'
              className='text-gray-400 mb-6'
              delay={0.4}
            />
            <div className='grid grid-cols-2 gap-4 mb-6'>
              <div className='glass p-4 rounded-lg'>
                <div className='text-primary font-bold text-xl'>6+</div>
                <div className='text-gray-400 text-sm'>Years Experience</div>
              </div>
              <div className='glass p-4 rounded-lg'>
                <div className='text-primary font-bold text-xl'>50+</div>
                <div className='text-gray-400 text-sm'>Projects</div>
              </div>
              <div className='glass p-4 rounded-lg'>
                <div className='text-primary font-bold text-xl'>4</div>
                <div className='text-gray-400 text-sm'>Countries</div>
              </div>
              <div className='glass p-4 rounded-lg'>
                <div className='text-primary font-bold text-xl'>10+</div>
                <div className='text-gray-400 text-sm'>Technologies</div>
              </div>
            </div>
            <div className='flex flex-wrap gap-4'>
              {[
                'Frontend Development',
                'UI/UX Design',
                'Performance Optimization',
                'Team Mentorship',
              ].map((item, index) => (
                <div key={index} className='glass px-4 py-2 rounded-full text-sm'>
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
