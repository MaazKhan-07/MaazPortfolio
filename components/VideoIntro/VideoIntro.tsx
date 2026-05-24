'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import styles from './VideoIntro.module.css';



gsap.registerPlugin(ScrollToPlugin);

export default function VideoIntro() {
  const heroRef     = useRef<HTMLElement>(null);
  const videoRef  = useRef<HTMLVideoElement>(null);
  const taglineRef  = useRef<HTMLSpanElement>(null);
  const lastRef     = useRef<HTMLDivElement>(null);
  const roleRef     = useRef<HTMLParagraphElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const scrollRef   = useRef<HTMLDivElement>(null);
  const hintRef     = useRef<HTMLDivElement>(null);

  const [muted,    setMuted]    = useState(true);
  const [playing,  setPlaying]  = useState(true);
  const [showHint, setShowHint] = useState(true);

  // ── GSAP Entrance ──────────────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([taglineRef.current, lastRef.current,
                roleRef.current, controlsRef.current, scrollRef.current], {
        opacity: 0,
      });
      gsap.set(heroRef.current, { opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: 'expo.out' },
        delay: 0.3,
      });

      tl.to(heroRef.current, { opacity: 1, duration: 2.0 })
        .to(taglineRef.current,
          { opacity: 1, y: 0, duration: 1.1 },
          '-=1.2'
        )
        .fromTo(lastRef.current,
          { y: 80, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
          { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 1.3 },
          '-=1.0'
        )
        .fromTo(roleRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 1.0 },
          '-=0.7'
        )
        .fromTo(controlsRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(scrollRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.5'
        );
    });

    return () => ctx.revert();
  }, []);

  // ── Auto-hide sound hint ───────────────────────────────────────────────────
  useEffect(() => {
    const timer = setTimeout(() => {
      if (hintRef.current) {
        gsap.to(hintRef.current, {
          opacity: 0,
          y: -10,
          duration: 0.7,
          ease: 'power2.in',
          onComplete: () => setShowHint(false),
        });
      }
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  // ── Toggle Mute ───────────────────────────────────────────────────────────
  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  // ── Toggle Play ───────────────────────────────────────────────────────────
  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else          { v.pause(); setPlaying(false); }
  };

  // ── Scroll Down ───────────────────────────────────────────────────────────
  const handleScroll = () => {
    gsap.to(window, {
      scrollTo: { y: window.innerHeight, autoKill: false },
      duration: 1.4,
      ease: 'power2.inOut',
    });
  };

  return (
    <section ref={heroRef} className={styles.hero} aria-label="Portfolio hero section">

      {/* ── Clear Main Video ───────────────────────────────────────── */}
      <video
        ref={videoRef}
        className={styles.bgVideo}
        src="/video/intro_vid.mp4"
        autoPlay loop muted playsInline
      />

      {/* ── Portfolio Text ────────────────────────────────────────────────── */}
      <div className={styles.content}>
        <span ref={taglineRef} className={styles.tagline}>
          Creative Developer &amp; Designer
        </span>

        <div className={styles.nameBlock}>
          <div ref={lastRef} className={styles.nameRow}>
            <h1 className={styles.lastName}>Maaz</h1>
          </div>
        </div>

        <p ref={roleRef} className={styles.role}>
          Full&#8209;Stack Engineer&nbsp;&nbsp;·&nbsp;&nbsp;Interactive Experiences&nbsp;&nbsp;·&nbsp;&nbsp;Motion Design
        </p>
      </div>

      {/* ── Glassmorphism Controls ─────────────────────────────────────────── */}
      <div ref={controlsRef} className={styles.controls}>
        <button
          className={styles.btn}
          onClick={togglePlay}
          aria-label={playing ? 'Pause video' : 'Play video'}
          title={playing ? 'Pause' : 'Play'}
        >
          {playing ? (
            /* Pause icon */
            <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17" aria-hidden="true">
              <rect x="6"  y="4" width="4" height="16" rx="1.5" />
              <rect x="14" y="4" width="4" height="16" rx="1.5" />
            </svg>
          ) : (
            /* Play icon */
            <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17" aria-hidden="true">
              <path d="M8 5.14v14l11-7-11-7z" />
            </svg>
          )}
        </button>

        <button
          className={styles.btn}
          onClick={toggleMute}
          aria-label={muted ? 'Unmute video' : 'Mute video'}
          title={muted ? 'Unmute' : 'Mute'}
        >
          {muted ? (
            /* Muted icon */
            <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17" aria-hidden="true">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27l4.73 4.73H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
          ) : (
            /* Unmuted icon */
            <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17" aria-hidden="true">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          )}
        </button>
      </div>

      {/* ── Sound Hint Badge ──────────────────────────────────────────────── */}
      {showHint && (
        <div ref={hintRef} className={styles.hint} aria-live="polite">
          <span className={styles.hintDot} aria-hidden="true" />
          Tap for sound
        </div>
      )}

      {/* ── Scroll Indicator ─────────────────────────────────────────────── */}
      <div
        ref={scrollRef}
        className={styles.scroll}
        onClick={handleScroll}
        role="button"
        tabIndex={0}
        aria-label="Scroll to next section"
        onKeyDown={(e) => e.key === 'Enter' && handleScroll()}
      >
        <span className={styles.scrollLabel}>Scroll</span>
        <div className={styles.scrollTrack}>
          <div className={styles.scrollBar} />
        </div>
      </div>
    </section>
  );
}
