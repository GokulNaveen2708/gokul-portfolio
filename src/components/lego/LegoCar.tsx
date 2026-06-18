"use client";

import { motion } from "framer-motion";

const round = (n: number) => Math.round(n * 100) / 100;

/* ── Wheel with 5-spoke alloy rim ── */
function Wheel({ cx, cy, r = 26 }: { cx: number; cy: number; r?: number }) {
  const spokes = [0, 72, 144, 216, 288];
  return (
    <g>
      {/* Tyre */}
      <circle cx={cx} cy={cy} r={r}     fill="#111" />
      <circle cx={cx} cy={cy} r={r - 3} fill="#222" />
      {/* Rim outer ring */}
      <circle cx={cx} cy={cy} r={r - 7} fill="#c8c8c8" />
      {/* 5-spoke alloy */}
      {spokes.map((deg) => {
        const a = (deg * Math.PI) / 180;
        const x1 = round(cx + Math.cos(a) * 4);
        const y1 = round(cy + Math.sin(a) * 4);
        const x2 = round(cx + Math.cos(a) * (r - 8));
        const y2 = round(cy + Math.sin(a) * (r - 8));
        return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#888" strokeWidth={4} strokeLinecap="round" />;
      })}
      {/* Spoke trim */}
      {spokes.map((deg) => {
        const a = (deg * Math.PI) / 180;
        const x1 = round(cx + Math.cos(a) * 4);
        const y1 = round(cy + Math.sin(a) * 4);
        const x2 = round(cx + Math.cos(a) * (r - 8));
        const y2 = round(cy + Math.sin(a) * (r - 8));
        return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#b0b0b0" strokeWidth={2} strokeLinecap="round" />;
      })}
      {/* Centre cap */}
      <circle cx={cx} cy={cy} r={5}   fill="#999" />
      <circle cx={cx} cy={cy} r={3}   fill="#777" />
      {/* Tread bumps */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const a  = (deg * Math.PI) / 180;
        return <circle key={deg} cx={round(cx + Math.cos(a) * (r - 1.5))} cy={round(cy + Math.sin(a) * (r - 1.5))} r={1.8} fill="#333" />;
      })}
      {/* Rim inner shadow ring */}
      <circle cx={cx} cy={cy} r={r - 7} fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth={2} />
    </g>
  );
}

/* ── LEGO stud row ── */
function Studs({ count, x, y, w, color }: { count: number; x: number; y: number; w: number; color: string }) {
  const step = w / count;
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const cx = x + step * i + step / 2;
        return (
          <g key={i}>
            <rect x={cx - 5} y={y - 7} width={10} height={7} rx={1.5} fill={color} style={{ filter: "brightness(0.72)" }} />
            <ellipse cx={cx} cy={y - 7} rx={5} ry={2.2} fill={color} style={{ filter: "brightness(1.35)" }} />
            <ellipse cx={cx - 1.5} cy={y - 8.5} rx={2.2} ry={1} fill="rgba(255,255,255,0.5)" />
          </g>
        );
      })}
    </>
  );
}

interface LegoCarProps {
  bodyColor?: string;
  accentColor?: string;
  size?: number;
  animated?: boolean;
}

export function LegoCar({
  bodyColor  = "#AD7556",
  accentColor = "#7A9CB3",
  size = 1,
  animated = true,
}: LegoCarProps) {
  const W = 310;
  const H = 132;

  /* ── palette ── */
  const dark       = "rgba(0,0,0,0.32)";
  const topShine   = "brightness(1.22)";
  const bodyShade  = "brightness(0.82)";

  /*
   * Profile faces LEFT  (rear = right side, front/headlights = left side)
   * to match the hero section left-edge placement.
   *
   * Wheels: front cx=88, rear cx=230, both cy=100, r=26
   *
   * Side-profile body polygon — Mustang fastback silhouette:
   *   - Long low hood
   *   - Short steep windshield
   *   - Flat roof (short)
   *   - Sweeping fastback rear
   *   - Rear deck / spoiler mount
   */

  // ── Main body side face (the big polygon) ──
  const bodyPoly = [
    [38,  95],  // rear bumper bottom
    [38,  80],  // rear bumper top
    [52,  62],  // fastback lower rear
    [66,  42],  // fastback upper — sweeping roofline
    [100, 34],  // roof rear
    [178, 32],  // roof front
    [200, 36],  // A-pillar top
    [224, 58],  // base of windshield / cowl
    [240, 58],  // hood line
    [264, 60],  // hood runs long & low
    [274, 68],  // hood nose dip
    [280, 78],  // front splitter
    [276, 95],  // front bumper bottom
  ].map(([x, y]) => `${x},${y}`).join(" ");

  // ── Isometric top-face strip (offset left 14, up 5) ──
  // Just draw along the roofline + hood for depth suggestion
  const roofTopFace = `100,34 178,32 164,27 86,29`;
  const hoodTopFace = `224,58 264,60 250,55 210,53`;

  // ── Left (rear) depth face ──
  const rearDepthFace = `24,100 38,95 38,80 24,85`;

  // ── Windshield glass ──
  const windshieldPoly = `200,36 224,58 216,58 194,38`;

  // ── Rear fastback glass ──
  const rearGlassPoly = `66,42 100,34 104,37 70,46`;

  // ── Quarter glass (between A and C pillar) ──
  // small side window
  const sideWindowPoly = `104,37 178,32 195,36 200,36 194,38 100,34`;

  const car = (
    <svg
      width={W * size}
      height={H * size}
      viewBox={`0 0 ${W} ${H}`}
      overflow="visible"
      style={{ display: "block" }}
    >
      {/* ── Ground shadow ── */}
      <ellipse cx={157} cy={122} rx={115} ry={6} fill="rgba(0,0,0,0.13)" />

      {/* ── Axle bars ── */}
      <rect x={88} y={96} width={144} height={5} rx={2.5} fill="#444" />

      {/* ── Side skirt ── */}
      <rect x={52} y={88} width={220} height={7} rx={2}
        fill={bodyColor} style={{ filter: "brightness(0.68)" }} />
      <rect x={52} y={88} width={220} height={2} rx={1}
        fill="rgba(255,255,255,0.12)" />

      {/* ── Rear depth face ── */}
      <polygon points={rearDepthFace} fill={bodyColor} style={{ filter: "brightness(0.45)" }} />

      {/* ── Main body side face ── */}
      <polygon points={bodyPoly} fill={bodyColor} style={{ filter: "brightness(0.90)" }} />

      {/* ── Isometric top face — roof ── */}
      <polygon points={roofTopFace} fill={bodyColor} style={{ filter: topShine }} />

      {/* ── Isometric top face — hood ── */}
      <polygon points={hoodTopFace} fill={bodyColor} style={{ filter: topShine }} />

      {/* ── Body highlight strip (lower character line) ── */}
      <line x1={56} y1={74} x2={272} y2={72}
        stroke="rgba(255,255,255,0.18)" strokeWidth={2} strokeLinecap="round" />

      {/* ── Windshield ── */}
      <polygon points={windshieldPoly} fill="rgba(140,210,255,0.78)" />
      <polygon points={windshieldPoly} fill="none"
        stroke="rgba(0,0,0,0.22)" strokeWidth={1.5} />
      {/* windshield glare */}
      <polygon points="200,36 210,40 206,55 200,52"
        fill="rgba(255,255,255,0.22)" />

      {/* ── Rear fastback glass ── */}
      <polygon points={rearGlassPoly} fill="rgba(120,190,255,0.65)" />
      <polygon points={rearGlassPoly} fill="none"
        stroke="rgba(0,0,0,0.18)" strokeWidth={1.2} />

      {/* ── Side windows (roof glass strip) ── */}
      <polygon points={sideWindowPoly} fill="rgba(130,200,255,0.60)" />
      <polygon points={sideWindowPoly} fill="none"
        stroke="rgba(0,0,0,0.18)" strokeWidth={1.2} />

      {/* ── Hood ── */}
      {/* Hood vents (twin scoops) */}
      <rect x={246} y={60} width={14} height={5} rx={1.5}
        fill="rgba(0,0,0,0.35)" />
      <rect x={247} y={61} width={12} height={3} rx={1}
        fill="rgba(0,0,0,0.5)" />
      <rect x={228} y={60} width={12} height={5} rx={1.5}
        fill="rgba(0,0,0,0.28)" />

      {/* ── Roof studs ── */}
      <Studs count={3} x={108} y={34} w={68} color={accentColor} />

      {/* ── Hood studs ── */}
      <Studs count={2} x={232} y={58} w={28} color={bodyColor} />

      {/* ── Rear spoiler ── */}
      {/* Spoiler mount */}
      <rect x={44} y={55} width={4} height={10} rx={1.5}
        fill={bodyColor} style={{ filter: "brightness(0.70)" }} />
      {/* Spoiler wing */}
      <rect x={34} y={52} width={26} height={5} rx={2}
        fill={bodyColor} style={{ filter: "brightness(0.85)" }} />
      {/* Spoiler top face */}
      <rect x={34} y={52} width={26} height={2} rx={1}
        fill="rgba(255,255,255,0.20)" />

      {/* ── Headlights (left = rear of car) ── */}
      {/* Tail light bar */}
      <rect x={36} y={82} width={6} height={10} rx={1.5}
        fill="#e63946" style={{ filter: "brightness(1.3)" }} />
      <rect x={36} y={83} width={4} height={4} rx={1}
        fill="rgba(255,200,200,0.5)" />
      {/* Reverse/indicator light */}
      <rect x={36} y={76} width={6} height={6} rx={1}
        fill="#ffe87c" style={{ filter: "brightness(1.2)" }} />

      {/* ── Front headlights (right side) ── */}
      {/* Sharp angular headlight */}
      <polygon points="272,68 280,72 278,80 270,78"
        fill="#ffe87c" style={{ filter: "brightness(1.35)" }} />
      <polygon points="272,68 280,72 278,80 270,78"
        fill="rgba(255,255,255,0.38)" />
      {/* DRL strip */}
      <line x1={270} y1={68} x2={278} y2={70}
        stroke="rgba(255,255,255,0.9)" strokeWidth={1.5} strokeLinecap="round" />

      {/* ── Front splitter detail ── */}
      <rect x={272} y={88} width={8} height={4} rx={1}
        fill={bodyColor} style={{ filter: "brightness(0.60)" }} />
      {/* Air intake slot */}
      <rect x={258} y={82} width={18} height={5} rx={1.5}
        fill="rgba(0,0,0,0.45)" />
      <rect x={259} y={83} width={16} height={3} rx={1}
        fill="rgba(0,0,0,0.6)" />

      {/* ── Rear diffuser ── */}
      <rect x={38} y={90} width={16} height={5} rx={1}
        fill="rgba(0,0,0,0.40)" />
      {[0, 4, 8, 12].map(x => (
        <line key={x} x1={40 + x} y1={90} x2={40 + x} y2={95}
          stroke="rgba(255,255,255,0.12)" strokeWidth={1} />
      ))}

      {/* ── Wheels ── */}
      <Wheel cx={88}  cy={100} r={26} />
      <Wheel cx={230} cy={100} r={26} />
    </svg>
  );

  if (!animated) return <div style={{ display: "inline-block" }}>{car}</div>;

  return (
    <motion.div
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
      style={{ display: "inline-block" }}
    >
      {car}
    </motion.div>
  );
}
