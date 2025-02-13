import { motion } from 'framer-motion';

export default function Services() {
  const services = [
    {
      title: "Web Development",
      description: "Building responsive and performant web applications using modern technologies",
      icon: "💻" // You can replace with proper icons
    },
    {
      title: "Mobile Development",
      description: "Creating cross-platform mobile applications with React Native",
      icon: "📱"
    },
    {
      title: "UI/UX Design",
      description: "Designing intuitive and beautiful user interfaces",
      icon: "🎨"
    }
    // Add more services
  ];

  return (
    <section className="py-20 bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100">
            What I Do
          </h2>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
            Specialized services to help bring your ideas to life
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                {service.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 