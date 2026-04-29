import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "neutral" | "lime" | "danger" | "dark";
  className?: string;
}

export function Badge({ children, variant = "neutral", className = "" }: BadgeProps) {
  const styles = {
    neutral: "bg-input text-ink border border-border-light",
    lime: "bg-lime text-panel border border-border-light",
    danger: "bg-[#fde8e2] text-danger border border-danger/30",
    dark: "bg-panel text-cream border border-border-dark",
  }[variant];

  return (
    <span
      className={`inline-block px-2 py-[3px] font-mono font-normal uppercase tracking-[0.14em] text-mono-xs ${styles} ${className}`}
    >
      {children}
    </span>
  );
}
