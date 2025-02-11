import { motion } from 'framer-motion';

const technologies = [
  { 
    name: 'Python', 
    icon: '/icons/python.svg'
  },
  { 
    name: 'C++', 
    icon: '/icons/cpp.svg'
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
      <div className="flex flex-col mx-auto gap-6 lg:gap-8 text-center max-w-3xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-2"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-neutral-100">
            Hi. I'm Liam.
          </h1>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-100">
            Software Engineer & Developer
          </h2>
          <h3 className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400">
            From Bedford, NH
          </h3>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center gap-4"
        >
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Technologies:
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
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
      </div>

      {/* Floating bubbles - reduced size and contained within viewport */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute left-4 bottom-4 md:left-8 md:bottom-8"
      >
        <div className="relative w-[60px] h-[100px] md:w-[120px] md:h-[180px]">
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-0 left-[40%] w-[8px] h-[8px] md:w-[16px] md:h-[16px] bg-primary-200 dark:bg-primary-800 rounded-full"
          />
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute top-[25%] left-[25%] w-[12px] h-[12px] md:w-[24px] md:h-[24px] bg-primary-300 dark:bg-primary-700 rounded-full"
          />
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute top-[45%] left-[60%] w-[16px] h-[16px] md:w-[32px] md:h-[32px] bg-primary-400 dark:bg-primary-600 rounded-full"
          />
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute bottom-0 left-[0px] w-[24px] h-[24px] md:w-[48px] md:h-[48px] bg-primary-500 dark:bg-primary-500 rounded-full"
          />
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute right-4 top-4 md:right-8 md:top-8"
      >
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="flex items-center justify-center w-[60px] h-[60px] md:w-[120px] md:h-[120px] bg-primary-200 dark:bg-primary-600 rounded-full"
        >
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl md:text-4xl"
          >
            👋🏻
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
} 