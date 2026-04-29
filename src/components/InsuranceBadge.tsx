import type { InsuranceStatus } from "../types";

const STYLES: Record<
  InsuranceStatus,
  { label: string; className: string }
> = {
  verified: {
    label: "Verified",
    className: "bg-emerald-50 text-emerald-800 ring-emerald-600/20",
  },
  pending_review: {
    label: "Review",
    className: "bg-amber-50 text-amber-900 ring-amber-600/25",
  },
  self_pay: {
    label: "Self-pay",
    className: "bg-slate-100 text-slate-700 ring-slate-500/20",
  },
};

export function InsuranceBadge({ status }: { status: InsuranceStatus }) {
  const s = STYLES[status];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${s.className}`}
    >
      {s.label}
    </span>
  );
}
