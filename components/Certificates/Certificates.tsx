'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import styles from './Certificates.module.css';

gsap.registerPlugin(ScrollTrigger);

const certs = [
  {
    src: '/images/cert1.png',
    title: 'Solutions Architecture Job Simulation',
    issuer: 'AWS × Forage',
    date: 'October 2025',
  },
  {
    src: '/images/cert2.png',
    title: 'Data Analytics Job Simulation',
    issuer: 'Deloitte × Forage',
    date: 'June 2025',
  },
  {
    src: '/images/cert3.png',
    title: 'Technology Job Simulation',
    issuer: 'Deloitte × Forage',
    date: 'June 2025',
  },
  {
    src: '/images/cert4.jpg',
    title: 'MumbaiHacks 2025',
    issuer: 'TEAM × Made in Mumbai',
    date: 'November 2025',
  },
  {
    src: '/images/cert5.png',
    title: 'Software Engineering Job Simulation',
    issuer: 'JPMorgan Chase × Forage',
    date: 'October 2025',
  },
];

export default function Certificates() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        gsap.utils.toArray(`.${styles.card}`),
        { opacity: 0, y: 50, rotateY: -15 },
        {
          opacity: 1, y: 0, rotateY: 0,
          duration: 0.9, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: {
            trigger: trackRef.current,
            start: 'top 85%',
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="certificates" ref={sectionRef} className={styles.certSection}>
      <h2 className={styles.heading}>Certificates</h2>
      <p className={styles.sub}>Click a card to view full certificate</p>

      <div ref={trackRef} className={styles.track}>
        {certs.map((cert, i) => (
          <div
            key={i}
            className={`${styles.card} ${flipped === i ? styles.flipped : ''}`}
            onClick={() => setFlipped(flipped === i ? null : i)}
          >
            <div className={styles.inner}>
              {/* Front */}
              <div className={styles.front}>
                <div className={styles.imgWrap}>
                  <Image
                    src={cert.src}
                    alt={cert.title}
                    fill
                    className={styles.certImg}
                    sizes="(max-width: 768px) 90vw, 380px"
                  />
                  <div className={styles.overlay} />
                </div>
                <div className={styles.cardBody}>
                  <h4 className={styles.certTitle}>{cert.title}</h4>
                  <p className={styles.certIssuer}>{cert.issuer}</p>
                  <span className={styles.certDate}>{cert.date}</span>
                </div>
              </div>

              {/* Back — full cert image */}
              <div className={styles.back}>
                <Image
                  src={cert.src}
                  alt={cert.title}
                  fill
                  className={styles.backImg}
                  sizes="(max-width: 768px) 90vw, 380px"
                />
                <div className={styles.backClose}>✕ Close</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
