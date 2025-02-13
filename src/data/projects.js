import { safehavenImages } from '../assets/projects/safehaven';
import { portfolioImages } from '../assets/projects/portfolio';

export const projects = [
  {
    id: 'safehaven',
    title: 'SafeHaven',
    type: 'Mobile App',
    description: 'An educational mobile banking application for young adults to learn financial management',
    bgColor: 'bg-[#FFF3E0]', // Warm orange/peach background
    textColor: 'text-neutral-900',
    image: safehavenImages.dashboard,
    links: {
      github: 'https://github.com/LiamObrien-12/safehaven',
      live: '#'
    }
  },
  {
    id: 'portfolio',
    title: 'Personal Website',
    type: 'Web App',
    description: 'A modern, responsive portfolio website built with React and Tailwind CSS',
    bgColor: 'bg-[#E8F5E9]', // Light green background
    textColor: 'text-neutral-900',
    image: portfolioImages.thumbnail.light, // This will use your existing portfolio thumbnail
    links: {
      github: 'https://github.com/LiamObrien-12/personal-website',
      live: 'https://liamaobrien.com'
    }
  }
]; 