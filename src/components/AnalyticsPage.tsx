import { useMemo, useState } from "react";
import { useQueue } from "../context/QueueContext";
import { minutesWaiting } from "../utils/format";

function AnalyticsPage() {
  const { patients, totalCheckInsToday, baselineCheckInsToday } = useQueue();
  const [clinicFilter, setClinicFilter] = useState<string>("all");

  const clinics = useMemo(
    () => ["all", "Boston", "Hartford", "Albany", "Portland", "Providence"],
    [],
  );

  const waitingPatients = useMemo(
    () => patients.filter((p) => p.status === "waiting" || p.status === "in_progress"),
    [patients],
  );

  const queueAvgWait = useMemo(() => {
    if (waitingPatients.length === 0) return 0;
    const sum = waitingPatients.reduce((acc, p) => acc + minutesWaiting(p.arrivalTime), 0);
    return Math.round(sum / waitingPatients.length);
  }, [waitingPatients]);

  const networkAvgDisplay =
    clinicFilter === "all" ? 14 : clinicFilter === "Boston" ? 12 : 16;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
      <h2 className="text-2xl font-bold text-slate-900">Operations snapshot</h2>
      <p className="text-slate-600 mt-1">
        Lightweight metrics for clinic managers — demo data blended with current queue.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <label htmlFor="clinic-select" className="text-sm font-medium text-slate-700">
          Region / clinic
        </label>
        <select
          id="clinic-select"
          value={clinicFilter}
          onChange={(e) => setClinicFilter(e.target.value)}
          className="rounded-xl border-2 border-slate-200 bg-white px-4 py-2.5 text-slate-900 focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/25"
        >
          {clinics.map((c) => (
            <option key={c} value={c}>
              {c === "all" ? "All 15 Northeast clinics" : `${c} urgent care`}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Avg. wait (network today)</p>
          <p className="mt-2 text-4xl font-bold text-[#2563EB] tabular-nums">
            {networkAvgDisplay} min
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Mock benchmark for selected footprint; actual averages would come from visit data.
          </p>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Live queue avg. wait</p>
          <p className="mt-2 text-4xl font-bold text-slate-900 tabular-nums">
            {queueAvgWait > 0 ? `${queueAvgWait} min` : "—"}
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Average wait among patients currently waiting or in progress in this demo session.
          </p>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:col-span-2 lg:col-span-1">
          <p className="text-sm font-medium text-slate-500">Check-ins today (network)</p>
          <p className="mt-2 text-4xl font-bold text-slate-900 tabular-nums">{totalCheckInsToday}</p>
          <p className="mt-2 text-sm text-slate-600">
            Baseline mock count {baselineCheckInsToday} plus each check-in you submit in the wizard.
          </p>
        </article>
      </div>

      <div className="mt-8 rounded-2xl border border-dashed border-[#2563EB]/30 bg-blue-50/50 p-6">
        <h3 className="font-semibold text-slate-900">Replacing the 15–20 minute clipboard</h3>
        <p className="mt-2 text-slate-700 max-w-2xl">
          Digital intake is designed to cut duplicate data entry and give nurses a real-time queue.
          Full rollout would connect to Epic for eligibility and charting — not shown in this build.
        </p>
      </div>
    </div>
  );
}

export { AnalyticsPage };
