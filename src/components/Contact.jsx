import { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

const emailSignature = `
Best regards,
Liam O'Brien
Software Developer
liam.aobrien1@gmail.com
`;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      await emailjs.send(
        'service_6d8sl84',
        'template_3bgxvon',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'liam.aobrien1@gmail.com',
        },
        '4D4m0k__Wi60l0W1Z'
      );

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-4xl mx-auto px-4 py-16"
    >
      <h2 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-6 text-center">
        Get in Contact!
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black dark:bg-gray-800 dark:border-gray-700"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black dark:bg-gray-800 dark:border-gray-700"
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Message
          </label>
          <textarea
            id="message"
            value={formData.message}
            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
            rows={5}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black dark:bg-gray-800 dark:border-gray-700"
            required
          />
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </button>

        {status === 'success' && (
          <p className="text-green-600 text-center">Message sent successfully!</p>
        )}
        {status === 'error' && (
          <p className="text-red-600 text-center">Failed to send message. Please try again.</p>
        )}
      </form>
    </motion.div>
  );
} 