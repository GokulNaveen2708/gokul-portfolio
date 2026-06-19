"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const COLORS = [
  "#AD7556", "#7A9CB3", "#53443D", "#AD7556", "#DCCFB8",
  "#7A9CB3", "#AD7556", "#53443D", "#7A9CB3", "#AD7556",
];
const TOTAL = 10;

export function ScrollBrickProgress() {
  const [filled, setFilled] = useState(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setFilled(max > 0 ? Math.round((window.scrollY / max) * TOTAL) : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        right: 12,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 50,
        display: "flex",
        flexDirection: "column-reverse",
        gap: 4,
        pointerEvents: "none",
      }}
    >
      {Array.from({ length: TOTAL }).map((_, i) => {
        const active = i < filled;
        const color = COLORS[i];
        return (
          <div key={i} style={{ position: "relative", width: 18, height: 20 }}>
            {/* Stud */}
            <motion.div
              animate={{ opacity: active ? 1 : 0, scaleY: active ? 1 : 0 }}
              transition={{ type: "spring", stiffness: 420, damping: 22 }}
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                transformOrigin: "bottom",
                width: 8,
                height: 5,
                borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
                backgroundColor: color,
                filter: "brightness(1.38)",
              }}
            />
            {/* Brick body */}
            <motion.div
              animate={{
                opacity: active ? 1 : 0.18,
                scaleY: active ? 1 : 0.65,
                backgroundColor: active ? color : "#DCCFB8",
              }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 13,
                borderRadius: 2,
                transformOrigin: "bottom",
                boxShadow: active ? "2px 2px 0 rgba(0,0,0,0.24)" : "none",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
