export function formatArrivalTime(ts: number): string {
  return new Date(ts).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function minutesWaiting(arrivalTime: number, now = Date.now()): number {
  return Math.max(0, Math.round((now - arrivalTime) / 60000));
}

export function formatWaitMinutes(mins: number): string {
  if (mins < 1) return "<1 min";
  if (mins === 1) return "1 min";
  return `${mins} min`;
}
