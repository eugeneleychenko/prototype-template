import { useState } from "react";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { PageHeader } from "../components/PageHeader";
import { keyMoments } from "../data/yankees1996";

export function MomentsView() {
  const [expandedId, setExpandedId] = useState<string | null>(keyMoments[0]?.id ?? null);

  return (
    <div className="bg-stripe-pattern px-8 py-10">
      <div className="mx-auto max-w-6xl">
        <PageHeader
          title="Key moments"
          subtitle="Postseason narrative anchors — World Series games called out as headline tiles below."
        />

        <div className="grid gap-4 md:grid-cols-2">
          {keyMoments.map((m) => (
            <Card
              key={m.id}
              accent={!!m.highlightGame}
              className={m.highlightGame ? "border-yankees-navy bg-[#f4f7fb]" : ""}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <Badge variant={m.highlightGame ? "dark" : "neutral"}>{m.phase}</Badge>
                  <h2 className="mt-3 font-sans text-[16px] tracking-[-0.02em] text-ink">{m.title}</h2>
                </div>
                {m.highlightGame ? (
                  <span className="font-mono uppercase tracking-[0.12em] text-mono-sm text-yankees-navy">
                    Fall classic
                  </span>
                ) : null}
              </div>
              <p className="mt-4 font-sans text-body text-muted">{m.summary}</p>
              <Button
                type="button"
                variant="ghost"
                className="mt-4"
                onClick={() => setExpandedId((id) => (id === m.id ? null : m.id))}
              >
                {expandedId === m.id ? "Collapse detail" : "Toggle detail"}
              </Button>
              {expandedId === m.id ? (
                <p className="mt-3 border border-border-light bg-input px-3 py-2 font-mono uppercase tracking-[0.12em] text-mono-sm text-muted">
                  Expanded wireframe slot — broadcast clip metadata, pitch sequence notes, or crowd meter hooks go here.
                </p>
              ) : null}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
