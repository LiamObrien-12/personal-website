import { motion } from 'framer-motion';
import { useState } from 'react';

const timelineData = {
  education: [
    {
      date: 'Jan 2023 - May 2025',
      institution: 'Southern New Hampshire University',
      title: 'Bachelor of Science in Computer Science',
    }
  ],
  work: [
    {
      date: '',
      institution: "Error 404 not found",
      title: "That's right I have no professional industry experience yet. However I still bring over 3 years of hands-on experience in coding and software development from personal projects, self-driven learning, and my college courses. I've tackled a wide range of challenges, from developing AI-powered virtual assistants to creating machine learning models.",
    }
  ]
};

export default function Experience() {
  const [activeTab, setActiveTab] = useState('education');

  return (
    <section className="py-16 bg-background-light dark:bg-background-dark">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100">Experience</h2>
        </motion.div>

        {/* Container with border */}
        <div className="border border-neutral-300 dark:border-neutral-700 rounded-xl overflow-hidden bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm shadow-sm">
          {/* Tabs */}
          <div className="flex w-full border-b border-neutral-300 dark:border-neutral-700 relative">
            <button
              onClick={() => setActiveTab('education')}
              className={`flex-1 py-3 text-sm font-medium transition-colors border-r border-neutral-300 dark:border-neutral-700 ${
                activeTab === 'education'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-sm'
                  : 'bg-neutral-100/50 dark:bg-neutral-800/50 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Education
            </button>
            <button
              onClick={() => setActiveTab('work')}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                activeTab === 'work'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-sm'
                  : 'bg-neutral-100/50 dark:bg-neutral-800/50 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Work
            </button>
          </div>

          {/* Timeline */}
          <div className="relative p-8">
            {timelineData[activeTab].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="relative pl-6 mb-6 last:mb-0"
              >
                <div className="flex items-start">
                  {/* Dot */}
                  <div className="absolute left-0 top-2 w-2 h-2 bg-neutral-500 dark:bg-neutral-500 rounded-full" />
                  
                  {/* Content */}
                  <div className="ml-6">
                    <h3 className="text-lg font-medium text-neutral-900 dark:text-white">
                      {item.institution}
                    </h3>
                    <p className="text-neutral-700 dark:text-neutral-400 mt-1">
                      {item.title}
                    </p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-500 mt-1">
                      {item.date}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 