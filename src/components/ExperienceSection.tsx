'use client';

import { motion } from 'framer-motion';

export default function ExperienceSection() {
  const experiences = [
    {
      company: 'Daenatech Corp',
      position: 'Frontend Developer',
      location: 'Canada (Remote)',
      period: 'Oct 2023 - Present',
      description: [
        'Developed the front-end using Next.js, MUI, TypeScript, and Orval, ensuring responsive design fully matched the provided specifications',
        'Implemented responsive design to ensure optimal viewing experience on various devices and screen sizes',
        'Collaborated with UX/UI designers, back-end developers, and project managers to deliver projects on time and within budget',
        'Mentored developers and provided technical guidance and support',
      ],
    },
    {
      company: 'Fydez',
      position: 'Frontend Developer',
      location: 'Germany (Remote)',
      period: 'May 2023 - Oct 2023',
      description: [
        'Developed, customized, and maintained the Shopify store, enhancing user engagement and sales performance',
        'Implemented custom themes and integrated Shopify apps, ensuring alignment with the brand identity',
        'Optimized site performance and SEO, increasing organic traffic and conversion rates',
        'Monitored site analytics, generated performance reports, and adjusted strategies based on data insights',
      ],
    },
    {
      company: 'Finestel',
      position: 'Frontend Developer',
      location: 'Istanbul, Turkey',
      period: 'Mar 2022 - Jun 2023',
      description: [
        'Built reusable components using React and optimized website performance using Next.js',
        'Implemented responsive design to ensure optimal viewing experience on various devices and screen sizes',
        'Collaborated with UX/UI designers, back-end developers, and project managers to deliver projects on time and within budget',
        'Mentored junior developers and provided technical guidance and support',
      ],
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
      ],
    },
    {
      company: 'Cloudware',
      position: 'Frontend Developer',
      location: 'Remote',
      period: 'Jan 2020 - Mar 2022',
      description: [
        'Used GraphQL to handle complex data queries and improve application performance',
        'Developed custom plugins and components to enhance website functionality and user experience',
      ],
    },
    {
      company: 'Improver Digital Tech',
      position: 'Frontend Developer',
      location: 'Iran',
      period: 'Mar 2020 - Jul 2021',
      description: [
        'Assisted in the implementation of responsive design solutions to optimize the viewing experience on different devices and screen sizes',
        'Contributed to the development of various web projects using HTML, CSS, JavaScript, and React',
      ],
    },
  ];

  return (
    <section id='experience' className='py-20 px-4'>
      <div className='container mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className='text-center mb-16'
        >
          <h2 className='text-4xl font-bold mb-4'>Experience</h2>
          <div className='w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto'></div>
        </motion.div>

        <div className='relative'>
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
              <div className='absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-primary transform md:translate-x-[-7px] z-10'></div>

              {/* Content */}
              <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                <div className='glass p-6 rounded-xl'>
                  <div className='flex flex-wrap justify-between items-center mb-2'>
                    <h3 className='text-xl font-bold'>{exp.position}</h3>
                    <span className='text-primary text-sm'>{exp.period}</span>
                  </div>
                  <h4 className='text-lg text-secondary mb-3'>
                    {exp.company} - {exp.location}
                  </h4>
                  <ul className='space-y-2'>
                    {exp.description.map((item, i) => (
                      <li key={i} className='text-gray-400 flex items-start'>
                        <span className='text-primary mr-2'>•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
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
