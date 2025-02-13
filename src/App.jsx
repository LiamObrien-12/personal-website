import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ThemeProvider from './providers/ThemeProvider';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Bubbles from './components/Bubbles';
import Skills from './components/Skills';
import Experience from './components/Experience';
import About from './pages/About';
import ProjectDetail from './pages/ProjectDetail';
import ContactPage from './pages/Contact';
import { scrollToTop } from './utils/scrollToTop';
import HomeContact from './components/HomeContact';
import BlogPost from './pages/BlogPost';
import Blog from './components/Blog';

function App() {
  const handleNavigation = (e, path) => {
    e.preventDefault();
    scrollToTop();
  };

  return (
    <BrowserRouter>
      <ThemeProvider>
        <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-300">
          <Navbar />
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/" element={
              <main>
                <section id="hero" className="relative">
                  <Hero />
                  <Bubbles />
                </section>
                
                <section id="projects" className="relative">
                  <Projects />
                </section>

                <section id="experience" className="relative">
                  <Experience />
                </section>

                <section id="skills" className="relative">
                  <Skills />
                </section>

                <section id="blog" className="relative">
                  <Blog />
                </section>

                <section id="home-contact" className="relative">
                  <HomeContact />
                </section>
              </main>
            } />
          </Routes>
          <Footer />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App; 