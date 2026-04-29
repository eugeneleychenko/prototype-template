import type { AppView } from "../types";

const NAV: { id: AppView; label: string }[] = [
  { id: "checkin", label: "Patient check-in" },
  { id: "dashboard", label: "Staff queue" },
  { id: "analytics", label: "Analytics" },
];

interface AppHeaderProps {
  current: AppView;
  onNavigate: (view: AppView) => void;
  title?: string;
}

export function AppHeader({ current, onNavigate, title }: AppHeaderProps) {
  return (
    <header className="border-b border-slate-200/80 bg-white/95 backdrop-blur-sm sticky top-0 z-40 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#2563EB]">
              Acme Healthcare Solutions
            </p>
            <h1 className="text-lg sm:text-xl font-semibold text-slate-900 truncate">
              {title ?? "Urgent care — Northeast network"}
            </h1>
            <p className="text-sm text-slate-500 hidden sm:block">
              15 clinics · Demo prototype · Mock data only
            </p>
          </div>
          <nav
            className="flex flex-wrap gap-2"
            aria-label="Primary"
          >
            {NAV.map(({ id, label }) => {
              const active = current === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => onNavigate(id)}
                  className={
                    active
                      ? "rounded-full bg-[#2563EB] px-4 py-2 text-sm font-medium text-white shadow-md shadow-blue-500/25"
                      : "rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-[#2563EB]/40 hover:text-[#2563EB]"
                  }
                >
                  {label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
