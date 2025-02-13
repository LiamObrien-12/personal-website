import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import BackToHomeButton from '../components/BackToHomeButton';
import PageTransition from '../components/PageTransition';

export default function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find(post => post.id === id);

  if (!post) return <div>Post not found</div>;

  return (
    <PageTransition>
      <div className="min-h-screen bg-background-light dark:bg-background-dark pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <BackToHomeButton />
          
          <article className="prose dark:prose-invert max-w-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
              <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400 mb-8">
                <span>{post.category}</span>
                <span className="mx-2">•</span>
                <span>{post.date}</span>
                <span className="mx-2">•</span>
                <span>{post.readTime}</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="whitespace-pre-wrap"
            >
              {post.content}
            </motion.div>
          </article>
        </div>
      </div>
    </PageTransition>
  );
} 