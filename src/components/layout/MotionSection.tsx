"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

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
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -80px 0px", threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      className={`py-16 sm:py-24 fade-up ${visible ? "is-visible" : ""}`}
    >
      <div className="mx-auto max-w-5xl">
        {title && (
          <header className="mb-10">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 text-base text-fg-muted sm:text-lg">
                {subtitle}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
