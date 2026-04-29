import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  /** Thin Yankees navy left stripe for baseball-card accent */
  accent?: boolean;
}

export function Card({ children, className = "", accent }: CardProps) {
  return (
    <div
      className={`bg-card border border-border-light p-5 ${accent ? "border-l-[3px] border-l-yankees-navy border-t-border-light border-r-border-light border-b-border-light" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
