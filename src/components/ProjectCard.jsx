import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function ProjectCard({ project }) {
  return (
    <Link to={project.link}>
      <motion.div
        whileHover={{ y: -8 }}
        className="relative group cursor-pointer"
      >
        <motion.div
          className={`rounded-2xl overflow-hidden ${project.backgroundColor} p-8`}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="mb-4">
            <span className="text-sm text-gray-600">{project.category}</span>
            <h3 className="text-2xl font-bold mt-1">{project.title}</h3>
          </div>
          <div className="overflow-hidden rounded-lg">
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </motion.div>
      </motion.div>
    </Link>
  );
} 