import type { QueuedPatient } from "../types";

const now = Date.now();
const min = 60 * 1000;

export const initialQueuePatients: QueuedPatient[] = [
  {
    id: "p-1001",
    firstName: "Margaret",
    lastName: "Chen",
    dateOfBirth: "1952-03-14",
    insuranceProvider: "BlueCross Northeast",
    memberId: "BCN-8849201",
    reasonForVisit: "Persistent cough and low-grade fever for 3 days",
    allergies: "Penicillin",
    medications: "Lisinopril 10mg daily",
    arrivalTime: now - 22 * min,
    insuranceStatus: "verified",
    status: "waiting",
  },
  {
    id: "p-1002",
    firstName: "James",
    lastName: "Ortiz",
    dateOfBirth: "1988-11-02",
    insuranceProvider: "Aetna Better Health",
    memberId: "ABH-7721044",
    reasonForVisit: "Sprained ankle — injury from weekend",
    allergies: "None reported",
    medications: "Ibuprofen as needed",
    arrivalTime: now - 15 * min,
    insuranceStatus: "pending_review",
    status: "in_progress",
  },
  {
    id: "p-1003",
    firstName: "Linda",
    lastName: "Washington",
    dateOfBirth: "1971-07-22",
    insuranceProvider: "Self-pay",
    memberId: "—",
    reasonForVisit: "Annual physical / school form",
    allergies: "Latex",
    medications: "Albuterol inhaler PRN",
    arrivalTime: now - 8 * min,
    insuranceStatus: "self_pay",
    status: "waiting",
  },
];
