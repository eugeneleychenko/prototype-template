import { NavView } from "../types";

const navItems: { id: NavView; label: string }[] = [
  { id: "intake", label: "Episode intake" },
  { id: "studio", label: "Content studio" },
  { id: "plans", label: "Plans" },
];

interface AppShellProps {
  active: NavView;
  onNavigate: (v: NavView) => void;
  children: React.ReactNode;
}

export function AppShell({ active, onNavigate, children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#0c0f14] text-slate-100">
      <header className="border-b border-white/10 bg-[#0c0f14]/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-400 via-orange-500 to-rose-600 shadow-lg shadow-orange-500/25 flex items-center justify-center font-semibold text-[#0c0f14] text-sm tracking-tight">
              C4C
            </div>
            <div>
              <p className="text-sm font-semibold text-white tracking-tight">Clay for Content</p>
              <p className="text-xs text-slate-400">One episode → blog, LinkedIn, X</p>
            </div>
          </div>
          <nav className="flex flex-wrap gap-2" aria-label="Primary">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  active === item.id
                    ? "bg-white/10 text-white ring-1 ring-amber-400/40"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">{children}</div>
    </div>
  );
}
