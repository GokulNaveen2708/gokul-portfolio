"use client";

import { motion } from "framer-motion";

const BLOCK = 22;

const TETROMINOS: Record<string, [number, number][]> = {
  I: [[0,0],[1,0],[2,0],[3,0]],
  O: [[0,0],[1,0],[0,1],[1,1]],
  T: [[0,0],[1,0],[2,0],[1,1]],
  S: [[1,0],[2,0],[0,1],[1,1]],
  Z: [[0,0],[1,0],[1,1],[2,1]],
  L: [[0,0],[0,1],[0,2],[1,2]],
  J: [[1,0],[1,1],[0,2],[1,2]],
};

const PIECES = [
  { type: "I", color: "#AD7556", x: "6%",  delay: 0,   duration: 14, rotate: 0   },
  { type: "T", color: "#7A9CB3", x: "13%", delay: 3.5, duration: 11, rotate: 20  },
  { type: "O", color: "#53443D", x: "80%", delay: 1,   duration: 12, rotate: 0   },
  { type: "S", color: "#AD7556", x: "70%", delay: 5,   duration: 13, rotate: -12 },
  { type: "Z", color: "#7A9CB3", x: "88%", delay: 2.2, duration: 10, rotate: 8   },
  { type: "L", color: "#9B7D61", x: "4%",  delay: 6,   duration: 15, rotate: 25  },
  { type: "J", color: "#AD7556", x: "91%", delay: 4,   duration: 11, rotate: -18 },
  { type: "I", color: "#7A9CB3", x: "17%", delay: 8,   duration: 10, rotate: 90  },
  { type: "T", color: "#53443D", x: "76%", delay: 1.8, duration: 14, rotate: -6  },
  { type: "O", color: "#9B7D61", x: "94%", delay: 9,   duration: 12, rotate: 0   },
];

function Piece({ type, color, x, delay, duration, rotate }: typeof PIECES[0]) {
  const coords = TETROMINOS[type];
  const cols = Math.max(...coords.map(([c]) => c)) + 1;
  const rows = Math.max(...coords.map(([, r]) => r)) + 1;
  const W = cols * BLOCK;
  const H = rows * BLOCK;

  return (
    <motion.div
      style={{ position: "absolute", left: x, top: 0, rotate }}
      animate={{ y: ["-80px", "110vh"] }}
      transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
    >
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ display: "block", overflow: "visible" }}>
        {coords.map(([col, row], i) => (
          <g key={i}>
            <rect
              x={col * BLOCK + 1}
              y={row * BLOCK + 1}
              width={BLOCK - 2}
              height={BLOCK - 2}
              rx={3}
              fill={color}
              fillOpacity={0.1}
              stroke={color}
              strokeOpacity={0.28}
              strokeWidth={1.2}
            />
            {/* Stud on each block */}
            <ellipse
              cx={col * BLOCK + BLOCK / 2}
              cy={row * BLOCK + 5}
              rx={4}
              ry={2}
              fill={color}
              fillOpacity={0.14}
            />
          </g>
        ))}
      </svg>
    </motion.div>
  );
}

export function TetrisFallingBlocks() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 1 }}>
      {PIECES.map((p, i) => <Piece key={i} {...p} />)}
    </div>
  );
}
