'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import styles from './Projects.module.css';

gsap.registerPlugin(ScrollTrigger);

export interface Project {
  num: string;
  title: string;
  category: string;
  description: string;
  thumbnail: string; // path in /public, e.g. "/images/project1.jpg"
  url: string;       // live project URL
  tags: string[];
}

const projects: Project[] = [
  {
    num: '01',
    title: 'Project Title One',
    category: 'Web Development',
    description:
      'A short description of this project goes here. What problem it solved and how you built it.',
    thumbnail: '/images/profile.jpg', // replace with your own thumbnail
    url: 'https://example.com',
    tags: ['React', 'Next.js', 'GSAP'],
  },
  {
    num: '02',
    title: 'Project Title Two',
    category: 'UI/UX Design',
    description:
      'A short description of this project goes here. What problem it solved and how you built it.',
    thumbnail: '/images/profile.jpg', // replace with your own thumbnail
    url: 'https://example.com',
    tags: ['Figma', 'Framer', 'Motion'],
  },
  {
    num: '03',
    title: 'Project Title Three',
    category: 'Android Development',
    description:
      'A short description of this project goes here. What problem it solved and how you built it.',
    thumbnail: '/images/profile.jpg', // replace with your own thumbnail
    url: 'https://example.com',
    tags: ['Kotlin', 'Jetpack Compose', 'Firebase'],
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading entrance
      gsap.fromTo(
        `.${styles.headingBlock}`,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );

      // Each card entrance
      gsap.utils.toArray<HTMLElement>(`.${styles.card}`).forEach((card) => {
        const img = card.querySelector(`.${styles.thumbInner}`) as HTMLElement;

        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
          {
            opacity: 1, y: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 85%' },
          }
        );

        // Parallax on the thumbnail
        if (img) {
          gsap.fromTo(
            img,
            { yPercent: -8 },
            {
              yPercent: 8,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className={styles.section}>
      {/* Heading */}
      <div className={styles.headingBlock}>
        <h2 className={styles.heading}>Projects</h2>
        <p className={styles.sub}>Selected works I&apos;ve crafted</p>
      </div>

      {/* Cards */}
      <div className={styles.list}>
        {projects.map((p, i) => (
          <article key={i} className={styles.card}>
            <div className={styles.divider} />

            <div className={styles.cardInner}>
              {/* Left — meta */}
              <div className={styles.meta}>
                <span className={styles.num}>{p.num}</span>
                <div className={styles.titleRow}>
                  <h3 className={styles.title}>{p.title}</h3>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.arrowBtn}
                    aria-label={`Visit ${p.title}`}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </a>
                </div>
                <span className={styles.category}>{p.category}</span>
                <p className={styles.desc}>{p.description}</p>
                <div className={styles.tags}>
                  {p.tags.map((t) => (
                    <span key={t} className={styles.tag}>{t}</span>
                  ))}
                </div>
              </div>

              {/* Right — thumbnail */}
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.thumbWrap}
              >
                <div className={styles.thumbInner}>
                  <Image
                    src={p.thumbnail}
                    alt={p.title}
                    fill
                    className={styles.thumbImg}
                    sizes="(max-width: 900px) 100vw, 45vw"
                  />
                  <div className={styles.thumbOverlay} />
                </div>
                <div className={styles.visitTag}>View Project ↗</div>
              </a>
            </div>
          </article>
        ))}

        {/* Final divider */}
        <div className={styles.divider} />
      </div>
    </section>
  );
}
