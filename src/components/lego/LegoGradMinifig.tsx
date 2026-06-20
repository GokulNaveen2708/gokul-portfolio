"use client";

import { motion } from "framer-motion";

export function LegoGradMinifig({ size = 1 }: { size?: number }) {
  const W = 94, H = 196;

  return (
    <div style={{ display: "inline-block", position: "relative", width: W * size, height: H * size }}>
      <motion.div
        initial={{ opacity: 0, y: -30 * size }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 80, damping: 12, delay: 0.3 }}
        style={{ position: "absolute", inset: 0 }}
      >
        {/* Continuous gentle float */}
        <motion.div
          animate={{ y: [0, -10 * size, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", inset: 0 }}
        >
          <svg
            width={W * size}
            height={H * size}
            viewBox={`0 0 ${W} ${H}`}
            style={{ display: "block", overflow: "visible" }}
          >
            {/* Ground shadow */}
            <ellipse cx={47} cy={192} rx={30} ry={5} fill="rgba(0,0,0,0.13)" />

            {/* ══════════ GRADUATION CAP ══════════ */}
            {/* Board — flat mortarboard ON TOP */}
            <polygon points="4,16 90,16 85,6 9,6" fill="#1C1C1C" />
            <polygon points="90,16 90,26 85,16 85,6" fill="#080808" />
            <rect x={4} y={16} width={86} height={10} rx={2} fill="#111111" />
            <rect x={4} y={16} width={86} height={1.5} fill="rgba(255,255,255,0.06)" />
            {/* Center button on board */}
            <circle cx={47} cy={11} r={4} fill="#AD7556" />
            <circle cx={47} cy={11} r={2.5} fill="#C4895E" />
            <ellipse cx={46} cy={10} rx={1.2} ry={0.8} fill="rgba(255,255,255,0.4)" />
            {/* Cord from button → right corner of board */}
            <path d="M 47 11 Q 72 7 85 7" fill="none" stroke="#AD7556" strokeWidth={1.6} strokeLinecap="round" />
            {/* Cap dome/skull BELOW the board, sitting on the head */}
            <rect x={30} y={22} width={34} height={18} rx={7} fill="#141414" />
            <rect x={30} y={22} width={34} height={7} rx={6} fill="#1C1C1C" />
            <ellipse cx={47} cy={40} rx={14} ry={4} fill="#0A0A0A" />

            {/* ══════════ HEAD ══════════ */}
            {/* Neck stud (LEGO cylindrical neck) */}
            <rect x={37} y={40} width={20} height={6} rx={3} fill="#D4A800" />
            <ellipse cx={47} cy={40} rx={10} ry={3} fill="#FFD700" />
            {/* Head block — LEGO characteristic rounded rect */}
            <rect x={26} y={43} width={42} height={36} rx={9} fill="#FFD700" />
            {/* Face top highlight */}
            <ellipse cx={39} cy={47} rx={7} ry={4.5} fill="rgba(255,255,255,0.22)" />
            {/* Eyes */}
            <circle cx={38} cy={55} r={4.5} fill="#222" />
            <circle cx={56} cy={55} r={4.5} fill="#222" />
            <circle cx={36.5} cy={53.5} r={1.5} fill="rgba(255,255,255,0.75)" />
            <circle cx={54.5} cy={53.5} r={1.5} fill="rgba(255,255,255,0.75)" />
            {/* Big graduation smile */}
            <path d="M 35 64 Q 47 74 59 64" fill="none" stroke="#222" strokeWidth={2.8} strokeLinecap="round" />
            {/* Cheek blush */}
            <ellipse cx={31} cy={62} rx={4.5} ry={3} fill="rgba(255,150,80,0.22)" />
            <ellipse cx={63} cy={62} rx={4.5} ry={3} fill="rgba(255,150,80,0.22)" />

            {/* ══════════ GRADUATION GOWN ══════════ */}
            {/* Hood / collar behind the head */}
            <polygon points="20,80 74,80 62,74 32,74" fill="#1A1A1A" />
            {/* Main gown — wide flowing A-line trapezoid */}
            <polygon points="16,80 78,80 86,182 8,182" fill="#111111" />
            {/* Front centre panel (slightly lighter, suggests robe opening) */}
            <polygon points="39,80 55,80 57,182 37,182" fill="#1C1C1C" />
            {/* Subtle vertical crease lines */}
            <line x1={25} y1={85} x2={18} y2={178} stroke="rgba(255,255,255,0.03)" strokeWidth={1} />
            <line x1={69} y1={85} x2={76} y2={178} stroke="rgba(0,0,0,0.25)" strokeWidth={1} />
            {/* Gown bottom hem band */}
            <rect x={8} y={176} width={78} height={6} rx={2} fill="#1C1C1C" />
            {/* Left shoulder ridge */}
            <polygon points="16,80 28,80 20,96 10,94" fill="#0D0D0D" />
            {/* Right shoulder ridge */}
            <polygon points="78,80 66,80 74,96 84,94" fill="#0D0D0D" />

            {/* Left arm / sleeve */}
            <rect x={2} y={92} width={16} height={44} rx={6} fill="#111111" />
            {/* Left sleeve cuff */}
            <rect x={2} y={130} width={16} height={5} rx={2.5} fill="#1C1C1C" />
            {/* Left hand */}
            <rect x={3} y={134} width={14} height={11} rx={5} fill="#FFD700" />

            {/* Right arm / sleeve */}
            <rect x={76} y={92} width={16} height={44} rx={6} fill="#111111" />
            {/* Right sleeve cuff */}
            <rect x={76} y={130} width={16} height={5} rx={2.5} fill="#1C1C1C" />
            {/* Right hand */}
            <rect x={77} y={134} width={14} height={11} rx={5} fill="#FFD700" />

            {/* ══════════ FEET / SHOES ══════════ */}
            <rect x={16} y={179} width={22} height={12} rx={5} fill="#1A1A1A" />
            <rect x={56} y={179} width={22} height={12} rx={5} fill="#1A1A1A" />
            {/* Shoe highlight */}
            <rect x={17} y={179} width={8} height={4} rx={2} fill="rgba(255,255,255,0.05)" />
            <rect x={57} y={179} width={8} height={4} rx={2} fill="rgba(255,255,255,0.05)" />
          </svg>

          {/* ══════════ TASSEL (swings independently) ══════════ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{
              position: "absolute",
              top: 5 * size,
              left: 83 * size,
              transformOrigin: "top center",
            }}
          >
            <motion.div
              animate={{ rotate: [-22, 22, -22] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              style={{ transformOrigin: "top center" }}
            >
              <svg
                width={18 * size}
                height={60 * size}
                viewBox="0 0 18 60"
                style={{ display: "block", overflow: "visible" }}
              >
                <line x1={9} y1={0} x2={9} y2={26} stroke="#AD7556" strokeWidth={2} strokeLinecap="round" />
                <rect x={3.5} y={24} width={11} height={8} rx={3.5} fill="#AD7556" />
                <rect x={3.5} y={24} width={11} height={4} rx={3} fill="#C4895E" />
                {[3, 6.5, 10, 13.5].map((x, i) => (
                  <line
                    key={i}
                    x1={x} y1={32}
                    x2={x + (i % 2 === 0 ? -1.5 : 1.5)} y2={54}
                    stroke="#C4895E" strokeWidth={2} strokeLinecap="round"
                  />
                ))}
                {[3, 6.5, 10, 13.5].map((x, i) => (
                  <circle key={i} cx={x + (i % 2 === 0 ? -1.5 : 1.5)} cy={54} r={2.5} fill="#AD7556" />
                ))}
              </svg>
            </motion.div>
          </motion.div>

        </motion.div>
      </motion.div>
    </div>
  );
}
