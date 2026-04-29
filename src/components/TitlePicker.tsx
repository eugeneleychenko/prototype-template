import type { TitleOption } from "../types";

interface TitlePickerProps {
  titles: TitleOption[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function TitlePicker({ titles, selectedId, onSelect }: TitlePickerProps) {
  return (
    <div className="space-y-2">
      <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Title options</p>
      <div className="flex flex-col gap-2">
        {titles.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => onSelect(t.id)}
            className={`text-left rounded-xl px-4 py-3 text-sm border transition-colors ${
              selectedId === t.id
                ? "border-amber-400/50 bg-amber-500/10 text-white"
                : "border-white/10 bg-black/20 text-slate-300 hover:border-white/20"
            }`}
          >
            <span className="text-[10px] uppercase tracking-wide text-slate-500 block mb-1">{t.label}</span>
            {t.text}
          </button>
        ))}
      </div>
    </div>
  );
}
