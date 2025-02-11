import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchIcon } from '@heroicons/react/outline';

export default function ProjectSearch({ projects, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(query.toLowerCase()) ||
    project.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <SearchIcon className="w-5 h-5" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full right-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full p-4 bg-transparent border-b dark:border-gray-700"
              autoFocus
            />
            <div className="max-h-96 overflow-y-auto">
              {filteredProjects.map(project => (
                <motion.div
                  key={project.id}
                  whileHover={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
                  className="p-4 cursor-pointer"
                  onClick={() => {
                    onSelect(project);
                    setIsOpen(false);
                  }}
                >
                  <h3 className="font-medium">{project.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {project.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 