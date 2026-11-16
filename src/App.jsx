import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { ConstellationField } from './components/ui/constellation-field';
import ElectricGazeBackground from './components/ElectricGazeBackground';

function Loader() {
  return (
    <motion.div
      className="loader"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <motion.div
        className="loader-ring"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      <motion.p
        className="loader-text"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        &lt;Dinesh /&gt;
      </motion.p>
    </motion.div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [bgMode, setBgMode] = useState('constellation'); // 'constellation' | 'electric' | 'both'

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="app">
      <AnimatePresence>
        {loading && <Loader key="loader" />}
      </AnimatePresence>

      {/* Global Animated Background covering all scrolling pages */}
      <div className="global-background-container">
        {(bgMode === 'constellation' || bgMode === 'both') && (
          <ConstellationField
            variant="constellation"
            mode="dark"
            speed={0.9}
            size={1.1}
            density={1.3}
            opacity={bgMode === 'both' ? 0.65 : 0.95}
            interactive={true}
          />
        )}

        {(bgMode === 'electric' || bgMode === 'both') && (
          <ElectricGazeBackground
            sourceUrl="/ascii-editor/demos/generated/ref-002.webp"
            className={bgMode === 'both' ? 'opacity-60' : ''}
            interactive={false}
          />
        )}
      </div>

      {!loading && (
        <motion.div
          className="page-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Navbar />
          <Hero bgMode={bgMode} setBgMode={setBgMode} />
          <About />
          <Skills />
          <Projects />
          <Contact />
          <Footer />
        </motion.div>
      )}
    </div>
  );
}
