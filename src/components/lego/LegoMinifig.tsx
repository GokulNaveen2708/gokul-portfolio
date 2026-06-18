"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type MinifigType =
  | "builder" | "dev" | "spaceman" | "wizard" | "guard"
  | "explorer" | "waver" | "scientist" | "pirate" | "ninja"
  | "batman" | "gym" | "chef";

const QUIPS: Record<MinifigType, string> = {
  builder:   "Building brick by brick! 🧱",
  dev:       "git push --force 😅",
  spaceman:  "Houston, we deploy! 🚀",
  wizard:    "Abracadabra! ✨",
  guard:     "Access granted ✅",
  explorer:  "Uncharted codebase 🗺️",
  waver:     "Hey there! 👋",
  scientist: "Hypothesis confirmed! 🔬",
  pirate:    "Ship it! 🏴‍☠️",
  ninja:     "You can't see me 🥷",
  batman:    "I am vengeance! 🦇",
  gym:       "Never skip leg day! 💪",
  chef:      "Full-stack flavor! 🍳",
};

type IdleBehavior = "bob" | "float" | "look" | "wave" | "press";

interface MinifigConfig {
  skin: string;
  upper: string;      // torso + arm color
  lower: string;      // leg color
  hat: string;
  hatType: "hardhat" | "helmet" | "pointed" | "cap" | "cowboy" | "none" | "ninja" | "batman" | "headband" | "chefhat";
  accessory: "laptop" | "wand" | "none" | "dumbbell";
  idleBehavior: IdleBehavior;
  // 0=classic, 1=smile, 2=large-smile, 3=worried, 4=frown, 5=surprised
  expression?: 0 | 1 | 2 | 3 | 4 | 5;
}

const configs: Record<MinifigType, MinifigConfig> = {
  builder:  { skin:"#FFD700", upper:"#E07B00", lower:"#1a3a8a", hat:"#FFD700", hatType:"hardhat",  accessory:"none",    idleBehavior:"bob",   expression:1 },
  dev:      { skin:"#FFD700", upper:"#0077b6", lower:"#023e8a", hat:"#90e0ef", hatType:"none",     accessory:"laptop",  idleBehavior:"bob",   expression:0 },
  spaceman: { skin:"#e0e0e0", upper:"#1565c0", lower:"#0d47a1", hat:"#cfd8dc", hatType:"helmet",   accessory:"none",    idleBehavior:"float", expression:0 },
  wizard:   { skin:"#FFD700", upper:"#4a148c", lower:"#1a0033", hat:"#7b1fa2", hatType:"pointed",  accessory:"wand",    idleBehavior:"bob",   expression:2 },
  guard:    { skin:"#FFD700", upper:"#1b5e20", lower:"#2e7d32", hat:"#1b5e20", hatType:"cap",      accessory:"none",    idleBehavior:"look",  expression:0 },
  explorer: { skin:"#FFD700", upper:"#6d4c41", lower:"#4e342e", hat:"#8d6e63", hatType:"cowboy",   accessory:"none",    idleBehavior:"look",  expression:1 },
  waver:    { skin:"#FFD700", upper:"#c62828", lower:"#880e4f", hat:"#FFD700", hatType:"none",     accessory:"none",    idleBehavior:"bob",   expression:2 },
  scientist:{ skin:"#FFD700", upper:"#ffffff", lower:"#7b1fa2", hat:"#f5f5f5", hatType:"none",     accessory:"none",    idleBehavior:"bob",   expression:3 },
  pirate:   { skin:"#FFD700", upper:"#7f1d1d", lower:"#1c1917", hat:"#1c1917", hatType:"cap",      accessory:"none",    idleBehavior:"bob",   expression:4 },
  ninja:    { skin:"#FFD700", upper:"#0f172a", lower:"#0f172a", hat:"#0f172a", hatType:"ninja",    accessory:"none",    idleBehavior:"float", expression:0 },
  batman:   { skin:"#FFD700", upper:"#1a1a2e", lower:"#1a1a2e", hat:"#1a1a2e", hatType:"batman",   accessory:"none",    idleBehavior:"look",  expression:0 },
  gym:      { skin:"#FFD700", upper:"#c0392b", lower:"#2c3e50", hat:"#e63946", hatType:"headband", accessory:"none",     idleBehavior:"bob",   expression:2 },
  chef:     { skin:"#FFD700", upper:"#f8f9fa", lower:"#e63946", hat:"#ffffff", hatType:"chefhat",  accessory:"none",    idleBehavior:"bob",   expression:1 },
};

// ── Hat rendered as an absolutely positioned overlay on the head ──
function Hat({ type, color, skin }: { type: string; color: string; skin: string }) {
  const base: React.CSSProperties = {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    pointerEvents: "none",
    fontSize: "inherit",
  };

  if (type === "hardhat") return (
    <svg style={{ ...base, top: "-1.8em", width: "8em", height: "5em" }} viewBox="0 0 56 28" overflow="visible">
      <rect x="8" y="8" width="40" height="16" rx="8" fill={color} />
      <ellipse cx="28" cy="22" rx="24" ry="4.5" fill={color} style={{ filter:"brightness(0.82)" }} />
      <ellipse cx="20" cy="12" rx="7" ry="4" fill="rgba(255,255,255,0.25)" />
    </svg>
  );

  if (type === "helmet") return (
    <svg style={{ ...base, top: "-1.6em", width: "8em", height: "5em" }} viewBox="0 0 56 28" overflow="visible">
      <rect x="6" y="4" width="44" height="18" rx="10" fill={color} />
      <rect x="6" y="16" width="44" height="8" rx="1" fill={color} style={{ filter:"brightness(0.85)" }} />
      <rect x="8" y="17" width="40" height="6" rx="2" fill="rgba(150,210,255,0.65)" />
      <rect x="8" y="17" width="40" height="2" rx="1" fill="rgba(255,255,255,0.32)" />
    </svg>
  );

  if (type === "pointed") return (
    <svg style={{ ...base, top: "-3.6em", width: "7em", height: "6em" }} viewBox="0 0 44 36" overflow="visible">
      <polygon points="22,0 9,28 35,28" fill={color} />
      <ellipse cx="22" cy="28" rx="13" ry="3.5" fill={color} style={{ filter:"brightness(0.85)" }} />
      <text x="17" y="25" fontSize="7" fill="rgba(255,230,50,0.9)">★</text>
    </svg>
  );

  if (type === "cap") return (
    <svg style={{ ...base, top: "-1.8em", width: "9em", height: "4.5em" }} viewBox="0 0 60 24" overflow="visible">
      <rect x="8" y="4" width="36" height="16" rx="7" fill={color} />
      <rect x="4" y="16" width="52" height="5" rx="2.5" fill={color} style={{ filter:"brightness(0.78)" }} />
      <rect x="18" y="7" width="14" height="6" rx="2" fill="rgba(255,255,255,0.18)" />
    </svg>
  );

  if (type === "cowboy") return (
    <svg style={{ ...base, top: "-2.2em", width: "11em", height: "5em" }} viewBox="0 0 70 28" overflow="visible">
      <ellipse cx="35" cy="10" rx="14" ry="10" fill={color} />
      <ellipse cx="35" cy="18" rx="30" ry="5.5" fill={color} style={{ filter:"brightness(0.82)" }} />
      <path d="M 21 9 Q 35 5 49 9" stroke="rgba(0,0,0,0.18)" strokeWidth="2.5" fill="none" />
    </svg>
  );

  if (type === "ninja") return (
    <svg style={{ ...base, top: "-1.6em", width: "8em", height: "5em" }} viewBox="0 0 56 28" overflow="visible">
      <rect x="6" y="4" width="44" height="22" rx="3" fill={color} />
      <rect x="6" y="4" width="44" height="10" rx="3" fill={color} style={{ filter:"brightness(1.1)" }} />
      <rect x="8" y="18" width="40" height="6" rx="2" fill="rgba(239,68,68,0.22)" />
    </svg>
  );

  if (type === "batman") return (
    <svg style={{ ...base, top: "-3em", width: "9em", height: "6.5em" }} viewBox="0 0 60 36" overflow="visible">
      {/* Cowl dome */}
      <rect x="8" y="14" width="44" height="18" rx="7" fill={color} />
      {/* Left bat ear */}
      <polygon points="14,16 9,0 22,14" fill={color} />
      {/* Right bat ear */}
      <polygon points="46,16 51,0 38,14" fill={color} />
      {/* Cowl bottom flare */}
      <ellipse cx="30" cy="30" rx="26" ry="4.5" fill={color} style={{ filter:"brightness(0.78)" }} />
      {/* Eye cutout slots */}
      <rect x="11" y="18" width="12" height="5" rx="2.5" fill="rgba(0,0,0,0.5)" />
      <rect x="37" y="18" width="12" height="5" rx="2.5" fill="rgba(0,0,0,0.5)" />
      {/* Cowl highlight */}
      <ellipse cx="18" cy="16" rx="5" ry="2.5" fill="rgba(255,255,255,0.12)" />
    </svg>
  );

  if (type === "headband") return (
    <svg style={{ ...base, top: "-2em", width: "8em", height: "4em" }} viewBox="0 0 56 22" overflow="visible">
      {/* Short dark hair lumps */}
      <ellipse cx="18" cy="10" rx="6" ry="5" fill="#5C3D2E" />
      <ellipse cx="28" cy="7"  rx="7" ry="6" fill="#5C3D2E" />
      <ellipse cx="38" cy="10" rx="6" ry="5" fill="#5C3D2E" />
      {/* Headband */}
      <rect x="8" y="13" width="40" height="6" rx="3" fill={color} />
      <rect x="22" y="14" width="12" height="4" fill="rgba(255,255,255,0.3)" rx="1.5" />
    </svg>
  );

  if (type === "chefhat") return (
    <svg style={{ ...base, top: "-3.5em", width: "8em", height: "6em" }} viewBox="0 0 56 36" overflow="visible">
      <ellipse cx="28" cy="6" rx="15" ry="10" fill={color} />
      <rect x="13" y="6" width="30" height="12" fill={color} />
      <rect x="10" y="17" width="36" height="5" rx="1.5" fill={color} style={{ filter:"brightness(0.82)" }} />
      <ellipse cx="21" cy="5" rx="7" ry="6" fill="rgba(255,255,255,0.22)" />
    </svg>
  );

  // none — show hair
  return (
    <svg style={{ ...base, top: "-1.6em", width: "8em", height: "3em" }} viewBox="0 0 56 16" overflow="visible">
      <ellipse cx="18" cy="8" rx="6" ry="5.5" fill="#c8a000" />
      <ellipse cx="28" cy="6" rx="7" ry="6.5" fill="#c8a000" />
      <ellipse cx="38" cy="8" rx="6" ry="5.5" fill="#c8a000" />
    </svg>
  );
}

// ── Laptop — child of arm, sits near right hand area ──
function AccessoryLaptop() {
  return (
    <div style={{ position:"absolute", bottom:"0.5em", left:"50%", transform:"translateX(-50%)", fontSize:"inherit", pointerEvents:"none" }}>
      <svg width="3.5em" height="3em" viewBox="0 0 56 48">
        <rect x="0" y="0" width="42" height="30" rx="3" fill="#0f172a" />
        <rect x="2" y="2" width="38" height="26" fill="#22d3ee" opacity="0.85" />
        <rect x="2" y="2" width="14" height="7" fill="rgba(255,255,255,0.35)" rx="1" />
        <rect x="-2" y="30" width="46" height="6" rx="2" fill="#1e293b" />
      </svg>
    </div>
  );
}

// ── Wand — child of arm ──
function AccessoryWand() {
  return (
    <div style={{ position:"absolute", bottom:"-1em", left:"50%", transform:"translateX(-50%) rotate(18deg)", fontSize:"inherit", pointerEvents:"none" }}>
      <svg width="1.5em" height="4em" viewBox="0 0 12 48">
        <rect x="4" y="10" width="4" height="38" rx="2" fill="#4a148c" />
        <circle cx="6" cy="8" r="8" fill="#ffd54f" />
        <circle cx="6" cy="8" r="4.5" fill="white" opacity="0.9" />
      </svg>
    </div>
  );
}

// ── Dumbbell — child of the pressing arm.
// Counter-rotation (lf-dumbbell-cancel) cancels the arm's rotation so
// the dumbbell stays horizontal regardless of arm angle overhead.
// top: "68%" places the bar center at the palm (hand sits at 80% of arm height).
function DumbbellInHand({ pressing }: { pressing: boolean }) {
  return (
    <div style={{
      position: "absolute",
      top: "68%",
      left: "50%",
      fontSize: "inherit",
      pointerEvents: "none",
      zIndex: 5,
      animation: pressing ? "lf-dumbbell-cancel 2.2s ease-in-out infinite" : "none",
      transform: pressing ? undefined : "translateX(-50%)",
    }}>
      <svg width="9em" height="3.5em" viewBox="0 0 64 24" overflow="visible">
        {/* Left weight plate */}
        <circle cx="11" cy="12" r="11"   fill="#1a1a1a" />
        <circle cx="11" cy="12" r="7"    fill="#2c2c2c" />
        <circle cx="11" cy="12" r="3"    fill="#111" />
        <circle cx="8"  cy="9"  r="1.8"  fill="rgba(255,255,255,0.12)" />
        {/* Right weight plate */}
        <circle cx="53" cy="12" r="11"   fill="#1a1a1a" />
        <circle cx="53" cy="12" r="7"    fill="#2c2c2c" />
        <circle cx="53" cy="12" r="3"    fill="#111" />
        <circle cx="50" cy="9"  r="1.8"  fill="rgba(255,255,255,0.12)" />
        {/* Grip bar */}
        <rect x="11" y="10" width="42" height="4"   rx="2"   fill="#888" />
        <rect x="11" y="10" width="42" height="1.5" rx="1"   fill="rgba(255,255,255,0.5)" />
        {/* Center knurl marks */}
        {[22, 26, 30, 34, 38, 42].map(x => (
          <rect key={x} x={x} y="10" width="1" height="4" fill="rgba(0,0,0,0.3)" />
        ))}
      </svg>
    </div>
  );
}

// ── CSS-based authentic LEGO minifig ──
function CSSLegoFig({
  cfg, walking, hovered, exploded,
}: {
  cfg: MinifigConfig; walking: boolean; hovered: boolean; exploded: boolean;
}) {
  const behavior = hovered ? "wave" : walking ? "walk" : cfg.idleBehavior;
  const pressing = behavior === "press";
  const T = "transform 380ms cubic-bezier(0.34,1.56,0.64,1)";

  // Surprised face when exploded
  const exprIdx = exploded ? 5 : (cfg.expression ?? 0);
  const expr = exprIdx * -100;

  const armRStyle: React.CSSProperties = exploded
    ? { transform: "translateX(-50%) rotate(-145deg)", transition: T }
    : (() => {
        if (behavior === "walk") return { animation: "lf-arm-r-walk 0.44s ease-in-out infinite" };
        if (behavior === "wave") return { animation: "lf-arm-r-wave 0.7s ease-in-out infinite" };
        if (pressing) return { transform: "translateX(-50%) rotate(12deg)" }; // natural hang
        return {};
      })();

  const armLStyle: React.CSSProperties = exploded
    ? { transform: "translateX(-50%) rotate(-145deg)", transition: T }
    : (() => {
        if (behavior === "walk") return { animation: "lf-arm-l-walk 0.44s ease-in-out infinite" };
        if (pressing) return { animation: "lf-arm-l-press 2.2s ease-in-out infinite" };
        return {};
      })();

  const legRStyle: React.CSSProperties = walking
    ? { animation: "lf-leg-r-walk 0.44s ease-in-out infinite", transformOrigin: "center top" }
    : {};
  const legLStyle: React.CSSProperties = walking
    ? { animation: "lf-leg-l-walk 0.44s ease-in-out infinite", transformOrigin: "center top" }
    : {};

  const headStyle: React.CSSProperties = exploded
    ? { transform: "translateX(-50%) translateY(-7em)", transition: T }
    : {};

  const lowerStyle: React.CSSProperties = exploded
    ? { transform: "translateX(-50%) translateY(7em)", transition: T }
    : {};

  const wrapStyle: React.CSSProperties = exploded
    ? { transform: "scale(0.82)", transition: T }
    : (() => {
        if (behavior === "float") return { animation: "fig-float 3.4s ease-in-out infinite" };
        if (behavior === "look")  return { animation: "body-look 3.8s ease-in-out infinite" };
        if (pressing)             return { animation: "fig-bob 2.2s ease-in-out infinite" };
        return { animation: "fig-bob 2.4s ease-in-out infinite" };
      })();

  const faces = (
    <div className="lf-faces" style={{ transform: `translateX(${expr}%)` }}>
      <div className="lf-face lf-face-classic">
        <div className="lf-eye lf-eye-r"/><div className="lf-eye lf-eye-l"/><div className="lf-mouth"/>
      </div>
      <div className="lf-face lf-face-smile">
        <div className="lf-eye lf-eye-r"><div className="lf-brow"/></div>
        <div className="lf-eye lf-eye-l"><div className="lf-brow"/></div>
        <div className="lf-mouth"/>
      </div>
      <div className="lf-face lf-face-large-smile">
        <div className="lf-eye lf-eye-r"><div className="lf-brow"/></div>
        <div className="lf-eye lf-eye-l"><div className="lf-brow"/></div>
        <div className="lf-mouth"/>
      </div>
      <div className="lf-face lf-face-worried">
        <div className="lf-eye lf-eye-r"><div className="lf-brow"/></div>
        <div className="lf-eye lf-eye-l"><div className="lf-brow"/></div>
        <div className="lf-mouth"/>
      </div>
      <div className="lf-face lf-face-frown">
        <div className="lf-eye lf-eye-r"/><div className="lf-eye lf-eye-l"/><div className="lf-mouth"/>
      </div>
      <div className="lf-face lf-face-surprised">
        <div className="lf-eye lf-eye-r"><div className="lf-brow"/></div>
        <div className="lf-eye lf-eye-l"><div className="lf-brow"/></div>
        <div className="lf-mouth"/>
      </div>
    </div>
  );

  return (
    <div className="lf-minifig" style={{ ...wrapStyle, "--lf-skin": cfg.skin, "--lf-upper": cfg.upper, "--lf-lower": cfg.lower } as React.CSSProperties}>
      <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", zIndex:10, fontSize:"inherit", width:"100%" }}>
        <Hat type={cfg.hatType} color={cfg.hat} skin={cfg.skin} />
      </div>
      <div className="lf-head" style={headStyle}>
        <div className="lf-faces-wrap">{faces}</div>
      </div>
      <div className="lf-upper">
        <div className="lf-torso" />
        <div className="lf-arm lf-arm-r" style={armRStyle}>
          <div className="lf-hand" />
          {cfg.accessory === "laptop" && <AccessoryLaptop />}
        </div>
        <div className="lf-arm lf-arm-l" style={armLStyle}>
          <div className="lf-hand" />
          {cfg.accessory === "wand" && <AccessoryWand />}
          {cfg.accessory === "dumbbell" && !exploded && <DumbbellInHand pressing={pressing} />}
        </div>
      </div>
      <div className="lf-lower" style={lowerStyle}>
        <div className="lf-waist" />
        <div className="lf-crotch" />
        <div className="lf-leg lf-leg-r" style={legRStyle} />
        <div className="lf-leg lf-leg-l" style={legLStyle} />
      </div>
    </div>
  );
}

import { LegoBrickSVG } from "./LegoBrickSVG";

// ── Placement config ──
interface FigPlacement {
  type: MinifigType | "brick";
  x: string;
  y: string;
  scale: number;
  animation: "walk-ltr" | "walk-rtl" | "float" | "bob" | "idle";
  speed: number;
  delay: number;
  opacity?: number;
}

const sectionThemes: Record<string, FigPlacement[]> = {
  hero: [
    { type:"spaceman", x:"4%",  y:"65%", scale:1.25, animation:"idle",  speed:4.8, delay:1.0, opacity:0.88 },
    { type:"builder",  x:"86%", y:"62%", scale:1.4,  animation:"idle",  speed:3.0, delay:0.8, opacity:0.94 },
    { type:"wizard",   x:"80%", y:"16%", scale:1.2,  animation:"float", speed:4.4, delay:0.6, opacity:0.85 },
  ],
  about: [
    { type:"dev",       x:"1%",  y:"5%",  scale:0.95, animation:"idle",  speed:2,   delay:0,   opacity:0.9  },
    { type:"builder",   x:"72%", y:"0px", scale:0.8,  animation:"bob",   speed:2.2, delay:0.4, opacity:0.6  },
    { type:"brick",     x:"90%", y:"42%", scale:0.6,  animation:"float", speed:4.5, delay:1,   opacity:0.32 },
    { type:"brick",     x:"48%", y:"62%", scale:0.45, animation:"bob",   speed:3,   delay:2,   opacity:0.18 },
  ],
  experience: [
    { type:"spaceman",  x:"0%",  y:"0px", scale:1.0,  animation:"walk-rtl", speed:28,  delay:0,   opacity:1    },
    { type:"guard",     x:"84%", y:"0px", scale:0.85, animation:"idle",     speed:3,   delay:1,   opacity:0.7  },
    { type:"brick",     x:"90%", y:"45%", scale:0.65, animation:"float",    speed:5,   delay:0.5, opacity:0.28 },
    { type:"brick",     x:"12%", y:"50%", scale:0.5,  animation:"bob",      speed:3.5, delay:1,   opacity:0.18 },
  ],
  projects: [
    { type:"wizard",    x:"0%",  y:"0px", scale:1.0,  animation:"walk-ltr", speed:25,  delay:0,   opacity:1    },
    { type:"pirate",    x:"88%", y:"5%",  scale:0.8,  animation:"idle",     speed:4,   delay:1.5, opacity:0.65 },
    { type:"brick",     x:"46%", y:"58%", scale:0.55, animation:"float",    speed:4,   delay:0.5, opacity:0.25 },
    { type:"brick",     x:"70%", y:"30%", scale:0.45, animation:"bob",      speed:5,   delay:2,   opacity:0.18 },
  ],
  skills: [
    { type:"guard",     x:"0%",  y:"0px", scale:1.0,  animation:"walk-ltr", speed:35,  delay:0,   opacity:1    },
    { type:"scientist", x:"82%", y:"18%", scale:0.8,  animation:"idle",     speed:3.5, delay:1,   opacity:0.65 },
    { type:"ninja",     x:"56%", y:"52%", scale:0.65, animation:"float",    speed:4.5, delay:0.5, opacity:0.5  },
    { type:"brick",     x:"20%", y:"50%", scale:0.5,  animation:"float",    speed:5,   delay:0,   opacity:0.22 },
  ],
  education: [
    { type:"explorer",  x:"0%",  y:"0px", scale:1.0,  animation:"walk-ltr", speed:20,  delay:0,   opacity:1    },
    { type:"scientist", x:"74%", y:"0px", scale:0.8,  animation:"idle",     speed:2.5, delay:0.5, opacity:0.65 },
    { type:"brick",     x:"88%", y:"42%", scale:0.65, animation:"float",    speed:6,   delay:1,   opacity:0.28 },
    { type:"brick",     x:"40%", y:"58%", scale:0.5,  animation:"bob",      speed:4,   delay:1.5, opacity:0.18 },
  ],
  contact: [
    { type:"brick",     x:"10%", y:"20%", scale:0.7,  animation:"float",    speed:4,   delay:0,   opacity:0.28 },
    { type:"brick",     x:"85%", y:"32%", scale:0.55, animation:"float",    speed:5.5, delay:2,   opacity:0.2  },
    { type:"brick",     x:"55%", y:"52%", scale:0.45, animation:"bob",      speed:3,   delay:1,   opacity:0.16 },
  ],
};

// ── Single interactive minifig ──
function InteractiveMinifig({ placement }: { placement: FigPlacement }) {
  const [hovered, setHovered] = useState(false);
  const [exploded, setExploded] = useState(false);

  if (placement.type === "brick") {
    const colors = ["#AD7556", "#7A9CB3", "#DCCFB8", "#53443D", "#C4916A"];
    const color  = colors[Math.floor(placement.x.length * 7 + placement.scale * 13) % colors.length];
    return (
      <div style={{
        position: "absolute",
        left: placement.x,
        bottom: placement.y,
        width: 70 * placement.scale,
        opacity: placement.opacity ?? 1,
        animation: placement.animation === "float"
          ? `fig-float ${placement.speed}s ease-in-out ${placement.delay}s infinite`
          : `fig-bob ${placement.speed}s ease-in-out ${placement.delay}s infinite`,
        pointerEvents: "none",
      }}>
        <LegoBrickSVG color={color} studs={placement.scale > 0.55 ? 2 : 1} />
      </div>
    );
  }

  const cfg  = configs[placement.type as MinifigType];
  const quip = QUIPS[placement.type as MinifigType];
  const isWalk = placement.animation === "walk-ltr" || placement.animation === "walk-rtl";
  const isRtl  = placement.animation === "walk-rtl";

  // CSS minifig natural width ≈ 75px at scale=1 (18.75em × 4px)
  const figWidthPx = 75 * placement.scale;

  if (isWalk) {
    return (
      <div style={{
        position: "absolute",
        bottom: placement.y,
        left:  isRtl ? "auto" : "-90px",
        right: isRtl ? "-90px" : "auto",
        width: figWidthPx,
        opacity: placement.opacity ?? 1,
        transform: isRtl ? "scaleX(-1)" : undefined,
        animation: `minifig-walk ${placement.speed}s linear ${placement.delay}s infinite`,
        ["--walk-distance" as string]: "115vw",
        pointerEvents: "none",
      }}>
        <div style={{ transform: `scale(${placement.scale})`, transformOrigin: "bottom left" }}>
          <CSSLegoFig cfg={cfg} walking hovered={false} exploded={false} />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      style={{
        position: "absolute",
        left: placement.x,
        bottom: placement.y,
        width: figWidthPx,
        opacity: placement.opacity ?? 1,
        cursor: "pointer",
        zIndex: hovered ? 10 : 4,
      }}
      onHoverStart={() => { setHovered(true); setExploded(true); }}
      onHoverEnd={() => { setHovered(false); setExploded(false); }}
      whileHover={{ scale: 1.2 }}
      transition={{ type: "spring", stiffness: 360, damping: 24 }}
    >
      {/* Speech bubble */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key="bubble"
            initial={{ opacity: 0, y: 8, scale: 0.82 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.88 }}
            transition={{ type: "spring", stiffness: 440, damping: 28 }}
            style={{
              position: "absolute",
              bottom: "calc(100% + 10px)",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "#53443D",
              color: "#F1EFE6",
              padding: "5px 10px",
              borderRadius: 8,
              whiteSpace: "nowrap",
              fontSize: 11,
              fontWeight: 800,
              fontFamily: "Nunito, sans-serif",
              letterSpacing: "0.02em",
              boxShadow: "0 4px 14px rgba(0,0,0,0.45), 3px 3px 0 rgba(0,0,0,0.18)",
              zIndex: 20,
              pointerEvents: "none",
            }}
          >
            {quip}
            <div style={{
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              width: 0, height: 0,
              borderLeft: "7px solid transparent",
              borderRight: "7px solid transparent",
              borderTop: "7px solid #53443D",
            }} />
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ transform: `scale(${placement.scale})`, transformOrigin: "bottom left" }}>
        <CSSLegoFig cfg={cfg} walking={false} hovered={hovered} exploded={exploded} />
      </div>
    </motion.div>
  );
}

// ── Exported scene component ──
export function FloatingMinifigs({ section }: { section: keyof typeof sectionThemes }) {
  const placements = sectionThemes[section] ?? [];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 5 }}>
      {placements.map((p, i) => (
        <div
          key={i}
          style={{
            pointerEvents:
              p.animation === "idle" || p.animation === "float" || p.animation === "bob"
                ? "auto"
                : "none",
          }}
        >
          <InteractiveMinifig placement={p} />
        </div>
      ))}
    </div>
  );
}

// ── Contact waving group ──
export function MinifigWaveGroup() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const wavers: MinifigType[] = ["builder", "waver", "explorer"];
  return (
    <div className="flex gap-8 items-end justify-center">
      {wavers.map((t, i) => {
        const cfg = configs[t];
        const isHovered = hoveredIdx === i;
        return (
          <motion.div
            key={t}
            style={{ width: 75, cursor: "pointer", position: "relative" }}
            onHoverStart={() => setHoveredIdx(i)}
            onHoverEnd={() => setHoveredIdx(null)}
            whileHover={{ scale: 1.2 }}
            animate={{ y: [0, -6, 0] }}
            transition={{
              y: { duration: 1.2, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" },
              scale: { type: "spring", stiffness: 360, damping: 22 },
            }}
          >
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  key="wb"
                  initial={{ opacity: 0, y: 6, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    position: "absolute",
                    bottom: "calc(100% + 8px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "#53443D",
                    color: "#F1EFE6",
                    padding: "4px 8px",
                    borderRadius: 7,
                    whiteSpace: "nowrap",
                    fontSize: 11,
                    fontWeight: 800,
                    fontFamily: "Nunito, sans-serif",
                    boxShadow: "0 3px 10px rgba(0,0,0,0.4)",
                    zIndex: 20,
                    pointerEvents: "none",
                  }}
                >
                  {QUIPS[t]}
                  <div style={{ position:"absolute", top:"100%", left:"50%", transform:"translateX(-50%)", width:0, height:0, borderLeft:"5px solid transparent", borderRight:"5px solid transparent", borderTop:"5px solid #53443D" }} />
                </motion.div>
              )}
            </AnimatePresence>
            <CSSLegoFig cfg={cfg} walking={false} hovered={isHovered} exploded={false} />
          </motion.div>
        );
      })}
    </div>
  );
}
