"use client";

import { motion } from "framer-motion";

export function LegoGradCap({ size = 1 }: { size?: number }) {
  const W = 115, H = 100;

  return (
    <div style={{ display: "inline-block", position: "relative", width: W * size, height: H * size }}>
      <motion.div
        initial={{ y: -80 * size, rotate: 20, opacity: 0 }}
        animate={{ y: 0, rotate: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 90, damping: 12, delay: 0.2 }}
        style={{ position: "absolute", inset: 0 }}
      >
        <motion.div
          animate={{ y: [0, -7 * size, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", inset: 0 }}
        >
          <svg
            width={W * size}
            height={H * size}
            viewBox={`0 0 ${W} ${H}`}
            style={{ display: "block", overflow: "visible" }}
          >
            {/* Ground shadow */}
            <ellipse cx={48} cy={96} rx={32} ry={5} fill="rgba(0,0,0,0.15)" />

            {/* ── Cap dome / body ── */}
            <rect x={25} y={49} width={46} height={28} rx={10} fill="#141414" />
            {/* Top rounded highlight */}
            <rect x={25} y={49} width={46} height={9} rx={8} fill="#1C1C1C" />
            {/* Side sheen */}
            <rect x={26} y={52} width={4} height={18} rx={2} fill="rgba(255,255,255,0.05)" />
            {/* Band groove */}
            <rect x={28} y={62} width={40} height={3} rx={1.5} fill="rgba(0,0,0,0.35)" />
            {/* Cap opening */}
            <ellipse cx={48} cy={77} rx={18} ry={5} fill="#0A0A0A" />

            {/* ── Mortarboard board ── */}
            {/* Top face (angled — we see from slightly above) */}
            <polygon points="4,36 92,36 86,22 10,22" fill="#1C1C1C" />
            {/* Right face (darkest) */}
            <polygon points="92,36 92,50 86,36 86,22" fill="#0A0A0A" />
            {/* Front face */}
            <rect x={4} y={36} width={88} height={14} rx={2} fill="#111111" />
            {/* Top edge highlight (subtle) */}
            <rect x={4} y={36} width={88} height={2} rx={1} fill="rgba(255,255,255,0.07)" />
            {/* Bottom shadow */}
            <rect x={4} y={48} width={88} height={3} rx={1} fill="rgba(0,0,0,0.5)" />

            {/* ── Tassel button center ── */}
            <circle cx={48} cy={29} r={5} fill="#AD7556" />
            <circle cx={48} cy={29} r={3.2} fill="#C4895E" />
            <ellipse cx={47} cy={28} rx={1.5} ry={1} fill="rgba(255,255,255,0.4)" />

            {/* ── Tassel cord from button → right corner → down ── */}
            {/* Cord from button to right corner of top face */}
            <path
              d="M 48 29 Q 74 24 86 24"
              fill="none" stroke="#AD7556" strokeWidth={2} strokeLinecap="round"
            />
          </svg>

          {/* Hanging tassel part — swings independently */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            style={{
              position: "absolute",
              top: 21 * size,
              left: 84 * size,
              transformOrigin: "top center",
            }}
          >
            <motion.div
              animate={{ rotate: [-20, 20, -20] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              style={{ transformOrigin: "top center" }}
            >
              <svg
                width={20 * size}
                height={62 * size}
                viewBox="0 0 20 62"
                style={{ display: "block", overflow: "visible" }}
              >
                {/* Cord */}
                <line x1={10} y1={0} x2={10} y2={28}
                  stroke="#AD7556" strokeWidth={2} strokeLinecap="round" />
                {/* Knot cap */}
                <ellipse cx={10} cy={30} rx={6} ry={4} fill="#AD7556" />
                <ellipse cx={10} cy={29} rx={6} ry={3} fill="#C4895E" />
                {/* Fringe strands */}
                {[4, 7, 10, 13, 16].map((x, i) => (
                  <line
                    key={i}
                    x1={x} y1={34}
                    x2={x + (i % 2 === 0 ? -1.5 : 1.5)} y2={57}
                    stroke="#C4895E"
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                ))}
                {/* Fringe end bulbs */}
                {[4, 7, 10, 13, 16].map((x, i) => (
                  <circle
                    key={i}
                    cx={x + (i % 2 === 0 ? -1.5 : 1.5)}
                    cy={57}
                    r={2.5}
                    fill="#AD7556"
                  />
                ))}
              </svg>
            </motion.div>
          </motion.div>

        </motion.div>
      </motion.div>
    </div>
  );
}
