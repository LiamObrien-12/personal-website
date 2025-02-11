import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Project One',
    category: 'Web App',
    image: '/path-to-image.jpg',
    backgroundColor: 'bg-blue-50',
    link: '/project-1'
  },
  // Add more projects...
];

export default function Projects() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 gap-16">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className={`rounded-2xl overflow-hidden ${project.backgroundColor} p-8`}>
              <div className="mb-4">
                <span className="text-sm text-gray-600">{project.category}</span>
                <h3 className="text-2xl font-bold mt-1">{project.title}</h3>
              </div>
              <img
                src={project.image}
                alt={project.title}
                className="rounded-lg w-full shadow-lg"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 