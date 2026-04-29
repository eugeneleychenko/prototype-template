import { useEffect, useRef } from "react";

interface RichTextEditorProps {
  valueHtml: string;
  onChangeHtml: (html: string) => void;
  placeholder?: string;
  minHeightClass?: string;
}

export function RichTextEditor({
  valueHtml,
  onChangeHtml,
  placeholder = "Start typing…",
  minHeightClass = "min-h-[120px]",
}: RichTextEditorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const syncing = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (document.activeElement === el) return;
    if (el.innerHTML !== valueHtml) {
      syncing.current = true;
      el.innerHTML = valueHtml || "";
      syncing.current = false;
    }
  }, [valueHtml]);

  const handleInput = () => {
    if (syncing.current) return;
    const el = ref.current;
    if (el) onChangeHtml(el.innerHTML);
  };

  const exec = (command: string, value?: string) => {
    ref.current?.focus();
    document.execCommand(command, false, value);
    const el = ref.current;
    if (el && !syncing.current) onChangeHtml(el.innerHTML);
  };

  const toolbarBtn =
    "px-2 py-1 rounded text-xs font-medium border border-white/15 bg-black/30 text-slate-300 hover:bg-white/10 hover:text-white";

  return (
    <div className="rounded-xl border border-white/10 bg-black/25 overflow-hidden">
      <div className="flex flex-wrap gap-1 p-2 border-b border-white/10 bg-black/20">
        <button type="button" className={toolbarBtn} onClick={() => exec("bold")}>
          Bold
        </button>
        <button type="button" className={toolbarBtn} onClick={() => exec("italic")}>
          Italic
        </button>
        <button
          type="button"
          className={toolbarBtn}
          onClick={() => {
            const url = window.prompt("Link URL");
            if (url) exec("createLink", url);
          }}
        >
          Link
        </button>
        <button type="button" className={toolbarBtn} onClick={() => exec("removeFormat")}>
          Clear format
        </button>
      </div>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onBlur={handleInput}
        data-placeholder={placeholder}
        className={`${minHeightClass} px-4 py-3 text-sm text-slate-100 outline-none leading-relaxed [&:empty]:before:content-[attr(data-placeholder)] [&:empty]:before:text-slate-600`}
      />
    </div>
  );
}
