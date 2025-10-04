'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import {
  FiLinkedin,
  FiGithub,
  FiTwitter,
  FiMail,
  FiCheck,
  FiX,
  FiSend,
  FiMapPin,
  FiPhone,
  FiUser,
  FiMessageSquare,
} from 'react-icons/fi';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({
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

  const controls = useAnimation();
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (submitStatus.type) {
      controls.start({
        scale: [1, 1.05, 1],
        transition: { duration: 0.3 },
      });
    }
  }, [submitStatus, controls]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    // Clear error when user starts typing
    if (errors[id as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [id]: '',
      }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', message: '' };

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
        isValid = false;
      }
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
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
          {/* Contact information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className='space-y-8'
          >
            <div>
              <h3 className='text-2xl font-semibold mb-6'>Let's Connect</h3>
              <p className='text-gray-400 mb-8'>
                I'm currently available for freelance work and open to new opportunities. Feel free
                to reach out if you want to collaborate or just say hello! You can send me a direct
                email at{' '}
                <a href='mailto:alif.mohamady20@gmail.com' className='text-primary hover:underline'>
                  alif.mohamady20@gmail.com
                </a>
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

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            ref={formRef}
          >
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div>
                <label
                  htmlFor='name'
                  className='block mb-2 text-sm font-medium flex items-center gap-2'
                >
                  <FiUser /> Name
                </label>
                <input
                  type='text'
                  id='name'
                  value={formData.name}
                  onChange={handleChange}
                  className={`glass w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    errors.name ? 'focus:ring-red-500 border border-red-500' : 'focus:ring-primary'
                  }`}
                  placeholder='Your name'
                  disabled={isSubmitting}
                />
                {errors.name && <p className='text-red-500 text-sm mt-1'>{errors.name}</p>}
              </div>
              <div>
                <label
                  htmlFor='email'
                  className='block mb-2 text-sm font-medium flex items-center gap-2'
                >
                  <FiMail /> Email
                </label>
                <input
                  type='email'
                  id='email'
                  value={formData.email}
                  onChange={handleChange}
                  className={`glass w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    errors.email ? 'focus:ring-red-500 border border-red-500' : 'focus:ring-primary'
                  }`}
                  placeholder='your.email@example.com'
                  disabled={isSubmitting}
                />
                {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email}</p>}
              </div>
              <div>
                <label
                  htmlFor='message'
                  className='block mb-2 text-sm font-medium flex items-center gap-2'
                >
                  <FiMessageSquare /> Message
                </label>
                <textarea
                  id='message'
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className={`glass w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    errors.message
                      ? 'focus:ring-red-500 border border-red-500'
                      : 'focus:ring-primary'
                  }`}
                  placeholder='Your message...'
                  disabled={isSubmitting}
                ></textarea>
                {errors.message && <p className='text-red-500 text-sm mt-1'>{errors.message}</p>}
              </div>

              <p className='text-gray-400 text-sm'>
                * All messages will be sent directly to Ali Mohammadi's email
              </p>

              <motion.div animate={controls}>
                {submitStatus.type && (
                  <div
                    className={`p-4 rounded-lg flex items-center gap-3 ${
                      submitStatus.type === 'success'
                        ? 'bg-green-900/30 text-green-400 border border-green-800/50'
                        : 'bg-red-900/30 text-red-400 border border-red-800/50'
                    }`}
                  >
                    {submitStatus.type === 'success' ? (
                      <FiCheck className='text-xl' />
                    ) : (
                      <FiX className='text-xl' />
                    )}
                    <span>{submitStatus.message}</span>
                  </div>
                )}
              </motion.div>

              <motion.button
                type='submit'
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                  isSubmitting
                    ? 'bg-gray-700 cursor-not-allowed'
                    : 'bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 shadow-lg shadow-primary/30'
                }`}
                whileHover={!isSubmitting ? { y: -2 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      ></circle>
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      ></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend className='text-lg' />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
