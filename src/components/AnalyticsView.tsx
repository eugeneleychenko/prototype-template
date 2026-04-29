import { useMemo } from "react";
import { useClinic } from "../ClinicContext";
import { COMPLETED_TODAY_MOCK } from "../mockData";
import { averageMinutes, formatWaitMinutes } from "../utils/time";

export function AnalyticsView() {
  const { patients, submissionsThisSession } = useClinic();

  const metrics = useMemo(() => {
    const completedDurations = COMPLETED_TODAY_MOCK.map((row) =>
      Math.round(
        (new Date(row.completedAt).getTime() -
          new Date(row.arrivedAt).getTime()) /
          60000
      )
    );
    const avgCompletedToday = averageMinutes(completedDurations);

    const activeForWait = patients.filter(
      (p) => p.status === "waiting" || p.status === "in_progress"
    );
    const waitNow = activeForWait.map((p) =>
      Math.max(
        0,
        Math.floor((Date.now() - new Date(p.arrivedAt).getTime()) / 60000)
      )
    );
    const avgWaitNow = averageMinutes(waitNow);

    const active = patients.filter((p) => p.status !== "completed");
    const longestWaitLabel =
      active.length > 0
        ? formatWaitMinutes(
            active.reduce((earliest, p) =>
              new Date(p.arrivedAt) < new Date(earliest.arrivedAt) ? p : earliest
            ).arrivedAt
          )
        : "—";

    const completedInQueue = patients.filter((p) => p.status === "completed").length;

    const volumeToday =
      COMPLETED_TODAY_MOCK.length + patients.length + submissionsThisSession;

    return {
      avgCompletedToday,
      avgWaitNow,
      activeCount: active.length,
      longestWaitLabel,
      completedInQueue,
      volumeToday,
      completedSampleCount: COMPLETED_TODAY_MOCK.length,
    };
  }, [patients, submissionsThisSession]);

  const statCard = (
    title: string,
    value: string,
    hint: string
  ) => (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </p>
      <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
      <p className="mt-2 text-base text-slate-600">{hint}</p>
    </div>
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
        Operations snapshot
      </h2>
      <p className="mt-2 text-lg text-slate-600">
        Illustrative metrics for clinic managers — powered by mock data in this
        prototype. Live reporting would pull from your EHR and visit timestamps.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {statCard(
          "Avg. wait (active queue)",
          metrics.avgWaitNow > 0 ? `${metrics.avgWaitNow} min` : "—",
          metrics.avgWaitNow > 0
            ? `Across ${metrics.activeCount} active patient${metrics.activeCount === 1 ? "" : "s"}. Longest wait now: ${metrics.longestWaitLabel}.`
            : "No active patients in queue."
        )}
        {statCard(
          "Avg. time to complete (sample)",
          `${metrics.avgCompletedToday} min`,
          `Based on ${metrics.completedSampleCount} completed demo visits scheduled earlier today.`
        )}
        {statCard(
          "Check-in volume (demo)",
          String(metrics.volumeToday),
          "Mock completed visits + current queue + check-ins this session."
        )}
        {statCard(
          "Marked completed (in app)",
          String(metrics.completedInQueue),
          "Patients marked completed from the nurse dashboard this session."
        )}
      </div>

      <div className="mt-8 rounded-2xl bg-brand-muted p-6 ring-1 ring-brand/15">
        <h3 className="text-lg font-bold text-slate-900">
          What managers would see with Epic connected
        </h3>
        <ul className="mt-3 list-inside list-disc space-y-2 text-lg text-slate-700">
          <li>Check-ins per site and per hour across all 15 Northeast clinics</li>
          <li>SLAs vs. targets (e.g. time from arrival to first clinical touch)</li>
          <li>Insurance verification backlog and self-pay mix</li>
        </ul>
      </div>
    </div>
  );
}
