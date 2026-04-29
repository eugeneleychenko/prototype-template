import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "dark" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
}

export function Button({ children, variant = "primary", className = "", type = "button", ...rest }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center px-4 py-2 font-mono uppercase tracking-[0.12em] text-mono-sm transition-colors border disabled:opacity-40 disabled:pointer-events-none";

  const variants: Record<Variant, string> = {
    primary: "bg-lime text-panel border border-border-light hover:bg-[#76e609]",
    dark: "bg-panel text-cream border border-border-dark hover:bg-[#2a2a2a]",
    ghost: "bg-transparent text-ink border border-border-light hover:bg-pale-accent",
  };

  return (
    <button type={type} className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
