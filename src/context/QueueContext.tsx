import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { initialQueuePatients } from "../data/mockQueue";
import type { PatientIntake, PatientQueueStatus, QueuedPatient } from "../types";

function inferInsuranceStatus(intake: PatientIntake): QueuedPatient["insuranceStatus"] {
  const p = intake.insuranceProvider.trim().toLowerCase();
  if (p === "self-pay" || p === "self pay" || p === "") return "self_pay";
  if (intake.memberId.trim().length < 4) return "pending_review";
  return "verified";
}

interface QueueContextValue {
  patients: QueuedPatient[];
  addPatientFromIntake: (intake: PatientIntake) => void;
  setPatientStatus: (id: string, status: PatientQueueStatus) => void;
  totalCheckInsToday: number;
  baselineCheckInsToday: number;
}

const QueueContext = createContext<QueueContextValue | null>(null);

const BASELINE_CHECK_INS_TODAY = 47;

export function QueueProvider({ children }: { children: ReactNode }) {
  const [patients, setPatients] = useState<QueuedPatient[]>(() => [
    ...initialQueuePatients,
  ]);
  const [sessionAdds, setSessionAdds] = useState(0);

  const addPatientFromIntake = useCallback((intake: PatientIntake) => {
    const id = `p-${Date.now()}`;
    const next: QueuedPatient = {
      ...intake,
      id,
      arrivalTime: Date.now(),
      insuranceStatus: inferInsuranceStatus(intake),
      status: "waiting",
    };
    setPatients((prev) => [...prev, next]);
    setSessionAdds((n) => n + 1);
  }, []);

  const setPatientStatus = useCallback((id: string, status: PatientQueueStatus) => {
    setPatients((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status } : p)),
    );
  }, []);

  const value = useMemo<QueueContextValue>(
    () => ({
      patients,
      addPatientFromIntake,
      setPatientStatus,
      totalCheckInsToday: BASELINE_CHECK_INS_TODAY + sessionAdds,
      baselineCheckInsToday: BASELINE_CHECK_INS_TODAY,
    }),
    [patients, addPatientFromIntake, setPatientStatus, sessionAdds],
  );

  return <QueueContext.Provider value={value}>{children}</QueueContext.Provider>;
}

export function useQueue() {
  const ctx = useContext(QueueContext);
  if (!ctx) throw new Error("useQueue must be used within QueueProvider");
  return ctx;
}
