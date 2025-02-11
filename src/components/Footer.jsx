import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function Footer() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const [year] = useState(new Date().getFullYear());

  return (
    <footer className="py-8 px-4">
      <motion.div
        className="fixed left-0 right-0 bottom-16 h-1 bg-black dark:bg-white origin-[0%]"
        style={{ scaleX }}
      />
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.p 
          className="text-sm text-gray-600"
          whileHover={{ scale: 1.02 }}
        >
          <motion.span
            initial={{ backgroundSize: '0% 2px' }}
            whileHover={{ backgroundSize: '100% 2px' }}
            className="bg-gradient-to-r from-black to-black dark:from-white dark:to-white bg-no-repeat bg-bottom"
            style={{ backgroundSize: '0% 2px' }}
          >
            Designed and developed by Liam
          </motion.span>
          {' '}© 2025
        </motion.p>
        <div className="flex space-x-6">
          <a
            href="https://github.com/LiamObrien-12"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-black transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/liamaobrien"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-black transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://www.instagram.com/lliamobrien/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-black transition-colors"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
} 