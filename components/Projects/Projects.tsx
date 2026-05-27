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
  githubUrl?: string; // Optional github URL
  tags: string[];
}

const projects: Project[] = [
  {
    num: '01',
    title: 'InfoShield',
    category: 'Web Development',
    description:
      'This project is created during my first hackathon, InfoShield detects the misinformation amd verifies it and show real information',
    thumbnail: '/images/proj3.png', // replace with your own thumbnail
    url: 'https://factline1.netlify.app',
    githubUrl: 'https://github.com/MaazKhan-07',
    tags: ['REACT', 'CSS', 'Firebase'],
  },
  {
    num: '02',
    title: 'VitalityPro',
    category: 'Web Design & Development',
    description:
      'VitalityPro is a fitness and wellness app that provides users with personalized workout plans, nutrition tracking, and health insights.',
    thumbnail: '/images/proj5.png', // replace with your own thumbnail
    url: 'https://vitalityproo.netlify.app',
    githubUrl: 'https://github.com/MaazKhan-07/VitalityPro',
    tags: ['FIGMA', 'REACT', 'TAILWIND-CSS'],
  },
  {
    num: '03',
    title: 'First Portfolio',
    category: 'Web Development',
    description:
      'This was my first portfolio project, built to showcase my skills and projects. It features a clean design, smooth animations, and responsive layout.',
    thumbnail: '/images/proj1.png', // replace with your own thumbnail
    url: 'https://maazkportfolio.netlify.app',
    githubUrl: 'https://github.com/MaazKhan-07',
    tags: ['Html', 'CSS', 'Javascript'],
  },
  {
    num: '04',
    title: 'ResumeAnalyzer',
    category: 'Web Design & Development',
    description:
      'ResumeAnalyzer is a tool that helps you analyze your resume and provides personalized feedback to improve it.',
    thumbnail: '/images/proj6.png', // replace with your own thumbnail
    url: 'https://resumeanalyzer2-585582599644.europe-west1.run.app',
    githubUrl: 'https://github.com/MaazKhan-07/ResumeAnalyzer',
    tags: ['REACT', 'TAIL-WINDCSS', 'Javascript'],
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
                  <div className={styles.links}>
                    {p.githubUrl && (
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.githubBtn}
                        aria-label={`GitHub Repo for ${p.title}`}
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                      </a>
                    )}
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
