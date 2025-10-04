'use client';

import { motion } from 'framer-motion';
import ThreeDCard from '@/components/ThreeDCard';
import Canvas3D from '@/components/Canvas3D';

export default function ProjectsSection() {
  const projects = [
    {
      title: 'Healthcare Dashboard Platform',
      description:
        'Developed front-end using Next.js, MUI, TypeScript, and Orval with responsive design. Collaborated with UX/UI designers and mentored developers.',
      technologies: ['Next.js', 'MUI', 'TypeScript', 'Orval', 'React'],
    },
    {
      title: 'Shopify E-commerce Store',
      description:
        'Customized and maintained Shopify store with custom themes and apps. Optimized performance and SEO, increasing traffic and conversions.',
      technologies: ['Shopify', 'TypeScript', 'Tailwind CSS', 'React'],
    },
    {
      title: 'Enterprise Web Platform',
      description:
        'Built reusable React components and optimized website performance with Next.js. Implemented responsive design and mentored junior developers.',
      technologies: ['React', 'Next.js', 'JavaScript', 'CSS'],
    },
    {
      title: 'API Integration Platform',
      description:
        'Contributed to API development and maintenance with seamless front-end integration. Implemented modern web design techniques for responsive layouts.',
      technologies: ['React', 'CSS', 'JavaScript', 'HTML'],
    },
  ];

  return (
    <section id='projects' className='py-20 px-4 bg-dark-card'>
      <div className='container mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className='text-center mb-16'
        >
          <h2 className='text-4xl font-bold mb-4'>Projects</h2>
          <div className='w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto'></div>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className='glass rounded-xl overflow-hidden group'
            >
              <div className='h-48 bg-gradient-to-r from-primary/20 to-secondary/20 relative overflow-hidden'>
                <div className='absolute inset-0 flex items-center justify-center'>
                  <div className='w-32 h-32 rounded-lg bg-gradient-to-br from-primary to-secondary opacity-20 blur-xl animate-pulse'></div>
                  <div
                    className='absolute w-24 h-24 rounded-lg bg-gradient-to-tr from-secondary to-primary opacity-30 blur-lg animate-pulse'
                    style={{ animationDelay: '0.5s' }}
                  ></div>
                </div>
                <div className='absolute inset-0 bg-gradient-to-t from-dark-bg to-transparent opacity-80'></div>
              </div>
              <div className='p-6'>
                <h3 className='text-2xl font-bold mb-2'>{project.title}</h3>
                <p className='text-gray-400 mb-4'>{project.description}</p>
                <div className='flex flex-wrap gap-2 mb-4'>
                  {project.technologies.map((tech, i) => (
                    <span key={i} className='text-xs bg-primary/20 text-primary px-2 py-1 rounded'>
                      {tech}
                    </span>
                  ))}
                </div>
                <div className='flex gap-4'>
                  <button className='text-sm font-medium text-primary hover:underline'>
                    View Project
                  </button>
                  <button className='text-sm font-medium text-gray-400 hover:text-white'>
                    Source Code
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
