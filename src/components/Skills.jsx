import { motion } from 'framer-motion';

const skillsData = {
  currentTechnologies: [
    { 
      name: 'Figma',
      type: 'Design Tool',
      icon: '/icons/figma.svg'
    },
    { 
      name: 'React',
      type: 'Frontend Library',
      icon: '/icons/react.svg'
    },
    { 
      name: 'NextJS',
      type: 'React Framework',
      icon: '/icons/nextjs.svg'
    },
    { 
      name: 'Tailwind',
      type: 'CSS Framework',
      icon: '/icons/tailwind.svg'
    },
    { 
      name: 'Python',
      type: 'Programming Language',
      icon: '/icons/python.svg'
    },
    { 
      name: 'C++',
      type: 'Programming Language',
      icon: '/icons/cpp-real.svg'
    },
    { 
      name: 'Git',
      type: 'Version Control',
      icon: '/icons/git.svg'
    },
    { 
      name: 'Node.js',
      type: 'Runtime Environment',
      icon: '/icons/nodejs.svg'
    }
  ]
};

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100">
            Current technologies
          </h2>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
            I'm proficient in a range of modern technologies that empower me to build highly functional solutions.
            These are some of my main technologies.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                staggerChildren: 0.1
              }
            },
            hidden: {
              opacity: 0,
              y: 50
            }
          }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {skillsData.currentTechnologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              variants={{
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: [0.6, -0.05, 0.01, 0.99]
                  }
                },
                hidden: {
                  opacity: 0,
                  y: 50
                }
              }}
              className="bg-white dark:bg-neutral-900 rounded-xl p-4 flex flex-col items-center gap-2 hover:bg-gray-50 dark:hover:bg-neutral-800 transition-all duration-300 shadow-sm"
            >
              <div className="w-12 h-12 flex items-center justify-center">
                <img 
                  src={tech.icon} 
                  alt={tech.name}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                {tech.name}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {tech.type}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 