import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon } from '@heroicons/react/outline';

export default function ProjectModal({ isOpen, onClose, project }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          static
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          open={isOpen}
          onClose={onClose}
          className="fixed inset-0 z-50 overflow-y-auto"
        >
          <div className="min-h-screen px-4 text-center">
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
            
            <div className="inline-block w-full max-w-4xl p-6 my-8 text-left align-middle bg-white dark:bg-gray-900 rounded-lg shadow-xl transform transition-all">
              <div className="absolute top-4 right-4">
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                >
                  <XIcon className="w-6 h-6" />
                </button>
              </div>
              
              <Dialog.Title as="h3" className="text-2xl font-bold mb-4">
                {project.title}
              </Dialog.Title>
              
              <div className="aspect-video mb-6">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              
              <div className="prose dark:prose-invert max-w-none">
                {project.description}
              </div>
              
              <div className="mt-6 flex gap-4">
                {project.links?.map(link => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                  >
                    {link.text}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
} 