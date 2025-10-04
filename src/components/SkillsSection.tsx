'use client';

import { motion } from 'framer-motion';

export default function SkillsSection() {
  const skills = [
    { name: 'React', level: 95 },
    { name: 'Next.js', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'JavaScript', level: 90 },
    { name: 'HTML/CSS', level: 95 },
    { name: 'Tailwind CSS', level: 85 },
    { name: 'Material UI', level: 80 },
    { name: 'Redux', level: 85 },
    { name: 'GraphQL', level: 80 },
    { name: 'REST API', level: 90 },
    { name: 'Shopify', level: 85 },
    { name: 'WordPress', level: 75 },
  ];

  return (
    <section id='skills' className='py-20 px-4 bg-dark-card relative overflow-hidden'>
      {/* Background elements */}
      <div className='absolute top-0 left-0 w-full h-full pointer-events-none'>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl'></div>
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl'></div>
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
            My Skills
          </h2>
          <p className='text-gray-400 max-w-2xl mx-auto mb-6'>
            Technologies and tools I specialize in
          </p>
          <div className='w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full'></div>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: 'easeOut',
              }}
              whileHover={{ y: -10 }}
              className='bg-dark-bg/40 backdrop-blur-lg rounded-2xl p-6 border border-gray-800/50 hover:border-primary/30 transition-all duration-300 group'
            >
              <div className='flex justify-between items-start mb-4'>
                <h3 className='text-xl font-bold text-white group-hover:text-primary transition-colors'>
                  {skill.name}
                </h3>
                <span className='text-lg font-bold text-primary'>{skill.level}%</span>
              </div>

              <div className='relative h-3 bg-gray-800 rounded-full overflow-hidden'>
                <motion.div
                  className='absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-secondary rounded-full'
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.5,
                    delay: index * 0.1 + 0.3,
                    ease: 'easeOut',
                  }}
                />

                {/* Animated glow effect */}
                <motion.div
                  className='absolute top-0 left-0 h-full w-1/3 bg-white/20 rounded-full blur-sm'
                  initial={{ x: '-100%' }}
                  whileInView={{ x: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 2,
                    delay: index * 0.1 + 1,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                  }}
                />
              </div>

              {/* Skill level indicators */}
              <div className='flex justify-between mt-3 text-xs text-gray-500'>
                <span>Beginner</span>
                <span>Expert</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
