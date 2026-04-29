import { useRef } from "react";
import { wrapSelection } from "../utils/textEditor";

interface BlogEditorProps {
  markdown: string;
  onChange: (md: string) => void;
}

export function BlogEditor({ markdown, onChange }: BlogEditorProps) {
  const taRef = useRef<HTMLTextAreaElement>(null);

  const applyWrap = (before: string, after: string) => {
    const ta = taRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const { next, caret } = wrapSelection(ta.value, start, end, before, after);
    onChange(next);
    requestAnimationFrame(() => {
      ta.focus();
      ta.setSelectionRange(caret, caret);
    });
  };

  const btn =
    "px-2 py-1 rounded text-xs font-medium border border-white/15 bg-black/30 text-slate-300 hover:bg-white/10";

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
      <div className="flex flex-wrap gap-1 p-2 border-b border-white/10 bg-black/25">
        <button type="button" className={btn} onClick={() => applyWrap("**", "**")}>
          Bold
        </button>
        <button type="button" className={btn} onClick={() => applyWrap("*", "*")}>
          Italic
        </button>
        <button type="button" className={btn} onClick={() => applyWrap("## ", "")}>
          H2
        </button>
        <button type="button" className={btn} onClick={() => applyWrap("- ", "")}>
          List
        </button>
        <button type="button" className={btn} onClick={() => applyWrap("[", "](url)")}>
          Link
        </button>
      </div>
      <textarea
        ref={taRef}
        value={markdown}
        onChange={(e) => onChange(e.target.value)}
        spellCheck
        className="w-full min-h-[320px] sm:min-h-[400px] bg-[#080b10] text-slate-100 text-sm font-mono leading-relaxed px-4 py-4 outline-none resize-y border-0 focus:ring-2 focus:ring-inset focus:ring-amber-400/30"
        placeholder="# Your blog draft (Markdown)…"
      />
    </div>
  );
}
