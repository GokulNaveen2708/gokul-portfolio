"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LegoBrickSVG } from "./LegoBrickSVG";

// i=0 bottom (widest) → i=3 top (narrowest)
const BRICKS = [
  { color: "#AD7556", studs: 5 },
  { color: "#7A9CB3", studs: 4 },
  { color: "#DCCFB8", studs: 3 },
  { color: "#53443D", studs: 2 },
];

const SCATTER: { x: number; y: number; rotate: number }[] = [
  { x: -85, y:  52, rotate: -38 },
  { x:  70, y: -32, rotate:  44 },
  { x: -50, y: -68, rotate: -22 },
  { x:  58, y: -92, rotate:  56 },
];

const STACK_STEP = 32;

// LegoBrickSVG: totalW = studs*24+4+10, totalH = 16+26 = 42
function svgW(studs: number) { return studs * 24 + 14; }
const SVG_H = 42;

const CONTAINER_W = svgW(BRICKS[0].studs) + 6;
const CONTAINER_H = BRICKS.length * STACK_STEP + SVG_H;

function centeredLeft(studs: number) {
  return (CONTAINER_W - svgW(studs)) / 2;
}

interface LegoBrickStackProps {
  className?: string;
}

export function LegoBrickStack({ className }: LegoBrickStackProps) {
  const [scattered, setScattered] = useState(false);

  return (
    <div
      className={className}
      onMouseEnter={() => setScattered(true)}
      onMouseLeave={() => setScattered(false)}
      style={{ position: "relative", width: CONTAINER_W, height: CONTAINER_H, cursor: "default" }}
    >
      {BRICKS.map((brick, i) => {
        const isTop = i === BRICKS.length - 1;
        return (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              bottom: i * STACK_STEP + 8,
              left: centeredLeft(brick.studs),
              zIndex: i,
            }}
            animate={scattered ? SCATTER[i] : { x: 0, y: 0, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: scattered ? 320 : 180,
              damping:   scattered ? 16  : 24,
              delay: scattered
                ? i * 0.06
                : (BRICKS.length - 1 - i) * 0.09,
            }}
          >
            <LegoBrickSVG
              studs={brick.studs}
              color={brick.color}
              showStuds={scattered || isTop}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
