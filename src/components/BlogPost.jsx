import { motion } from 'framer-motion';
import { format } from 'date-fns';

export default function BlogPost({ post }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="prose dark:prose-invert max-w-none"
    >
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center text-gray-600 dark:text-gray-400">
          <time dateTime={post.date}>
            {format(new Date(post.date), 'MMMM d, yyyy')}
          </time>
          <span className="mx-2">·</span>
          <div className="flex gap-2">
            {post.tags.map(tag => (
              <span key={tag} className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </motion.article>
  );
} 