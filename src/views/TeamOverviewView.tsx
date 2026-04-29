import { Card } from "../components/Card";
import { Badge } from "../components/Badge";
import { StatusDot } from "../components/StatusDot";
import { comparisonTeams, postseasonRecord, team1996 } from "../data/yankees1996";

export function TeamOverviewView() {
  const pct = team1996.wins / (team1996.wins + team1996.losses);

  return (
    <div className="bg-stripe-pattern px-8 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 border-b border-border-light pb-6">
          <p className="font-mono uppercase tracking-[0.14em] text-mono-xs text-muted">Championship year</p>
          <h1 className="mt-2 font-sans text-page text-ink">1996 New York Yankees</h1>
          <p className="mt-2 max-w-2xl font-sans text-body text-muted">
            Team snapshot: record, run differential tone, pitching ERA, plus a compact read on the playoff path.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card accent>
            <p className="font-mono uppercase tracking-[0.14em] text-mono-xs text-muted">Overall record</p>
            <p className="mt-3 font-sans text-[28px] tracking-[-0.03em] text-ink">
              {team1996.wins}–{team1996.losses}
            </p>
            <p className="mt-2 font-mono uppercase tracking-[0.12em] text-mono-sm text-muted">
              Pct {pct.toFixed(3).replace(/^0/, "")}
            </p>
          </Card>
          <Card>
            <p className="font-mono uppercase tracking-[0.14em] text-mono-xs text-muted">Runs scored</p>
            <p className="mt-3 font-sans text-[28px] tracking-[-0.03em] text-ink">{team1996.runsScored}</p>
            <p className="mt-2 font-mono uppercase tracking-[0.12em] text-mono-sm text-muted">
              Allowed {team1996.runsAllowed}
            </p>
          </Card>
          <Card>
            <p className="font-mono uppercase tracking-[0.14em] text-mono-xs text-muted">Team ERA</p>
            <p className="mt-3 font-sans text-[28px] tracking-[-0.03em] text-ink">{team1996.era.toFixed(2)}</p>
            <p className="mt-2 flex items-center gap-2 font-mono uppercase tracking-[0.12em] text-mono-sm text-muted">
              <StatusDot /> Staff aggregate
            </p>
          </Card>
          <Card>
            <p className="font-mono uppercase tracking-[0.14em] text-mono-xs text-muted">Postseason</p>
            <p className="mt-3 font-sans text-[28px] tracking-[-0.03em] text-ink">
              {postseasonRecord.wins}–{postseasonRecord.losses}
            </p>
            <p className="mt-2 font-sans text-body text-muted">{team1996.postseasonSummary}</p>
          </Card>
        </div>

        <section className="mt-10">
          <h2 className="font-mono uppercase tracking-[0.14em] text-mono-xs text-muted">Vs 1995 & 1998</h2>
          <p className="mt-2 font-sans text-body text-muted">
            Lightweight season-to-season comparison — same metrics, three pennant-era clubs.
          </p>
          <div className="mt-4 overflow-x-auto border border-border-light bg-card">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-border-light bg-input">
                  <th className="border-r border-border-light px-4 py-3 font-mono font-normal uppercase tracking-[0.14em] text-mono-xs text-muted">
                    Season
                  </th>
                  <th className="border-r border-border-light px-4 py-3 font-mono font-normal uppercase tracking-[0.14em] text-mono-xs text-muted">
                    W–L
                  </th>
                  <th className="border-r border-border-light px-4 py-3 font-mono font-normal uppercase tracking-[0.14em] text-mono-xs text-muted">
                    RS
                  </th>
                  <th className="border-r border-border-light px-4 py-3 font-mono font-normal uppercase tracking-[0.14em] text-mono-xs text-muted">
                    RA
                  </th>
                  <th className="border-r border-border-light px-4 py-3 font-mono font-normal uppercase tracking-[0.14em] text-mono-xs text-muted">
                    ERA
                  </th>
                  <th className="px-4 py-3 font-mono font-normal uppercase tracking-[0.14em] text-mono-xs text-muted">
                    Note
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonTeams.map((row) => (
                  <tr
                    key={row.year}
                    className={`border-b border-border-light font-sans text-body ${row.year === 1996 ? "bg-pale-accent" : ""}`}
                  >
                    <td className="border-r border-border-light px-4 py-3 text-ink">
                      {row.year}
                      {row.year === 1996 ? (
                        <Badge variant="lime" className="ml-2">
                          Focus
                        </Badge>
                      ) : null}
                    </td>
                    <td className="border-r border-border-light px-4 py-3">
                      {row.wins}–{row.losses}
                    </td>
                    <td className="border-r border-border-light px-4 py-3">{row.runsScored}</td>
                    <td className="border-r border-border-light px-4 py-3">{row.runsAllowed}</td>
                    <td className="border-r border-border-light px-4 py-3">{row.era.toFixed(2)}</td>
                    <td className="px-4 py-3 text-muted">{row.postseasonSummary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
