import { motion } from 'framer-motion';
import { useTheme } from '../providers/ThemeProvider';

export default function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className="relative rounded-full w-12 h-7 bg-neutral-200 dark:bg-neutral-700 transition-all duration-300 ease-in-out"
      aria-label="Toggle dark mode"
    >
      <motion.div
        initial={false}
        animate={{
          x: darkMode ? 24 : 2,
          backgroundColor: darkMode ? '#ffffff' : '#000000'
        }}
        transition={{ 
          type: "spring", 
          stiffness: 300,
          damping: 25,
          duration: 0.3
        }}
        className="absolute top-1 left-0 w-5 h-5 rounded-full shadow-md flex items-center justify-center transition-all duration-300 ease-in-out"
      >
        <motion.span 
          className="text-[10px]"
          animate={{ 
            rotate: darkMode ? 360 : 0,
            scale: 1.1
          }}
          transition={{ duration: 0.3 }}
        >
          {darkMode ? '🌙' : '☀️'}
        </motion.span>
      </motion.div>
    </button>
  );
} 