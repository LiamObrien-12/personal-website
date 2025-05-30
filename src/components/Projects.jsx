import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';

export default function Projects() {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            transition: {
              duration: 0.8,
              ease: [0.6, -0.05, 0.01, 0.99]
            }
          }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100">
            Featured Projects
          </h2>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
            Some of my recent work
          </p>
        </motion.div>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: 0.8,
                  ease: [0.6, -0.05, 0.01, 0.99]
                }
              }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.2 }}
              className="rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 p-8 md:p-12 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="order-2 lg:order-1">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                        {project.type}
                      </p>
                      <h3 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                        {project.title}
                      </h3>
                    </div>
                    <p className="text-lg text-neutral-600 dark:text-neutral-400">
                      {project.description}
                    </p>
                    <div className="pt-4">
                      <Link
                        to={`/project/${project.id}`}
                        className="inline-flex items-center px-6 py-3 bg-neutral-900 dark:bg-neutral-100 text-neutral-100 dark:text-neutral-900 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 