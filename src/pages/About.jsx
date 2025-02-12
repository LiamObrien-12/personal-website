import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { scrollToTop } from '../utils/scrollToTop';
import BackToHomeButton from '../components/BackToHomeButton';

const sectionVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const staggerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function About() {
  const navigate = useNavigate();

  const handleBackToHome = (e) => {
    e.preventDefault();
    navigate('/');
    scrollToTop();
  };

  return (
    <PageTransition>
      <div className="h-screen overflow-y-auto bg-background-light dark:bg-background-dark pt-24">
        <motion.div 
          variants={staggerVariants}
          initial="initial"
          animate="animate"
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20"
        >
          <motion.div 
            variants={sectionVariants}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              About Me
            </h1>
            <p className="text-xl text-neutral-700 dark:text-neutral-300">
              Software Developer & Computer Science Student
            </p>
          </motion.div>

          <div className="prose dark:prose-invert max-w-none">
            <motion.section 
              variants={sectionVariants}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold mb-4">Background</h2>
              <p className="text-lg text-neutral-700 dark:text-neutral-300">
                I'm a Computer Science student at Southern New Hampshire University, set to graduate in December 2025. 
                My journey in software development started with a fascination for problem-solving 
                and has grown into a love for creating cool and interesting applications.
              </p>
            </motion.section>

            <motion.section 
              variants={sectionVariants}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold mb-4">Education</h2>
              <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold">Southern New Hampshire University</h3>
                <p className="text-neutral-600 dark:text-neutral-400">Bachelor of Science in Computer Science</p>
                <p className="text-neutral-600 dark:text-neutral-400">Expected Graduation: December 2025</p>
                <p className="mt-2">Relevant Coursework:</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>DSA: Analysis and Design</li>
                  <li>Software Development Lifecycle</li>
                  <li>Embedded Systems</li>
                  <li>Artificial Intelligence</li>
                </ul>
              </div>
            </motion.section>

            <motion.section 
              variants={sectionVariants}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold mb-4">Interests & Goals</h2>
              <p className="text-lg text-neutral-700 dark:text-neutral-300">
                Some of my interests include artificial intelligence and machine learning, with a particular 
                interest in developing intelligent systems and exploring data science applications. Additionally, 
                I enjoy full-stack development, where I can create complete solutions from backend architecture 
                to intuitive user interfaces. My goal is to combine these interests to build innovative 
                applications that leverage AI while delivering great user experiences.
              </p>
            </motion.section>

            <motion.section 
              variants={sectionVariants}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold mb-4">Beyond Coding</h2>
              <p className="text-lg text-neutral-700 dark:text-neutral-300">
                When I'm not coding, you can find me hiking, playing video games, 
                or at the gym. I believe in continuous learning and always trying to be the best version of myself.
              </p>
            </motion.section>

            <motion.div 
              variants={sectionVariants}
              className="text-center mt-12"
            >
              <BackToHomeButton />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
} 