"use client";

import { motion } from "framer-motion";

interface LegoRamenBowlProps {
  size?: number;
  animated?: boolean;
}

export function LegoRamenBowl({ size = 1, animated = true }: LegoRamenBowlProps) {
  const W = 96;
  const H = 88;

  // Authentic Japanese ramen bowl: navy blue ceramic, golden broth, cream noodles
  const bowlColor = "#1E3A5F";
  const bowlTop   = "#264B78"; // rim top face (lighter navy)
  const bowlRight = "#122440"; // right face (darker)
  const broth     = "#C07820"; // rich golden amber broth
  const noodle    = "#F0DC80"; // golden cream noodles
  const whiteBand = "rgba(255,255,255,0.15)"; // decorative white band on bowl

  const bowl = (
    <svg width={W * size} height={H * size} viewBox={`0 0 ${W} ${H}`} overflow="visible" style={{ display: "block" }}>

      {/* ── Steam wisps ── */}
      {[
        { x: 32, delay: 0   },
        { x: 48, delay: 0.6 },
        { x: 64, delay: 1.2 },
      ].map(({ x, delay }) => (
        <motion.path
          key={x}
          d={`M ${x},18 Q ${x - 4},12 ${x},6 Q ${x + 4},0 ${x},-4`}
          stroke="rgba(255,255,255,0.45)"
          strokeWidth={2.5}
          fill="none"
          strokeLinecap="round"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: [0, 0.55, 0], y: [4, -2, -8] }}
          transition={{ duration: 2.2, repeat: Infinity, delay, ease: "easeOut" }}
        />
      ))}

      {/* ── Chopsticks ── */}
      <rect x={30} y={6} width={3.5} height={40} rx={1.5}
        fill="#8B6914"
        transform="rotate(-18 31 26)" />
      <rect x={58} y={6} width={3.5} height={40} rx={1.5}
        fill="#8B6914"
        transform="rotate(-10 60 26)" />
      {/* chopstick tips */}
      <rect x={29} y={40} width={3.5} height={6} rx={1}
        fill="#6B4F10" transform="rotate(-18 31 43)" />
      <rect x={57} y={40} width={3.5} height={6} rx={1}
        fill="#6B4F10" transform="rotate(-10 60 43)" />

      {/* ── Bowl right side face (isometric) ── */}
      <polygon points="82,40 94,46 94,72 82,66" fill={bowlRight} />

      {/* ── Bowl top face (rim ellipse) ── */}
      <ellipse cx={48} cy={32} rx={40} ry={12} fill={bowlTop} />

      {/* ── Broth/noodle surface (inside rim) ── */}
      <ellipse cx={48} cy={32} rx={34} ry={9.8} fill={broth} />
      {/* broth highlight (light reflection) */}
      <ellipse cx={38} cy={29} rx={12} ry={3.5} fill="rgba(255,255,255,0.14)" />

      {/* ── Noodle squiggles on surface ── */}
      <path d="M 22,32 Q 28,28 34,32 Q 40,36 46,32 Q 52,28 58,32 Q 64,36 70,32"
        stroke={noodle} strokeWidth={2.5} fill="none" strokeLinecap="round" opacity={0.88} />
      <path d="M 25,36 Q 31,32 37,36 Q 43,40 49,36 Q 55,32 61,36"
        stroke={noodle} strokeWidth={2}   fill="none" strokeLinecap="round" opacity={0.70} />

      {/* ── Toppings: soft-boiled egg half ── */}
      <ellipse cx={60} cy={31} rx={7} ry={5.2} fill="#FEF3C7" opacity={0.92} />
      <ellipse cx={60} cy={31} rx={4.2} ry={3} fill="#F59E0B" opacity={0.92} />

      {/* ── Toppings: nori (seaweed) sheet ── */}
      <rect x={28} y={27} width={9} height={7} rx={1} fill="#1A2E1A" opacity={0.90} />
      <rect x={29} y={28} width={7} height={2} rx={0.5} fill="rgba(255,255,255,0.08)" />

      {/* ── Toppings: chashu pork ── */}
      <ellipse cx={44} cy={34} rx={5} ry={3.5} fill="#C0390A" opacity={0.80} />
      <ellipse cx={44} cy={34} rx={3.5} ry={2.2} fill="#D44412" opacity={0.70} />

      {/* ── Bowl main body (front face) ── */}
      <path d="M 8,32 Q 4,36 6,60 Q 8,72 48,76 Q 88,72 90,60 Q 92,36 88,32"
        fill={bowlColor} />

      {/* ── Decorative white wave band on bowl body ── */}
      <path d="M 12,46 Q 20,42 28,46 Q 36,50 44,46 Q 52,42 60,46 Q 68,50 76,46 Q 82,43 86,46"
        stroke={whiteBand} strokeWidth={2.5} fill="none" strokeLinecap="round" />
      <path d="M 10,52 Q 18,48 26,52 Q 34,56 42,52 Q 50,48 58,52 Q 66,56 74,52 Q 80,49 85,52"
        stroke={whiteBand} strokeWidth={1.5} fill="none" strokeLinecap="round" opacity={0.6} />

      {/* ── Bowl front highlight ── */}
      <path d="M 18,38 Q 15,52 18,63"
        stroke="rgba(255,255,255,0.10)" strokeWidth={3} fill="none" strokeLinecap="round" />

      {/* ── Rim studs (LEGO detail) ── */}
      {([18, 38, 58, 78] as const).map(x => (
        <g key={x}>
          <rect    x={x - 5} y={26} width={10} height={7}   rx={1.5} fill={bowlTop} style={{ filter: "brightness(0.68)" }} />
          <ellipse cx={x}    cy={26} rx={5}     ry={2.2}              fill={bowlTop} style={{ filter: "brightness(1.35)" }} />
          <ellipse cx={x-1.5} cy={24.5} rx={2.2} ry={1.0}            fill="rgba(255,255,255,0.50)" />
        </g>
      ))}

      {/* ── Ground shadow ── */}
      <ellipse cx={48} cy={82} rx={36} ry={4} fill="rgba(0,0,0,0.10)" />
    </svg>
  );

  if (!animated) return <div style={{ display: "inline-block" }}>{bowl}</div>;

  return (
    <motion.div
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
      style={{ display: "inline-block" }}
    >
      {bowl}
    </motion.div>
  );
}
