'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiMapPin, FiBriefcase, FiAward, FiChevronDown, FiExternalLink } from 'react-icons/fi';

export default function ExperienceSection() {
  const [expandedExperience, setExpandedExperience] = useState<number | null>(null);

  const experiences = [
    {
      company: 'Daenatech Corp',
      position: 'Senior Frontend Developer',
      location: 'Canada (Remote)',
      period: 'Oct 2023 - Present',
      description: [
        'Led the development of a healthcare dashboard platform using Next.js, MUI, TypeScript, and Orval, ensuring responsive design fully matched the provided specifications',
        'Implemented complex data visualizations and interactive components to enhance user experience',
        'Collaborated with UX/UI designers, backend developers, and project managers to deliver projects on time and within budget',
        'Mentored junior developers and provided technical guidance and code reviews',
      ],
      achievements: [
        'Improved application performance by 40% through code optimization and lazy loading techniques',
        'Led a team of 3 junior developers, resulting in a 25% increase in productivity and code quality',
        'Implemented a design system that reduced development time by 30% and ensured consistency across the platform',
        'Introduced automated testing practices that reduced bug reports by 50%'
      ],
      logo: 'D',
    },
    {
      company: 'Fydez',
      position: 'Frontend Developer',
      location: 'Germany (Remote)',
      period: 'May 2023 - Oct 2023',
      description: [
        'Developed, customized, and maintained a high-traffic Shopify store, enhancing user engagement and sales performance',
        'Implemented custom themes and integrated Shopify apps, ensuring alignment with the brand identity',
        'Optimized site performance and SEO, increasing organic traffic and conversion rates',
        'Monitored site analytics, generated performance reports, and adjusted strategies based on data insights',
      ],
      achievements: [
        'Increased conversion rate by 18% through UI/UX improvements and A/B testing',
        'Reduced page load time by 35% through image optimization and code splitting',
        'Implemented A/B testing framework that improved user engagement and informed product decisions',
        'Created reusable components that reduced development time for future projects by 40%'
      ],
      logo: 'F',
    },
    {
      company: 'Finestel',
      position: 'Frontend Developer',
      location: 'Istanbul, Turkey',
      period: 'Mar 2022 - Jun 2023',
      description: [
        'Built reusable components using React and optimized website performance using Next.js',
        'Implemented responsive design to ensure optimal viewing experience on various devices and screen sizes',
        'Collaborated with UX/UI designers, backend developers, and project managers to deliver projects on time and within budget',
        'Mentored junior developers and provided technical guidance and support',
      ],
      achievements: [
        'Developed 20+ reusable components that saved 40% development time across multiple projects',
        'Mentored 5 junior developers, 3 of whom were promoted within a year due to their improved skills',
        'Implemented CI/CD pipeline that reduced deployment time by 60% and improved release reliability',
        'Improved accessibility compliance to meet WCAG 2.1 AA standards'
      ],
      logo: 'F',
    },
    {
      company: 'Asnad plus',
      position: 'Frontend Developer',
      location: 'Iran (Remote)',
      period: 'Jun 2021 - Mar 2022',
      description: [
        "Contributed to the development and maintenance of the platform's API, ensuring seamless integration between front-end and back-end systems",
        'Implemented modern web design techniques, such as CSS grid and flexbox, to achieve optimal responsive design',
        'Developed and maintained complex and high-traffic websites and web applications using React',
        'Collaborated with cross-functional teams to translate designs into interactive user interfaces'
      ],
      achievements: [
        'Reduced API response time by 25% through optimization and caching strategies',
        'Implemented responsive design for 15+ pages, improving mobile experience and increasing mobile traffic by 35%',
        'Created comprehensive documentation that reduced onboarding time for new developers by 50%',
        'Introduced code linting and formatting standards that improved code quality and consistency'
      ],
      logo: 'A',
    },
    {
      company: 'Cloudware',
      position: 'Frontend Developer',
      location: 'Remote',
      period: 'Jan 2020 - Mar 2022',
      description: [
        'Used GraphQL to handle complex data queries and improve application performance',
        'Developed custom plugins and components to enhance website functionality and user experience',
        'Optimized frontend performance through code splitting, lazy loading, and image optimization',
        'Collaborated with backend teams to design and implement efficient API integrations'
      ],
      achievements: [
        'Implemented GraphQL schema that improved data fetching efficiency by 40% and reduced over-fetching',
        'Developed 10+ custom plugins that enhanced user experience and increased user engagement by 20%',
        'Reduced bundle size by 30% through code splitting techniques and dependency optimization',
        'Improved SEO performance by implementing server-side rendering and meta tag optimization'
      ],
      logo: 'C',
    },
    {
      company: 'Improver Digital Tech',
      position: 'Junior Frontend Developer',
      location: 'Iran',
      period: 'Mar 2020 - Jul 2021',
      description: [
        'Assisted in the implementation of responsive design solutions to optimize the viewing experience on different devices and screen sizes',
        'Contributed to the development of various web projects using HTML, CSS, JavaScript, and React',
        'Collaborated with senior developers to learn best practices and improve coding skills',
        'Participated in code reviews and contributed to improving code quality and maintainability'
      ],
      achievements: [
        'Contributed to 15+ web projects with positive client feedback and increased client retention',
        'Learned and implemented modern frontend practices including component-based architecture and state management',
        'Improved cross-browser compatibility for all projects, ensuring consistent experience across different browsers',
        'Reduced bug reports by 30% through thorough testing and attention to detail'
      ],
      logo: 'I',
    },
  ];

  return (
    <section id='experience' className='py-20 px-4 relative overflow-hidden'>
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
            Professional Experience
          </h2>
          <div className='w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full'></div>
        </motion.div>

        <div className='relative max-w-4xl mx-auto'>
          {/* Timeline line */}
          <div className='absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-secondary transform md:translate-x-[-1px]'></div>

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`mb-12 flex flex-col md:flex-row items-center ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Timeline dot */}
              <motion.div
                className='absolute left-0 md:left-1/2 w-6 h-6 rounded-full bg-primary transform md:translate-x-[-11px] z-10 flex items-center justify-center shadow-lg shadow-primary/30'
                whileHover={{ scale: 1.2 }}
              >
                <div className='w-3 h-3 rounded-full bg-white'></div>
              </motion.div>

              {/* Content - Fixed text alignment to be left-aligned */}
              <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                <div
                  className='glass p-6 rounded-2xl cursor-pointer transform transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 text-left'
                  onClick={() => setExpandedExperience(expandedExperience === index ? null : index)}
                >
                  {/* Company logo placeholder */}
                  <div className='flex items-center mb-3'>
                    <div className='w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold mr-3'>
                      {exp.logo}
                    </div>
                    <div className='flex-1'>
                      <div className='flex flex-wrap justify-between items-center'>
                        <h3 className='text-xl font-bold'>{exp.position}</h3>
                        <span className='text-primary text-sm flex items-center gap-1 md:justify-end'>
                          <FiCalendar className='inline' /> {exp.period}
                        </span>
                      </div>
                      <h4 className='text-lg text-secondary flex items-center gap-1'>
                        <FiBriefcase className='inline' /> {exp.company}
                      </h4>
                    </div>
                  </div>

                  <p className='text-gray-400 mb-3 flex items-center gap-1'>
                    <FiMapPin className='inline' /> {exp.location}
                  </p>

                  <ul className='space-y-2 mb-4 text-left'>
                    {exp.description
                      .slice(0, expandedExperience === index ? exp.description.length : 2)
                      .map((item, i) => (
                        <li key={i} className='text-gray-400 flex items-start text-left'>
                          <span className='text-primary mr-2 mt-1'>•</span>
                          <span className='text-left'>{item}</span>
                        </li>
                      ))}
                  </ul>

                  {expandedExperience === index && exp.achievements && (
                    <div className='mt-4 pt-4 border-t border-gray-800 text-left'>
                      <h5 className='font-semibold text-primary mb-2 flex items-center gap-2'>
                        <FiAward className='inline' /> Key Achievements:
                      </h5>
                      <ul className='space-y-2'>
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className='text-gray-300 flex items-start text-left'>
                            <span className='text-green-500 mr-2 mt-1'>✓</span>
                            <span className='text-left'>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <button
                    className='text-primary text-sm font-medium flex items-center gap-1 mt-2'
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedExperience(expandedExperience === index ? null : index);
                    }}
                  >
                    {expandedExperience === index ? 'Show Less' : 'Show More'}
                    <FiChevronDown
                      className={`inline transition-transform ${
                        expandedExperience === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Empty div for spacing */}
              <div className='md:w-1/12'></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}