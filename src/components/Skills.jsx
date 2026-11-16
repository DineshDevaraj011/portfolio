import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, staggerContainer, scaleIn, viewportOptions } from '../animations';
import './Skills.css';

const categories = [
  {
    name: 'Frontend',
    icon: '🎨',
    skills: [
      { name: 'React.js',     level: 88, icon: '⚛️' },
      { name: 'JavaScript',   level: 85, icon: '🟡' },
      { name: 'HTML5',        level: 90, icon: '📄' },
      { name: 'CSS3',         level: 88, icon: '🎨' },
    ],
  },
  {
    name: 'Backend',
    icon: '⚙️',
    skills: [
      { name: 'Node.js',    level: 85, icon: '🟢' },
      { name: 'Express.js', level: 82, icon: '🚂' },
      { name: 'Python',     level: 80, icon: '🐍' },
    ],
  },
  {
    name: 'Database',
    icon: '🗄️',
    skills: [
      { name: 'MongoDB',   level: 85, icon: '🍃' },
      { name: 'Mongoose',  level: 82, icon: '📦' },
      { name: 'SQL',       level: 78, icon: '🐬' },
    ],
  },
  {
    name: 'DevOps & Tools',
    icon: '🛠️',
    skills: [
      { name: 'Git',          level: 85, icon: '🐙' },
      { name: 'GitHub',       level: 85, icon: '🐱' },
      { name: 'Postman',      level: 82, icon: '📮' },
      { name: 'GCP',          level: 70, icon: '☁️' },
      { name: 'DigitalOcean', level: 72, icon: '🌊' },
    ],
  },
];

const techList = [
  'React',
  'JavaScript',
  'HTML5',
  'CSS3',
  'Node.js',
  'Express.js',
  'Python',
  'MongoDB',
  'Mongoose',
  'SQL',
  'Git',
  'GitHub',
  'Postman',
  'GCP',
  'DigitalOcean',
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="skills" className="section skills">
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
          My Skills
        </motion.h2>
        <motion.p className="section-subtitle" variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={viewportOptions}>
          Technologies I work with every day
        </motion.p>

        {/* Tabs */}
        <motion.div
          className="skill-tabs"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          {categories.map((cat, i) => (
            <motion.button
              key={cat.name}
              className={`skill-tab${activeTab === i ? ' active' : ''}`}
              onClick={() => setActiveTab(i)}
              variants={scaleIn}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{cat.icon}</span> {cat.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Skill bars — animated on tab switch */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="skills-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {categories[activeTab].skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                className="skill-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                whileHover={{ scale: 1.02, borderColor: 'var(--accent)' }}
              >
                <div className="skill-header">
                  <span className="skill-name">
                    <span className="skill-icon">{skill.icon}</span>
                    {skill.name}
                  </span>
                  <span className="skill-percent">{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <motion.div
                    className="skill-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.9, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Tech chips */}
        <motion.div
          className="tech-row"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          {techList.map((t, i) => (
            <motion.div
              key={t}
              className="tech-chip"
              variants={scaleIn}
              custom={i}
              whileHover={{ scale: 1.1, color: 'var(--accent)', borderColor: 'var(--accent)', y: -4 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {t}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
