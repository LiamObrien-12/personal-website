import { motion } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PageTransition from '../components/PageTransition';
import { safehavenImages } from '../assets/projects/safehaven';
import { scrollToTop } from '../utils/scrollToTop';
import BackToHomeButton from '../components/BackToHomeButton';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
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
    
    useEffect(() => {
      if (!isPaused) {
        const timer = setInterval(() => {
          setCurrentIndex((prevIndex) => 
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
          );
        }, 4000);

        return () => clearInterval(timer);
      }
    }, [images.length, isPaused]);

    const nextSlide = () => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    };

    const prevSlide = () => {
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    };

    return (
      <div 
        className="relative max-w-2xl mx-auto flex flex-col items-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative flex flex-col items-center justify-center min-h-[600px]">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ 
              duration: 0.7,
              ease: [0.4, 0, 0.2, 1], // Smooth easing function
              opacity: { duration: 0.5 },
              x: { duration: 0.5 }
            }}
            className="rounded-xl overflow-hidden shadow-lg max-w-[280px]"
          >
            <motion.img
              src={images[currentIndex].url}
              alt={images[currentIndex].caption}
              className="w-full h-auto object-contain"
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            />
          </motion.div>
          <motion.p
            key={`caption-${currentIndex}`}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center text-neutral-600 dark:text-neutral-400 italic mt-4 max-w-md"
          >
            {images[currentIndex].caption}
          </motion.p>
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-neutral-900 dark:bg-neutral-100 text-neutral-100 dark:text-neutral-900 rounded-full hover:bg-neutral-700 dark:hover:bg-neutral-200 transition-all duration-300 hover:scale-110"
        >
          ←
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-neutral-900 dark:bg-neutral-100 text-neutral-100 dark:text-neutral-900 rounded-full hover:bg-neutral-700 dark:hover:bg-neutral-200 transition-all duration-300 hover:scale-110"
        >
          →
        </button>

        <div className="flex justify-center gap-2 mt-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-neutral-900 dark:bg-neutral-100 scale-125' 
                  : 'bg-neutral-300 dark:bg-neutral-700 hover:scale-110'
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
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-neutral-900 dark:border-neutral-100 text-neutral-900 dark:text-neutral-100 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                Live Demo
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ProjectDetail; 