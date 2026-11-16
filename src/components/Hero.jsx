import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, scaleIn, viewportOptions } from '../animations';
import './Hero.css';

/* ── Particle canvas ── */
function Particles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const COUNT = 55;
    const dots = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.4,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connection lines
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(108,99,255,${0.15 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw dots
      dots.forEach((d) => {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(108,99,255,${d.alpha})`;
        ctx.fill();

        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > canvas.width) d.vx *= -1;
        if (d.y < 0 || d.y > canvas.height) d.vy *= -1;
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" />;
}

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
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero">
      <Particles />

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
