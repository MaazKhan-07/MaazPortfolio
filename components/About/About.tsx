'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import styles from './About.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );

      gsap.fromTo(
        rightRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );

      gsap.fromTo(
        gsap.utils.toArray(`.${styles.timelineItem}`),
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 85%',
          }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className={styles.aboutSection}>
      <div className={styles.container}>
        <div ref={leftRef} className={styles.leftCol}>
          <div className={styles.imageWrapper}>
            <Image
              src="/images/profile.jpg"
              alt="Maaz Portrait"
              fill
              className={styles.profileImage}
            />
            <div className={styles.glow} />
          </div>
        </div>
        
        <div ref={rightRef} className={styles.rightCol}>
          <h2 className={styles.heading}>About Me</h2>
          <p className={styles.bio}>
            I am a passionate Full-Stack Engineer and Creative Developer. I specialize in building immersive, highly interactive web experiences using cutting-edge technologies. My goal is to merge technical excellence with stunning design, creating products that leave a lasting impact. I love turning complex problems into elegant, user-friendly solutions.
          </p>
          
          <div ref={timelineRef} className={styles.timeline}>
            <h3 className={styles.subHeading}>Education</h3>
            <div className={styles.timelineTrack}>
              <div className={styles.timelineItem}>
                <div className={styles.dot} />
                <div className={styles.content}>
                  <h4>Higher Secondary</h4>
                  <p>Saraswati Vidyalaya High School &amp; Junior College (2023 - 2025)</p>
                  <span>Secured 80%, majoring in Science and Mathematics.</span>
                </div>
              </div>
              <div className={styles.timelineItem}>
                <div className={styles.dot} />
                <div className={styles.content}>
                  <h4>Bachelor of Technology in Computer Science</h4>
                  <p>Mumbai University (2025 - 2029)</p>
                  <span>Focused on software engineering, data structures, and full-stack web development.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
