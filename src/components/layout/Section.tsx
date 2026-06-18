import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  title?: string;
  subtitle?: string;
  className?: string;
  children: ReactNode;
}

export function Section({ id, title, subtitle, className = "py-16 sm:py-24", children }: SectionProps) {
  return (
    <section id={id} className={className}>
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
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
    </section>
  );
}
