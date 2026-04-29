interface StudioPlaceholderProps {
  onGoIntake: () => void;
}

export function StudioPlaceholder({ onGoIntake }: StudioPlaceholderProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center max-w-xl mx-auto mt-12">
      <p className="text-xs uppercase tracking-wider text-amber-400/90 font-semibold">Content studio</p>
      <h2 className="mt-3 text-xl font-semibold text-white">Generate a pack to unlock editing</h2>
      <p className="mt-2 text-sm text-slate-400 leading-relaxed">
        In the full flow, Whisper / Deepgram + Claude assemble your blog (~1,650 words), 5 LinkedIn posts, an 11-tweet thread, quote cards,
        and extracted stats — then you refine here with version history.
      </p>
      <button
        type="button"
        onClick={onGoIntake}
        className="mt-6 inline-flex px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-[#0c0f14] font-semibold text-sm shadow-lg shadow-orange-500/20"
      >
        Episode intake
      </button>
    </div>
  );
}
