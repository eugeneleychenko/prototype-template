interface VersionListProps {
  label: string;
  versions: { id: string; savedAt: string; summary: string }[];
  onRestore: (id: string) => void;
}

export function VersionList({ label, versions, onRestore }: VersionListProps) {
  if (versions.length === 0) {
    return (
      <div className="rounded-xl border border-white/10 bg-black/20 p-4">
        <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">{label}</p>
        <p className="text-sm text-slate-500 mt-2">No saved versions yet.</p>
      </div>
    );
  }
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-4 max-h-48 overflow-y-auto">
      <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2">{label}</p>
      <ul className="space-y-2">
        {versions.map((v) => (
          <li key={v.id} className="flex items-start justify-between gap-2 text-sm">
            <div>
              <p className="text-slate-300">{v.summary}</p>
              <p className="text-xs text-slate-600">{v.savedAt}</p>
            </div>
            <button
              type="button"
              onClick={() => onRestore(v.id)}
              className="shrink-0 text-xs font-medium text-amber-300 hover:text-amber-200"
            >
              Restore
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
