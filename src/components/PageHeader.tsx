import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

export function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
  return (
    <header className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-border-light pb-6">
      <div>
        <p className="font-mono uppercase tracking-[0.14em] text-mono-xs text-muted">1996 regular season + postseason</p>
        <h1 className="mt-2 font-sans text-page text-ink">{title}</h1>
        {subtitle ? <p className="mt-2 max-w-2xl font-sans text-body text-muted">{subtitle}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </header>
  );
}
