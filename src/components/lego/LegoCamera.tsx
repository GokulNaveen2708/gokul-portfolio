"use client";

import { motion } from "framer-motion";

interface LegoCameraProps {
  size?: number;
}

export function LegoCamera({ size = 1 }: LegoCameraProps) {
  const W = 82;
  const H = 68;

  const body      = "#2C2C2C";
  const bodyTop   = "#3C3C3C";
  const bodyRight = "#1A1A1A";
  const lensRing  = "#222230";
  const glass     = "#4A6A8A";
  const studColor = "#AD7556";
  const accent    = "#7A9CB3";

  return (
    <motion.div
      animate={{ y: [0, -3, 0], rotate: [0, 0.8, 0] }}
      transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
      style={{ display: "inline-block" }}
    >
      <svg
        width={W * size}
        height={H * size}
        viewBox={`0 0 ${W} ${H}`}
        overflow="visible"
        style={{ display: "block" }}
      >
        {/* === ISOMETRIC CAMERA BODY === */}

        {/* Right face */}
        <polygon points="65,22 73,14 73,55 65,63" fill={bodyRight} />

        {/* Top face */}
        <polygon points="10,22 65,22 73,14 18,14" fill={bodyTop} />

        {/* Front face main */}
        <rect x={10} y={22} width={55} height={41} rx={4} fill={body} />

        {/* Front top inner lip highlight */}
        <rect x={12} y={23} width={51} height={2.5} rx={1} fill="rgba(255,255,255,0.10)" />

        {/* Left grip textured zone */}
        <rect x={10} y={22} width={15} height={41} rx={4} fill={body} style={{ filter: "brightness(0.68)" }} />
        {/* Grip rubber ridges */}
        {[29, 35, 41, 47, 53].map(y => (
          <line key={y} x1={11} y1={y} x2={24} y2={y}
            stroke="rgba(255,255,255,0.07)" strokeWidth={1.2} />
        ))}

        {/* === LENS === */}

        {/* Outer barrel */}
        <circle cx={43} cy={43} r={17} fill={lensRing} />
        {/* Barrel outer groove */}
        <circle cx={43} cy={43} r={17} fill="none" stroke="#111" strokeWidth={2.5} />
        {/* Barrel inner groove */}
        <circle cx={43} cy={43} r={15} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={1} />

        {/* Focus ring tick marks */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => {
          const rad = (deg * Math.PI) / 180;
          return (
            <line key={deg}
              x1={43 + 15.5 * Math.cos(rad)} y1={43 + 15.5 * Math.sin(rad)}
              x2={43 + 13.5 * Math.cos(rad)} y2={43 + 13.5 * Math.sin(rad)}
              stroke="rgba(255,255,255,0.18)" strokeWidth={0.8} />
          );
        })}

        {/* Glass layers — deep 3-layer look */}
        <circle cx={43} cy={43} r={13} fill="#1C2530" />
        <circle cx={43} cy={43} r={11} fill={glass}   opacity={0.50} />
        <circle cx={43} cy={43} r={8.5} fill="#182028" />
        <circle cx={43} cy={43} r={5.5} fill="#0E1418" />
        <circle cx={43} cy={43} r={2.5} fill="#070A0E" />

        {/* Aperture ring subtle dashes */}
        <circle cx={43} cy={43} r={11} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={1.5} strokeDasharray="3 3.5" />

        {/* Lens glare highlights */}
        <ellipse cx={37}   cy={37}   rx={3.2} ry={2.2} fill="rgba(255,255,255,0.42)" />
        <ellipse cx={39.5} cy={39}   rx={1.3} ry={0.9} fill="rgba(255,255,255,0.22)" />
        <ellipse cx={48}   cy={49}   rx={1.5} ry={1}   fill="rgba(255,255,255,0.08)" />

        {/* === LEGO STUDS ON TOP FACE (3 studs, isometric-shifted) === */}
        {[24, 36, 49].map((x, i) => {
          const cy = 18 - i * 0.5; // slight isometric tilt
          return (
            <g key={x}>
              <rect    x={x - 5} y={cy - 2} width={10} height={6}   rx={1.5} fill={studColor} style={{ filter: "brightness(0.68)" }} />
              <ellipse cx={x}    cy={cy - 2} rx={5}     ry={2.2}             fill={studColor} style={{ filter: "brightness(1.35)" }} />
              <ellipse cx={x-1.5} cy={cy - 3.5} rx={2.2} ry={1}             fill="rgba(255,255,255,0.50)" />
            </g>
          );
        })}

        {/* === VIEWFINDER (top-right bump) === */}
        {/* VF front */}
        <rect x={57} y={22} width={14} height={8} rx={2} fill={bodyTop} style={{ filter: "brightness(1.20)" }} />
        {/* VF top face */}
        <polygon points="57,22 71,22 75,18 61,18" fill={bodyTop} style={{ filter: "brightness(1.40)" }} />
        {/* VF right face */}
        <polygon points="71,22 75,18 75,26 71,30" fill={bodyRight} style={{ filter: "brightness(1.10)" }} />
        {/* VF eyepiece glass */}
        <rect x={59} y={24} width={10} height={5} rx={1.5} fill={accent} opacity={0.65} />
        <rect x={60} y={24.8} width={4} height={2} rx={0.5} fill="rgba(255,255,255,0.28)" />

        {/* === SHUTTER BUTTON (LEGO stud on top face) === */}
        <rect    x={27}  y={18} width={8} height={5}   rx={1.5} fill={accent} style={{ filter: "brightness(0.68)" }} />
        <ellipse cx={31} cy={18} rx={4}   ry={1.8}              fill={accent} style={{ filter: "brightness(1.40)" }} />
        <ellipse cx={29.5} cy={16.8} rx={1.8} ry={0.8}          fill="rgba(255,255,255,0.55)" />

        {/* === FLASH HOTSHOE (top left) === */}
        <rect x={14} y={12} width={11} height={4} rx={1.5} fill={bodyTop} style={{ filter: "brightness(0.75)" }} />
        <rect x={15} y={12.5} width={9} height={1.5} rx={0.5} fill="rgba(255,255,255,0.07)" />

        {/* === STRAP LUG right side === */}
        <rect x={65} y={30} width={8} height={7} rx={2.5} fill={bodyRight} style={{ filter: "brightness(0.80)" }} />
        <rect x={67} y={32} width={4} height={3} rx={1}   fill="rgba(255,255,255,0.08)" />

        {/* === FRONT DETAILS === */}
        {/* Mode dial hint on right side of front */}
        <circle cx={62} cy={34} r={4}   fill={bodyTop} style={{ filter: "brightness(1.15)" }} />
        <circle cx={62} cy={34} r={2.5} fill={bodyTop} style={{ filter: "brightness(0.80)" }} />
        <line x1={62} y1={30.5} x2={62} y2={28.5} stroke="rgba(255,255,255,0.30)" strokeWidth={1} />

        {/* Small red record dot */}
        <circle cx={27} cy={34} r={2.5} fill="#E05520" />
        <circle cx={26.5} cy={33.5} r={0.9} fill="rgba(255,255,255,0.45)" />

        {/* Ground shadow */}
        <ellipse cx={42} cy={65} rx={32} ry={3.5} fill="rgba(0,0,0,0.10)" />
      </svg>
    </motion.div>
  );
}
