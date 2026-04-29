interface QuoteCardProps {
  quote: string;
  attribution: string;
  variant: "linkedin" | "twitter";
  accent: "amber" | "sky" | "emerald";
}

export function QuoteCard({ quote, attribution, variant, accent }: QuoteCardProps) {
  const isLi = variant === "linkedin";
  const glow =
    accent === "amber"
      ? "from-amber-400/30 to-transparent"
      : accent === "sky"
        ? "from-sky-400/30 to-transparent"
        : "from-emerald-400/30 to-transparent";
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${
        isLi ? "from-[#1a2332] to-[#0f1623]" : "from-slate-900 to-[#0b1220]"
      } p-6 ring-1 ring-white/10 shadow-xl`}
    >
      <div
        className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br blur-2xl opacity-60 ${glow}`}
        aria-hidden
      />
      <p className="relative text-[10px] uppercase tracking-[0.2em] text-slate-500 font-semibold mb-3">
        {isLi ? "LinkedIn quote card" : "X / thread card"}
      </p>
      <p className={`relative font-medium leading-relaxed ${isLi ? "text-lg text-slate-100" : "text-base text-slate-100"}`}>
        “{quote}”
      </p>
      <p className="relative mt-4 text-sm text-slate-500">{attribution}</p>
    </div>
  );
}
