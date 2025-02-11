import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from './providers/ThemeProvider';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-300">
          <Navbar />
          <main>
            <section id="hero" className="relative">
              <Hero />
            </section>
          </main>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App; 