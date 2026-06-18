/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  life: number;
  maxLife: number;
}

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    // Hide on mobile or touch-only screens
    const finePointer = window.matchMedia('(pointer: fine)');
    
    const checkState = () => {
      setActive(finePointer.matches && window.innerWidth >= 768);
    };

    checkState();
    finePointer.addEventListener('change', checkState);
    window.addEventListener('resize', checkState);

    return () => {
      finePointer.removeEventListener('change', checkState);
      window.removeEventListener('resize', checkState);
    };
  }, []);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let points: TrailPoint[] = [];
    let animationFrameId: number;
    let mousePos = { x: 0, y: 0 };
    let hasMoved = false;

    // Maintain full screen canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;

      // Spawn a new dot group on move
      if (Math.random() < 0.4) {
        points.push({
          x: mousePos.x + (Math.random() * 8 - 4),
          y: mousePos.y + (Math.random() * 8 - 4),
          radius: Math.random() * 12 + 4, // soft coffee rings
          alpha: 0.20, // requested max 20% opacity
          life: 0,
          maxLife: 35 // rapid fadeout
        });
      }
      hasMoved = true;
    };

    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = points.length - 1; i >= 0; i--) {
        const p = points[i];
        p.life++;

        if (p.life >= p.maxLife) {
          points.splice(i, 1);
          continue;
        }

        const progress = p.life / p.maxLife;
        // Fade out
        const currentAlpha = p.alpha * (1 - progress);

        // Draw a soft coffee-stain dot or subtle ring
        ctx.beginPath();
        ctx.fillStyle = `rgba(176, 125, 74, ${currentAlpha})`; // #B07D4A Sepia
        ctx.arc(p.x, p.y, p.radius * (1 + progress * 0.3), 0, Math.PI * 2);
        ctx.fill();

        // Overlay a tiny center cutout occasionally to represent a cup coffee ring
        if (p.radius > 8) {
          ctx.beginPath();
          ctx.globalCompositeOperation = 'destination-out';
          ctx.arc(p.x, p.y, (p.radius * (1 + progress * 0.3)) * 0.82, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalCompositeOperation = 'source-over';
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      id="cursor-coffee-trail"
      className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-50 mix-blend-multiply"
    />
  );
}
