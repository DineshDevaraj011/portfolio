import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, scaleIn, viewportOptions } from '../animations';
import ElectricGazeBackground from './ElectricGazeBackground';
import { ConstellationField } from './ui/constellation-field';
import './Hero.css';

/* ── Animated counter ── */
function Counter({ value, suffix = '' }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={viewportOptions}
    >
      {value}{suffix}
    </motion.span>
  );
}

export default function Hero() {
  const [bgMode, setBgMode] = useState('constellation'); // 'constellation' | 'electric' | 'both'

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero">
      {/* Background Switcher (Constellation Field / Electric Gaze) */}
      <div className="bg-switcher">
        <button
          type="button"
          className={`bg-switcher-btn ${bgMode === 'constellation' ? 'active' : ''}`}
          onClick={() => setBgMode('constellation')}
          title="Constellation Field (Meng To)"
        >
          ✨ Constellation
        </button>
        <button
          type="button"
          className={`bg-switcher-btn ${bgMode === 'electric' ? 'active' : ''}`}
          onClick={() => setBgMode('electric')}
          title="Electric Gaze ASCII/Dither"
        >
          ⚡ Electric Gaze
        </button>
        <button
          type="button"
          className={`bg-switcher-btn ${bgMode === 'both' ? 'active' : ''}`}
          onClick={() => setBgMode('both')}
          title="Layer Both Effects"
        >
          🌌 Both
        </button>
      </div>

      {/* 21st.dev Constellation Field by Meng To */}
      {(bgMode === 'constellation' || bgMode === 'both') && (
        <ConstellationField
          variant="constellation"
          mode="dark"
          speed={1.0}
          size={1.1}
          density={1.2}
          opacity={bgMode === 'both' ? 0.75 : 0.95}
          interactive={true}
        />
      )}

      {/* 21st.dev Electric Gaze Canvas2D ASCII / Dither Engine */}
      {(bgMode === 'electric' || bgMode === 'both') && (
        <ElectricGazeBackground
          sourceUrl="/ascii-editor/demos/generated/ref-002.webp"
          className={bgMode === 'both' ? 'opacity-70' : ''}
        />
      )}

      {/* Animated background blobs */}
      <motion.div
        className="blob blob-1"
        animate={{ scale: [1, 1.15, 1], x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="blob blob-2"
        animate={{ scale: [1, 1.2, 1], x: [0, -25, 0], y: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
      <motion.div
        className="blob blob-3"
        animate={{ scale: [1, 1.3, 1], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
      />

      <div className="grid-overlay" />

      <motion.div
        className="container hero-content"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div className="hero-badge" variants={fadeUp} custom={0}>
          <motion.span
            className="status-dot"
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          Open to full-time &amp; internship opportunities
        </motion.div>

        {/* Title */}
        <motion.h1 className="hero-title" variants={fadeUp} custom={1}>
          Hi, I'm <span className="gradient-text">Dinesh</span> 👋
        </motion.h1>

        {/* Role */}
        <motion.h2 className="hero-role" variants={fadeUp} custom={2}>
          <span className="typing-text">MERN Stack Developer</span>
          <span className="cursor">|</span>
        </motion.h2>

        {/* Description */}
        <motion.p className="hero-description" variants={fadeUp} custom={3}>
          Fresh B.Sc CS graduate specializing in full-stack development with{' '}
          <strong>MongoDB · Express · React · Node.js</strong>.{' '}
          Passionate about building real-world apps, writing clean code, and growing fast! 🚀
        </motion.p>

        {/* Buttons */}
        <motion.div className="hero-actions" variants={fadeUp} custom={4}>
          <motion.button
            className="btn btn-primary"
            onClick={() => scrollTo('projects')}
            whileHover={{ scale: 1.06, boxShadow: '0 12px 40px rgba(108,99,255,0.6)' }}
            whileTap={{ scale: 0.97 }}
          >
            🚀 View My Work
          </motion.button>
          <motion.button
            className="btn btn-outline"
            onClick={() => scrollTo('contact')}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
          >
            📬 Hire Me
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div className="hero-stats" variants={fadeUp} custom={5}>
          {[
            { value: 'B.Sc', label: 'CS Graduate' },
            { value: '2+',   label: 'Projects Built' },
            { value: '🔥',   label: 'Fresher & Ready' },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              className="stat"
              whileHover={{ scale: 1.08 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="stat-value">
                <Counter value={s.value} />
              </div>
              <div className="stat-label">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Floating code card */}
      <motion.div
        className="code-card"
        initial={{ opacity: 0, x: 60, rotate: 3 }}
        animate={{ opacity: 1, x: 0, rotate: 3 }}
        transition={{ duration: 0.9, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        whileHover={{ rotate: 0, scale: 1.03, transition: { duration: 0.3 } }}
      >
        <div className="code-dots">
          <span /><span /><span />
        </div>
        <pre className="code-content">{`const dinesh = {
  degree: "B.Sc CS",
  role: "MERN Developer",
  status: "Fresher 🎓",
  skills: ["React", "Node.js",
           "MongoDB", "Express"],
  passion: "Building things 🚀"
};`}</pre>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="scroll-down"
        onClick={() => scrollTo('about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span>Scroll Down</span>
        <motion.div
          className="scroll-arrow"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
