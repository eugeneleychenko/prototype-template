import { useMemo, useState } from "react";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import { PageHeader } from "../components/PageHeader";
import { gameResults } from "../data/yankees1996";

type PhaseFilter = "All" | "Regular" | "Postseason";

export function ScheduleView() {
  const [phase, setPhase] = useState<PhaseFilter>("All");

  const rows = useMemo(() => {
    return gameResults.filter((g) => {
      if (phase === "All") return true;
      if (phase === "Regular") return g.phase === "Regular";
      return g.phase !== "Regular";
    });
  }, [phase]);

  const wins = rows.filter((g) => g.runsFor > g.runsAgainst).length;
  const losses = rows.filter((g) => g.runsFor < g.runsAgainst).length;

  return (
    <div className="bg-stripe-pattern px-8 py-10">
      <div className="mx-auto max-w-6xl">
        <PageHeader
          title="Game-by-game results"
          subtitle="Representative schedule slice covering regular season and October. Filter toggles championship-series rows."
        />

        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span className="font-mono uppercase tracking-[0.14em] text-mono-xs text-muted">Phase</span>
          {(["All", "Regular", "Postseason"] as PhaseFilter[]).map((p) => (
            <Button
              key={p}
              type="button"
              variant={phase === p ? "primary" : "ghost"}
              onClick={() => setPhase(p)}
              className="min-w-[120px]"
            >
              {p}
            </Button>
          ))}
          <span className="ml-auto font-mono uppercase tracking-[0.12em] text-mono-sm text-muted">
            Sample log W–L {wins}–{losses}
          </span>
        </div>

        <div className="overflow-x-auto border border-border-light bg-card">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr className="border-b border-border-light bg-input">
                <th className="border-r border-border-light px-4 py-3 text-left font-mono font-normal uppercase tracking-[0.14em] text-mono-xs text-muted">
                  Date
                </th>
                <th className="border-r border-border-light px-4 py-3 text-left font-mono font-normal uppercase tracking-[0.14em] text-mono-xs text-muted">
                  Opp
                </th>
                <th className="border-r border-border-light px-4 py-3 text-left font-mono font-normal uppercase tracking-[0.14em] text-mono-xs text-muted">
                  Loc
                </th>
                <th className="border-r border-border-light px-4 py-3 text-left font-mono font-normal uppercase tracking-[0.14em] text-mono-xs text-muted">
                  Score
                </th>
                <th className="border-r border-border-light px-4 py-3 text-left font-mono font-normal uppercase tracking-[0.14em] text-mono-xs text-muted">
                  Result
                </th>
                <th className="px-4 py-3 text-left font-mono font-normal uppercase tracking-[0.14em] text-mono-xs text-muted">
                  Phase
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((g, i) => {
                const won = g.runsFor > g.runsAgainst;
                return (
                  <tr key={`${g.date}-${i}`} className="border-b border-border-light font-sans text-body">
                    <td className="border-r border-border-light px-4 py-2.5">{g.date}</td>
                    <td className="border-r border-border-light px-4 py-2.5">{g.opponent}</td>
                    <td className="border-r border-border-light px-4 py-2.5">{g.homeAway}</td>
                    <td className="border-r border-border-light px-4 py-2.5">
                      {g.runsFor}–{g.runsAgainst}
                    </td>
                    <td className="border-r border-border-light px-4 py-2.5">
                      <Badge variant={won ? "lime" : "danger"}>{won ? "W" : "L"}</Badge>
                    </td>
                    <td className="px-4 py-2.5">
                      <Badge variant={g.phase === "WS" ? "dark" : g.phase === "Regular" ? "neutral" : "lime"}>
                        {g.phase}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
