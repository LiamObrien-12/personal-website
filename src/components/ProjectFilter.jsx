import { motion } from 'framer-motion';

const categories = ['All', 'Web App', 'Mobile App', 'Design'];

export default function ProjectFilter({ activeFilter, setActiveFilter }) {
  return (
    <div className="flex justify-center space-x-4 mb-12">
      {categories.map((category) => (
        <motion.button
          key={category}
          onClick={() => setActiveFilter(category)}
          className={`px-4 py-2 rounded-full ${
            activeFilter === category
              ? 'bg-black text-white dark:bg-white dark:text-black'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {category}
        </motion.button>
      ))}
    </div>
  );
} 