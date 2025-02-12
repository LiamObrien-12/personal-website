import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { scrollToTop } from '../utils/scrollToTop';

export default function BackToHomeButton() {
  const navigate = useNavigate();

  const handleBackToHome = (e) => {
    e.preventDefault();
    navigate('/');
    scrollToTop();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-24 left-4 z-50"
    >
      <Link
        to="/"
        onClick={handleBackToHome}
        className="inline-block px-6 py-3 bg-neutral-900 dark:bg-neutral-100 text-neutral-100 dark:text-neutral-900 rounded-lg hover:bg-neutral-700 dark:hover:bg-neutral-200 transition-colors"
      >
        Back to Home
      </Link>
    </motion.div>
  );
} 