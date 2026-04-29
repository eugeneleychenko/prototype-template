interface StatusDotProps {
  tone?: "lime" | "muted" | "danger";
}

/** Only UI element allowed border-radius 50% per design system */
export function StatusDot({ tone = "lime" }: StatusDotProps) {
  const bg =
    tone === "lime" ? "bg-lime" : tone === "danger" ? "bg-danger" : "bg-muted";
  return <span className={`inline-block h-2 w-2 shrink-0 rounded-full ${bg}`} aria-hidden />;
}
