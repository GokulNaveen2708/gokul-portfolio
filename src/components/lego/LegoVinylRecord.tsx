"use client";

import { motion } from "framer-motion";

interface LegoVinylRecordProps {
  size?: number;
  animated?: boolean;
}

// Notes fly out of the upward-facing bell
const MUSIC_NOTES = [
  { sym: "♪", x: 40, y0: 8,  delay: 0.0 },
  { sym: "♫", x: 56, y0: 2,  delay: 1.1 },
  { sym: "♪", x: 48, y0: -4, delay: 2.2 },
  { sym: "♫", x: 66, y0: 6,  delay: 3.3 },
];

export function LegoVinylRecord({ size = 1, animated = true }: LegoVinylRecordProps) {
  // Turntable shifted down ~30 px so the horn lives above it in the same canvas
  const W = 120;
  const H = 130;

  const bodyFront = "#1C1A1A";
  const bodyTop   = "#252222";
  const bodyRight = "#0E0C0C";
  const label     = "#AD7556";
  const armColor  = "#7A9CB3";
  const hornColor = "#AD7556";
  const hornLight = "#C8956A";
  const hornDark  = "#7A4830";

  return (
    <div style={{ display: "inline-block", position: "relative", width: W * size, height: H * size }}>
      <svg
        width={W * size}
        height={H * size}
        viewBox={`0 0 ${W} ${H}`}
        overflow="visible"
        style={{ display: "block" }}
      >
        {/* ════════════════════════════════════════ */}
        {/* GRAMOPHONE HORN — goes straight upward  */}
        {/* ════════════════════════════════════════ */}

        {/* Horn body: narrow at base (≈ tonearm), widens to a bell at top */}
        <path
          d="M 77,82 C 67,56 54,32 42,12 L 64,8 C 72,30 82,54 86,82 Z"
          fill={hornColor}
        />
        {/* Left-edge highlight (lit face of the horn) */}
        <path
          d="M 77,82 C 67,56 54,32 42,12"
          stroke={hornLight} strokeWidth={2.5} fill="none" strokeLinecap="round" opacity={0.6}
        />
        {/* Right-edge shadow */}
        <path
          d="M 86,82 C 82,54 72,30 64,8"
          stroke={hornDark} strokeWidth={2.5} fill="none" strokeLinecap="round" opacity={0.5}
        />
        {/* Inner-face highlight strip */}
        <path
          d="M 79,82 C 71,58 60,36 50,16"
          stroke="rgba(255,255,255,0.12)" strokeWidth={1.8} fill="none" strokeLinecap="round"
        />

        {/* LEGO stud on horn mid-section */}
        <ellipse cx={60} cy={46} rx={5} ry={3.5}
          fill={hornColor} style={{ filter: "brightness(1.35)" }}
          transform="rotate(-72 60 46)" />
        <ellipse cx={59} cy={44} rx={2.2} ry={1.4}
          fill="rgba(255,255,255,0.48)" transform="rotate(-72 59 44)" />

        {/* Bell depth shadow (lower ellipse — the "inside" of the bell) */}
        <ellipse cx={53} cy={13} rx={13} ry={4.5} fill="#0E0800" opacity={0.88} />
        {/* Bell rim (main ellipse at bell mouth) */}
        <ellipse cx={53} cy={10} rx={13} ry={4.5} fill={hornColor} />
        {/* Bell rim outer stroke */}
        <ellipse cx={53} cy={10} rx={13} ry={4.5} fill="none" stroke={hornLight} strokeWidth={1.5} />
        {/* Bell rim depth stroke */}
        <ellipse cx={53} cy={13} rx={13} ry={4.5} fill="none" stroke={hornDark} strokeWidth={1} opacity={0.6} />
        {/* Bell interior dark ellipse */}
        <ellipse cx={53} cy={10} rx={10} ry={3.2} fill="#080604" opacity={0.90} />
        {/* Bell interior glint */}
        <ellipse cx={48} cy={9}  rx={3}  ry={1.2} fill="rgba(255,255,255,0.18)" />

        {/* ════════════════════════════════════════ */}
        {/* TURNTABLE BODY (shifted down ~30 px)    */}
        {/* ════════════════════════════════════════ */}

        {/* Right face */}
        <polygon points="90,88 98,80 98,112 90,120" fill={bodyRight} />
        {/* Top face */}
        <polygon points="5,88 90,88 98,80 13,80" fill={bodyTop} />
        {/* Front face */}
        <rect x={5} y={88} width={85} height={30} rx={3} fill={bodyFront} />
        {/* Top inner highlight */}
        <rect x={7} y={89} width={81} height={2} rx={1} fill="rgba(255,255,255,0.07)" />

        {/* ════════════════════════════════════════ */}
        {/* PLATTER + RECORD                         */}
        {/* ════════════════════════════════════════ */}

        {/* Platter */}
        <ellipse cx={45} cy={84} rx={27} ry={9.5}  fill="#2A2A2A" />
        <ellipse cx={45} cy={84} rx={24} ry={8.5}  fill="#1F1F1F" />
        {/* Record */}
        <ellipse cx={45} cy={84} rx={21} ry={7.5}  fill="#0D0D0D" />
        {/* Grooves */}
        {([18, 15, 12] as const).map(r => (
          <ellipse key={r} cx={45} cy={84} rx={r} ry={r * 0.358}
            fill="none" stroke="#1C1C1C" strokeWidth={1.2} />
        ))}
        {([17, 13] as const).map(r => (
          <ellipse key={r} cx={45} cy={84} rx={r} ry={r * 0.358}
            fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth={0.7} />
        ))}
        {/* Label */}
        <ellipse cx={45} cy={84} rx={9}  ry={3.2} fill={label} />
        <ellipse cx={45} cy={84} rx={6}  ry={2.1} fill={label} style={{ filter: "brightness(1.18)" }} />
        <rect x={39} y={83.4} width={12} height={1.3} rx={0.4} fill="rgba(255,255,255,0.28)" />
        {/* LEGO stud on label */}
        <rect    x={42}  y={79.5} width={6} height={4}  rx={1}   fill={label} style={{ filter: "brightness(0.65)" }} />
        <ellipse cx={45} cy={79.5} rx={3}   ry={1.3}             fill={label} style={{ filter: "brightness(1.40)" }} />
        <ellipse cx={43.8} cy={78.8} rx={1.3} ry={0.6}           fill="rgba(255,255,255,0.55)" />

        {/* ── Spinning glints: two bright spots orbiting the record's elliptical
             perimeter, 180° apart. This is how a horizontal spinning disc looks
             from an isometric angle — the reflections sweep around the rim. ── */}
        {/* Glint A — starts at right (3 o'clock), cx/cy trace the ellipse */}
        <motion.circle
          r={2.8}
          fill="rgba(255,255,255,0.72)"
          animate={animated ? {
            cx: [66, 53, 45, 37, 24, 37, 45, 53, 66],
            cy: [84, 87.5, 91.5, 87.5, 84, 80.5, 76.5, 80.5, 84],
            opacity: [0.72, 0.4, 0.05, 0.4, 0.72, 0.4, 0.05, 0.4, 0.72],
            r:      [2.8,  2.0, 1.0,  2.0, 2.8,  2.0, 1.0,  2.0, 2.8],
          } : {}}
          transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
        />
        {/* Glint B — 180° offset (starts at left) */}
        <motion.circle
          r={2.2}
          fill="rgba(255,255,255,0.45)"
          animate={animated ? {
            cx: [24, 37, 45, 53, 66, 53, 45, 37, 24],
            cy: [84, 87.5, 91.5, 87.5, 84, 80.5, 76.5, 80.5, 84],
            opacity: [0.45, 0.25, 0.04, 0.25, 0.45, 0.25, 0.04, 0.25, 0.45],
            r:      [2.2,  1.5,  0.8,  1.5,  2.2,  1.5,  0.8,  1.5,  2.2],
          } : {}}
          transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
        />

        {/* ════════════════════════════════════════ */}
        {/* TONEARM                                  */}
        {/* ════════════════════════════════════════ */}

        <circle cx={82} cy={83} r={4}   fill="#2A2A2A" />
        <circle cx={82} cy={83} r={2.5} fill="#3A3A3A" />
        <circle cx={82} cy={83} r={1.3} fill="#4A4A4A" />

        <motion.g
          animate={animated ? { rotate: [0, 2.5, 0, -1.5, 0] } : {}}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "82px 83px" }}
        >
          <rect x={63} y={82} width={20} height={2} rx={1}
            fill={armColor} opacity={0.90} transform="rotate(-7 82 83)" />
          <rect x={60} y={82.5} width={5} height={3} rx={1}
            fill={armColor} transform="rotate(-7 82 83)" />
          <circle cx={61} cy={85} r={1.4} fill="#FDFCFA" opacity={0.8} />
        </motion.g>

        {/* ════════════════════════════════════════ */}
        {/* FRONT PANEL CONTROLS                    */}
        {/* ════════════════════════════════════════ */}

        {/* Front-edge LEGO studs */}
        {([20, 44, 68] as const).map(x => (
          <g key={x}>
            <rect    x={x - 5} y={82} width={10} height={6}  rx={1.5} fill={bodyTop} style={{ filter: "brightness(0.65)" }} />
            <ellipse cx={x}    cy={82} rx={5}     ry={2.0}             fill={bodyTop} style={{ filter: "brightness(1.35)" }} />
            <ellipse cx={x-1}  cy={81} rx={2.0}   ry={0.9}            fill="rgba(255,255,255,0.48)" />
          </g>
        ))}

        {/* Power LED */}
        <circle cx={16} cy={104} r={3.5} fill="#111" />
        <circle cx={16} cy={104} r={2}   fill="#4CAF50" />
        <circle cx={15.2} cy={103.2} r={0.8} fill="rgba(255,255,255,0.6)" />

        {/* Volume knob */}
        <circle cx={78} cy={104} r={7}   fill="#2A2A2A" />
        <circle cx={78} cy={104} r={5}   fill="#383838" />
        <rect x={77.4} y={97.5} width={1.2} height={4} rx={0.6} fill="rgba(255,255,255,0.45)" />

        {/* Deck label plate */}
        <rect x={30} y={95} width={30} height={12} rx={2} fill="rgba(255,255,255,0.04)" />
        <rect x={32} y={99} width={26} height={1.4} rx={0.5} fill="rgba(255,255,255,0.10)" />
        <rect x={32} y={102} width={18} height={1.4} rx={0.5} fill="rgba(255,255,255,0.07)" />

        {/* Ground shadow */}
        <ellipse cx={52} cy={124} rx={46} ry={4.5} fill="rgba(0,0,0,0.10)" />
      </svg>

      {/* ── Music notes float upward out of the bell ── */}
      {MUSIC_NOTES.map(({ sym, x, y0, delay }, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            top: y0 * size,
            left: x * size,
            fontSize: `${13 * size}px`,
            fontWeight: 900,
            color: "#7A9CB3",
            pointerEvents: "none",
            userSelect: "none",
            lineHeight: 1,
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={animated ? {
            opacity: [0, 0.88, 0.88, 0],
            y: [0, -12 * size, -24 * size, -38 * size],
          } : { opacity: 0 }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            delay,
            ease: "easeOut",
            repeatDelay: 0.8,
          }}
        >
          {sym}
        </motion.div>
      ))}
    </div>
  );
}
