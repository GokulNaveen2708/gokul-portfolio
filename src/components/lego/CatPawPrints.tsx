"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

function PawPrint({ color }: { color: string }) {
  return (
    <svg width={18} height={20} viewBox="0 0 18 20" style={{ display: "block" }}>
      <ellipse cx={9}  cy={15} rx={6}   ry={4.5} fill={color} />
      <ellipse cx={2.5} cy={8.5} rx={2.5} ry={2.2} fill={color} />
      <ellipse cx={7}  cy={5.5} rx={2.5} ry={2.2} fill={color} />
      <ellipse cx={12} cy={5.5} rx={2.5} ry={2.2} fill={color} />
      <ellipse cx={16} cy={8.5} rx={2.5} ry={2.2} fill={color} />
    </svg>
  );
}

// Diagonal path up the left edge — alternating left/right paw offset
const PAWS = [
  { x: "3%",   y: "86%", rot: -14 },
  { x: "7%",   y: "78%", rot:  14 },
  { x: "3.5%", y: "70%", rot: -16 },
  { x: "8%",   y: "62%", rot:  12 },
  { x: "4%",   y: "54%", rot: -14 },
  { x: "8.5%", y: "46%", rot:  14 },
  { x: "4.5%", y: "38%", rot: -12 },
  { x: "9%",   y: "30%", rot:  16 },
  { x: "5%",   y: "22%", rot: -14 },
  { x: "9.5%", y: "14%", rot:  12 },
];

const MAX_OPACITY = 0.17;

interface CatPawPrintsProps {
  color?: string;
}

export function CatPawPrints({ color = "#53443D" }: CatPawPrintsProps) {
  const ref  = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-60px" });
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (inView) setKey(k => k + 1);
  }, [inView]);

  return (
    <div
      ref={ref}
      style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2, overflow: "hidden" }}
      aria-hidden="true"
    >
      {PAWS.map((paw, i) => (
        <motion.div
          key={`${key}-${i}`}
          style={{ position: "absolute", left: paw.x, top: paw.y, rotate: paw.rot }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: [0, MAX_OPACITY, MAX_OPACITY, 0], scale: [0.6, 1, 1, 0.9] }}
          transition={{
            times: [0, 0.1, 0.6, 1],
            duration: 2.4,
            delay: i * 0.28,
            ease: "easeOut",
          }}
        >
          <PawPrint color={color} />
        </motion.div>
      ))}
    </div>
  );
}
