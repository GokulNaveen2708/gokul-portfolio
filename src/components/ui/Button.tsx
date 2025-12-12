"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-60 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-bg px-5 py-2.5 hover:bg-accent/90 shadow-sm",
        outline:
          "border border-accent text-accent px-5 py-2.5 hover:bg-accent/10",
        ghost:
          "text-fg-muted px-3 py-2 hover:text-fg hover:bg-white/5",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 shadow-sm",
        secondary:
          "bg-zinc-800 text-white hover:bg-zinc-800/80",
        link:
          "text-accent underline-offset-4 hover:underline px-0 py-0 h-auto",
      },
      size: {
        sm: "text-xs px-3 py-1.5",
        md: "",
        lg: "h-11 px-8 text-base",
        icon: "h-10 w-10 px-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type ButtonOwnProps = VariantProps<typeof buttonVariants> & {
  asChild?: boolean;
};

type ButtonElementProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
type AnchorElementProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export type ButtonProps = ButtonOwnProps &
  (ButtonElementProps | AnchorElementProps);

const ButtonComponent = React.forwardRef<
  HTMLButtonElement & HTMLAnchorElement,
  ButtonProps
>(({ asChild, className, variant, size, ...rest }, ref) => {
  const Comp = asChild ? Slot : ("button" as const);
  return (
    <Comp
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...(rest as any)}
    />
  );
});

export function Button(props: ButtonProps) {
  return <ButtonComponent {...props} />;
}
