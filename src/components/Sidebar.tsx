import type { ReactNode } from "react";

export type NavId = "overview" | "roster" | "schedule";

interface SidebarProps {
  active: NavId;
  onNavigate: (id: NavId) => void;
}

const items: { id: NavId; label: string }[] = [
  { id: "overview", label: "Team overview" },
  { id: "roster", label: "Leaders & roster" },
  { id: "schedule", label: "Game results" },
];

export function Sidebar({ active, onNavigate }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-[220px] flex-col border-r border-border-dark bg-panel">
      <div className="border-b border-border-dark px-4 py-5">
        <p className="font-mono uppercase tracking-[0.14em] text-mono-xs text-muted">NY Yankees</p>
        <p className="mt-1 font-sans text-[15px] tracking-[-0.02em] text-cream">1996 season</p>
      </div>
      <nav className="flex flex-1 flex-col gap-0 pt-2">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`w-full border-l-2 py-3 pl-4 pr-3 text-left font-mono font-light uppercase tracking-[0.05em] text-nav-item transition-colors ${
                isActive
                  ? "border-lime bg-lime-muted text-cream"
                  : "border-transparent text-muted hover:bg-white/5 hover:text-cream"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
      <div className="border-t border-border-dark px-4 py-4">
        <p className="font-mono uppercase tracking-[0.14em] text-mono-xs text-muted">Demo build</p>
        <p className="mt-1 font-sans text-body text-muted">Prototype UI — static historical data</p>
      </div>
    </aside>
  );
}

interface LayoutProps {
  sidebar: ReactNode;
  children: ReactNode;
}

export function Layout({ sidebar, children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-cream">
      {sidebar}
      <div className="ml-[220px] min-h-screen">{children}</div>
    </div>
  );
}
