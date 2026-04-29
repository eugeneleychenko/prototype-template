import type { CheckInPatient } from "./types";

function isoMinutesAgo(minutes: number): string {
  return new Date(Date.now() - minutes * 60 * 1000).toISOString();
}

/** Shifts arrival to today at a given hour/minute for consistent "today" analytics in demos */
function todayAt(hour: number, minute: number, subtractMinutes = 0): string {
  const d = new Date();
  d.setHours(hour, minute, 0, 0);
  return new Date(d.getTime() - subtractMinutes * 60 * 1000).toISOString();
}

export const INITIAL_QUEUE: CheckInPatient[] = [
  {
    id: "p-demo-1",
    name: "Margaret Chen",
    dateOfBirth: "1952-03-14",
    insurance: "BlueCross BlueShield — PPO",
    insuranceStatus: "verified",
    reasonForVisit: "Persistent cough and low-grade fever",
    allergies: "Penicillin",
    medications: "Lisinopril 10mg daily",
    arrivedAt: isoMinutesAgo(22),
    status: "waiting",
  },
  {
    id: "p-demo-2",
    name: "James O'Brien",
    dateOfBirth: "1988-07-02",
    insurance: "Aetna — HMO",
    insuranceStatus: "pending_verification",
    reasonForVisit: "Ankle injury after fall on ice",
    allergies: "None reported",
    medications: "Ibuprofen as needed",
    arrivedAt: isoMinutesAgo(14),
    status: "in_progress",
  },
  {
    id: "p-demo-3",
    name: "Aisha Williams",
    dateOfBirth: "1996-11-30",
    insurance: "UnitedHealthcare",
    insuranceStatus: "verified",
    reasonForVisit: "Annual physical / wellness visit",
    allergies: "Shellfish",
    medications: "Vitamin D",
    arrivedAt: isoMinutesAgo(8),
    status: "waiting",
  },
  {
    id: "p-demo-4",
    name: "Robert DiMarco",
    dateOfBirth: "1971-05-19",
    insurance: "Medicare Part B",
    insuranceStatus: "verified",
    reasonForVisit: "Suture removal — follow-up",
    allergies: "Latex",
    medications: "Metformin 500mg twice daily",
    arrivedAt: isoMinutesAgo(5),
    status: "waiting",
  },
];

/** Patients already completed earlier today — used for analytics averages */
export const COMPLETED_TODAY_MOCK: { arrivedAt: string; completedAt: string }[] = [
  { arrivedAt: todayAt(8, 12), completedAt: todayAt(8, 38) },
  { arrivedAt: todayAt(9, 5), completedAt: todayAt(9, 41) },
  { arrivedAt: todayAt(10, 20), completedAt: todayAt(10, 48) },
  { arrivedAt: todayAt(11, 2), completedAt: todayAt(11, 35) },
];
