import { useState } from "react";
import type { CheckInFormData } from "../types";
import { useClinic } from "../ClinicContext";

const initialForm: CheckInFormData = {
  name: "",
  dateOfBirth: "",
  insurance: "",
  reasonForVisit: "",
  allergies: "",
  medications: "",
};

const STEPS = [
  { id: 1, title: "Welcome", short: "Start" },
  { id: 2, title: "About you", short: "You" },
  { id: 3, title: "Insurance", short: "Coverage" },
  { id: 4, title: "Visit details", short: "Visit" },
  { id: 5, title: "Review", short: "Review" },
] as const;

export function PatientCheckInWizard() {
  const { addPatientFromCheckIn } = useClinic();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<CheckInFormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [method, setMethod] = useState<"qr" | "tablet" | null>(null);

  const update = <K extends keyof CheckInFormData>(
    key: K,
    value: CheckInFormData[K]
  ) => setForm((f) => ({ ...f, [key]: value }));

  const canGoNext = (): boolean => {
    switch (step) {
      case 1:
        return method !== null;
      case 2:
        return form.name.trim().length > 1 && form.dateOfBirth.length > 0;
      case 3:
        return form.insurance.trim().length > 2;
      case 4:
        return form.reasonForVisit.trim().length > 2;
      case 5:
        return true;
      default:
        return false;
    }
  };

  const handleSubmit = () => {
    addPatientFromCheckIn(form);
    setSubmitted(true);
  };

  const reset = () => {
    setForm(initialForm);
    setStep(1);
    setSubmitted(false);
    setMethod(null);
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg px-4 py-10">
        <div className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-slate-200">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl">
            ✓
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            You&apos;re checked in
          </h2>
          <p className="mt-3 text-xl text-slate-600">
            Thank you, <span className="font-semibold text-slate-800">{form.name}</span>.
            A member of our care team has your information and will call you when
            it&apos;s your turn.
          </p>
          <p className="mt-4 text-lg text-slate-500">
            Please have a seat in the waiting area. If you feel worse while waiting,
            tell the front desk right away.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-8 w-full min-h-[56px] rounded-xl bg-brand px-6 text-xl font-semibold text-white shadow-md transition-colors hover:bg-brand-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            Check in another patient (demo)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <div className="mb-6 flex items-center justify-between gap-2">
        {STEPS.map((s) => (
          <div
            key={s.id}
            className="flex flex-1 flex-col items-center"
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full text-base font-bold sm:h-12 sm:w-12 sm:text-lg ${
                step >= s.id
                  ? "bg-brand text-white"
                  : "bg-slate-200 text-slate-500"
              }`}
            >
              {s.id}
            </div>
            <span className="mt-1 hidden text-center text-xs text-slate-500 sm:block">
              {s.short}
            </span>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200 sm:p-8">
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Welcome to Acme Urgent Care
            </h2>
            <p className="mt-3 text-xl text-slate-600">
              This short form replaces our paper clipboard. Tap how you&apos;re
              checking in today.
            </p>
            <div className="mt-8 grid gap-4">
              <button
                type="button"
                onClick={() => setMethod("qr")}
                className={`flex min-h-[64px] items-center justify-center rounded-xl border-2 px-6 text-xl font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
                  method === "qr"
                    ? "border-brand bg-brand-muted text-brand"
                    : "border-slate-200 bg-slate-50 text-slate-800 hover:border-slate-300"
                }`}
              >
                I scanned the QR code on my phone
              </button>
              <button
                type="button"
                onClick={() => setMethod("tablet")}
                className={`flex min-h-[64px] items-center justify-center rounded-xl border-2 px-6 text-xl font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
                  method === "tablet"
                    ? "border-brand bg-brand-muted text-brand"
                    : "border-slate-200 bg-slate-50 text-slate-800 hover:border-slate-300"
                }`}
              >
                I&apos;m using the tablet at the front desk
              </button>
            </div>
            <p className="mt-6 text-lg text-slate-500">
              Need help? A staff member at the desk can assist you at any time.
            </p>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              About you
            </h2>
            <p className="mt-2 text-lg text-slate-600">
              Please use your legal name — it helps us match your records later.
            </p>
            <label className="mt-6 block">
              <span className="mb-2 block text-lg font-semibold text-slate-800">
                Full name
              </span>
              <input
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                autoComplete="name"
                className="w-full min-h-[52px] rounded-xl border-2 border-slate-200 px-4 text-xl text-slate-900 placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
                placeholder="e.g. Jane Smith"
              />
            </label>
            <label className="mt-5 block">
              <span className="mb-2 block text-lg font-semibold text-slate-800">
                Date of birth
              </span>
              <input
                type="date"
                value={form.dateOfBirth}
                onChange={(e) => update("dateOfBirth", e.target.value)}
                className="w-full min-h-[52px] rounded-xl border-2 border-slate-200 px-4 text-xl text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
              />
            </label>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Insurance
            </h2>
            <p className="mt-2 text-lg text-slate-600">
              Enter your primary insurance name and plan if you have it.
            </p>
            <label className="mt-6 block">
              <span className="mb-2 block text-lg font-semibold text-slate-800">
                Insurance / plan
              </span>
              <input
                value={form.insurance}
                onChange={(e) => update("insurance", e.target.value)}
                className="w-full min-h-[52px] rounded-xl border-2 border-slate-200 px-4 text-xl text-slate-900 placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
                placeholder="e.g. Humana Gold HMO"
              />
            </label>
            <p className="mt-4 rounded-xl bg-brand-muted p-4 text-lg text-slate-700">
              Paying without insurance? Type <strong>Self-pay</strong> above and
              staff will confirm options at the desk.
            </p>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Reason for visit & safety
            </h2>
            <p className="mt-2 text-lg text-slate-600">
              A few details help us prepare before we see you.
            </p>
            <label className="mt-6 block">
              <span className="mb-2 block text-lg font-semibold text-slate-800">
                Reason for visit
              </span>
              <textarea
                value={form.reasonForVisit}
                onChange={(e) => update("reasonForVisit", e.target.value)}
                rows={3}
                className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-xl text-slate-900 placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
                placeholder="e.g. Sore throat and trouble swallowing"
              />
            </label>
            <label className="mt-5 block">
              <span className="mb-2 block text-lg font-semibold text-slate-800">
                Allergies
              </span>
              <input
                value={form.allergies}
                onChange={(e) => update("allergies", e.target.value)}
                className="w-full min-h-[52px] rounded-xl border-2 border-slate-200 px-4 text-xl text-slate-900 placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
                placeholder="Medications, foods, or type 'None'"
              />
            </label>
            <label className="mt-5 block">
              <span className="mb-2 block text-lg font-semibold text-slate-800">
                Current medications
              </span>
              <input
                value={form.medications}
                onChange={(e) => update("medications", e.target.value)}
                className="w-full min-h-[52px] rounded-xl border-2 border-slate-200 px-4 text-xl text-slate-900 placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
                placeholder="List prescriptions or type 'None'"
              />
            </label>
          </div>
        )}

        {step === 5 && (
          <div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Review & submit
            </h2>
            <p className="mt-2 text-lg text-slate-600">
              Tap submit when everything looks correct. You can go back to change
              any step.
            </p>
            <dl className="mt-6 space-y-4 text-lg">
              <div className="rounded-xl bg-slate-50 p-4">
                <dt className="font-semibold text-slate-700">Name</dt>
                <dd className="text-slate-900">{form.name}</dd>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <dt className="font-semibold text-slate-700">Date of birth</dt>
                <dd className="text-slate-900">{form.dateOfBirth}</dd>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <dt className="font-semibold text-slate-700">Insurance</dt>
                <dd className="text-slate-900">{form.insurance}</dd>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <dt className="font-semibold text-slate-700">Reason for visit</dt>
                <dd className="text-slate-900">{form.reasonForVisit}</dd>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <dt className="font-semibold text-slate-700">Allergies</dt>
                <dd className="text-slate-900">
                  {form.allergies || "None reported"}
                </dd>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <dt className="font-semibold text-slate-700">Medications</dt>
                <dd className="text-slate-900">
                  {form.medications || "None reported"}
                </dd>
              </div>
            </dl>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row-reverse sm:justify-between">
          {step < 5 ? (
            <button
              type="button"
              disabled={!canGoNext()}
              onClick={() => setStep((s) => Math.min(5, s + 1))}
              className="min-h-[56px] flex-1 rounded-xl bg-brand px-6 text-xl font-semibold text-white shadow-md transition-colors hover:bg-brand-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
            >
              Continue
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="min-h-[56px] flex-1 rounded-xl bg-brand px-6 text-xl font-semibold text-white shadow-md transition-colors hover:bg-brand-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              Submit check-in
            </button>
          )}
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              className="min-h-[56px] rounded-xl border-2 border-slate-200 bg-white px-6 text-xl font-semibold text-slate-700 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 sm:flex-1"
            >
              Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
