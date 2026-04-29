import type { CheckInPatient, PatientStatus } from "../types";
import { formatClockTime, formatWaitMinutes } from "../utils/time";

function formatDobDisplay(yyyyMmDdApprox: string): string {
  const d = new Date(yyyyMmDdApprox + "T12:00:00");
  if (Number.isNaN(d.getTime())) return yyyyMmDdApprox;
  return d.toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function insuranceBadge(p: CheckInPatient): { label: string; className: string } {
  if (/self[\s-]?pay/i.test(p.insurance)) {
    return {
      label: "Self-pay",
      className: "bg-amber-100 text-amber-900 ring-amber-200",
    };
  }
  switch (p.insuranceStatus) {
    case "verified":
      return {
        label: "Verified",
        className: "bg-emerald-100 text-emerald-900 ring-emerald-200",
      };
    case "pending_verification":
      return {
        label: "Pending verify",
        className: "bg-amber-100 text-amber-900 ring-amber-200",
      };
    case "self_pay":
      return {
        label: "Self-pay",
        className: "bg-slate-100 text-slate-800 ring-slate-200",
      };
    default:
      return {
        label: p.insuranceStatus,
        className: "bg-slate-100 text-slate-800",
      };
  }
}

function statusLabel(s: PatientStatus): string {
  switch (s) {
    case "waiting":
      return "Waiting";
    case "in_progress":
      return "In progress";
    case "completed":
      return "Completed";
    default:
      return s;
  }
}

export function PatientIntakeDetail({
  patient,
  onClose,
  onSetStatus,
}: {
  patient: CheckInPatient;
  onClose: () => void;
  onSetStatus: (id: string, status: PatientStatus) => void;
}) {
  const ins = insuranceBadge(patient);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="intake-title"
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Close"
        onClick={onClose}
      />
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl">
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4">
          <h2 id="intake-title" className="text-xl font-bold text-slate-900">
            Full intake
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] rounded-xl text-2xl text-slate-500 hover:bg-slate-100 hover:text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            aria-label="Close detail"
          >
            ×
          </button>
        </div>

        <div className="space-y-4 p-5 pb-28 sm:pb-24">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ring-1 ${ins.className}`}
            >
              {ins.label}
            </span>
            <span className="inline-flex rounded-full bg-brand-muted px-3 py-1 text-sm font-semibold text-brand ring-1 ring-brand/20">
              {statusLabel(patient.status)}
            </span>
          </div>

          <dl className="space-y-3 text-base sm:text-lg">
            <div>
              <dt className="font-semibold text-slate-500">Patient</dt>
              <dd className="text-slate-900">{patient.name}</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-500">Date of birth</dt>
              <dd className="text-slate-900">{formatDobDisplay(patient.dateOfBirth)}</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-500">Insurance / plan</dt>
              <dd className="text-slate-900">{patient.insurance}</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-500">Reason for visit</dt>
              <dd className="text-slate-900">{patient.reasonForVisit}</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-500">Allergies</dt>
              <dd className="text-slate-900">{patient.allergies}</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-500">Current medications</dt>
              <dd className="text-slate-900">{patient.medications}</dd>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <dt className="font-semibold text-slate-500">Arrival</dt>
              <dd className="text-slate-900">
                {formatClockTime(patient.arrivedAt)} — Wait{" "}
                <strong>{formatWaitMinutes(patient.arrivedAt)}</strong>
              </dd>
            </div>
          </dl>
        </div>

        <div className="sticky bottom-0 border-t border-slate-100 bg-white p-4 shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              disabled={patient.status === "in_progress"}
              onClick={() => onSetStatus(patient.id, "in_progress")}
              className="min-h-[52px] flex-1 rounded-xl bg-brand px-4 text-lg font-semibold text-white shadow-sm hover:bg-brand-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
            >
              Mark in progress
            </button>
            <button
              type="button"
              disabled={patient.status === "completed"}
              onClick={() => onSetStatus(patient.id, "completed")}
              className="min-h-[52px] flex-1 rounded-xl border-2 border-emerald-600 bg-white px-4 text-lg font-semibold text-emerald-800 hover:bg-emerald-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-400"
            >
              Mark completed
            </button>
          </div>
          <p className="mt-2 text-center text-sm text-slate-500">
            Future: sync intake to Epic when connected
          </p>
        </div>
      </div>
    </div>
  );
}
