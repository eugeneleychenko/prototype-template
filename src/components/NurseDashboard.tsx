import { useMemo, useState } from "react";
import type { CheckInPatient, PatientStatus } from "../types";
import { useClinic } from "../ClinicContext";
import { PatientIntakeDetail } from "./PatientIntakeDetail";
import { formatClockTime, formatWaitMinutes } from "../utils/time";

type Filter = "active" | "waiting" | "in_progress" | "completed" | "all";

function insuranceLabel(p: CheckInPatient): string {
  if (/self[\s-]?pay/i.test(p.insurance)) return "Self-pay";
  if (p.insuranceStatus === "verified") return "Verified";
  if (p.insuranceStatus === "pending_verification") return "Pending";
  return "Insurance";
}

function matchesFilter(p: CheckInPatient, f: Filter): boolean {
  if (f === "all") return true;
  if (f === "active") return p.status !== "completed";
  return p.status === f;
}

export function NurseDashboard() {
  const { patients, setPatientStatus } = useClinic();
  const [filter, setFilter] = useState<Filter>("active");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const sorted = useMemo(() => {
    return [...patients]
      .filter((p) => matchesFilter(p, filter))
      .sort(
        (a, b) =>
          new Date(a.arrivedAt).getTime() - new Date(b.arrivedAt).getTime()
      );
  }, [patients, filter]);

  const selected = selectedId
    ? patients.find((p) => p.id === selectedId) ?? null
    : null;

  const filterBtn = (id: Filter, label: string) => (
    <button
      type="button"
      onClick={() => setFilter(id)}
      className={`min-h-[44px] rounded-xl px-4 py-2 text-base font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
        filter === id
          ? "bg-brand text-white shadow"
          : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 rounded-2xl bg-brand-muted/80 p-5 ring-1 ring-brand/10">
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Today&apos;s queue
        </h2>
        <p className="mt-2 text-lg text-slate-600">
          Checked-in patients appear here in arrival order. Tap a row for full
          intake. Replace manual clipboard entry and shorten front-desk time.
        </p>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {filterBtn("active", "Active")}
        {filterBtn("waiting", "Waiting")}
        {filterBtn("in_progress", "In progress")}
        {filterBtn("completed", "Completed")}
        {filterBtn("all", "All")}
      </div>

      <p className="mb-4 text-base text-slate-500">
        Showing <strong className="text-slate-800">{sorted.length}</strong>{" "}
        patient{sorted.length === 1 ? "" : "s"}
        {filter !== "all" ? ` · ${filter.replace("_", " ")}` : ""}.
      </p>

      <ul className="space-y-3" aria-label="Patient queue">
        {sorted.length === 0 && (
          <li className="rounded-2xl bg-white p-8 text-center text-lg text-slate-500 ring-1 ring-slate-200">
            No patients match this filter. Try &quot;All&quot; or complete a
            check-in on the patient tab.
          </li>
        )}
        {sorted.map((p) => (
          <li key={p.id}>
            <button
              type="button"
              onClick={() => setSelectedId(p.id)}
              className="w-full rounded-2xl border-2 border-transparent bg-white p-5 text-left shadow-sm ring-1 ring-slate-200 transition-all hover:border-brand/40 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xl font-bold text-slate-900">{p.name}</p>
                  <p className="mt-1 text-lg text-slate-600">{p.reasonForVisit}</p>
                </div>
                <div className="flex flex-wrap gap-2 sm:flex-col sm:items-end">
                  <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-800">
                    Wait {formatWaitMinutes(p.arrivedAt)}
                  </span>
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                      p.status === "waiting"
                        ? "bg-amber-100 text-amber-900"
                        : p.status === "in_progress"
                          ? "bg-brand-muted text-brand"
                          : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {p.status === "waiting"
                      ? "Waiting"
                      : p.status === "in_progress"
                        ? "In progress"
                        : "Done"}
                  </span>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-3 text-base text-slate-500">
                <span>
                  Arrived <strong className="text-slate-700">{formatClockTime(p.arrivedAt)}</strong>
                </span>
                <span className="hidden sm:inline">·</span>
                <span>
                  Insurance:{" "}
                  <strong className="text-slate-700">{insuranceLabel(p)}</strong>
                </span>
              </div>
            </button>
          </li>
        ))}
      </ul>

      {selected && (
        <PatientIntakeDetail
          patient={selected}
          onClose={() => setSelectedId(null)}
          onSetStatus={(id: string, status: PatientStatus) => {
            setPatientStatus(id, status);
            if (status === "completed") setSelectedId(null);
          }}
        />
      )}
    </div>
  );
}
