import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import { scrollToTop } from '../utils/scrollToTop';

export default function Blog() {
  const navigate = useNavigate();

  const handleReadMore = (postId) => {
    navigate(`/blog/${postId}`);
    scrollToTop();
  };

  return (
    <section className="py-20 bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100">Latest Articles</h2>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
            Thoughts on programming, design, and technology
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            },
            hidden: {
              opacity: 0
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              variants={{
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    ease: [0.6, -0.05, 0.01, 0.99]
                  }
                },
                hidden: {
                  opacity: 0,
                  y: 50
                }
              }}
              className="bg-white dark:bg-neutral-900 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => handleReadMore(post.id)}
            >
              <div className="p-6">
                <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400 mb-2">
                  <span>{post.category}</span>
                  <span className="mx-2">•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                  {post.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">{post.date}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReadMore(post.id);
                    }}
                    className="text-neutral-900 dark:text-neutral-100 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
                  >
                    Read more →
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 