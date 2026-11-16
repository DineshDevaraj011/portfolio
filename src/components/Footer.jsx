import { motion } from 'framer-motion';
import { staggerContainer, scaleIn, fadeUp, viewportOptions } from '../animations';
import './Footer.css';

const socials = [
  { label: 'GitHub',   icon: '🐙', href: '#' },
  { label: 'LinkedIn', icon: '💼', href: '#' },
  { label: 'Twitter',  icon: '🐦', href: '#' },
  { label: 'Email',    icon: '📧', href: 'mailto:dinesh@example.com' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <motion.div
          className="footer-logo"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <span className="logo-bracket">&lt;</span>Dinesh<span className="logo-accent">/</span><span className="logo-bracket">&gt;</span>
        </motion.div>

        <motion.p
          className="footer-text"
          variants={fadeUp}
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          Crafted with ❤️ &amp; ☕ by <strong>Dinesh</strong> · MERN Stack Developer
        </motion.p>

        <motion.div
          className="footer-socials"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          {socials.map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              className="social-link"
              aria-label={s.label}
              target="_blank"
              rel="noreferrer"
              variants={scaleIn}
              whileHover={{ scale: 1.2, y: -4, borderColor: 'var(--accent)', boxShadow: '0 8px 24px rgba(108,99,255,0.35)' }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {s.icon}
            </motion.a>
          ))}
        </motion.div>

        <motion.p
          className="footer-copy"
          variants={fadeUp}
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          © {new Date().getFullYear()} Dinesh. All rights reserved.
        </motion.p>
      </div>
    </footer>
  );
}
