"use client";

import { motion } from "framer-motion";

/* ── Isometric LEGO-brick stud row ── */
function Studs({ count, x, y, w, color }: { count: number; x: number; y: number; w: number; color: string }) {
  const step = w / count;
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const cx = x + step * i + step / 2;
        return (
          <g key={i}>
            <rect x={cx - 5} y={y - 6} width={10} height={7} rx={1.5} fill={color} style={{ filter: "brightness(0.82)" }} />
            <ellipse cx={cx} cy={y - 6} rx={5} ry={2.2} fill={color} style={{ filter: "brightness(1.3)" }} />
            <ellipse cx={cx - 1.5} cy={y - 7.5} rx={2} ry={0.9} fill="rgba(255,255,255,0.4)" />
          </g>
        );
      })}
    </>
  );
}

/* ── Single LEGO wheel ── */
function Wheel({ cx, cy, r = 22 }: { cx: number; cy: number; r?: number }) {
  return (
    <g>
      {/* Tyre */}
      <circle cx={cx} cy={cy} r={r} fill="#1a1a1a" />
      <circle cx={cx} cy={cy} r={r - 4} fill="#2a2a2a" />
      {/* Rim */}
      <circle cx={cx} cy={cy} r={r - 8} fill="#d4d4d4" />
      <circle cx={cx} cy={cy} r={r - 14} fill="#b0b0b0" />
      {/* Spokes */}
      {[0, 60, 120, 180, 240, 300].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <line
            key={deg}
            x1={cx + Math.cos(rad) * (r - 14)}
            y1={cy + Math.sin(rad) * (r - 14)}
            x2={cx + Math.cos(rad) * (r - 8)}
            y2={cy + Math.sin(rad) * (r - 8)}
            stroke="#909090"
            strokeWidth={3}
            strokeLinecap="round"
          />
        );
      })}
      <circle cx={cx} cy={cy} r={4} fill="#888" />
      {/* Tyre tread dots */}
      {[30, 90, 150, 210, 270, 330].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <circle
            key={deg}
            cx={cx + Math.cos(rad) * (r - 2)}
            cy={cy + Math.sin(rad) * (r - 2)}
            r={1.5}
            fill="#333"
          />
        );
      })}
    </g>
  );
}

/* ── Window with frame ── */
function Window({ x, y, w, h, color = "rgba(140,200,255,0.82)" }: { x: number; y: number; w: number; h: number; color?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={4} fill={color} />
      {/* Glare streak */}
      <rect x={x + 4} y={y + 4} width={w * 0.35} height={h * 0.3} rx={2} fill="rgba(255,255,255,0.38)" />
      {/* Frame */}
      <rect x={x} y={y} width={w} height={h} rx={4} fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth={1.5} />
    </g>
  );
}

interface LegoCarProps {
  bodyColor?: string;
  accentColor?: string;
  size?: number;
  animated?: boolean;
}

export function LegoCar({
  bodyColor = "#AD7556",
  accentColor = "#7A9CB3",
  size = 1,
  animated = true,
}: LegoCarProps) {
  const W = 220;
  const H = 120;
  const topColor = bodyColor;
  const sideColor = `color-mix(in srgb, ${bodyColor} 85%, black)`;
  const darkSide = "rgba(0,0,0,0.28)";

  const car = (
    <svg
      width={W * size}
      height={H * size}
      viewBox={`0 0 ${W} ${H}`}
      overflow="visible"
      style={{ display: "block" }}
    >
      {/* ── Axle bars ── */}
      <rect x={38} y={84} width={144} height={6} rx={3} fill="#555" />

      {/* ── Main body — bottom slab ── */}
      {/* Front face (darker) */}
      <polygon points="14,72 28,60 28,88 14,100" fill={darkSide} />
      {/* Side face */}
      <rect x={28} y={60} width={160} height={28} rx={3} fill={bodyColor} style={{ filter: "brightness(0.88)" }} />
      {/* Top face */}
      <polygon points="14,72 28,60 188,60 174,72" fill={bodyColor} style={{ filter: "brightness(1.1)" }} />
      {/* Bottom face */}
      <polygon points="14,100 28,88 188,88 174,100" fill={darkSide} />
      {/* Back face */}
      <polygon points="174,72 188,60 188,88 174,100" fill={darkSide} style={{ filter: "brightness(0.6)" }} />

      {/* ── Cabin — upper section ── */}
      {/* Left cabin face */}
      <polygon points="52,46 64,34 64,60 52,60" fill={darkSide} />
      {/* Cabin top face */}
      <polygon points="52,46 64,34 148,34 136,46" fill={accentColor} style={{ filter: "brightness(1.18)" }} />
      {/* Cabin front face */}
      <rect x={64} y={34} width={84} height={26} rx={2} fill={accentColor} style={{ filter: "brightness(0.95)" }} />
      {/* Cabin back face */}
      <polygon points="136,46 148,34 148,60 136,60" fill={darkSide} style={{ filter: "brightness(0.55)" }} />

      {/* ── Windscreen ── */}
      <Window x={66} y={37} w={34} h={20} />

      {/* ── Rear window ── */}
      <Window x={112} y={37} w={32} h={20} color="rgba(140,200,255,0.72)" />

      {/* ── Hood studs ── */}
      <Studs count={3} x={28} y={60} w={36} color={bodyColor} />

      {/* ── Roof studs ── */}
      <Studs count={3} x={64} y={34} w={84} color={accentColor} />

      {/* ── Trunk studs ── */}
      <Studs count={2} x={148} y={60} w={40} color={bodyColor} />

      {/* ── Headlights ── */}
      <rect x={174} y={64} width={14} height={8} rx={2} fill="#ffe87c" style={{ filter: "brightness(1.2)" }} />
      <rect x={175} y={65} width={12} height={6} rx={1.5} fill="rgba(255,255,255,0.5)" />

      {/* ── Taillights ── */}
      <rect x={28} y={64} width={12} height={8} rx={2} fill="#e63946" />
      <rect x={29} y={65} width={10} height={6} rx={1.5} fill="rgba(255,255,255,0.25)" />

      {/* ── Front bumper brick ── */}
      <rect x={166} y={72} width={22} height={10} rx={2} fill={bodyColor} style={{ filter: "brightness(0.9)" }} />
      <rect x={168} y={71} width={18} height={3} rx={1} fill={bodyColor} style={{ filter: "brightness(1.2)" }} />

      {/* ── Rear bumper brick ── */}
      <rect x={28} y={72} width={22} height={10} rx={2} fill={bodyColor} style={{ filter: "brightness(0.9)" }} />
      <rect x={30} y={71} width={18} height={3} rx={1} fill={bodyColor} style={{ filter: "brightness(1.2)" }} />

      {/* ── Wheels ── */}
      <Wheel cx={60}  cy={92} r={20} />
      <Wheel cx={160} cy={92} r={20} />

      {/* ── Ground shadow ── */}
      <ellipse cx={110} cy={115} rx={88} ry={6} fill="rgba(0,0,0,0.12)" />
    </svg>
  );

  if (!animated) return car;

  return (
    <motion.div
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      style={{ display: "inline-block" }}
    >
      {car}
    </motion.div>
  );
}
