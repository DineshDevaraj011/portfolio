import { motion } from 'framer-motion';
import { fadeUp, slideLeft, slideRight, staggerContainer, scaleIn, viewportOptions } from '../animations';
import './Projects.css';

const projects = [
  {
    title: 'HealthCare – Hospital Management System',
    description:
      'A full-stack MERN healthcare platform featuring separate portals for Admins, Doctors, and Patients. Includes appointment booking, doctor management, JWT-based authentication, role-based access control, and a clean responsive UI.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'REST API', 'Vite'],
    emoji: '🏥',
    github: 'https://github.com/Zenitsu121-oss/Healthcare.git',
    live: 'https://healthcare-tech-db65.vercel.app',
    color: '#6c63ff',
    highlights: [
      '🔐 Role-based Access (Admin / Doctor / Patient)',
      '📅 Appointment Booking System',
      '👨‍⚕️ Doctor Management Dashboard',
      '🌐 Deployed on Vercel',
    ],
  },
  {
    title: 'Student Result Management System',
    description:
      'A comprehensive student result management platform built with the MERN stack. Allows administrators to manage students, subjects, and publish results, while students can securely log in and view their academic performance.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'REST API'],
    emoji: '🎓',
    github: 'https://github.com/Zenitsu121-oss/student-result-management.git',
    live: null,
    color: '#43e97b',
    highlights: [
      '📊 Result Entry & Grade Management',
      '👩‍🎓 Student & Admin Portals',
      '🔐 Secure JWT Authentication',
      '📋 Subject & Marks Tracking',
    ],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="section projects">
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
          My Projects
        </motion.h2>
        <motion.p className="section-subtitle" variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={viewportOptions}>
          Real-world full-stack projects I built with the MERN stack
        </motion.p>

        <div className="projects-featured">
          {projects.map((p, idx) => (
            <motion.div
              key={p.title}
              className="project-card project-card--featured card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOptions}
              transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ boxShadow: `0 30px 80px ${p.color}30`, borderColor: `${p.color}60` }}
            >
              <motion.div
                className="featured-badge"
                style={{ borderColor: `${p.color}50`, color: p.color, background: `${p.color}15` }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewportOptions}
                transition={{ delay: 0.2 + idx * 0.15, type: 'spring', stiffness: 300 }}
              >
                {idx === 0 ? '⭐ Featured Project' : `🚀 Project #${idx + 1}`}
              </motion.div>

              <div className="project-card-inner">
                {/* Left */}
                <motion.div className="project-left" variants={slideLeft} initial="hidden" whileInView="visible" viewport={viewportOptions}>
                  <motion.div
                    className="project-emoji project-emoji--lg"
                    style={{ background: `${p.color}20`, border: `1px solid ${p.color}40` }}
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 3.5 + idx, repeat: Infinity, ease: 'easeInOut' }}
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                  >
                    {p.emoji}
                  </motion.div>

                  <motion.div className="project-links project-links--vertical" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOptions}>
                    <motion.a
                      href={p.github}
                      className="project-link"
                      target="_blank"
                      rel="noreferrer"
                      variants={scaleIn}
                      whileHover={{ scale: 1.05, x: 4 }}
                      whileTap={{ scale: 0.96 }}
                    >
                      🐙 View on GitHub
                    </motion.a>
                    {p.live ? (
                      <motion.a
                        href={p.live}
                        className="project-link project-link-live"
                        target="_blank"
                        rel="noreferrer"
                        variants={scaleIn}
                        whileHover={{ scale: 1.05, x: 4 }}
                        whileTap={{ scale: 0.96 }}
                      >
                        🚀 Live Demo
                      </motion.a>
                    ) : (
                      <motion.span className="project-link project-link-wip" variants={scaleIn}>
                        🔧 Coming Soon
                      </motion.span>
                    )}
                  </motion.div>
                </motion.div>

                {/* Right */}
                <motion.div className="project-right" variants={slideRight} initial="hidden" whileInView="visible" viewport={viewportOptions}>
                  <h3 className="project-title project-title--lg">{p.title}</h3>
                  <p className="project-desc">{p.description}</p>

                  <motion.div
                    className="project-highlights"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOptions}
                  >
                    {p.highlights.map((h, i) => (
                      <motion.div
                        key={h}
                        className="highlight-item"
                        variants={fadeUp}
                        custom={i}
                        whileHover={{ x: 6, borderColor: `${p.color}60`, background: `${p.color}12` }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        {h}
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div
                    className="project-tags"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOptions}
                  >
                    {p.tags.map((t, i) => (
                      <motion.span
                        key={t}
                        className="tag"
                        variants={scaleIn}
                        custom={i}
                        whileHover={{ scale: 1.12, y: -2 }}
                      >
                        {t}
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
