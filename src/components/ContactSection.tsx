'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiLinkedin, FiGithub, FiTwitter, FiMail } from 'react-icons/fi';
import MagneticButton from '@/components/MagneticButton';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({
    type: null,
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus({
        type: 'error',
        message: 'Please fill in all fields.',
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus({
        type: 'error',
        message: 'Please enter a valid email address.',
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // Send data to API route
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

        // Reset form
        setFormData({
          name: '',
          email: '',
          message: '',
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Failed to send message. Please try again.',
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again or email me directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id='contact' className='py-20 px-4'>
      <div className='container mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className='text-center mb-16'
        >
          <h2 className='text-4xl font-bold mb-4'>Get In Touch</h2>
          <div className='w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto'></div>
        </motion.div>

        <div className='grid md:grid-cols-2 gap-12'>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className='text-2xl font-semibold mb-6'>Let's Talk</h3>
            <p className='text-gray-400 mb-8'>
              I'm currently available for freelance work and open to new opportunities. Feel free to
              reach out if you want to collaborate or just say hello! You can send me a direct email
              at alif.mohamady20@gmail.com
            </p>

            <div className='space-y-4'>
              <div className='flex items-center'>
                <FiMail className='text-primary text-xl mr-4' />
                <span>alif.mohamady20@gmail.com</span>
              </div>
              <div className='flex items-center'>
                <FiLinkedin className='text-primary text-xl mr-4' />
                <span>linkedin.com/in/ali-mohammadi20</span>
              </div>
              <div className='flex items-center'>
                <FiGithub className='text-primary text-xl mr-4' />
                <span>github.com/yourusername</span>
              </div>
              <div className='flex items-center'>
                <FiTwitter className='text-primary text-xl mr-4' />
                <span>@yourtwitter</span>
              </div>
            </div>

            <div className='flex gap-4 mt-8'>
              <MagneticButton
                key={0}
                href='https://www.linkedin.com/in/ali-mohammadi20'
                target='_blank'
                rel='noopener noreferrer'
                className='glass w-12 h-12 rounded-full flex items-center justify-center hover:bg-primary/20 transition-all duration-300 group'
              >
                <FiLinkedin className='text-xl group-hover:scale-110 transition-transform duration-300' />
              </MagneticButton>
              <MagneticButton
                key={1}
                href='https://github.com/yourusername'
                target='_blank'
                rel='noopener noreferrer'
                className='glass w-12 h-12 rounded-full flex items-center justify-center hover:bg-primary/20 transition-all duration-300 group'
              >
                <FiGithub className='text-xl group-hover:scale-110 transition-transform duration-300' />
              </MagneticButton>
              <MagneticButton
                key={2}
                href='https://twitter.com/yourtwitter'
                target='_blank'
                rel='noopener noreferrer'
                className='glass w-12 h-12 rounded-full flex items-center justify-center hover:bg-primary/20 transition-all duration-300 group'
              >
                <FiTwitter className='text-xl group-hover:scale-110 transition-transform duration-300' />
              </MagneticButton>
              <MagneticButton
                key={3}
                href='mailto:alif.mohamady20@gmail.com'
                className='glass w-12 h-12 rounded-full flex items-center justify-center hover:bg-primary/20 transition-all duration-300 group'
              >
                <FiMail className='text-xl group-hover:scale-110 transition-transform duration-300' />
              </MagneticButton>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div>
                <label htmlFor='name' className='block mb-2 text-sm font-medium'>
                  Name
                </label>
                <input
                  type='text'
                  id='name'
                  value={formData.name}
                  onChange={handleChange}
                  className='glass w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                  placeholder='Your name'
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label htmlFor='email' className='block mb-2 text-sm font-medium'>
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  value={formData.email}
                  onChange={handleChange}
                  className='glass w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                  placeholder='your.email@example.com'
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label htmlFor='message' className='block mb-2 text-sm font-medium'>
                  Message
                </label>
                <textarea
                  id='message'
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className='glass w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                  placeholder='Your message...'
                  disabled={isSubmitting}
                ></textarea>
              </div>

              <p className='text-gray-400 text-sm mb-4'>
                * All messages will be sent directly to Ali Mohammadi's email
              </p>

              {submitStatus.type && (
                <div
                  className={`p-3 rounded-lg text-sm ${
                    submitStatus.type === 'success'
                      ? 'bg-green-900/30 text-green-400 border border-green-800/50'
                      : 'bg-red-900/30 text-red-400 border border-red-800/50'
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              <button
                type='submit'
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                  isSubmitting
                    ? 'bg-gray-700 cursor-not-allowed'
                    : 'bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80'
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
