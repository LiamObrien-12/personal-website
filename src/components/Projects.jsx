import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { safehavenImages } from '../assets/projects/safehaven';
import { scrollToTop } from '../utils/scrollToTop';

const projects = [
  {
    id: 'safehaven',
    title: "SafeHaven",
    description: "An educational mobile banking application for young adults to learn financial management through hands-on experience with virtual funds and real-time market data.",
    images: [
      safehavenImages.dashboard,
      safehavenImages.investments,
      safehavenImages.login,
      safehavenImages.profile1,
    ],
    technologies: ["React Native", "MongoDB", "Node.js", "JavaScript"],
    github: "https://github.com/LiamObrien-12/safehaven",
    live: "https://safehaven-demo.com"
  },
  {
    title: "Portfolio Website",
    description: "Personal portfolio website built with React and Tailwind CSS. Features dark mode, responsive design, smooth animations, and a contact form.",
    image: "/projects/portfolio.png", // Add your screenshot
    technologies: ["React", "Tailwind CSS", "Framer Motion", "EmailJS"],
    liveDemo: "https://liamaobrien.com", // Your domain
    github: "https://github.com/LiamObrien-12/portfolio",
    details: [
      "Implemented dark/light mode with smooth transitions",
      "Created responsive design that works on all devices",
      "Added smooth scroll and page animations using Framer Motion",
      "Integrated EmailJS for contact form functionality"
    ]
  },
  // Add more of your projects like:
  {
    title: "AI Chat Assistant",
    description: "An AI-powered chat assistant that can engage in natural conversations and help with various tasks.",
    image: "/projects/ai-chat.png",
    technologies: ["Python", "OpenAI API", "TensorFlow", "Natural Language Processing"],
    github: "https://github.com/LiamObrien-12/ai-chat",
    details: [
      "Integrated OpenAI's GPT model for natural language processing",
      "Implemented context awareness and memory management",
      "Added support for multiple conversation types",
      "Created a user-friendly interface for interaction"
    ]
  },
  // Add your other projects...
];

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  const handleProjectClick = () => {
    navigate(`/project/${project.id}`);
    scrollToTop();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      onClick={handleProjectClick}
      className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg overflow-hidden cursor-pointer group"
    >
      <div className="relative h-[220px] overflow-hidden bg-neutral-100 dark:bg-neutral-900 p-4">
        <div className="grid grid-cols-2 gap-2 h-full">
          {/* Main/Larger Image */}
          <div className="relative h-full">
            <img
              src={safehavenImages.dashboard}
              alt="SafeHaven Dashboard"
              className="w-full h-full object-contain rounded-lg shadow-md"
            />
          </div>
          {/* Smaller Images Grid */}
          <div className="grid grid-rows-2 gap-2 h-full">
            <img
              src={safehavenImages.investments}
              alt="SafeHaven Investments"
              className="w-full h-full object-contain rounded-lg shadow-md"
            />
            <img
              src={safehavenImages.login}
              alt="SafeHaven Login"
              className="w-full h-full object-contain rounded-lg shadow-md"
            />
          </div>
        </div>
        {/* Overlay with project info */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
          <p className="text-neutral-200 text-sm line-clamp-2">{project.description}</p>
        </div>
      </div>
      <div className="p-4">
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100">Featured Projects</h2>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
            Here are some of the projects I've worked on
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
} 