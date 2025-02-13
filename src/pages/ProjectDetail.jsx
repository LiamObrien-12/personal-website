import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PageTransition from '../components/PageTransition';
import { safehavenImages } from '../assets/projects/safehaven';
import { scrollToTop } from '../utils/scrollToTop';
import BackToHomeButton from '../components/BackToHomeButton';
import { portfolioImages } from '../assets/projects/portfolio';
import { useTheme } from '../providers/ThemeProvider';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  
  // We'll move this to a separate data file later
  const projectDetails = {
    safehaven: {
      title: "SafeHaven",
      subtitle: "An educational mobile banking application for young adults to learn financial management",
      role: {
        title: "ROLE",
        items: ["Lead Developer", "UI/UX Designer", "Scrum Master"]
      },
      timeline: {
        title: "TIMELINE",
        items: ["2024"]
      },
      frontend: {
        title: "FRONTEND",
        items: ["React Native", "Tailwind CSS", "JavaScript"]
      },
      backend: {
        title: "BACKEND",
        items: ["Node.js", "MongoDB"]
      },
      images: [
        {
          url: safehavenImages.dashboard,
          caption: "Dashboard showing balance and recent transactions"
        },
        {
          url: safehavenImages.investments,
          caption: "Investment portfolio tracking and management"
        },
        {
          url: safehavenImages.login,
          caption: "Secure login screen with email authentication"
        },
        {
          url: safehavenImages.register,
          caption: "User registration with streamlined onboarding"
        },
        {
          url: safehavenImages.profile1,
          caption: "User profile management with quick settings access"
        },
        {
          url: safehavenImages.profile2,
          caption: "Alternative profile view with user details"
        },
        {
          url: safehavenImages.settings,
          caption: "Settings page with dark mode toggle and user preferences"
        }
      ],
      description: `
        SafeHaven is an innovative educational platform designed to empower young adults with practical financial literacy 
        through hands-on experience in a risk-free environment. The application simulates real-world banking and investment 
        scenarios by allowing users to manage virtual funds and make investment decisions using real-time market data from 
        the Polygon.io API.

        The platform serves as a bridge between financial education and practical experience, enabling users to develop 
        sound financial decision-making skills before transitioning to actual banking and investment activities. By 
        providing immediate feedback on investment choices and financial decisions, SafeHaven creates a valuable learning 
        environment where users can build confidence and understanding of financial markets.

        Developed with a mobile-first approach using React Native and MongoDB, SafeHaven caters to the digital-native 
        generation's preference for mobile applications. The platform combines robust security features, including iOS 
        facial recognition, with an intuitive user interface to deliver a seamless and engaging learning experience in 
        personal finance management.
      `,
      features: [
        "Real-time stock market data integration via Polygon.io API",
        "Secure user authentication with facial recognition for iOS",
        "Investment portfolio simulation with real market prices",
        "Transaction history with detailed tracking",
        "Buy, sell, and trade functionality for stocks",
        "Dark/light mode theme customization",
        "User profile management and settings",
        "Real-time balance updates and monitoring",
        "Secure data storage with MongoDB",
        "Responsive mobile-first design"
      ],
      technologies: {
        title: "TECHNOLOGIES",
        items: [
          "MongoDB: Authentication and Database",
          "React Native: Mobile Architecture",
          "GitHub: Repository Sharing",
          "Discord: Communication",
          "Expo Go: Testing and Running"
        ]
      },
      challenges: {
        title: "CHALLENGES & LEARNINGS",
        items: [
          "Software updates: Faced challenges with Expo Go and React Native updates in November",
          "Sprint estimations: Learned to set realistic goals for sprints",
          "Team communication: Maintained effective collaboration outside class",
          "Project vision: Maintained consistent project direction",
          "Research: Thorough technology research before implementation",
          "User feedback: Incorporated external opinions for improvement"
        ]
      },
      github: "https://github.com/LiamObrien-12/safehaven",
      live: "https://safehaven-demo.com"
    },
    portfolio: {
      title: "Personal Portfolio",
      subtitle: "A modern, responsive portfolio website built with React and Tailwind CSS",
      role: {
        title: "ROLE",
        items: ["Full-Stack Developer", "UI/UX Designer"]
      },
      timeline: {
        title: "TIMELINE",
        items: ["2025"]
      },
      frontend: {
        title: "FRONTEND",
        items: ["React", "Tailwind CSS", "Framer Motion"]
      },
      backend: {
        title: "DEPLOYMENT",
        items: ["Vercel", "GitHub Actions"]
      },
      images: [
        {
          url: darkMode ? portfolioImages.home.dark : portfolioImages.home.light,
          caption: "Homepage with animated hero section and dynamic theme switching"
        },
        {
          url: portfolioImages.contact,
          caption: "Contact page with animated background and form validation"
        },
        {
          url: portfolioImages.about,
          caption: "About page with responsive layout and custom animations"
        }
      ],
      description: `
        This portfolio website was built to showcase my projects and skills in a modern, interactive way. The site 
        features a clean, minimalist design with smooth animations and transitions powered by Framer Motion. The 
        dark/light theme switching provides optimal viewing experience in any lighting condition.

        The website is built with React and styled using Tailwind CSS, making it fully responsive across all devices. 
        Custom animations and transitions were implemented using Framer Motion to create an engaging user experience. 
        The contact form is integrated with EmailJS for seamless communication.

        Special attention was paid to accessibility and performance, with optimized images and lazy loading implemented 
        throughout. The site maintains a clean, professional aesthetic while incorporating subtle interactive elements 
        to engage visitors.
      `,
      features: [
        "Dynamic dark/light theme switching",
        "Smooth page transitions and animations",
        "Responsive design for all screen sizes",
        "Interactive project showcases",
        "Integrated contact form with EmailJS",
        "Custom animated components",
        "Optimized performance and loading",
        "Accessible navigation and content",
        "Clean, modern UI design",
        "Seamless page routing"
      ],
      technologies: {
        title: "TECHNOLOGIES",
        items: [
          "React: Frontend Framework",
          "Tailwind CSS: Styling",
          "Framer Motion: Animations",
          "EmailJS: Contact Form",
          "React Router: Navigation",
          "Vercel: Deployment"
        ]
      },
      challenges: {
        title: "CHALLENGES & LEARNINGS",
        items: [
          "Animation optimization: Balancing smooth animations with performance",
          "Theme implementation: Creating a seamless dark/light mode transition",
          "Responsive design: Ensuring consistent experience across devices",
          "Form validation: Implementing robust error handling",
          "Code organization: Maintaining clean, modular component structure",
          "Performance: Optimizing load times and animations"
        ]
      },
      github: "https://github.com/LiamObrien-12/personal-website",
      live: "https://liamaobrien.com"
    },
    // Add more projects here
  };

  const project = projectDetails[id];

  const InfoSection = ({ title, items }) => (
    <div>
      <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-2">
        {title}
      </h3>
      {items.map((item, index) => (
        <p key={index} className="text-neutral-900 dark:text-neutral-100">
          {item}
        </p>
      ))}
    </div>
  );

  // Add this new component
  const ImageCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Auto-switching functionality
    useEffect(() => {
      if (!isPaused) {
        const timer = setInterval(() => {
          setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 4000);

        return () => clearInterval(timer);
      }
    }, [images.length, isPaused]);

    const next = () => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prev = () => {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
      <div 
        className="relative w-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="overflow-hidden rounded-xl aspect-[16/9] max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full"
            >
              <img
                src={images[currentIndex].url}
                alt={images[currentIndex].caption}
                className="w-full h-full object-contain bg-neutral-100 dark:bg-neutral-800"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent text-white">
                <p className="text-sm md:text-base opacity-90">
                  {images[currentIndex].caption}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40 transition-colors"
        >
          <span className="sr-only">Previous</span>
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40 transition-colors"
        >
          <span className="sr-only">Next</span>
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>
    );
  };

  const handleBackToHome = (e) => {
    e.preventDefault();
    navigate('/');
    scrollToTop();
  };

  const handleLiveDemo = (e) => {
    e.preventDefault();
    if (id === 'portfolio') {
      navigate('/');
      scrollToTop();
    } else {
      window.open(projectDetails[id].live, '_blank');
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background-light dark:bg-background-dark pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BackToHomeButton />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              {project.title}
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400">
              {project.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <InfoSection {...project.role} />
            <InfoSection {...project.timeline} />
            <InfoSection {...project.frontend} />
            <InfoSection {...project.backend} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <ImageCarousel images={project.images} />
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="prose dark:prose-invert max-w-none"
            >
              <p className="text-lg">{project.description}</p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                {project.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                    <span className="text-neutral-700 dark:text-neutral-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex gap-4 mt-8"
            >
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-neutral-900 dark:bg-neutral-100 text-neutral-100 dark:text-neutral-900 rounded-lg hover:bg-neutral-700 dark:hover:bg-neutral-200 transition-colors"
              >
                View on GitHub
              </a>
              <button
                onClick={handleLiveDemo}
                className="px-6 py-3 border border-neutral-900 dark:border-neutral-100 text-neutral-900 dark:text-neutral-100 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                Live Demo
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ProjectDetail; 