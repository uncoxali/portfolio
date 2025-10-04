'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiBarChart2, FiCode, FiDatabase, FiLayout } from 'react-icons/fi';

export default function SkillsSection() {
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const skills = [
    { name: 'React', level: 95, category: 'Frontend', icon: FiCode },
    { name: 'Next.js', level: 90, category: 'Frontend', icon: FiCode },
    { name: 'TypeScript', level: 85, category: 'Language', icon: FiCode },
    { name: 'JavaScript', level: 90, category: 'Language', icon: FiCode },
    { name: 'HTML/CSS', level: 95, category: 'Frontend', icon: FiLayout },
    { name: 'Tailwind CSS', level: 85, category: 'Styling', icon: FiLayout },
    { name: 'Material UI', level: 80, category: 'UI Library', icon: FiLayout },
    { name: 'Redux', level: 85, category: 'State Management', icon: FiDatabase },
    { name: 'GraphQL', level: 80, category: 'API', icon: FiDatabase },
    { name: 'REST API', level: 90, category: 'API', icon: FiDatabase },
    { name: 'Shopify', level: 85, category: 'E-commerce', icon: FiBarChart2 },
    { name: 'WordPress', level: 75, category: 'CMS', icon: FiBarChart2 },
  ];

  const categories = [
    { id: 'all', label: 'All Skills', icon: FiStar },
    { id: 'Frontend', label: 'Frontend', icon: FiCode },
    { id: 'Language', label: 'Languages', icon: FiCode },
    { id: 'API', label: 'APIs', icon: FiDatabase },
    { id: 'UI Library', label: 'UI Libraries', icon: FiLayout },
  ];

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  // Get category icon
  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.icon : FiStar;
  };

  return (
    <section id='skills' className='py-20 px-4 relative overflow-hidden'>
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

        {/* Category filters */}
        <div className='flex flex-wrap justify-center gap-3 mb-12'>
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.id}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30'
                    : 'glass text-gray-300 hover:text-white hover:bg-primary/10'
                }`}
              >
                <Icon className='text-lg' />
                {category.label}
              </motion.button>
            );
          })}
        </div>

        {/* Skills grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredSkills.map((skill, index) => {
            const Icon = skill.icon;
            return (
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
                whileHover={{ y: -5 }}
                className='bg-dark-bg/40 backdrop-blur-lg rounded-2xl p-6 border border-gray-800/50 hover:border-primary/30 transition-all duration-300 group relative overflow-hidden cursor-pointer'
                onMouseEnter={() => setHoveredSkill(index)}
                onMouseLeave={() => setHoveredSkill(null)}
                onClick={() => setHoveredSkill(hoveredSkill === index ? null : index)}
              >
                {/* Animated background on hover */}
                <div className='absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                
                <div className='relative z-10'>
                  <div className='flex justify-between items-start mb-4'>
                    <div className='flex items-center gap-3'>
                      <Icon className='text-primary text-xl' />
                      <h4 className='text-xl font-bold text-white group-hover:text-primary transition-colors'>
                        {skill.name}
                      </h4>
                    </div>
                    <span className='text-lg font-bold text-primary'>{skill.level}%</span>
                  </div>

                  <div className='relative h-3 bg-gray-800 rounded-full overflow-hidden mb-2'>
                    <motion.div
                      className='absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-secondary rounded-full'
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1.5,
                        delay: 0.3,
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
                        delay: 1,
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
                  
                  {/* Category badge */}
                  <div className='mt-3'>
                    <span className='text-xs bg-gray-700/50 text-gray-400 px-2 py-1 rounded-full flex items-center gap-1'>
                      <span className='w-2 h-2 rounded-full bg-primary'></span>
                      {skill.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Skill statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className='mt-16 grid grid-cols-2 md:grid-cols-4 gap-4'
        >
          {[
            { label: 'Frontend Skills', value: skills.filter(s => s.category === 'Frontend').length, icon: FiCode },
            { label: 'Languages', value: skills.filter(s => s.category === 'Language').length, icon: FiCode },
            { label: 'Average Proficiency', value: `${Math.round(skills.reduce((acc, skill) => acc + skill.level, 0) / skills.length)}%`, icon: FiBarChart2 },
            { label: 'Years Experience', value: '6+', icon: FiStar },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className='glass p-5 rounded-xl text-center'
              >
                <div className='flex justify-center mb-2'>
                  <Icon className='text-primary text-2xl' />
                </div>
                <div className='text-2xl font-bold text-primary mb-1'>{stat.value}</div>
                <div className='text-gray-400 text-sm'>{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}