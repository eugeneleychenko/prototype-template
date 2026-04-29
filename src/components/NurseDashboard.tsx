import { useMemo, useState } from "react";
import { useQueue } from "../context/QueueContext";
import { formatArrivalTime, formatWaitMinutes, minutesWaiting } from "../utils/format";
import type { PatientQueueStatus, QueuedPatient } from "../types";
import { InsuranceBadge } from "./InsuranceBadge";
import { PatientDetailModal } from "./PatientDetailModal";

const STATUS_FILTER_OPTIONS: { value: "all" | PatientQueueStatus; label: string }[] = [
  { value: "all", label: "All" },
  { value: "waiting", label: "Waiting" },
  { value: "in_progress", label: "In progress" },
  { value: "completed", label: "Completed" },
];

function displayName(p: QueuedPatient) {
  return `${p.lastName}, ${p.firstName}`;
}

function NurseDashboard() {
  const { patients, setPatientStatus } = useQueue();
  const [filter, setFilter] = useState<"all" | PatientQueueStatus>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const sorted = useMemo(() => {
    const list = [...patients].sort((a, b) => a.arrivalTime - b.arrivalTime);
    if (filter === "all") return list;
    return list.filter((p) => p.status === filter);
  }, [patients, filter]);

  const selected = useMemo(
    () => (selectedId ? patients.find((p) => p.id === selectedId) ?? null : null),
    [patients, selectedId],
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Care team queue</h2>
          <p className="text-slate-600 mt-1">
            Checked-in patients, oldest arrival first. Tap a card for full intake.
          </p>
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter queue">
          {STATUS_FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setFilter(opt.value)}
              className={
                filter === opt.value
                  ? "rounded-full bg-[#2563EB] px-4 py-2 text-sm font-medium text-white"
                  : "rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-[#2563EB]/40"
              }
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {sorted.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/80 p-12 text-center text-lg text-slate-600">
          No patients match this filter in the demo queue.
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((p) => {
            const wait = minutesWaiting(p.arrivalTime);
            return (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(p.id)}
                  className="w-full text-left rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-[#2563EB]/40 hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-lg font-semibold text-slate-900 leading-tight">
                      {displayName(p)}
                    </span>
                    <QueueStatusPill status={p.status} />
                  </div>
                  <p className="mt-3 text-sm text-slate-600 line-clamp-2">{p.reasonForVisit}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
                    <span className="inline-flex items-center rounded-lg bg-slate-100 px-2 py-1 font-medium text-slate-800">
                      Wait: {formatWaitMinutes(wait)}
                    </span>
                    <InsuranceBadge status={p.insuranceStatus} />
                    <span className="text-slate-500">
                      Arrived {formatArrivalTime(p.arrivalTime)}
                    </span>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {selected && (
        <PatientDetailModal
          patient={selected}
          onClose={() => setSelectedId(null)}
          onSetStatus={setPatientStatus}
        />
      )}
    </div>
  );
}

function QueueStatusPill({ status }: { status: PatientQueueStatus }) {
  const map = {
    waiting: "bg-amber-100 text-amber-900",
    in_progress: "bg-[#2563EB]/15 text-[#2563EB]",
    completed: "bg-slate-200 text-slate-700",
  } as const;
  const labels = {
    waiting: "Waiting",
    in_progress: "In progress",
    completed: "Done",
  } as const;
  return (
    <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${map[status]}`}>
      {labels[status]}
    </span>
  );
}

export { NurseDashboard };
