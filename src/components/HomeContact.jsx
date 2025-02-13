import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { scrollToTop } from '../utils/scrollToTop';

export default function HomeContact() {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate('/contact');
    scrollToTop();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center py-16"
    >
      <h2 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
        Get in Contact!
      </h2>
      <motion.button
        onClick={handleContactClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-8 py-4 bg-primary-500 dark:bg-primary-600 text-neutral-900 dark:text-neutral-100 rounded-lg text-lg font-medium hover:bg-primary-400 dark:hover:bg-primary-500 transition-colors"
      >
        Let's Connect
      </motion.button>
    </motion.div>
  );
} 