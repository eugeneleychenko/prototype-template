export type PatientStatus = "waiting" | "in_progress" | "completed";

export type InsuranceStatus = "verified" | "pending_verification" | "self_pay";

export type CheckInPatient = {
  id: string;
  name: string;
  dateOfBirth: string;
  insurance: string;
  insuranceStatus: InsuranceStatus;
  reasonForVisit: string;
  allergies: string;
  medications: string;
  arrivedAt: string;
  status: PatientStatus;
};

export type CheckInFormData = {
  name: string;
  dateOfBirth: string;
  insurance: string;
  reasonForVisit: string;
  allergies: string;
  medications: string;
};
