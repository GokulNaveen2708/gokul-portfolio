"use client";

import { motion } from "framer-motion";
import { StudRow, BrickRow } from "@/components/lego/StudRow";
import { MinifigWaveGroup, FloatingMinifigs } from "@/components/lego/LegoMinifig";
import { BackgroundBricks } from "@/components/lego/BackgroundBricks";
import { LegoCoffeeMug } from "@/components/lego/LegoCoffeeMug";

const contactLinks = [
  {
    id: "email",
    label: "Email Me",
    value: "gc3522@g.rit.edu",
    href: "mailto:gc3522@g.rit.edu",
    color: "#53443D",
    desc: "Best for detailed conversations & opportunities",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "/in/gokul-naveen",
    href: "https://www.linkedin.com/in/gokul-naveen/",
    color: "#0077B5",
    desc: "Professional profile & experience",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
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
    desc: "Open source projects & code",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.262.82-.583 0-.287-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.304.762-1.604-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.526.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.296-1.23 3.296-1.23.655 1.65.243 2.873.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.804 5.625-5.476 5.921.43.372.814 1.103.814 2.222 0 1.604-.015 2.896-.015 3.289 0 .323.216.701.825.582C20.565 21.796 24 17.298 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    id: "resume",
    label: "Download Resume",
    value: "PDF · Updated 2025",
    href: "https://drive.google.com/file/d/1h7hNSM6NLBxgMkwX84H0bmHAyO6L59V7/view?usp=sharing",
    color: "#AD7556",
    desc: "Full work history & technical depth",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="relative py-28 overflow-hidden baseplate-bg-caput">
      {/* Decorative large background bricks */}
      <BackgroundBricks section="contact" />
      <FloatingMinifigs section="contact" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-6"
        >
          <BrickRow count={2} studs={2} color="#AD7556" size={22} />
          <span
            className="text-xs font-black uppercase tracking-[0.3em]"
            style={{ color: "#AD7556", fontFamily: "Fredoka One, sans-serif", fontSize: "0.8rem" }}
          >
            Let&apos;s Build Something
          </span>
        </motion.div>

        <div className="flex items-end gap-5 mb-3">
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
            Drop me a line.
          </motion.h2>
          <div style={{ marginBottom: 4, opacity: 0.88, flexShrink: 0 }}>
            <LegoCoffeeMug size={0.65} />
          </div>
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
          Don&apos;t hesitate to reach out through any of these:
        </motion.p>

        {/* Contact cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-20">
          {contactLinks.map((link, i) => (
            <motion.a
              key={link.id}
              id={`contact-${link.id}`}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 200, damping: 22 }}
              className="group block"
            >
              {/* Stud top */}
              <div style={{ display: "flex", gap: 6, paddingLeft: 12, marginBottom: -1 }}>
                {[0, 1].map((s) => (
                  <div
                    key={s}
                    style={{
                      width: 14,
                      height: 10,
                      borderRadius: "50% 50% 45% 45% / 80% 80% 50% 50%",
                      backgroundColor: link.color,
                      filter: "brightness(1.25)",
                      boxShadow: "0 3px 0 rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.2)",
                    }}
                  />
                ))}
              </div>

              {/* Card body */}
              <div
                className="rounded-lg overflow-hidden transition-all duration-200"
                style={{
                  backgroundColor: "#FDFCFA",
                  border: `1px solid ${link.color}40`,
                  boxShadow: `4px 5px 0 rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.3)`,
                }}
              >
                {/* Color header */}
                <div
                  className="px-5 py-3 flex items-center gap-3"
                  style={{ backgroundColor: link.color + "cc" }}
                >
                  <span style={{ color: "#53443D" }}>{link.icon}</span>
                  <span className="font-black text-sm uppercase tracking-widest" style={{ color: "#53443D" }}>
                    {link.label}
                  </span>
                </div>

                <div className="px-5 py-4">
                  <p className="font-black text-base mb-1" style={{ color: "#AD7556" }}>
                    {link.value}
                  </p>
                  <p className="text-xs font-semibold" style={{ color: "#7A9CB3" }}>
                    {link.desc}
                  </p>
                </div>

                {/* Bottom studs */}
                <div className="px-5 py-2" style={{ backgroundColor: "#F5F3EC" }}>
                  <BrickRow count={2} studs={2} color={link.color} size={16} className="opacity-25" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Waving minifig group */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center gap-5"
        >
          <MinifigWaveGroup />
          <div
            className="px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em]"
            style={{ backgroundColor: "#FDFCFA", color: "#AD7556", border: "1px solid rgba(83,68,61,0.2)" }}
          >
            🧱 Built Brick by Brick — Thanks for visiting!
          </div>
        </motion.div>

      </div>
    </section>
  );
}
