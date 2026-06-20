"use client";

import { useState, useEffect, useRef } from "react";

// ── Palette ───────────────────────────────────────────────────────────────
const C      = "#DCCFB8";
const EYE    = "#53443D";
const CACTUS = "#7A9CB3";

// ── Physics / game constants ──────────────────────────────────────────────
const DINO_SPEED   = 180;  // px / s — dino runs left → right
const JUMP_V       = 475;  // px / s — initial upward velocity (peak ≈ 80px)
const GRAVITY      = 1400; // px / s²
const DINO_W       = 48;   // hitbox width
const CACTUS_VISUAL_W = 36;
const CACTUS_POS = 0.62;  // cactus sits at 62% from the left (past middle, not at edge)
const JUMP_LEAD    = 42;   // px gap between dino.right and cactus.left at trigger
const DINO_GROUND  = 10;   // px above floor bottom when standing

// ── Dino SVG ─────────────────────────────────────────────────────────────
function DinoSVG({ size = 1, frame = 0 }: { size?: number; frame?: number }) {
  const legRH = frame === 0 ? 18 : 12;
  const legLH = frame === 0 ? 12 : 18;
  const footRY = frame === 0 ? 60 : 54;
  const footLY = frame === 0 ? 54 : 60;

  return (
    <svg width={80*size} height={70*size} viewBox="0 0 80 70" style={{ display:"block", overflow:"visible" }}>
      <rect x="44" y="2"  width="28" height="20" rx="3" fill={C}/>
      <rect x="52" y="18" width="26" height="12" rx="3" fill={C}/>
      <rect x="60" y="27" width="18" height="3"  rx="1" fill={EYE} opacity="0.35"/>
      <rect x="64" y="7"  width="6"  height="6"  rx="1" fill={EYE}/>
      <polygon points="44,8 28,24 28,36 44,22" fill={C}/>
      <rect x="6"  y="26" width="40" height="22" rx="4" fill={C}/>
      <polygon points="6,28 0,35 6,42" fill={C}/>
      <rect x="38" y="34" width="14" height="6"  rx="3" fill={C}/>
      <rect x="48" y="38" width="8"  height="5"  rx="2" fill={C}/>
      <rect x="12" y="46" width="10" height={legRH} rx="3" fill={C}/>
      <rect x="10" y={footRY} width="16" height="6" rx="2" fill={C}/>
      <rect x="26" y="46" width="10" height={legLH} rx="3" fill={C}/>
      <rect x="24" y={footLY} width="14" height="5" rx="2" fill={C}/>
    </svg>
  );
}

// ── Cactus SVG ────────────────────────────────────────────────────────────
function CactusSVG({ size = 1 }: { size?: number }) {
  return (
    <svg width={CACTUS_VISUAL_W*size} height={64*size} viewBox="0 0 36 64" style={{ display:"block" }}>
      <rect x="14" y="4"  width="10" height="60" rx="4" fill={CACTUS}/>
      <rect x="4"  y="26" width="12" height="8"  rx="3" fill={CACTUS}/>
      <rect x="4"  y="12" width="8"  height="20" rx="3" fill={CACTUS}/>
      <rect x="4"  y="10" width="8"  height="5"  rx="2.5" fill={CACTUS} style={{ filter:"brightness(1.25)" }}/>
      <rect x="22" y="34" width="12" height="8"  rx="3" fill={CACTUS}/>
      <rect x="26" y="20" width="8"  height="20" rx="3" fill={CACTUS}/>
      <rect x="26" y="18" width="8"  height="5"  rx="2.5" fill={CACTUS} style={{ filter:"brightness(1.25)" }}/>
      <rect x="12" y="58" width="14" height="6"  rx="3" fill={CACTUS} style={{ filter:"brightness(0.85)" }}/>
    </svg>
  );
}

// ── Standalone dino (non-game use) ────────────────────────────────────────
export function ChromeDino({ size = 1 }: { size?: number }) {
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setFrame(f => (f+1)%2), 190);
    return () => clearInterval(iv);
  }, []);
  return <DinoSVG size={size} frame={frame}/>;
}

// ── Periodic dino scene ───────────────────────────────────────────────────
// Dino runs from off-screen left → jumps over the fixed right cactus → exits right → loops.
export function ChromeDinoGame() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dinoRef      = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const g = {
      dinoX:      -120,  // px from left (starts off-screen left)
      dinoY:      0,     // px above ground
      jumpV:      0,     // vertical velocity
      lastTs:     0,
      hasJumped:  false,
      raf:        0 as unknown as ReturnType<typeof requestAnimationFrame>,
      frameAccum: 0,
      paused:     false, // brief pause between loops
    };

    const cw = () => containerRef.current?.offsetWidth ?? 1400;

    // Cactus left edge in px from container left
    const cactusLeft = () => cw() * CACTUS_POS;

    const reset = () => {
      g.dinoX     = -120;
      g.dinoY     = 0;
      g.jumpV     = 0;
      g.hasJumped = false;
      g.lastTs    = 0;
    };

    const loop = (ts: number) => {
      if (g.paused) return;

      const dt = g.lastTs ? Math.min((ts - g.lastTs) / 1000, 0.05) : 0.016;
      g.lastTs = ts;

      // Leg frame tick
      g.frameAccum += dt * 1000;
      if (g.frameAccum >= 190) { g.frameAccum -= 190; setFrame(f => (f+1)%2); }

      // Dino runs right
      g.dinoX += DINO_SPEED * dt;

      // Auto-jump: when dino's right edge is JUMP_LEAD px before the cactus
      const cl = cactusLeft();
      const dinoRight = g.dinoX + DINO_W;
      if (!g.hasJumped && dinoRight >= cl - JUMP_LEAD) {
        g.jumpV     = JUMP_V;
        g.hasJumped = true;
      }

      // Jump physics
      if (g.jumpV !== 0 || g.dinoY > 0) {
        g.jumpV -= GRAVITY * dt;
        g.dinoY  = Math.max(0, g.dinoY + g.jumpV * dt);
        if (g.dinoY <= 0) g.jumpV = 0;
      }

      // Apply to DOM
      if (dinoRef.current) {
        dinoRef.current.style.left   = `${g.dinoX}px`;
        dinoRef.current.style.bottom = `${DINO_GROUND + g.dinoY}px`;
      }

      // Dino exited right — pause briefly then loop
      if (g.dinoX > cw() + 20) {
        g.paused = true;
        setTimeout(() => {
          reset();
          g.paused = false;
          g.raf = requestAnimationFrame(loop);
        }, 1200); // wait 1.2s before next run
        return;
      }

      g.raf = requestAnimationFrame(loop);
    };

    g.raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(g.raf);
  }, []);

  return (
    <div ref={containerRef} style={{ position:"absolute", inset:0, overflow:"hidden" }}>
      {/* Dino — x and y controlled by game loop */}
      <div ref={dinoRef} style={{ position:"absolute", left:-120, bottom:DINO_GROUND }}>
        <DinoSVG size={0.8} frame={frame}/>
      </div>

      {/* Cactus — stationary, slightly past the middle */}
      <div style={{
        position: "absolute",
        left: `${CACTUS_POS * 100}%`,
        bottom: DINO_GROUND,
      }}>
        <CactusSVG size={0.95}/>
      </div>
    </div>
  );
}
