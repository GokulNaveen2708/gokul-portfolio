"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";

export function HeroSection() {
  const heading =
    "Software Engineer building scalable systems across ";
  const accent =
    "distributed computing, ML infrastructure, and cloud platforms..";

  // We'll use a CSS keyframe animation per-letter to avoid motion hiccups
  const stagger = 0.04; // seconds between letters
  const duration = 6; // full cycle duration in seconds
  return (
    <Section id="hero">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col gap-10 pt-6 pb-4 sm:pt-10 sm:flex-row sm:items-center"
      >
        {/* Left column: text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex-1"
        >
          {/* Glassy frame with circular profile image inside.
              Place your image at `/public/profile.jpg` (or update the `src` below).
          */}
          <div className="relative h-64 w-64 sm:h-80 sm:w-80 rounded-full border border-white/5 bg-gradient-to-br from-accent/20 via-white/5 to-transparent flex items-center justify-center">
            <div className="absolute inset-4 rounded-full border border-white/10 bg-bg/60 backdrop-blur-sm" />

            <div className="relative z-10 flex items-center justify-center">
              <div className="h-52 w-52 sm:h-64 sm:w-64 rounded-full overflow-hidden border-2 border-white/10 shadow-lg">
                <img
                  src="/logos/IMG_1306.jpg"
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </motion.div>
        {/* Right column: visual card */}
        <div className="flex-1 space-y-8">
          <div className="space-y-2">

            <h1 className="text-3xl font-semibold tracking-tight lg:text-5xl">
              {heading.split("").map((char, i) => (
                <span
                  key={`h-${i}`}
                  className="inline-block"
                  style={{
                    animation: `heroLetter ${duration}s ease-in-out ${(
                      i * stagger
                    ).toFixed(2)}s infinite`,
                    animationFillMode: "forwards",
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
              <span className="text-accent">
                {accent.split("").map((char, i) => (
                  <span
                    key={`a-${i}`}
                    className="inline-block"
                    style={{
                      animation: `heroLetter ${duration}s ease-in-out ${(
                        (heading.length + i) * stagger
                      ).toFixed(2)}s infinite`,
                      animationFillMode: "forwards",
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="max-w-xl text-sm text-fg-muted sm:text-base"
            >
              Transforming complex data & AI workflows into scalable, production-ready systems
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="flex flex-wrap items-center gap-3"
          >
            <Button
              variant="outline"
              // adjust size prop to match your Button implementation
              onClick={() => {
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              View projects
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                document
                  .getElementById("experience")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Work Experience
            </Button>

            <Button
              variant="primary"
              onClick={() => {
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Get in touch
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="text-[10px] uppercase tracking-[0.2em] text-fg-muted"
          >
            Distributed Systems · Cloud-Native Engineering · ML Infrastructure · AI Security · Big Data

          </motion.div>
        </div>

        
      </motion.div>
    </Section>
  );
}
