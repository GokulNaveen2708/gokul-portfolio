import type { ReactNode } from "react";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 mt-6 sm:mt-10">
      <div className="rounded-2xl bg-white/[0.02] border border-white/[0.04] p-6 sm:p-10">
        <div className="mx-auto max-w-5xl">
          {children}
        </div>
      </div>
    </div>
  );
}
