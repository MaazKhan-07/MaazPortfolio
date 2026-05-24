'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Contact.module.css';

gsap.registerPlugin(ScrollTrigger);

const socials = [
  {
    name: 'Gmail',
    href: 'mailto:maaz@example.com',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.641l8.073-6.148C21.69 2.28 24 3.434 24 5.457z"/></svg>`,
    color: '#EA4335',
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/maaz',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
    color: '#0A66C2',
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/maaz',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>`,
    color: '#E1306C',
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/maaz',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
    color: '#1DA1F2',
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com/maaz',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
    color: '#1877F2',
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
      gsap.fromTo(
        gsap.utils.toArray(`.${styles.socialBtn}`),
        { opacity: 0, scale: 0.7 },
        {
          opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: 'back.out(1.7)',
          scrollTrigger: { trigger: socialsRef.current, start: 'top 90%' },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className={styles.contactSection}>
      <h2 className={styles.heading}>Get in Touch</h2>
      <p className={styles.subText}>Have a project in mind or just want to say hi? I'd love to hear from you.</p>

      <form ref={formRef} className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <div className={styles.inputGroup}>
          <input type="text" placeholder="Your Name" required className={styles.input} />
        </div>
        <div className={styles.inputGroup}>
          <input type="email" placeholder="Your Email" required className={styles.input} />
        </div>
        <div className={styles.inputGroup}>
          <textarea placeholder="Your Message" rows={4} required className={styles.textarea} />
        </div>
        <button type="submit" className={styles.submitBtn}>Send Message</button>
      </form>

      {/* Social + Resume */}
      <div ref={socialsRef} className={styles.socialsRow}>
        {socials.map((s) => (
          <a
            key={s.name}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialBtn}
            aria-label={s.name}
            title={s.name}
            style={{ '--accent': s.color } as React.CSSProperties}
          >
            <span
              className={styles.socialIcon}
              dangerouslySetInnerHTML={{ __html: s.icon }}
            />
          </a>
        ))}
      </div>

      <a href="/resume.pdf" download className={styles.resumeBtn}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        Download Resume
      </a>
    </section>
  );
}
