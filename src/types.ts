export type InsuranceStatus = "verified" | "pending_review" | "self_pay";

export type PatientQueueStatus = "waiting" | "in_progress" | "completed";

export interface PatientIntake {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  insuranceProvider: string;
  memberId: string;
  reasonForVisit: string;
  allergies: string;
  medications: string;
}

export interface QueuedPatient extends PatientIntake {
  id: string;
  arrivalTime: number;
  insuranceStatus: InsuranceStatus;
  status: PatientQueueStatus;
}

export type AppView = "checkin" | "dashboard" | "analytics";
