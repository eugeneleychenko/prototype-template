interface ExportBarProps {
  onExportMarkdown: () => void;
  onExportPdf: () => void;
  onCopyBlog: () => void;
  onScheduleLinkedIn: () => void;
  onScheduleTwitter: () => void;
  toast: string | null;
}

export function ExportBar({
  onExportMarkdown,
  onExportPdf,
  onCopyBlog,
  onScheduleLinkedIn,
  onScheduleTwitter,
  toast,
}: ExportBarProps) {
  const btn =
    "px-3 py-2 rounded-lg text-xs font-semibold border border-white/15 bg-white/5 text-slate-200 hover:bg-white/10 hover:border-amber-400/30 transition-colors";
  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-4 sm:p-5 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold text-white">Export & scheduling</h3>
          <p className="text-xs text-slate-500 mt-0.5">MVP: local export + mocked schedule handoff</p>
        </div>
        {toast && (
          <p className="text-xs text-emerald-300 font-medium" role="status">
            {toast}
          </p>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        <button type="button" className={btn} onClick={onExportMarkdown}>
          Download .md
        </button>
        <button type="button" className={btn} onClick={onExportPdf}>
          Export PDF (mock)
        </button>
        <button type="button" className={btn} onClick={onCopyBlog}>
          Copy blog Markdown
        </button>
        <button type="button" className={btn} onClick={onScheduleLinkedIn}>
          Schedule → LinkedIn
        </button>
        <button type="button" className={btn} onClick={onScheduleTwitter}>
          Schedule → X
        </button>
      </div>
    </div>
  );
}
