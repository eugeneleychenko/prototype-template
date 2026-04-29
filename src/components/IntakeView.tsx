import { useState } from "react";
import type { TonePreset } from "../types";

export interface IntakeFormState {
  source: "upload" | "link";
  audioUrl: string;
  transcript: string;
  useTranscript: boolean;
  tone: TonePreset;
  styleSamples: string;
}

interface IntakeViewProps {
  form: IntakeFormState;
  onChange: (patch: Partial<IntakeFormState>) => void;
  onGenerate: () => void;
  feedback: string | null;
  isGenerating: boolean;
  episodesUsedThisMonth: number;
  tier: "free" | "pro";
}

const toneOptions: { value: TonePreset; label: string; hint: string }[] = [
  { value: "thought-leadership", label: "Thought leadership", hint: "Authoritative, warm, boardroom-safe" },
  { value: "witty", label: "Witty operator", hint: "Sharp metaphors, light edge, still credible" },
  { value: "casual", label: "Casual creator", hint: "Conversational, peer-to-peer, high-trust" },
];

export function IntakeView({
  form,
  onChange,
  onGenerate,
  feedback,
  isGenerating,
  episodesUsedThisMonth,
  tier,
}: IntakeViewProps) {
  const [fileName, setFileName] = useState<string | null>(null);
  const atLimit = tier === "free" && episodesUsedThisMonth >= 1;

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
          Turn one episode into a full content system
        </h1>
        <p className="mt-3 text-slate-400 max-w-2xl leading-relaxed">
          Upload audio or paste a hosted link. Add a transcript when you have it — we’ll align quotes, stats, and stories to each channel:
          SEO blog, professional LinkedIn, and a hook-led X thread.
        </p>
        {tier === "free" && (
          <p className="mt-4 text-sm text-amber-200/90">
            Free tier: <span className="font-medium text-amber-100">1 episode / month</span>
            {episodesUsedThisMonth > 0 && (
              <> · Used {episodesUsedThisMonth} this cycle</>
            )}
          </p>
        )}
      </section>

      <div className="grid lg:grid-cols-2 gap-6">
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 space-y-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Episode input</h2>
          <div className="flex rounded-xl bg-black/30 p-1 ring-1 ring-white/10">
            {(
              [
                ["upload", "Upload MP3"],
                ["link", "Audio URL"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => onChange({ source: value })}
                className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${
                  form.source === value ? "bg-amber-500/20 text-amber-100 shadow" : "text-slate-400 hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          {form.source === "upload" ? (
            <label className="block cursor-pointer">
              <span className="text-xs text-slate-500 uppercase font-semibold tracking-wide">Audio file</span>
              <div className="mt-2 flex items-center justify-center rounded-xl border border-dashed border-white/20 bg-black/20 px-4 py-10 text-center hover:border-amber-400/40 transition-colors">
                <input
                  type="file"
                  accept="audio/*,.mp3"
                  className="sr-only"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    setFileName(f ? f.name : null);
                  }}
                />
                <span className="text-sm text-slate-400">
                  <span className="text-amber-200 font-medium">Choose file</span> or drag WAV / MP3 (demo)
                  {fileName && <span className="block mt-2 text-emerald-300/90 font-normal">Selected: {fileName}</span>}
                </span>
              </div>
            </label>
          ) : (
            <label className="block">
              <span className="text-xs text-slate-500 uppercase font-semibold tracking-wide">Hosted audio URL</span>
              <input
                type="url"
                value={form.audioUrl}
                onChange={(e) => onChange({ audioUrl: e.target.value })}
                placeholder="https://cdn.yourshow.com/episodes/042.mp3"
                className="mt-2 w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-400/40"
              />
            </label>
          )}
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={form.useTranscript}
              onChange={(e) => onChange({ useTranscript: e.target.checked })}
              className="rounded border-white/20 bg-black/40 text-amber-500 focus:ring-amber-400/50"
            />
            <span className="text-sm text-slate-300">I have a transcript (optional, improves precision)</span>
          </label>
          {form.useTranscript && (
            <label className="block">
              <span className="text-xs text-slate-500 uppercase font-semibold tracking-wide">Paste transcript</span>
              <textarea
                value={form.transcript}
                onChange={(e) => onChange({ transcript: e.target.value })}
                rows={6}
                placeholder="Speaker 1: …"
                className="mt-2 w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-400/40 font-mono"
              />
            </label>
          )}
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 space-y-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Voice & style</h2>
          <fieldset className="space-y-3">
            <legend className="sr-only">Tone preset</legend>
            {toneOptions.map((opt) => (
              <label
                key={opt.value}
                className={`flex gap-3 p-3 rounded-xl cursor-pointer border transition-colors ${
                  form.tone === opt.value
                    ? "border-amber-400/50 bg-amber-500/10"
                    : "border-white/10 bg-black/20 hover:border-white/20"
                }`}
              >
                <input
                  type="radio"
                  name="tone"
                  value={opt.value}
                  checked={form.tone === opt.value}
                  onChange={() => onChange({ tone: opt.value })}
                  className="mt-1 border-white/20 bg-black/40 text-amber-500 focus:ring-amber-400/50"
                />
                <span>
                  <span className="block text-sm font-medium text-white">{opt.label}</span>
                  <span className="block text-xs text-slate-500 mt-0.5">{opt.hint}</span>
                </span>
              </label>
            ))}
          </fieldset>
          <label className="block">
            <span className="text-xs text-slate-500 uppercase font-semibold tracking-wide">
              Style examples (3–5 past articles or posts)
            </span>
            <textarea
              value={form.styleSamples}
              onChange={(e) => onChange({ styleSamples: e.target.value })}
              rows={5}
              placeholder="Paste excerpts… We’ll use them to bias tone and cadence (vector memory in production)."
              className="mt-2 w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-400/40"
            />
          </label>
          <div className="rounded-xl bg-black/25 border border-white/5 px-4 py-3 text-xs text-slate-500 leading-relaxed">
            <span className="text-slate-400 font-medium">Pipeline (mock):</span> Whisper large-v3 or Deepgram → chunking → Claude 3.5 Sonnet for long-form → channel-specific passes → quote/story/stat extraction.
          </div>
        </section>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <button
          type="button"
          disabled={atLimit || isGenerating}
          onClick={onGenerate}
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-[#0c0f14] font-semibold text-sm shadow-lg shadow-orange-500/25 hover:from-amber-400 hover:to-orange-500 disabled:opacity-40 disabled:pointer-events-none transition-all"
        >
          {isGenerating ? "Generating assets…" : atLimit ? "Monthly limit reached" : "Generate repurposed pack"}
        </button>
        {feedback && (
          <p className="text-sm text-emerald-300/90 animate-pulse" role="status">
            {feedback}
          </p>
        )}
      </div>
    </div>
  );
}
