import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-300">
          <Navbar />
          <Routes>
            <Route path="/about" element={<About />} />
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

                <section id="contact" className="relative">
                  <Contact />
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