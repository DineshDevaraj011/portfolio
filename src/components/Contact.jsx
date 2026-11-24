import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, slideLeft, slideRight, staggerContainer, scaleIn, viewportOptions } from '../animations';
import './Contact.css';

const channels = [
  { icon: '📧', label: 'Email',    value: 'dineshdevaraj011@gmail.com',         href: 'mailto:dineshdevaraj011@gmail.com' },
  { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/dinesh-d-a555b72b4',  href: 'https://www.linkedin.com/in/dinesh-d-a555b72b4' },
  { icon: '🐙', label: 'GitHub',   value: 'github.com/Zenitsu121-oss',        href: 'https://github.com/Zenitsu121-oss' },
  { icon: '📍', label: 'Location', value: 'Tirupur, Tamil Nadu',             href: 'https://maps.google.com/?q=Tirupur,Tamil+Nadu' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', form);
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contact" className="section contact">
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
          Get In Touch
        </motion.h2>
        <motion.p className="section-subtitle" variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={viewportOptions}>
          Have a project in mind? Let's build something great together!
        </motion.p>

        <div className="contact-grid">
          {/* Info */}
          <motion.div className="contact-info" variants={slideLeft} initial="hidden" whileInView="visible" viewport={viewportOptions}>
            <h3 className="contact-heading">Let's talk 💬</h3>
            <p className="contact-text">
              I'm currently open to freelance opportunities and full-time roles.
              Whether you have a project, a question, or just want to say hi —
              my inbox is always open!
            </p>

            <motion.div
              className="contact-channels"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
            >
              {channels.map((c) => (
                <motion.a
                  key={c.label}
                  href={c.href}
                  className="contact-channel"
                  target="_blank"
                  rel="noreferrer"
                  variants={fadeUp}
                  whileHover={{ x: 8, borderColor: 'var(--accent)', boxShadow: '0 4px 20px rgba(108,99,255,0.2)' }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <span className="channel-icon">{c.icon}</span>
                  <div>
                    <div className="channel-label">{c.label}</div>
                    <div className="channel-value">{c.value}</div>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.form
            className="contact-form card"
            onSubmit={submit}
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
          >
            {sent && (
              <motion.div
                className="form-success"
                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                ✅ Message sent! I'll get back to you soon.
              </motion.div>
            )}

            {['name', 'email', 'message'].map((field, i) => (
              <motion.div
                key={field}
                className="form-group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOptions}
                transition={{ delay: 0.1 + i * 0.1 }}
              >
                <label htmlFor={field}>
                  {field === 'name' ? 'Your Name' : field === 'email' ? 'Email Address' : 'Message'}
                </label>
                {field === 'message' ? (
                  <textarea
                    id={field}
                    name={field}
                    value={form[field]}
                    onChange={handle}
                    placeholder="Hi Dinesh, I'd like to discuss a project..."
                    rows={5}
                    required
                  />
                ) : (
                  <input
                    id={field}
                    type={field === 'email' ? 'email' : 'text'}
                    name={field}
                    value={form[field]}
                    onChange={handle}
                    placeholder={field === 'email' ? 'john@example.com' : 'John Doe'}
                    required
                  />
                )}
              </motion.div>
            ))}

            <motion.button
              type="submit"
              className="btn btn-primary btn-full"
              whileHover={{ scale: 1.03, boxShadow: '0 12px 40px rgba(108,99,255,0.5)' }}
              whileTap={{ scale: 0.97 }}
            >
              🚀 Send Message
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
