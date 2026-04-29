interface PlansViewProps {
  tier: "free" | "pro";
  onSelectTier: (t: "free" | "pro") => void;
  episodesUsedThisMonth: number;
  onNavigateStudio: () => void;
}

const plans = [
  {
    id: "free" as const,
    name: "Free",
    price: "$0",
    cadence: "per month",
    highlights: ["1 episode / month", "Blog + LinkedIn + X pack", "Quote cards (templates)", "Export: Markdown, clipboard"],
    footnote: "Best for trying the channel-fit quality on a real episode.",
  },
  {
    id: "pro" as const,
    name: "Pro",
    price: "$49",
    cadence: "per month",
    highlights: [
      "Unlimited episodes",
      "Stronger models (Claude long-form bias)",
      "Voice training (3–5 examples, vector memory)",
      "Scheduling handoff to LinkedIn & X",
    ],
    footnote: "Where the “human, not slop” bar and tone memory matter week after week.",
  },
  {
    id: "team" as const,
    name: "Team",
    price: "Later",
    cadence: "agencies",
    highlights: ["Multi-seat", "Shared brand voice", "Client workspaces", "Analytics when we add them"],
    footnote: "Discussed as post-MVP — surfaced here so pricing feels complete in the demo.",
    disabled: true,
  },
];

export function PlansView({ tier, onSelectTier, episodesUsedThisMonth, onNavigateStudio }: PlansViewProps) {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">Plans built for publishing rhythm</h1>
        <p className="mt-3 text-slate-400 max-w-2xl leading-relaxed">
          Creators need speed without sacrificing voice. Free proves the workflow on one episode; Pro unlocks the volume, model depth, and
          style memory that make repurposing feel in-house — not generic.
        </p>
        {tier === "free" && (
          <p className="mt-4 text-sm text-slate-500">
            Your workspace is on <span className="text-slate-300 font-medium">Free</span>. Episodes used this month:{" "}
            <span className="text-amber-200 font-medium">{episodesUsedThisMonth} / 1</span>.
          </p>
        )}
        {tier === "pro" && (
          <p className="mt-4 text-sm text-emerald-300/90">
            Pro active — unlimited episodes for this demo workspace.
          </p>
        )}
      </section>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((p) => {
          const isCurrent = !p.disabled && p.id === tier;
          const isTeam = p.id === "team";
          return (
            <article
              key={p.id}
              className={`relative rounded-2xl border p-6 flex flex-col ${
                isTeam
                  ? "border-white/5 bg-black/20 opacity-75"
                  : isCurrent
                    ? "border-amber-400/40 bg-gradient-to-b from-amber-500/10 to-transparent shadow-lg shadow-amber-900/20"
                    : "border-white/10 bg-white/[0.03] hover:border-white/20"
              }`}
            >
              {isCurrent && (
                <span className="absolute top-4 right-4 text-[10px] uppercase font-bold text-amber-200 tracking-wide">
                  Current
                </span>
              )}
              <h2 className="text-lg font-semibold text-white">{p.name}</h2>
              <p className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-semibold text-white">{p.price}</span>
                {!isTeam && <span className="text-sm text-slate-500">/ {p.cadence}</span>}
              </p>
              <ul className="mt-6 space-y-2 text-sm text-slate-400 flex-1">
                {p.highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <span className="text-amber-400/80 mt-0.5">✓</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-slate-600 leading-relaxed">{p.footnote}</p>
              {!isTeam && (
                <button
                  type="button"
                  disabled={isCurrent}
                  onClick={() => onSelectTier(p.id)}
                  className="mt-6 w-full py-2.5 rounded-xl text-sm font-semibold border transition-colors disabled:opacity-50 disabled:pointer-events-none bg-white/10 border-white/15 text-white hover:bg-white/15"
                >
                  {isCurrent ? "Selected" : p.id === "free" ? "Use Free" : "Upgrade to Pro (demo)"}
                </button>
              )}
            </article>
          );
        })}
      </div>

      <div className="rounded-2xl border border-dashed border-white/15 bg-black/20 p-6 text-center">
        <p className="text-sm text-slate-400 mb-3">Ready to see the full pack with editing, quote cards, and export?</p>
        <button
          type="button"
          onClick={onNavigateStudio}
          className="inline-flex px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-[#0c0f14] font-semibold text-sm shadow-lg shadow-orange-500/20 hover:from-amber-400 hover:to-orange-500"
        >
          Open content studio
        </button>
      </div>
    </div>
  );
}
