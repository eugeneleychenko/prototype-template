import type { PatientQueueStatus, QueuedPatient } from "../types";
import { formatArrivalTime, formatWaitMinutes, minutesWaiting } from "../utils/format";
import { InsuranceBadge } from "./InsuranceBadge";

interface PatientDetailModalProps {
  patient: QueuedPatient;
  onClose: () => void;
  onSetStatus: (id: string, status: PatientQueueStatus) => void;
}

function row(label: string, value: string) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-1 sm:gap-4 py-3 border-b border-slate-100 last:border-0">
      <dt className="text-sm font-medium text-slate-500">{label}</dt>
      <dd className="text-base text-slate-900 whitespace-pre-wrap">{value || "—"}</dd>
    </div>
  );
}

function PatientDetailModal({ patient, onClose, onSetStatus }: PatientDetailModalProps) {
  const wait = minutesWaiting(patient.arrivalTime);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-0 sm:p-4 bg-slate-900/40 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="detail-title"
    >
      <div className="w-full max-w-lg sm:max-w-xl max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-white shadow-2xl border border-slate-200">
        <div className="sticky top-0 flex items-center justify-between gap-4 border-b border-slate-100 bg-white/95 px-5 py-4 backdrop-blur">
          <h3 id="detail-title" className="text-xl font-bold text-slate-900">
            {patient.lastName}, {patient.firstName}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
            aria-label="Close"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-5 py-4">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-sm text-slate-600">
              Arrived {formatArrivalTime(patient.arrivalTime)} · Wait {formatWaitMinutes(wait)}
            </span>
            <InsuranceBadge status={patient.insuranceStatus} />
          </div>

          <dl className="mt-2">
            {row("Date of birth", patient.dateOfBirth)}
            {row("Insurance", patient.insuranceProvider)}
            {row("Member ID", patient.memberId)}
            {row("Reason for visit", patient.reasonForVisit)}
            {row("Allergies", patient.allergies)}
            {row("Medications", patient.medications)}
          </dl>

          <p className="mt-4 rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-500">
            Epic EHR sync is not connected in this prototype — intake is mock/demo only.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              disabled={patient.status === "in_progress"}
              onClick={() => onSetStatus(patient.id, "in_progress")}
              className="flex-1 rounded-xl bg-[#2563EB] py-3.5 text-base font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Mark in progress
            </button>
            <button
              type="button"
              disabled={patient.status === "completed"}
              onClick={() => {
                onSetStatus(patient.id, "completed");
                onClose();
              }}
              className="flex-1 rounded-xl border-2 border-slate-200 bg-white py-3.5 text-base font-semibold text-slate-800 hover:border-slate-300 disabled:opacity-50"
            >
              Mark completed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { PatientDetailModal };
