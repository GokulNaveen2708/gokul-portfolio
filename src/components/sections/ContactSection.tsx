"use client";

import { motion } from "framer-motion";
import { BrickRow } from "@/components/lego/StudRow";
import { FloatingMinifigs, ContactLinkMinifig } from "@/components/lego/LegoMinifig";
import { BackgroundBricks } from "@/components/lego/BackgroundBricks";
import { LegoCoffeeMug }   from "@/components/lego/LegoCoffeeMug";
import { LegoPostbox }     from "@/components/lego/LegoPostbox";
import { CatPawPrints }    from "@/components/lego/CatPawPrints";

const CONTACT_MINIFIGS: Record<string, { type: Parameters<typeof ContactLinkMinifig>[0]["type"]; message: string }> = {
  email:    { type: "waver",     message: "Ping me anytime! 📧" },
  linkedin: { type: "dev",       message: "Let's network! 💼" },
  github:   { type: "ninja",     message: "Star my repos! ⭐" },
  resume:   { type: "graduate",  message: "I'm caffeinated & ready ☕" },
};

const contactLinks = [
  {
    id: "email",
    label: "Email",
    value: "gc3522@g.rit.edu",
    href: "mailto:gc3522@g.rit.edu",
    color: "#AD7556",
    shadow: "#7A4830",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#FDFCFA" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}>
        <rect x={2} y={4} width={20} height={16} rx={3} />
        <path d="M2 7l10 7 10-7" />
      </svg>
    ),
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "/in/gokul-naveen",
    href: "https://www.linkedin.com/in/gokul-naveen/",
    color: "#0077B5",
    shadow: "#005885",
    icon: (
      <svg viewBox="0 0 24 24" fill="#FDFCFA" style={{ width: "100%", height: "100%" }}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    id: "github",
    label: "GitHub",
    value: "@GokulNaveen2708",
    href: "https://github.com/GokulNaveen2708",
    color: "#53443D",
    shadow: "#2A1F1A",
    icon: (
      <svg viewBox="0 0 24 24" fill="#FDFCFA" style={{ width: "100%", height: "100%" }}>
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.262.82-.583 0-.287-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.304.762-1.604-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.526.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.296-1.23 3.296-1.23.655 1.65.243 2.873.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.804 5.625-5.476 5.921.43.372.814 1.103.814 2.222 0 1.604-.015 2.896-.015 3.289 0 .323.216.701.825.582C20.565 21.796 24 17.298 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    id: "resume",
    label: "Resume",
    value: "",
    href: "https://drive.google.com/file/d/1h7hNSM6NLBxgMkwX84H0bmHAyO6L59V7/view?usp=sharing",
    color: "#7A9CB3",
    shadow: "#4E7A8F",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#FDFCFA" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}>
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="12" y1="18" x2="12" y2="12" />
        <line x1="9" y1="15" x2="15" y2="15" />
      </svg>
    ),
  },
];

function LogoBrickButton({ link, index }: { link: typeof contactLinks[0]; index: number }) {
  return (
    <motion.a
      href={link.href}
      target={link.href.startsWith("http") ? "_blank" : undefined}
      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
      id={`contact-${link.id}`}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, type: "spring", stiffness: 200, damping: 22 }}
      whileHover={{ y: -7, transition: { duration: 0.15, ease: "easeOut" } }}
      whileTap={{ y: 2, transition: { duration: 0.08 } }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
        padding: "32px 24px 28px",
        borderRadius: 10,
        backgroundColor: link.color,
        textDecoration: "none",
        position: "relative",
        cursor: "pointer",
        width: "100%",
        /* 3D brick shadow */
        boxShadow: `5px 0 0 ${link.shadow}, 0 7px 0 ${link.shadow}, 5px 7px 0 rgba(0,0,0,0.35), 0 16px 32px rgba(0,0,0,0.22)`,
      }}
    >
      {/* Top face */}
      <div style={{
        position: "absolute", top: -7, left: 5, right: -5, height: 7,
        backgroundColor: link.color,
        filter: "brightness(1.38)",
        borderRadius: "4px 4px 0 0",
        clipPath: "polygon(5px 0%, 100% 0%, calc(100% - 5px) 100%, 0% 100%)",
        pointerEvents: "none",
      }} />
      {/* Right face */}
      <div style={{
        position: "absolute", top: -7, right: -5, bottom: -7, width: 5,
        backgroundColor: link.color,
        filter: "brightness(0.48)",
        clipPath: "polygon(0% 7px, 100% 0%, 100% 100%, 0% calc(100% - 7px))",
        pointerEvents: "none",
      }} />

      {/* Studs on top */}
      <div style={{
        position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)",
        display: "flex", gap: 8,
      }}>
        {[0, 1].map(s => (
          <div key={s} style={{
            width: 10, height: 7,
            borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
            backgroundColor: link.color,
            filter: "brightness(1.5)",
            boxShadow: "inset 0 -1px 0 rgba(0,0,0,0.2)",
          }} />
        ))}
      </div>

      {/* Icon */}
      <div style={{ width: 46, height: 46, filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.25))" }}>
        {link.icon}
      </div>

      {/* Label */}
      <div style={{ textAlign: "center" }}>
        <div style={{
          fontSize: 13, fontWeight: 900, textTransform: "uppercase",
          letterSpacing: "0.12em", color: "#FDFCFA",
          marginBottom: 4,
        }}>
          {link.label}
        </div>
        {link.value && (
          <div style={{
            fontSize: 10, fontWeight: 600,
            color: "rgba(253,252,250,0.60)",
            letterSpacing: "0.04em",
          }}>
            {link.value}
          </div>
        )}
      </div>
    </motion.a>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="relative py-28 overflow-hidden baseplate-bg-caput">
      <BackgroundBricks section="contact" />
      <FloatingMinifigs section="contact" />
      <CatPawPrints />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-6"
        >
          <BrickRow count={2} studs={2} color="#AD7556" size={44} />
          <span
            className="text-4xl sm:text-5xl font-black uppercase tracking-[0.06em]"
            style={{ color: "#AD7556", fontFamily: "Fredoka One, sans-serif" }}
          >
            Let&apos;s Build Something
          </span>
        </motion.div>

        {/* Coffee mug before heading */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          style={{ marginBottom: 8, opacity: 0.9 }}
        >
          <LegoCoffeeMug size={0.6} />
        </motion.div>

        {/* Heading + postbox */}
        <div className="flex items-end gap-5 mb-4">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-black uppercase"
            style={{
              color: "#53443D",
              fontFamily: "Fredoka One, sans-serif",
              fontSize: "clamp(2.5rem, 7vw, 5rem)",
              lineHeight: 1.0,
            }}
          >
            Post Me a Mail.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, type: "spring", stiffness: 200 }}
            style={{ marginBottom: 4, opacity: 0.9, flexShrink: 0 }}
          >
            <LegoPostbox size={0.82} />
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base font-semibold mb-16 max-w-lg"
          style={{ color: "#AD7556" }}
        >
          I&apos;m open to full-time roles, internships, and interesting collaborations.
          Pick your preferred channel below.
        </motion.p>

        {/* Logo icon buttons + minifig mascots */}
        <div className="flex flex-wrap gap-5 mb-20">
          {contactLinks.map((link, i) => {
            const fig = CONTACT_MINIFIGS[link.id];
            return (
              <div key={link.id} className="flex flex-col items-center gap-3 flex-1" style={{ minWidth: 110 }}>
                <LogoBrickButton link={link} index={i} />
                <ContactLinkMinifig
                  type={fig.type}
                  href={link.href}
                  message={fig.message}
                  scale={0.85}
                />
              </div>
            );
          })}
        </div>

        <div
          className="px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] w-fit mx-auto"
          style={{ backgroundColor: "#FDFCFA", color: "#AD7556", border: "1px solid rgba(83,68,61,0.2)" }}
        >
          🧱 Built Brick by Brick — Thanks for visiting!
        </div>

      </div>
    </section>
  );
}
