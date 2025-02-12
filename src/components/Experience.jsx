import { motion } from 'framer-motion';

export default function Experience() {
  return (
    <section id="experience" className="py-20 bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100">Experience</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="prose dark:prose-invert max-w-3xl mx-auto"
        >
          <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
            Error 404 not found. That's right I have no professional industry experience, however I still bring 
            over 3 years of hands-on experience in coding and software development through personal projects, 
            self-driven learning, and my college courses. I've tackled a wide range of challenges, from developing AI-powered 
            virtual assistants and machine learning models to creating mobile applications and websites.
          </p>
          
          <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed mt-6">
            My projects have allowed me to build strong skills in Python, C++, JavaScript, React, and SQL. 
            I've gained a solid foundation in problem-solving, collaboration, and adaptability. I'm eager to 
            apply my knowledge and passion for technology in a professional setting, where I can continue to 
            learn and grow as a software developer.
          </p>
        </motion.div>
      </div>
    </section>
  );
} 