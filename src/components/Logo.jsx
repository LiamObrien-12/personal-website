import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

export default function Logo() {
  const { theme } = useTheme();
  
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative w-10 h-10 flex items-center justify-center"
    >
      <motion.div
        className="absolute inset-0 rounded-lg"
        animate={{
          backgroundColor: theme === 'dark' ? '#ffffff' : '#000000',
        }}
        transition={{ duration: 0.3 }}
      />
      <motion.span
        className="relative font-bold text-lg"
        animate={{
          color: theme === 'dark' ? '#000000' : '#ffffff',
        }}
        transition={{ duration: 0.3 }}
      >
        LO
      </motion.span>
    </motion.div>
  );
} 