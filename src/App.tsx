import { useState } from "react";
import { QueueProvider } from "./context/QueueContext";
import { AppHeader } from "./components/AppHeader";
import { PatientCheckInWizard } from "./components/PatientCheckInWizard";
import { NurseDashboard } from "./components/NurseDashboard";
import { AnalyticsPage } from "./components/AnalyticsPage";
import type { AppView } from "./types";

function AppShell() {
  const [view, setView] = useState<AppView>("checkin");

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/30 text-slate-900">
      <AppHeader current={view} onNavigate={setView} />
      <main>
        {view === "checkin" && <PatientCheckInWizard />}
        {view === "dashboard" && <NurseDashboard />}
        {view === "analytics" && <AnalyticsPage />}
      </main>
      <footer className="border-t border-slate-200/80 bg-white/80 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-slate-500">
          Acme Healthcare Solutions · Prototype for VP Operations (Sarah) · Not for clinical use
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <QueueProvider>
      <AppShell />
    </QueueProvider>
  );
}
