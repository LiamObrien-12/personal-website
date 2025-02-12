import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import Contact from '../components/Contact';
import BackToHomeButton from '../components/BackToHomeButton';

const iconVariants = {
  initial: { scale: 0, rotate: -180 },
  animate: { 
    scale: 1, 
    rotate: 0,
    transition: { 
      type: "spring",
      stiffness: 260,
      damping: 20,
      delay: 0.3
    }
  }
};

const decorativeIcons = [
  { icon: "💌", position: "top-52 left-10" },
  { icon: "💻", position: "top-40 right-20" },
  { icon: "🚀", position: "bottom-32 left-20" },
  { icon: "✨", position: "bottom-40 right-10" },
];

export default function ContactPage() {
  return (
    <PageTransition>
      {/* Main container with fixed height and proper overflow */}
      <div className="h-screen bg-background-light dark:bg-background-dark relative">
        {/* Scrollable content container */}
        <div className="h-full overflow-y-auto pt-24">
          {/* Background elements */}
          <div className="fixed inset-0">
            {/* Decorative Icons */}
            {decorativeIcons.map((item, index) => (
              <motion.div
                key={index}
                variants={iconVariants}
                initial="initial"
                animate="animate"
                className={`fixed text-4xl ${item.position} opacity-40 dark:opacity-20 hidden md:block`}
                style={{ transition: 'transform 0.3s ease' }}
                whileHover={{ scale: 1.2, opacity: 0.8 }}
              >
                {item.icon}
              </motion.div>
            ))}

            {/* Animated Background Elements */}
            <motion.div
              className="absolute -inset-[200px]"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-full h-full bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 dark:from-purple-500/30 dark:via-blue-500/30 dark:to-purple-500/30 rounded-full blur-3xl" />
            </motion.div>
          </div>

          {/* Content */}
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
            <BackToHomeButton />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <motion.h1 
                className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Get in Touch
              </motion.h1>
              <motion.p 
                className="text-xl text-neutral-700 dark:text-neutral-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Let's connect and discuss opportunities
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: 0.4,
                type: "spring",
                stiffness: 100,
                damping: 20
              }}
              className="relative bg-white/70 dark:bg-neutral-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg"
            >
              <Contact />
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
} 