"use client";

import React from "react";

interface BrickButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
  href?: string;
  children: React.ReactNode;
}

export function BrickButton({
  variant = "primary",
  href,
  children,
  className = "",
  ...props
}: BrickButtonProps) {
  const cls = `brick-btn ${variant === "primary" ? "brick-btn-primary" : "brick-btn-outline"} ${className}`;

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }

  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}
