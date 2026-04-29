import type { ReactNode } from "react";
import { Button } from "./Button";

interface ModalProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  onClose: () => void;
}

export function Modal({ title, subtitle, children, onClose }: ModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-panel/80"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card border border-border-light"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-border-light bg-input px-5 py-4">
          <div>
            <p className="font-mono uppercase tracking-[0.14em] text-mono-xs text-muted">Player card — 1996</p>
            <h2 id="modal-title" className="mt-1 font-sans text-page text-ink">
              {title}
            </h2>
            {subtitle ? (
              <p className="mt-1 font-mono uppercase tracking-[0.12em] text-mono-sm text-muted">{subtitle}</p>
            ) : null}
          </div>
          <Button variant="ghost" onClick={onClose} className="shrink-0 px-3 py-1">
            Close
          </Button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
