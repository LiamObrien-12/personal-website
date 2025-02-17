import { motion } from 'framer-motion';

const technologies = [
  { 
    name: 'Python', 
    icon: '/icons/python.svg'
  },
  { 
    name: 'C++', 
    icon: '/icons/cpp-real.svg'
  },
  { 
    name: 'React', 
    icon: '/icons/react.svg'
  },
  { 
    name: 'Node.js', 
    icon: '/icons/nodejs.svg'
  }
];

export default function Hero() {
  return (
    <div className="relative flex flex-col justify-center min-h-screen px-4 overflow-hidden">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2
            }
          }
        }}
        className="flex flex-col mx-auto gap-6 lg:gap-8 text-center max-w-3xl"
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.8,
                ease: [0.6, -0.05, 0.01, 0.99]
              }
            }
          }}
          className="flex flex-col gap-2"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center justify-center gap-2">
            Hi. I'm Liam.
            <motion.span
              whileHover={{ 
                rotate: [0, 15, -15, 0],
                transition: { 
                  duration: 1.5,
                  ease: "easeInOut"
                }
              }}
              className="cursor-pointer"
            >
              👋🏻
            </motion.span>
          </h1>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-100">
            Software Engineer & Developer
          </h2>
          <h3 className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 flex items-center justify-center gap-2">
            <svg 
              className="w-5 h-5" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Bedford, NH
          </h3>
        </motion.div>
        
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.8,
                ease: [0.6, -0.05, 0.01, 0.99]
              }
            }
          }}
          className="flex flex-col items-center gap-4"
        >
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Technologies:
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.8,
                      ease: [0.6, -0.05, 0.01, 0.99]
                    }
                  }
                }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-10 h-10 md:w-12 md:h-12">
                  <img 
                    src={tech.icon} 
                    alt={tech.name}
                    className="w-full h-full"
                  />
                </div>
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Replace bubbles with subtle gradient shapes */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0"
        >
          {/* Top right gradient */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary-200/20 dark:from-primary-800/20 to-transparent rounded-full blur-3xl" />
          
          {/* Bottom left gradient */}
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-primary-300/20 dark:from-primary-700/20 to-transparent rounded-full blur-3xl" />
          
          {/* Center subtle accent */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-primary-200/10 dark:from-primary-800/10 to-transparent rounded-full blur-2xl" />
        </motion.div>
      </div>
    </div>
  );
} 