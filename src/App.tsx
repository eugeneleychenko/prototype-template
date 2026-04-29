import { useState } from "react";
import { ClinicProvider } from "./ClinicContext";
import { AppNav, type AppView } from "./components/AppNav";
import { PatientCheckInWizard } from "./components/PatientCheckInWizard";
import { NurseDashboard } from "./components/NurseDashboard";
import { AnalyticsView } from "./components/AnalyticsView";

function AppContent() {
  const [view, setView] = useState<AppView>("checkin");

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-brand-muted/40">
      <AppNav current={view} onNavigate={setView} />
      <main>
        {view === "checkin" && <PatientCheckInWizard />}
        {view === "staff" && <NurseDashboard />}
        {view === "analytics" && <AnalyticsView />}
      </main>
      <footer className="mx-auto max-w-5xl px-4 py-8 text-center text-base text-slate-500">
        <p>
          Demo prototype for Acme Healthcare Solutions — 15 urgent care clinics,
          Northeast. Digital check-in + staff queue. Epic integration planned.
        </p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ClinicProvider>
      <AppContent />
    </ClinicProvider>
  );
}
