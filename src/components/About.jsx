import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, viewportOptions } from '../animations';
import './About.css';

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <motion.div
          className="section-line"
          initial={{ width: 0 }}
          whileInView={{ width: 60 }}
          viewport={viewportOptions}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ width: 0 }}
        />
        <motion.h2 className="section-title" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOptions}>
          About Me
        </motion.h2>
        <motion.p className="section-subtitle" variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={viewportOptions}>
          A little bit about who I am
        </motion.p>

        <div className="about-grid">
          {/* Content column */}
          <motion.div
            className="about-content"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
          >
            <h3 className="about-heading">
              I build <span className="hl">fast</span>, <span className="hl">scalable</span> &amp; <span className="hl">beautiful</span> web apps
            </h3>

            <p className="about-text">
              Hey! I'm <strong>Dinesh</strong>, a passionate MERN Stack Developer and a fresh
              B.Sc Computer Science graduate. I love building end-to-end web applications
              using Node.js &amp; Express for the backend, React for clean frontends,
              and MongoDB for efficient data storage.
            </p>

            <p className="about-text">
              As a fresher, I bring enthusiasm, up-to-date skills, and a hunger to learn.
              I've already shipped real-world projects and I'm actively looking for opportunities
              to grow as a developer. When I'm not coding, I'm sipping coffee ☕ and exploring new tech!
            </p>

            <motion.div
              className="about-info-grid"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
            >
              {[
                { icon: '🎓', label: 'Education',  value: 'B.Sc Computer Science (CGPA: 8.6)' },
                { icon: '📍', label: 'Location',   value: 'Tirupur, Tamil Nadu' },
                { icon: '💼', label: 'Experience', value: 'Fresher · IT Bhoomi & IDM' },
                { icon: '🌐', label: 'Available',  value: 'Full-Time & Remote' },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  className="info-item"
                  variants={fadeUp}
                  whileHover={{ scale: 1.03, borderColor: 'var(--accent)', boxShadow: '0 4px 20px rgba(108,99,255,0.2)' }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <span className="info-icon">{item.icon}</span>
                  <div>
                    <div className="info-label">{item.label}</div>
                    <div className="info-value">{item.value}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div className="about-actions" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOptions}>
              <motion.a
                className="btn btn-primary"
                href="/Dinesh_D_Resume.pdf"
                download="Dinesh_D_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.06, boxShadow: '0 12px 40px rgba(108,99,255,0.5)' }}
                whileTap={{ scale: 0.96 }}
              >
                📥 Download Resume
              </motion.a>
              <motion.a
                className="btn btn-outline"
                href="/Dinesh_D_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
              >
                👁️ View Resume
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
