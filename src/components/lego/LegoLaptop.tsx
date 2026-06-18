"use client";

import { motion } from "framer-motion";

interface LegoLaptopProps {
  color?: string;
  size?: number;
  animated?: boolean;
}

/* One row of keyboard keys */
function KeyRow({ y, count, startX }: { y: number; count: number; startX: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <rect key={i} x={startX + i * 13} y={y} width={10} height={7} rx={1.5} fill="rgba(0,0,0,0.18)" />
      ))}
    </>
  );
}

export function LegoLaptop({ color = "#2d3a4a", size = 1, animated = true }: LegoLaptopProps) {
  const dark = "rgba(0,0,0,0.32)";
  const screenBg = "#0d1117";

  const content = (
    <svg width={210 * size} height={165 * size} viewBox="0 0 210 165" overflow="visible" style={{ display: "block" }}>

      {/* ── Screen section ── */}
      {/* Screen outer shell — right face */}
      <polygon points="168,8 182,16 172,82 158,74" fill={dark} />
      {/* Screen outer shell — main face */}
      <polygon points="30,8 168,8 158,74 42,74" fill={color} />
      {/* Screen outer shell — top face */}
      <polygon points="24,5 174,5 168,8 30,8" fill={color} style={{ filter: "brightness(1.2)" }} />

      {/* Screen bezel */}
      <polygon points="36,12 162,12 153,70 45,70" fill="#0a0f1a" />

      {/* Screen content — code lines */}
      <polygon points="41,17 157,17 149,65 49,65" fill={screenBg} />
      {/* Ambient screen glow */}
      <polygon points="41,17 157,17 149,65 49,65" fill="rgba(122,156,179,0.06)" />

      {/* Code lines */}
      {[
        { x: 50, w: 55, color: "#7A9CB3", y: 24 },
        { x: 50, w: 82, color: "#AD7556", y: 32 },
        { x: 58, w: 46, color: "#7A9CB3", y: 40 },
        { x: 58, w: 68, color: "rgba(255,255,255,0.35)", y: 48 },
        { x: 50, w: 38, color: "#AD7556", y: 56 },
      ].map(({ x, w, color: c, y }, i) => (
        <rect key={i} x={x} y={y} width={w} height={2.5} rx={1.2} fill={c} opacity={0.85} />
      ))}

      {/* Cursor blink */}
      <motion.rect
        x={88} y={56} width={4} height={9} rx={1}
        fill="#7A9CB3"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1.1, repeat: Infinity }}
      />

      {/* Screen glare */}
      <polygon points="42,18 78,18 68,44 32,44" fill="rgba(255,255,255,0.03)" />

      {/* ── Hinge ── */}
      <rect x={40} y={73} width={130} height={7} rx={3} fill={color} style={{ filter: "brightness(1.1)" }} />
      <rect x={40} y={73} width={130} height={3} rx={2} fill="rgba(255,255,255,0.1)" />

      {/* ── Keyboard base ── */}
      {/* Top face */}
      <polygon points="18,82 192,82 178,96 32,96" fill={color} style={{ filter: "brightness(1.12)" }} />
      {/* Front face */}
      <rect x={18} y={96} width={160} height={42} rx={2} fill={color} />
      {/* Right face */}
      <polygon points="178,96 192,82 192,124 178,138" fill={dark} />
      {/* Bottom face */}
      <polygon points="18,138 178,138 192,124 32,124" fill={dark} style={{ filter: "brightness(0.65)" }} />

      {/* Keyboard keys */}
      <KeyRow y={100} count={11} startX={26} />
      <KeyRow y={111} count={10} startX={30} />
      <KeyRow y={122} count={9}  startX={34} />

      {/* Spacebar */}
      <rect x={62} y={133} width={78} height={7} rx={2} fill="rgba(0,0,0,0.18)" />

      {/* Touchpad */}
      <rect x={74} y={122} width={60} height={12} rx={3} fill={color} style={{ filter: "brightness(0.72)" }} />
      <rect x={76} y={124} width={56} height={1} rx={1} fill="rgba(255,255,255,0.1)" />

      {/* Studs along hinge (back of base top face) */}
      {[52, 80, 108, 136, 164].map((x) => (
        <g key={x}>
          <rect x={x - 5} y={79} width={10} height={6} rx={1.5} fill={color} style={{ filter: "brightness(0.82)" }} />
          <ellipse cx={x} cy={79} rx={5} ry={2} fill={color} style={{ filter: "brightness(1.28)" }} />
          <ellipse cx={x - 1.5} cy={77.5} rx={2.2} ry={1} fill="rgba(255,255,255,0.36)" />
        </g>
      ))}

      {/* Brand mark on screen back */}
      <circle cx={99} cy={41} r={6} fill={color} style={{ filter: "brightness(1.18)" }} />
      <circle cx={99} cy={41} r={3} fill={color} style={{ filter: "brightness(0.82)" }} />
    </svg>
  );

  if (!animated) return content;
  return (
    <motion.div
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      style={{ display: "inline-block" }}
    >
      {content}
    </motion.div>
  );
}
