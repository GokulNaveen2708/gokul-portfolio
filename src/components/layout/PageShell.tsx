import type { ReactNode } from "react";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-8xl px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12">
      <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 sm:p-10">
        <div className="mx-auto max-w-5xl">
          {children}
        </div>
      </div>
    </div>
  );
}
