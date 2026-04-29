import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CheckInFormData, CheckInPatient, PatientStatus } from "./types";
import { INITIAL_QUEUE } from "./mockData";

type ClinicContextValue = {
  patients: CheckInPatient[];
  submissionsThisSession: number;
  addPatientFromCheckIn: (data: CheckInFormData) => void;
  setPatientStatus: (id: string, status: PatientStatus) => void;
};

const ClinicContext = createContext<ClinicContextValue | null>(null);

function makeId(): string {
  return `p-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function ClinicProvider({ children }: { children: ReactNode }) {
  const [patients, setPatients] = useState<CheckInPatient[]>(INITIAL_QUEUE);
  const [submissionsThisSession, setSubmissionsThisSession] = useState(0);

  const addPatientFromCheckIn = useCallback((data: CheckInFormData) => {
    const now = new Date().toISOString();
    const next: CheckInPatient = {
      id: makeId(),
      name: data.name.trim(),
      dateOfBirth: data.dateOfBirth,
      insurance: data.insurance.trim(),
      insuranceStatus: "pending_verification",
      reasonForVisit: data.reasonForVisit.trim(),
      allergies: data.allergies.trim() || "None reported",
      medications: data.medications.trim() || "None reported",
      arrivedAt: now,
      status: "waiting",
    };
    setPatients((prev) => [next, ...prev]);
    setSubmissionsThisSession((n) => n + 1);
  }, []);

  const setPatientStatus = useCallback((id: string, status: PatientStatus) => {
    setPatients((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status } : p))
    );
  }, []);

  const value = useMemo(
    () => ({
      patients,
      submissionsThisSession,
      addPatientFromCheckIn,
      setPatientStatus,
    }),
    [patients, submissionsThisSession, addPatientFromCheckIn, setPatientStatus]
  );

  return (
    <ClinicContext.Provider value={value}>{children}</ClinicContext.Provider>
  );
}

export function useClinic(): ClinicContextValue {
  const ctx = useContext(ClinicContext);
  if (!ctx) {
    throw new Error("useClinic must be used within ClinicProvider");
  }
  return ctx;
}
