'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiGithub, FiStar, FiCode, FiGlobe } from 'react-icons/fi';

export default function ProjectsSection() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'Healthcare Dashboard Platform',
      description:
        'Developed front-end using Next.js, MUI, TypeScript, and Orval with responsive design. Collaborated with UX/UI designers and mentored developers.',
      technologies: ['Next.js', 'MUI', 'TypeScript', 'Orval', 'React'],
      liveUrl: '#',
      githubUrl: '#',
      category: 'web',
      featured: true,
    },
    {
      id: 2,
      title: 'Shopify E-commerce Store',
      description:
        'Customized and maintained Shopify store with custom themes and apps. Optimized performance and SEO, increasing traffic and conversions.',
      technologies: ['Shopify', 'TypeScript', 'Tailwind CSS', 'React'],
      liveUrl: '#',
      githubUrl: '#',
      category: 'ecommerce',
      featured: true,
    },
    {
      id: 3,
      title: 'Enterprise Web Platform',
      description:
        'Built reusable React components and optimized website performance with Next.js. Implemented responsive design and mentored junior developers.',
      technologies: ['React', 'Next.js', 'JavaScript', 'CSS'],
      liveUrl: '#',
      githubUrl: '#',
      category: 'web',
      featured: false,
    },
    {
      id: 4,
      title: 'API Integration Platform',
      description:
        'Contributed to API development and maintenance with seamless front-end integration. Implemented modern web design techniques for responsive layouts.',
      technologies: ['React', 'CSS', 'JavaScript', 'HTML'],
      liveUrl: '#',
      githubUrl: '#',
      category: 'api',
      featured: false,
    },
  ];

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Apps' },
    { id: 'ecommerce', label: 'E-commerce' },
    { id: 'api', label: 'APIs' },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const handleProjectHover = (index: number, isHovered: boolean) => {
    setHoveredProject(isHovered ? index : null);
  };

  return (
    <section id='projects' className='py-20 px-4 bg-dark-card relative overflow-hidden'>
      {/* Background elements */}
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-primary/5 to-transparent'></div>
        <div className='absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-secondary/5 to-transparent'></div>
      </div>

      <div className='container mx-auto relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className='text-center mb-16'
        >
          <h2 className='text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary'>
            Featured Projects
          </h2>
          <div className='w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full'></div>
          <p className='text-gray-400 max-w-2xl mx-auto mt-6'>
            Here are some of my recent projects. Each one presented unique challenges and opportunities to grow.
          </p>
        </motion.div>

        {/* Category filters */}
        <div className='flex flex-wrap justify-center gap-3 mb-12'>
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(category.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === category.id
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30'
                  : 'glass text-gray-300 hover:text-white hover:bg-primary/10'
              }`}
            >
              {category.label}
            </motion.button>
          ))}
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.7, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              whileHover={{ y: -10 }}
              className='glass rounded-2xl overflow-hidden group relative'
              onMouseEnter={() => handleProjectHover(index, true)}
              onMouseLeave={() => handleProjectHover(index, false)}
            >
              {/* Project image with gradient overlay */}
              <div className='h-48 bg-gradient-to-r from-primary/20 to-secondary/20 relative overflow-hidden'>
                <div className='absolute inset-0 flex items-center justify-center'>
                  <div className='w-32 h-32 rounded-lg bg-gradient-to-br from-primary to-secondary opacity-20 blur-xl animate-pulse'></div>
                  <div
                    className='absolute w-24 h-24 rounded-lg bg-gradient-to-tr from-secondary to-primary opacity-30 blur-lg animate-pulse'
                    style={{ animationDelay: '0.5s' }}
                  ></div>
                </div>
                
                {/* Animated border effect on hover */}
                <AnimatePresence>
                  {hoveredProject === index && (
                    <motion.div 
                      className='absolute inset-0 border-2 border-primary rounded-2xl'
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </AnimatePresence>
                
                <div className='absolute inset-0 bg-gradient-to-t from-dark-bg to-transparent opacity-80'></div>
                
                {/* Project category badge */}
                <div className='absolute top-4 left-4'>
                  <span className='px-3 py-1 bg-primary/20 text-primary text-xs rounded-full'>
                    {project.category}
                  </span>
                </div>
                
                {/* Featured badge */}
                {project.featured && (
                  <div className='absolute top-4 right-4'>
                    <div className='flex items-center gap-1 px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full'>
                      <FiStar className='text-yellow-400' />
                      Featured
                    </div>
                  </div>
                )}
              </div>
              
              <div className='p-6'>
                <div className='flex justify-between items-start mb-3'>
                  <h3 className='text-2xl font-bold'>{project.title}</h3>
                  <div className='flex gap-2'>
                    <motion.a 
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className='text-gray-400 hover:text-primary transition-colors'
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Live demo"
                    >
                      <FiExternalLink />
                    </motion.a>
                    <motion.a 
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className='text-gray-400 hover:text-primary transition-colors'
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Source code"
                    >
                      <FiGithub />
                    </motion.a>
                  </div>
                </div>
                
                <p className='text-gray-400 mb-4'>{project.description}</p>
                
                <div className='flex flex-wrap gap-2 mb-4'>
                  {project.technologies.map((tech, i) => (
                    <motion.span 
                      key={i} 
                      className='text-xs bg-primary/20 text-primary px-2 py-1 rounded-full'
                      whileHover={{ 
                        y: -2,
                        backgroundColor: "rgba(99, 102, 241, 0.3)"
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
                
                <div className='flex gap-4'>
                  <motion.button 
                    className='text-sm font-medium text-primary hover:underline flex items-center gap-1'
                    whileHover={{ x: 5 }}
                  >
                    <FiGlobe className='text-xs' />
                    View Project
                  </motion.button>
                  <motion.button 
                    className='text-sm font-medium text-gray-400 hover:text-white flex items-center gap-1'
                    whileHover={{ x: 5 }}
                  >
                    <FiCode className='text-xs' />
                    Source Code
                  </motion.button>
                </div>
              </div>
              
              {/* Interactive hover effect */}
              <motion.div
                className='absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}