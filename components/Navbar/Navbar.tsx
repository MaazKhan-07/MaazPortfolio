'use client';
import { useState } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import styles from './Navbar.module.css';

gsap.registerPlugin(ScrollToPlugin);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    gsap.to(window, {
      scrollTo: { y: `#${id}`, offsetY: 60, autoKill: false },
      duration: 1,
      ease: 'power3.inOut'
    });
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>Maaz Portfolio</div>
      
      <button 
        className={styles.hamburger} 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        <span className={`${styles.bar} ${isOpen ? styles.barOpen1 : ''}`}></span>
        <span className={`${styles.bar} ${isOpen ? styles.barOpen2 : ''}`}></span>
        <span className={`${styles.bar} ${isOpen ? styles.barOpen3 : ''}`}></span>
      </button>

      <ul className={`${styles.navLinks} ${isOpen ? styles.navLinksOpen : ''}`}>
        <li><button onClick={() => scrollTo('home')}>HOME</button></li>
        <li><button onClick={() => scrollTo('about')}>ABOUT</button></li>
        <li><button onClick={() => scrollTo('services')}>SERVICES</button></li>
        <li><button onClick={() => scrollTo('projects')}>PROJECTS</button></li>
        <li><button onClick={() => scrollTo('certificates')}>CERTIFICATES</button></li>
        <li><button onClick={() => scrollTo('contact')}>CONTACT</button></li>
      </ul>
    </nav>
  );
}
