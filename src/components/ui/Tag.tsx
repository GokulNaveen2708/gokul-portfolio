import { cn } from "@/lib/cn";

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border hover:border-white/10 px-2 py-0.5 text-xs font-semibold text-fg-muted hover:text-fg transition",
        className
      )}
    >
      {children}
    </span>
  );
}
