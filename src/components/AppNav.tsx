export type AppView = "checkin" | "staff" | "analytics";

export function AppNav({
  current,
  onNavigate,
}: {
  current: AppView;
  onNavigate: (v: AppView) => void;
}) {
  const link = (id: AppView, label: string) => (
    <button
      type="button"
      onClick={() => onNavigate(id)}
      className={`min-h-[48px] rounded-xl px-5 py-3 text-lg font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
        current === id
          ? "bg-brand text-white shadow-md"
          : "bg-white text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
      }`}
    >
      {label}
    </button>
  );

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-brand">
            Acme Healthcare Solutions
          </p>
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
            Urgent Care — Northeast
          </h1>
        </div>
        <nav
          className="flex flex-wrap gap-2"
          aria-label="Main navigation"
        >
          {link("checkin", "Patient check-in")}
          {link("staff", "Nurse dashboard")}
          {link("analytics", "Analytics")}
        </nav>
      </div>
    </header>
  );
}
