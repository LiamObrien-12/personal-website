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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer"
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
                    className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                  >
                    Read more →
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
} 