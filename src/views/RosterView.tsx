import { useMemo, useState, type FormEvent } from "react";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Modal } from "../components/Modal";
import { PageHeader } from "../components/PageHeader";
import type { PlayerDetail, Position } from "../data/yankees1996";
import { players } from "../data/yankees1996";

type SortKey =
  | "name"
  | "position"
  | "games"
  | "battingAvg"
  | "hr"
  | "rbi"
  | "wins"
  | "strikeouts"
  | "era";

const POSITION_OPTIONS: (Position | "All")[] = [
  "All",
  "P",
  "C",
  "1B",
  "2B",
  "3B",
  "SS",
  "LF",
  "CF",
  "RF",
  "DH",
];

function formatAvg(v: number | null): string {
  if (v === null) return "—";
  return v.toFixed(3).replace(/^0/, "");
}

function formatNum(v: number | null): string {
  if (v === null) return "—";
  return String(v);
}

function formatEra(v: number | null): string {
  if (v === null) return "—";
  return v.toFixed(2);
}

function compareNullable(a: number | null, b: number | null): number {
  if (a === null && b === null) return 0;
  if (a === null) return 1;
  if (b === null) return -1;
  return a - b;
}

export function RosterView() {
  const [positionFilter, setPositionFilter] = useState<Position | "All">("All");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [detail, setDetail] = useState<PlayerDetail | null>(null);
  const [formFeedback, setFormFeedback] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return players.filter((p) => positionFilter === "All" || p.position === positionFilter);
  }, [positionFilter]);

  const sorted = useMemo(() => {
    const dir = sortDir === "asc" ? 1 : -1;
    const list = [...filtered];
    list.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "name":
          cmp = a.name.localeCompare(b.name);
          break;
        case "position":
          cmp = a.position.localeCompare(b.position);
          break;
        case "games":
          cmp = a.appearancesOrGames - b.appearancesOrGames;
          break;
        case "battingAvg":
          cmp = compareNullable(a.battingAvg, b.battingAvg);
          break;
        case "hr":
          cmp = compareNullable(a.hr, b.hr);
          break;
        case "rbi":
          cmp = compareNullable(a.rbi, b.rbi);
          break;
        case "wins":
          cmp = compareNullable(a.wins, b.wins);
          break;
        case "strikeouts":
          cmp = compareNullable(a.strikeouts, b.strikeouts);
          break;
        case "era":
          cmp = compareNullable(a.era, b.era);
          break;
        default:
          cmp = 0;
      }
      return cmp * dir;
    });
    return list;
  }, [filtered, sortKey, sortDir]);

  const leaders = useMemo(() => {
    const batters = players.filter((p) => p.battingAvg !== null);
    const pitchers = players.filter((p) => p.wins !== null);
    const byBa = [...batters].sort((a, b) => (b.battingAvg ?? 0) - (a.battingAvg ?? 0))[0];
    const byHr = [...batters].sort((a, b) => (b.hr ?? 0) - (a.hr ?? 0))[0];
    const byRbi = [...batters].sort((a, b) => (b.rbi ?? 0) - (a.rbi ?? 0))[0];
    const byW = [...pitchers].sort((a, b) => (b.wins ?? 0) - (a.wins ?? 0))[0];
    const bySo = [...pitchers].sort((a, b) => (b.strikeouts ?? 0) - (a.strikeouts ?? 0))[0];
    return { byBa, byHr, byRbi, byW, bySo };
  }, []);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "name" || key === "position" ? "asc" : "desc");
    }
  }

  function headerLabel(key: SortKey, label: string) {
    const active = sortKey === key;
    return (
      <button
        type="button"
        onClick={() => toggleSort(key)}
        className={`w-full text-left font-mono uppercase tracking-[0.14em] text-mono-xs hover:text-ink ${active ? "text-ink" : "text-muted"}`}
      >
        {label}
        {active ? (sortDir === "asc" ? " ↑" : " ↓") : ""}
      </button>
    );
  }

  function handleWatchlistSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormFeedback("Saved to demo queue — no backend in prototype.");
    window.setTimeout(() => setFormFeedback(null), 3200);
  }

  return (
    <div className="bg-stripe-pattern px-8 py-10">
      <div className="mx-auto max-w-6xl">
        <PageHeader
          title="Leaders & roster"
          subtitle="Sortable stat grid with position filter and baseball-card detail modal. Stats shown match the agreed list: BA, HR, RBI, wins (W), strikeouts (SO), plus ERA where pitching applies."
        />

        <section className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <Card accent className="relative overflow-hidden">
            <p className="font-mono uppercase tracking-[0.14em] text-mono-xs text-muted">Batting avg</p>
            <p className="mt-2 font-sans text-body text-ink">{leaders.byBa?.name}</p>
            <p className="mt-1 font-mono uppercase tracking-[0.12em] text-mono-sm text-muted">
              {formatAvg(leaders.byBa?.battingAvg ?? null)}
            </p>
          </Card>
          <Card accent>
            <p className="font-mono uppercase tracking-[0.14em] text-mono-xs text-muted">Home runs</p>
            <p className="mt-2 font-sans text-body text-ink">{leaders.byHr?.name}</p>
            <p className="mt-1 font-mono uppercase tracking-[0.12em] text-mono-sm text-muted">
              {formatNum(leaders.byHr?.hr ?? null)}
            </p>
          </Card>
          <Card accent>
            <p className="font-mono uppercase tracking-[0.14em] text-mono-xs text-muted">RBIs</p>
            <p className="mt-2 font-sans text-body text-ink">{leaders.byRbi?.name}</p>
            <p className="mt-1 font-mono uppercase tracking-[0.12em] text-mono-sm text-muted">
              {formatNum(leaders.byRbi?.rbi ?? null)}
            </p>
          </Card>
          <Card accent>
            <p className="font-mono uppercase tracking-[0.14em] text-mono-xs text-muted">Wins (pitching)</p>
            <p className="mt-2 font-sans text-body text-ink">{leaders.byW?.name}</p>
            <p className="mt-1 font-mono uppercase tracking-[0.12em] text-mono-sm text-muted">
              {formatNum(leaders.byW?.wins ?? null)}
            </p>
          </Card>
          <Card accent>
            <p className="font-mono uppercase tracking-[0.14em] text-mono-xs text-muted">Strikeouts</p>
            <p className="mt-2 font-sans text-body text-ink">{leaders.bySo?.name}</p>
            <p className="mt-1 font-mono uppercase tracking-[0.12em] text-mono-sm text-muted">
              {formatNum(leaders.bySo?.strikeouts ?? null)}
            </p>
          </Card>
        </section>

        <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border border-border-light bg-card p-4">
          <div>
            <label htmlFor="pos" className="block font-mono uppercase tracking-[0.14em] text-mono-xs text-muted">
              Filter by position
            </label>
            <select
              id="pos"
              value={positionFilter}
              onChange={(e) => setPositionFilter(e.target.value as Position | "All")}
              className="mt-2 min-w-[180px] border border-border-light bg-input px-3 py-2 font-sans text-body text-ink outline-none focus:border-[#999]"
            >
              {POSITION_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt === "All" ? "All positions" : opt}
                </option>
              ))}
            </select>
          </div>
          <p className="font-sans text-body text-muted">
            Showing {sorted.length} player{sorted.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="overflow-x-auto border border-border-light bg-card">
          <table className="w-full min-w-[900px] border-collapse">
            <thead>
              <tr className="border-b border-border-light bg-input">
                <th className="border-r border-border-light px-4 py-3">{headerLabel("name", "Player")}</th>
                <th className="border-r border-border-light px-4 py-3">{headerLabel("position", "Pos")}</th>
                <th className="border-r border-border-light px-4 py-3">{headerLabel("games", "G")}</th>
                <th className="border-r border-border-light px-4 py-3">{headerLabel("battingAvg", "BA")}</th>
                <th className="border-r border-border-light px-4 py-3">{headerLabel("hr", "HR")}</th>
                <th className="border-r border-border-light px-4 py-3">{headerLabel("rbi", "RBI")}</th>
                <th className="border-r border-border-light px-4 py-3">{headerLabel("wins", "W")}</th>
                <th className="border-r border-border-light px-4 py-3">{headerLabel("strikeouts", "SO")}</th>
                <th className="px-4 py-3">{headerLabel("era", "ERA")}</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((p) => (
                <tr
                  key={p.id}
                  className="cursor-pointer border-b border-border-light font-sans text-body hover:bg-pale-accent"
                  onClick={() => setDetail(p)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setDetail(p);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <td className="border-r border-border-light px-4 py-2.5 text-ink">{p.name}</td>
                  <td className="border-r border-border-light px-4 py-2.5">
                    <Badge variant="neutral">{p.position}</Badge>
                  </td>
                  <td className="border-r border-border-light px-4 py-2.5">{p.appearancesOrGames}</td>
                  <td className="border-r border-border-light px-4 py-2.5">{formatAvg(p.battingAvg)}</td>
                  <td className="border-r border-border-light px-4 py-2.5">{formatNum(p.hr)}</td>
                  <td className="border-r border-border-light px-4 py-2.5">{formatNum(p.rbi)}</td>
                  <td className="border-r border-border-light px-4 py-2.5">{formatNum(p.wins)}</td>
                  <td className="border-r border-border-light px-4 py-2.5">{formatNum(p.strikeouts)}</td>
                  <td className="px-4 py-2.5">{formatEra(p.era)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <section className="mt-10 border border-border-light bg-pale-accent p-6">
          <div className="border-b border-border-light pb-4">
            <p className="font-mono uppercase tracking-[0.14em] text-mono-xs text-muted">Wireframe placeholder</p>
            <h3 className="mt-2 font-sans text-page text-ink">Reserved stat catalog</h3>
            <p className="mt-2 font-sans text-body text-muted">
              Reserved block for the full stat catalog once columns are finalized.
            </p>
          </div>
          <ul className="mt-4 list-inside list-disc font-sans text-body text-muted">
            <li>Additional counting stats (R, SB, IP, SV, etc.) slot here without changing shell navigation.</li>
            <li>Export / print controls can anchor next to this panel in a later iteration.</li>
          </ul>
          <form className="mt-6 flex flex-wrap items-end gap-4 border-t border-border-light pt-6" onSubmit={handleWatchlistSubmit}>
            <div className="min-w-[200px] flex-1">
              <label htmlFor="note" className="block font-mono uppercase tracking-[0.14em] text-mono-xs text-muted">
                Demo note
              </label>
              <input
                id="note"
                name="note"
                placeholder="Tag a player storyline"
                className="mt-2 w-full border border-border-light bg-input px-3 py-2 font-sans text-body outline-none focus:border-[#999]"
              />
            </div>
            <Button type="submit" variant="dark">
              Queue highlight
            </Button>
          </form>
          {formFeedback ? (
            <p className="mt-4 font-mono uppercase tracking-[0.12em] text-mono-sm text-ink" role="status">
              {formFeedback}
            </p>
          ) : null}
        </section>

        {detail ? (
          <Modal title={detail.name} subtitle={`#${detail.jerseyNumber} · ${detail.position}`} onClose={() => setDetail(null)}>
            <div className="grid gap-6 md:grid-cols-[minmax(0,200px)_1fr]">
              <div className="border border-border-light bg-input">
                <img
                  src={detail.photoUrl}
                  alt=""
                  className="aspect-[3/4] w-full object-cover object-top"
                />
              </div>
              <div>
                <p className="font-mono uppercase tracking-[0.14em] text-mono-xs text-muted">Full 1996 line</p>
                <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 border border-border-light bg-card p-4 font-sans text-body">
                  <div className="flex justify-between border-b border-border-light pb-2">
                    <dt className="font-mono uppercase tracking-[0.14em] text-mono-xs text-muted">G</dt>
                    <dd>{detail.appearancesOrGames}</dd>
                  </div>
                  <div className="flex justify-between border-b border-border-light pb-2">
                    <dt className="font-mono uppercase tracking-[0.14em] text-mono-xs text-muted">BA</dt>
                    <dd>{formatAvg(detail.battingAvg)}</dd>
                  </div>
                  <div className="flex justify-between border-b border-border-light pb-2">
                    <dt className="font-mono uppercase tracking-[0.14em] text-mono-xs text-muted">HR</dt>
                    <dd>{formatNum(detail.hr)}</dd>
                  </div>
                  <div className="flex justify-between border-b border-border-light pb-2">
                    <dt className="font-mono uppercase tracking-[0.14em] text-mono-xs text-muted">RBI</dt>
                    <dd>{formatNum(detail.rbi)}</dd>
                  </div>
                  <div className="flex justify-between border-b border-border-light pb-2">
                    <dt className="font-mono uppercase tracking-[0.14em] text-mono-xs text-muted">W</dt>
                    <dd>{formatNum(detail.wins)}</dd>
                  </div>
                  <div className="flex justify-between border-b border-border-light pb-2">
                    <dt className="font-mono uppercase tracking-[0.14em] text-mono-xs text-muted">SO</dt>
                    <dd>{formatNum(detail.strikeouts)}</dd>
                  </div>
                  <div className="flex justify-between border-b border-border-light pb-2">
                    <dt className="font-mono uppercase tracking-[0.14em] text-mono-xs text-muted">ERA</dt>
                    <dd>{formatEra(detail.era)}</dd>
                  </div>
                  <div className="flex justify-between pb-2">
                    <dt className="font-mono uppercase tracking-[0.14em] text-mono-xs text-muted">IP</dt>
                    <dd>{detail.inningsPitched != null ? detail.inningsPitched.toFixed(1) : "—"}</dd>
                  </div>
                </dl>

                <p className="mt-6 font-mono uppercase tracking-[0.14em] text-mono-xs text-muted">Highlights</p>
                <ul className="mt-2 list-inside list-disc font-sans text-body text-ink">
                  {detail.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>

                <p className="mt-6 font-mono uppercase tracking-[0.14em] text-mono-xs text-muted">Bio</p>
                <p className="mt-2 font-sans text-body text-ink">{detail.bio}</p>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
}
