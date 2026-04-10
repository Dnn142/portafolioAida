import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import Vision from './sections/Vision';
import Mission from './sections/Mission';
import Specialties from './sections/Specialties';
import Journey from './sections/Journey';
import Gallery from './sections/Gallery';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Initialize ScrollTrigger
    ScrollTrigger.refresh();

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <Services />
        <Vision />
        <Mission />
        <Specialties />
        <Journey />
        <Gallery />
        <Contact />
        <Footer />
      </main>

      {/* Global decorative elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#d4a574]/[0.02] to-transparent" />
      </div>
    </div>
  );
}

export default App;
