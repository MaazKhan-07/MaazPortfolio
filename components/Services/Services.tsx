'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Services.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrapperRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const services = [
    { title: 'Web Development', desc: 'Building responsive, high-performance web applications using modern frameworks like React and Next.js.' },
    { title: 'UI/UX Design', desc: 'Crafting intuitive and aesthetically pleasing user interfaces that offer seamless user experiences.' },
    { title: 'Motion Design', desc: 'Bringing websites to life with smooth animations using tools like GSAP and Three.js.' },
    { title: 'Backend Systems', desc: 'Developing robust APIs and scalable backend architectures to power complex applications.' },
    { title: 'Android App Development', desc: 'Building modern, performant Android applications using Kotlin and Jetpack Compose for seamless mobile experiences.' },
  ];

  return (
    <section id="services" ref={sectionRef} className={styles.servicesSection}>
      <h2 className={styles.heading}>Services</h2>
      <div ref={wrapperRef} className={styles.marqueeWrapper}>
        <div className={styles.marqueeContent}>
          {/* Render array twice for a seamless infinite scroll loop */}
          {[...services, ...services].map((svc, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.glow} />
              <h3>{svc.title}</h3>
              <p>{svc.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
