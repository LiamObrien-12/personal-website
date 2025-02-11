import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <motion.div 
      className="min-h-screen flex items-center relative"
      style={{ y, opacity }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1 
          className="text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Hi. I'm <span className="text-blue-600">Liam O'Brien</span>.
        </motion.h1>
        <motion.h2 
          className="text-6xl font-bold mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Developer & Engineer.
        </motion.h2>
        <motion.p 
          className="text-xl text-gray-600 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          A driven creator and technologist, constantly seeking to elevate user 
          experiences through innovative solutions and cutting-edge development.
        </motion.p>
        <div className="mt-8">
          <span className="text-6xl">👋🏻</span>
        </div>
      </div>
    </motion.div>
  );
} 