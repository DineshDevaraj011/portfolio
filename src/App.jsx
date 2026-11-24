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
import HalftoneNebula from './components/ui/halftone-nebula';

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
  const [nebulaPreset, setNebulaPreset] = useState('crimson'); // 'crimson' | 'ultraviolet' | 'abyssal' | 'solar' | 'phosphor'

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="app">
      <AnimatePresence>
        {loading && <Loader key="loader" />}
      </AnimatePresence>

      {/* 21st.dev Halftone Nebula by Kedhareswer Naidu - Global Interactive Space Background */}
      <div className="global-background-container">
        <HalftoneNebula
          height="100vh"
          preset={nebulaPreset}
          interactive={true}
          touch="scroll"
          className="w-full h-full"
        />
      </div>

      {!loading && (
        <motion.div
          className="page-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Navbar />
          <Hero nebulaPreset={nebulaPreset} setNebulaPreset={setNebulaPreset} />
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
