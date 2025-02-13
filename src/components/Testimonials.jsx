import { motion } from 'framer-motion';

export default function Testimonials() {
  const testimonials = [
    {
      quote: "Exceptional work ethic and technical skills. A pleasure to work with!",
      author: "John Doe",
      role: "Senior Developer",
      company: "Tech Corp"
    },
    // Add more testimonials
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
            What People Say
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm"
            >
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-4">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center">
                <div>
                  <p className="font-medium text-neutral-900 dark:text-neutral-100">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 