"use client";

import { motion } from "framer-motion";

export function SpaceAstronaut({ size = 1 }: { size?: number }) {
  const W = 72, H = 112;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: [0, -16, 0] }}
      transition={{
        opacity: { duration: 0.6, delay: 0.6 },
        y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 },
      }}
      style={{ display: "inline-block", width: W * size, height: H * size }}
    >
      <svg width={W * size} height={H * size} viewBox="0 0 72 112" style={{ display: "block", overflow: "visible" }}>
        {/* Helmet outer shell */}
        <circle cx="36" cy="28" r="24" fill="#DCCFB8" />
        {/* Helmet rim */}
        <circle cx="36" cy="28" r="24" fill="none" stroke="#9B7D61" strokeWidth="3.5" />
        {/* Visor */}
        <ellipse cx="36" cy="28" rx="17" ry="17" fill="#7A9CB3" opacity="0.88" />
        {/* Visor tint / reflection */}
        <ellipse cx="28" cy="21" rx="8" ry="6" fill="rgba(255,255,255,0.35)" />
        {/* Face inside visor */}
        <circle cx="30" cy="29" r="3.5" fill="#2A1A0E" opacity="0.5" />
        <circle cx="42" cy="29" r="3.5" fill="#2A1A0E" opacity="0.5" />
        <path d="M 29 36 Q 36 40 43 36" fill="none" stroke="#2A1A0E" strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
        {/* Helmet top antenna nub */}
        <circle cx="36" cy="5" r="3.5" fill="#AD7556" />
        <rect x="34" y="5" width="4" height="8" fill="#9B7D61" />

        {/* Suit body */}
        <rect x="13" y="48" width="46" height="38" rx="12" fill="#DCCFB8" />
        {/* Suit chest panel */}
        <rect x="22" y="55" width="28" height="22" rx="6" fill="#9B7D61" opacity="0.35" />
        {/* Mission patch */}
        <rect x="24" y="57" width="12" height="8" rx="3" fill="#AD7556" />
        <circle cx="30" cy="61" r="3" fill="#FED8A6" opacity="0.8" />
        {/* O2 connector dots */}
        <circle cx="20" cy="60" r="3.5" fill="#AD7556" />
        <circle cx="52" cy="60" r="3.5" fill="#AD7556" />

        {/* Left arm */}
        <rect x="2" y="50" width="13" height="30" rx="6.5" fill="#DCCFB8" />
        {/* Left elbow joint */}
        <rect x="2" y="72" width="13" height="8" rx="5" fill="#9B7D61" opacity="0.5" />
        {/* Left glove */}
        <rect x="3" y="79" width="11" height="9" rx="5" fill="#AD7556" />

        {/* Right arm */}
        <rect x="57" y="50" width="13" height="30" rx="6.5" fill="#DCCFB8" />
        {/* Right elbow joint */}
        <rect x="57" y="72" width="13" height="8" rx="5" fill="#9B7D61" opacity="0.5" />
        {/* Right glove */}
        <rect x="58" y="79" width="11" height="9" rx="5" fill="#AD7556" />

        {/* Left leg */}
        <rect x="15" y="84" width="17" height="22" rx="7" fill="#DCCFB8" />
        {/* Left boot */}
        <rect x="13" y="100" width="21" height="12" rx="6" fill="#9B7D61" />

        {/* Right leg */}
        <rect x="40" y="84" width="17" height="22" rx="7" fill="#DCCFB8" />
        {/* Right boot */}
        <rect x="38" y="100" width="21" height="12" rx="6" fill="#9B7D61" />

        {/* Small stars floating nearby */}
        <motion.g
          animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          style={{ transformOrigin: "64px 20px" }}
        >
          <polygon points="64,16 65.2,20 69,20 66,22.4 67.2,26 64,23.6 60.8,26 62,22.4 59,20 62.8,20" fill="#AD7556" opacity="0.6" />
        </motion.g>
        <motion.g
          animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.2, 1] }}
          transition={{ duration: 2.8, repeat: Infinity, delay: 1.2 }}
          style={{ transformOrigin: "6px 40px" }}
        >
          <polygon points="6,37 6.8,40 10,40 7.5,41.8 8.3,44.6 6,43 3.7,44.6 4.5,41.8 2,40 5.2,40" fill="#7A9CB3" opacity="0.5" />
        </motion.g>
      </svg>
    </motion.div>
  );
}
