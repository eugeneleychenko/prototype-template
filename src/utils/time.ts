export function formatWaitMinutes(arrivedAtIso: string): string {
  const arrived = new Date(arrivedAtIso).getTime();
  const mins = Math.max(0, Math.floor((Date.now() - arrived) / 60000));
  if (mins < 1) return "< 1 min";
  if (mins === 1) return "1 min";
  return `${mins} min`;
}

export function formatClockTime(iso: string): string {
  return new Date(iso).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function formatShortDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function averageMinutes(waitTimes: number[]): number {
  if (waitTimes.length === 0) return 0;
  return Math.round(waitTimes.reduce((a, b) => a + b, 0) / waitTimes.length);
}
