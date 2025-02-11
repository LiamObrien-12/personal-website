import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    // Add your comment submission logic here
    const comment = {
      id: Date.now(),
      text: newComment,
      author: 'Guest User',
      date: new Date().toISOString(),
    };

    setComments(prev => [...prev, comment]);
    setNewComment('');
  };

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold mb-6">Comments</h3>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-black dark:bg-gray-800 dark:border-gray-700"
          placeholder="Add a comment..."
          rows={3}
        />
        <button
          type="submit"
          className="mt-2 px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800"
        >
          Post Comment
        </button>
      </form>

      <div className="space-y-6">
        {comments.map(comment => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
          >
            <div className="flex justify-between mb-2">
              <span className="font-medium">{comment.author}</span>
              <time className="text-sm text-gray-500">
                {new Date(comment.date).toLocaleDateString()}
              </time>
            </div>
            <p className="text-gray-700 dark:text-gray-300">{comment.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 