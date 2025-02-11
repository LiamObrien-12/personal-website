import { BrowserRouter as Router } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import ThemeProvider from './providers/ThemeProvider';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Contact from './components/Contact';
import ChatBot from './components/ChatBot';
import Footer from './components/Footer';
import Bubbles from './components/Bubbles';
import Newsletter from './components/Newsletter';
import CustomCursor from './components/CustomCursor';

function App() {
  useKeyboardShortcuts();

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-300">
          <CustomCursor />
          <AnimatePresence mode="wait">
            <Navbar />
            <main>
              <section id="hero" className="relative">
                <Bubbles />
                <Hero />
              </section>
              <section id="projects">
                <Projects />
              </section>
              <section id="contact">
                <Contact />
              </section>
              <Newsletter />
            </main>
            <Footer />
            <ChatBot />
          </AnimatePresence>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App; 