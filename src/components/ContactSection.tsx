'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiLinkedin, FiGithub, FiTwitter, FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: "Message sent successfully! I'll get back to you soon.",
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Failed to send message. Please try again.',
        });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

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
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className='glass rounded-2xl p-8 border border-gray-800/50'
          >
            <h3 className='text-2xl font-semibold mb-6'>Send Me a Message</h3>

            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label htmlFor='name' className='block text-sm font-medium text-gray-400 mb-2'>
                    Name
                  </label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className='w-full px-4 py-3 bg-dark-bg/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all'
                    placeholder='Your name'
                  />
                </div>
                <div>
                  <label htmlFor='email' className='block text-sm font-medium text-gray-400 mb-2'>
                    Email
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className='w-full px-4 py-3 bg-dark-bg/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all'
                    placeholder='your.email@example.com'
                  />
                </div>
              </div>

              <div>
                <label htmlFor='subject' className='block text-sm font-medium text-gray-400 mb-2'>
                  Subject
                </label>
                <input
                  type='text'
                  id='subject'
                  name='subject'
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className='w-full px-4 py-3 bg-dark-bg/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all'
                  placeholder='What is this regarding?'
                />
              </div>

              <div>
                <label htmlFor='message' className='block text-sm font-medium text-gray-400 mb-2'>
                  Message
                </label>
                <textarea
                  id='message'
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className='w-full px-4 py-3 bg-dark-bg/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none'
                  placeholder='Your message here...'
                />
              </div>

              <button
                type='submit'
                disabled={isSubmitting}
                className='w-full py-3 px-6 bg-gradient-to-r from-primary to-secondary rounded-lg font-medium text-white hover:from-primary/80 hover:to-secondary/80 transition-all duration-300 shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-70'
              >
                {isSubmitting ? (
                  <>
                    <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend className='text-lg' />
                    Send Message
                  </>
                )}
              </button>

              {submitStatus && (
                <div
                  className={`p-4 rounded-lg ${
                    submitStatus.type === 'success'
                      ? 'bg-green-500/20 border border-green-500/30'
                      : 'bg-red-500/20 border border-red-500/30'
                  }`}
                >
                  <p
                    className={submitStatus.type === 'success' ? 'text-green-300' : 'text-red-300'}
                  >
                    {submitStatus.message}
                  </p>
                </div>
              )}
            </form>
          </motion.div>

          {/* Contact information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className='space-y-8'
          >
            <div>
              <h3 className='text-2xl font-semibold mb-6'>Contact Information</h3>
              <p className='text-gray-400 mb-8'>
                I'm currently available for freelance work and open to new opportunities. Feel free
                to reach out if you want to collaborate or just say hello!
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
        </div>
      </div>
    </section>
  );
}
