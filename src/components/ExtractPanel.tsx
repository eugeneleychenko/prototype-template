import type { ExtractKind, ExtractedSnippet } from "../types";

interface ExtractPanelProps {
  items: ExtractedSnippet[];
  filter: ExtractKind | "all";
  onFilter: (f: ExtractKind | "all") => void;
  showTimestamps: boolean;
  onToggleTimestamps: () => void;
}

const kindLabel: Record<ExtractKind, string> = {
  quote: "Quotes",
  stat: "Stats",
  story: "Stories",
};

const kindBadge: Record<ExtractKind, string> = {
  quote: "bg-sky-500/20 text-sky-200 ring-sky-400/30",
  stat: "bg-emerald-500/20 text-emerald-200 ring-emerald-400/30",
  story: "bg-amber-500/20 text-amber-100 ring-amber-400/30",
};

export function ExtractPanel({ items, filter, onFilter, showTimestamps, onToggleTimestamps }: ExtractPanelProps) {
  const filtered = filter === "all" ? items : items.filter((i) => i.kind === filter);
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Soundbites & proof</h2>
        <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer select-none">
          <input type="checkbox" checked={showTimestamps} onChange={onToggleTimestamps} className="rounded border-white/20 bg-black/40" />
          Show timestamps
        </label>
      </div>
      <div className="flex flex-wrap gap-2">
        {(["all", "quote", "stat", "story"] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => onFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filter === f ? "bg-white/15 text-white ring-1 ring-amber-400/40" : "bg-black/25 text-slate-400 hover:text-white"
            }`}
          >
            {f === "all" ? "All" : kindLabel[f]}
          </button>
        ))}
      </div>
      <ul className="space-y-3">
        {filtered.map((item) => (
          <li
            key={item.id}
            className="rounded-xl border border-white/10 bg-black/20 px-4 py-3"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[10px] uppercase font-bold tracking-wide px-2 py-0.5 rounded-md ring-1 ${kindBadge[item.kind]}`}>
                {item.kind}
              </span>
              {showTimestamps && item.timestamp && (
                <span className="text-xs text-slate-600 font-mono">{item.timestamp}</span>
              )}
            </div>
            <p className="text-sm text-slate-200 leading-relaxed">{item.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
