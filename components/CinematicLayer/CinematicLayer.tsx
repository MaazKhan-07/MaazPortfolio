'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from './CinematicLayer.module.css';

const PARTICLE_COUNT = 220;

export default function CinematicLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    // ── Scene & Camera ────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 5);

    // ── Soft Bokeh Texture ────────────────────────────────────────────────────
    const bokehCanvas = document.createElement('canvas');
    bokehCanvas.width = 64;
    bokehCanvas.height = 64;
    const ctx = bokehCanvas.getContext('2d')!;
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0,   'rgba(255,255,255,1)');
    grad.addColorStop(0.3, 'rgba(255,190,80,0.65)');
    grad.addColorStop(1,   'rgba(255,130,20,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(32, 32, 32, 0, Math.PI * 2);
    ctx.fill();
    const bokehTexture = new THREE.CanvasTexture(bokehCanvas);

    // ── Particle Buffers ──────────────────────────────────────────────────────
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const sizes     = new Float32Array(PARTICLE_COUNT);
    const speeds    = new Float32Array(PARTICLE_COUNT);
    const offsets   = new Float32Array(PARTICLE_COUNT);
    const colors    = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      sizes[i]   = Math.random() * 28 + 8;
      speeds[i]  = Math.random() * 0.4 + 0.15;
      offsets[i] = Math.random() * Math.PI * 2;

      // Warm orange → cream white palette
      const t = Math.random();
      colors[i * 3]     = 1;
      colors[i * 3 + 1] = 0.52 + t * 0.48;
      colors[i * 3 + 2] = t * 0.28;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size',     new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('color',    new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.32,
      map: bokehTexture,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
      sizeAttenuation: true,
      opacity: 0.52,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // ── Mouse Parallax State ──────────────────────────────────────────────────
    const mouse  = { x: 0, y: 0 };
    const camPos = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    // ── Resize Handler ────────────────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // ── Render Loop ───────────────────────────────────────────────────────────
    let rafId: number;
    const posArr = geometry.attributes.position.array as Float32Array;

    const tick = (timestamp: number) => {
      rafId = requestAnimationFrame(tick);
      const t = timestamp * 0.001;

      // Gentle sine-wave float for each particle
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        posArr[i * 3 + 1] += Math.sin(t * speeds[i] + offsets[i]) * 0.00075;
        posArr[i * 3]     += Math.cos(t * speeds[i] * 0.65 + offsets[i]) * 0.00045;
      }
      geometry.attributes.position.needsUpdate = true;

      // Smooth parallax camera drift
      camPos.x += (mouse.x * 0.38 - camPos.x) * 0.038;
      camPos.y += (-mouse.y * 0.24 - camPos.y) * 0.038;
      camera.position.x = camPos.x;
      camera.position.y = camPos.y;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    requestAnimationFrame(tick);

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      geometry.dispose();
      material.dispose();
      bokehTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}
