"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface MotionSectionProps {
  id: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
}

export function MotionSection({
  id,
  title,
  subtitle,
  children,
}: MotionSectionProps) {
  return (
    <motion.section
      id={id}
      className="py-16 sm:py-24"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-5xl">
        {title && (
          <header className="mb-8">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 text-sm text-fg-muted sm:text-base">
                {subtitle}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </motion.section>
  );
}
