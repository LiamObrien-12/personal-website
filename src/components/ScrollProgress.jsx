import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-black dark:bg-white origin-[0%] z-50"
        style={{ scaleX }}
      />
      <motion.div
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-medium z-40"
        style={{ opacity: scrollYProgress }}
      >
        <motion.span>
          {Math.round(scrollYProgress.get() * 100)}%
        </motion.span>
      </motion.div>
    </>
  );
} 