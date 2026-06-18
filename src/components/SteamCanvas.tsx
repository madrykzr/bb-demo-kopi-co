/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  alpha: number;
  maxLife: number;
  life: number;
}

export default function SteamCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobileOrPrefersReduced, setIsMobileOrPrefersReduced] = useState(false);

  useEffect(() => {
    // Check if mobile/touch or prefers reduced motion
    const touchQuery = window.matchMedia('(pointer: coarse)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const checkState = () => {
      const isMobile = touchQuery.matches || window.innerWidth < 768;
      const isReduced = motionQuery.matches;
      setIsMobileOrPrefersReduced(isMobile || isReduced);
    };

    checkState();
    touchQuery.addEventListener('change', checkState);
    motionQuery.addEventListener('change', checkState);
    window.addEventListener('resize', checkState);

    return () => {
      touchQuery.removeEventListener('change', checkState);
      motionQuery.removeEventListener('change', checkState);
      window.removeEventListener('resize', checkState);
    };
  }, []);

  useEffect(() => {
    if (isMobileOrPrefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let lastTime = 0;
    const fpsInterval = 1000 / 30; // Throttle to ~30 FPS

    const particles: Particle[] = [];
    const maxParticles = 40;

    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      canvas.width = rect?.width || 300;
      canvas.height = rect?.height || 180;
    };

    resizeCanvas();
    const resizeObserver = new ResizeObserver(() => resizeCanvas());
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    const createParticle = (): Particle => {
      // Rise from the bottom center area
      const halfW = canvas.width / 2;
      return {
        x: halfW + (Math.random() * 40 - 20),
        y: canvas.height - 10,
        size: Math.random() * 12 + 6,
        speedY: -(Math.random() * 0.8 + 0.4),
        speedX: Math.random() * 0.4 - 0.2,
        alpha: 0,
        maxLife: Math.random() * 120 + 80,
        life: 0,
      };
    };

    // Pre-populate so we have instant steam on mount
    for (let i = 0; i < maxParticles / 2; i++) {
      const p = createParticle();
      p.life = Math.random() * p.maxLife * 0.8;
      p.y = canvas.height - (Math.random() * canvas.height * 0.8);
      p.alpha = Math.sin((p.life / p.maxLife) * Math.PI) * 0.25;
      particles.push(p);
    }

    const animate = (timestamp: number) => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsed = timestamp - lastTime;
      if (elapsed < fpsInterval) return;
      lastTime = timestamp - (elapsed % fpsInterval);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add new particles occasionally
      if (particles.length < maxParticles && Math.random() < 0.15) {
        particles.push(createParticle());
      }

      // Draw and update
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        // Apply velocities
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.life / 20) * 0.15; // gentle waver
        p.size += 0.04; // steam expands as it rises

        // Fade in and fade out curve
        const progress = p.life / p.maxLife;
        if (progress < 0.2) {
          p.alpha = (progress / 0.2) * 0.2; // fade in
        } else if (progress > 0.6) {
          p.alpha = (1 - (progress - 0.6) / 0.4) * 0.2; // fade out
        } else {
          p.alpha = 0.2;
        }

        if (p.alpha < 0) p.alpha = 0;

        // Draw particle
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        gradient.addColorStop(0, `rgba(255, 248, 232, ${p.alpha})`); // warm cream
        gradient.addColorStop(0.5, `rgba(245, 237, 215, ${p.alpha * 0.5})`); // cream paper
        gradient.addColorStop(1, 'rgba(245, 237, 215, 0)');
        
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // Trigger loop
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [isMobileOrPrefersReduced]);

  if (isMobileOrPrefersReduced) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      id="hero-steam"
      className="absolute bottom-0 left-0 w-full h-full pointer-events-none z-10"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
