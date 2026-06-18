"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  layer: number; // 0 = far/dim, 1 = mid, 2 = near/bright
  pulsePhase: number;
  hue: number;
}

const LAYER_CONFIG = [
  { count: 25, radiusMin: 0.8, radiusMax: 1.5, speedFactor: 0.15, opacityMin: 0.06, opacityMax: 0.14 },
  { count: 18, radiusMin: 1.5, radiusMax: 2.5, speedFactor: 0.25, opacityMin: 0.12, opacityMax: 0.22 },
  { count: 10, radiusMin: 2.5, radiusMax: 3.5, speedFactor: 0.35, opacityMin: 0.18, opacityMax: 0.32 },
];

const CONNECTION_DISTANCE = 140;
const MOUSE_RADIUS = 180;
const BASE_HUE = 20; // terracotta base

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = w;
      canvas!.height = h;
    }

    function createParticles() {
      const particles: Particle[] = [];
      LAYER_CONFIG.forEach((layer, layerIdx) => {
        for (let i = 0; i < layer.count; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = layer.speedFactor * (0.5 + Math.random() * 0.5);
          particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            radius: layer.radiusMin + Math.random() * (layer.radiusMax - layer.radiusMin),
            opacity: layer.opacityMin + Math.random() * (layer.opacityMax - layer.opacityMin),
            layer: layerIdx,
            pulsePhase: Math.random() * Math.PI * 2,
            hue: BASE_HUE + (Math.random() - 0.5) * 30,
          });
        }
      });
      particlesRef.current = particles;
    }

    function animate(time: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const t = time * 0.001;

      // Update positions
      for (const p of particles) {
        // Mouse interaction: gentle gravitational curve
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RADIUS && dist > 1) {
          const force = (1 - dist / MOUSE_RADIUS) * 0.02 * (p.layer + 1);
          // Tangential force (orbiting) + slight repulsion
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle + Math.PI / 2) * force - Math.cos(angle) * force * 0.3;
          p.vy += Math.sin(angle + Math.PI / 2) * force - Math.sin(angle) * force * 0.3;
        }

        // Damping
        p.vx *= 0.999;
        p.vy *= 0.999;

        // Clamp speed
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const maxSpeed = LAYER_CONFIG[p.layer].speedFactor * 1.5;
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed;
          p.vy = (p.vy / speed) * maxSpeed;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges with padding
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;
      }

      // Draw connections (only between same or adjacent layers)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          if (Math.abs(a.layer - b.layer) > 1) continue;

          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.15 * ((a.layer + b.layer) / 4 + 0.3);
            const avgHue = (a.hue + b.hue) / 2;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `hsla(${avgHue}, 45%, 45%, ${alpha})`;
            ctx.lineWidth = 0.5 + ((a.layer + b.layer) / 4) * 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw mouse connection lines
      if (mx > 0 && my > 0) {
        for (const p of particles) {
          const dx = mx - p.x;
          const dy = my - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MOUSE_RADIUS) {
            const alpha = (1 - dist / MOUSE_RADIUS) * 0.2 * (p.layer / 2 + 0.4);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mx, my);
            ctx.strokeStyle = `hsla(${p.hue + 20}, 50%, 50%, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        const pulse = Math.sin(t * 1.5 + p.pulsePhase) * 0.15 + 1;
        const drawRadius = p.radius * pulse;

        // Proximity glow near mouse
        const dx = mx - p.x;
        const dy = my - p.y;
        const mouseDist = Math.sqrt(dx * dx + dy * dy);
        const mouseGlow = mouseDist < MOUSE_RADIUS ? (1 - mouseDist / MOUSE_RADIUS) * 0.6 : 0;

        const finalOpacity = Math.min(p.opacity + mouseGlow, 1);

        // Outer glow for larger particles
        if (p.layer >= 1) {
          const glowRadius = drawRadius * 3;
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRadius);
          gradient.addColorStop(0, `hsla(${p.hue}, 45%, 45%, ${finalOpacity * 0.12})`);
          gradient.addColorStop(1, `hsla(${p.hue}, 45%, 45%, 0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        // Core particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, drawRadius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 45%, 40%, ${finalOpacity})`;
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    }

    function handleMouseMove(e: MouseEvent) {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    }

    function handleMouseLeave() {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    }

    // Reduced motion check
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    resize();
    createParticles();
    animFrameRef.current = requestAnimationFrame(animate);

    window.addEventListener("resize", () => {
      resize();
      createParticles();
    });
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    />
  );
}
