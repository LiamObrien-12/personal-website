import { motion } from 'framer-motion';

export default function Bubbles() {
  return (
    <div className="absolute top-0 right-0 -z-10">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="w-32 h-32 rounded-full bg-blue-100/50 absolute top-40 right-20"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="w-24 h-24 rounded-full bg-green-100/50 absolute top-20 right-40"
      />
      {/* Add more bubbles as needed */}
    </div>
  );
} 