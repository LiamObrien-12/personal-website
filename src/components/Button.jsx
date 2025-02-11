import { motion } from 'framer-motion';

export default function Button({ children, ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
      {...props}
    >
      {children}
    </motion.button>
  );
} 