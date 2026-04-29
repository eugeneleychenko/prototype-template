import { useCallback, useMemo, useState } from "react";
import { useQueue } from "../context/QueueContext";
import { formatWaitMinutes, minutesWaiting } from "../utils/format";
import type { PatientIntake } from "../types";

const STEPS = [
  "Welcome",
  "Your information",
  "Insurance",
  "Reason for visit",
  "Health details",
] as const;

type StepIndex = 0 | 1 | 2 | 3 | 4;

const emptyForm: PatientIntake = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  insuranceProvider: "",
  memberId: "",
  reasonForVisit: "",
  allergies: "",
  medications: "",
};

function PatientCheckInWizard() {
  const { addPatientFromIntake } = useQueue();
  const [step, setStep] = useState<StepIndex>(0);
  const [method, setMethod] = useState<"qr" | "tablet" | null>(null);
  const [form, setForm] = useState<PatientIntake>(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [showValidation, setShowValidation] = useState(false);

  const update = useCallback(<K extends keyof PatientIntake>(key: K, value: PatientIntake[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
  }, []);

  const canProceedStep1 = method !== null;
  const canProceedStep2 =
    form.firstName.trim().length > 0 &&
    form.lastName.trim().length > 0 &&
    form.dateOfBirth.length > 0;
  const canProceedStep3 =
    form.insuranceProvider.trim().length > 0 ||
    form.memberId.trim().length > 0;
  const canProceedStep4 = form.reasonForVisit.trim().length > 0;

  const stepValid = useMemo(() => {
    switch (step) {
      case 0:
        return canProceedStep1;
      case 1:
        return canProceedStep2;
      case 2:
        return canProceedStep3;
      case 3:
        return canProceedStep4;
      case 4:
        return true;
      default:
        return false;
    }
  }, [
    step,
    canProceedStep1,
    canProceedStep2,
    canProceedStep3,
    canProceedStep4,
  ]);

  const goNext = () => {
    if (!stepValid) {
      setShowValidation(true);
      return;
    }
    setShowValidation(false);
    if (step < 4) setStep((s) => (s + 1) as StepIndex);
  };

  const goBack = () => {
    setShowValidation(false);
    if (step > 0) setStep((s) => (s - 1) as StepIndex);
  };

  const handleSubmit = () => {
    addPatientFromIntake(form);
    setSubmitted(true);
  };

  const reset = () => {
    setStep(0);
    setMethod(null);
    setForm(emptyForm);
    setSubmitted(false);
    setShowValidation(false);
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-4 py-10">
        <div className="rounded-2xl bg-white border border-slate-200 shadow-lg shadow-slate-200/50 p-8 text-center">
          <div
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#2563EB]/10 text-[#2563EB]"
            aria-hidden
          >
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-slate-900">You&apos;re checked in</h2>
          <p className="mt-3 text-lg text-slate-600 leading-relaxed">
            Thank you, {form.firstName}. Please have a seat — a nurse will call you shortly.
          </p>
          <p className="mt-4 text-base text-slate-500">
            Your information was sent to the care team. Epic integration is planned for a later phase.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-8 w-full rounded-xl bg-[#2563EB] py-4 text-lg font-semibold text-white shadow-lg shadow-blue-500/30 hover:bg-blue-600 active:scale-[0.99] transition"
          >
            Another patient
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-6 sm:py-10">
      <div className="mb-6">
        <ol className="flex gap-1">
          {STEPS.map((label, i) => {
            const active = i === step;
            const done = i < step;
            return (
              <li key={label} className="flex-1 min-w-0">
                <div
                  className={`h-2 rounded-full ${
                    done ? "bg-[#2563EB]" : active ? "bg-[#2563EB]/40" : "bg-slate-200"
                  }`}
                  title={label}
                  aria-hidden
                />
                <span className="sr-only">
                  {label}
                  {done ? " completed" : active ? " current" : ""}
                </span>
              </li>
            );
          })}
        </ol>
        <p className="mt-2 text-center text-sm text-slate-500">
          Step {step + 1} of {STEPS.length}
        </p>
      </div>

      <div className="rounded-2xl bg-white border border-slate-200 shadow-xl shadow-slate-200/60 p-6 sm:p-8">
        {step === 0 && (
          <WelcomeStep method={method} onSelect={setMethod} />
        )}
        {step === 1 && (
          <IdentityStep
            form={form}
            onChange={update}
            showError={showValidation && !canProceedStep2}
          />
        )}
        {step === 2 && (
          <InsuranceStep
            form={form}
            onChange={update}
            showError={showValidation && !canProceedStep3}
          />
        )}
        {step === 3 && (
          <ReasonStep
            form={form}
            onChange={update}
            showError={showValidation && !canProceedStep4}
          />
        )}
        {step === 4 && (
          <HealthStep form={form} onChange={update} />
        )}

        {showValidation && !stepValid && (
          <p className="mt-4 text-base text-red-600" role="alert">
            Please complete the highlighted fields before continuing.
          </p>
        )}

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          <button
            type="button"
            onClick={goBack}
            disabled={step === 0}
            className="rounded-xl border-2 border-slate-200 bg-white py-4 text-lg font-semibold text-slate-700 disabled:opacity-40 hover:border-slate-300"
          >
            Back
          </button>
          {step < 4 ? (
            <button
              type="button"
              onClick={goNext}
              className="rounded-xl bg-[#2563EB] py-4 text-lg font-semibold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-600"
            >
              Continue
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="rounded-xl bg-[#2563EB] py-4 text-lg font-semibold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-600"
            >
              Submit check-in
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function WelcomeStep({
  method,
  onSelect,
}: {
  method: "qr" | "tablet" | null;
  onSelect: (m: "qr" | "tablet") => void;
}) {
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
        Welcome to Acme Urgent Care
      </h2>
      <p className="mt-4 text-lg text-slate-600 leading-relaxed">
        How are you checking in today?
      </p>
      <div className="mt-8 space-y-4">
        <button
          type="button"
          onClick={() => onSelect("qr")}
          className={`w-full rounded-2xl border-2 p-6 text-left transition ${
            method === "qr"
              ? "border-[#2563EB] bg-blue-50/80 ring-2 ring-[#2563EB]/30"
              : "border-slate-200 hover:border-[#2563EB]/50"
          }`}
        >
          <span className="text-xl font-semibold text-slate-900 block">
            I scanned the QR code
          </span>
          <span className="mt-2 block text-base text-slate-600">
            On my phone — no app required.
          </span>
        </button>
        <button
          type="button"
          onClick={() => onSelect("tablet")}
          className={`w-full rounded-2xl border-2 p-6 text-left transition ${
            method === "tablet"
              ? "border-[#2563EB] bg-blue-50/80 ring-2 ring-[#2563EB]/30"
              : "border-slate-200 hover:border-[#2563EB]/50"
          }`}
        >
          <span className="text-xl font-semibold text-slate-900 block">
            I&apos;m using the tablet at the front desk
          </span>
          <span className="mt-2 block text-base text-slate-600">
            Staff can help if you prefer not to use your own device.
          </span>
        </button>
      </div>
    </div>
  );
}

function fieldClass(invalid: boolean) {
  return `mt-2 w-full rounded-xl border-2 px-4 py-4 text-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-[#2563EB]/20 ${
    invalid ? "border-red-400" : "border-slate-200 focus:border-[#2563EB]"
  }`;
}

function IdentityStep({
  form,
  onChange,
  showError,
}: {
  form: PatientIntake;
  onChange: <K extends keyof PatientIntake>(key: K, value: PatientIntake[K]) => void;
  showError: boolean;
}) {
  const invName =
    showError &&
    (form.firstName.trim().length === 0 || form.lastName.trim().length === 0);
  const invDob = showError && form.dateOfBirth.length === 0;
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Your information</h2>
      <p className="mt-3 text-lg text-slate-600">Please use your legal name as it appears on your ID.</p>
      <label className="mt-6 block text-lg font-medium text-slate-800">
        First name
        <input
          className={fieldClass(invName && form.firstName.trim().length === 0)}
          value={form.firstName}
          onChange={(e) => onChange("firstName", e.target.value)}
          autoComplete="given-name"
          placeholder="e.g. Margaret"
        />
      </label>
      <label className="mt-4 block text-lg font-medium text-slate-800">
        Last name
        <input
          className={fieldClass(invName && form.lastName.trim().length === 0)}
          value={form.lastName}
          onChange={(e) => onChange("lastName", e.target.value)}
          autoComplete="family-name"
          placeholder="e.g. Chen"
        />
      </label>
      <label className="mt-4 block text-lg font-medium text-slate-800">
        Date of birth
        <input
          type="date"
          className={fieldClass(invDob)}
          value={form.dateOfBirth}
          onChange={(e) => onChange("dateOfBirth", e.target.value)}
        />
      </label>
    </div>
  );
}

function InsuranceStep({
  form,
  onChange,
  showError,
}: {
  form: PatientIntake;
  onChange: <K extends keyof PatientIntake>(key: K, value: PatientIntake[K]) => void;
  showError: boolean;
}) {
  const inv = showError && form.insuranceProvider.trim().length === 0 && form.memberId.trim().length === 0;
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Insurance</h2>
      <p className="mt-3 text-lg text-slate-600">
        Enter your plan name or choose self-pay at the front desk after check-in.
      </p>
      <label className="mt-6 block text-lg font-medium text-slate-800">
        Insurance provider
        <input
          className={fieldClass(inv)}
          value={form.insuranceProvider}
          onChange={(e) => onChange("insuranceProvider", e.target.value)}
          placeholder="e.g. BlueCross, Aetna, or Self-pay"
        />
      </label>
      <label className="mt-4 block text-lg font-medium text-slate-800">
        Member ID (if you have your card)
        <input
          className={fieldClass(false)}
          value={form.memberId}
          onChange={(e) => onChange("memberId", e.target.value)}
          placeholder="Optional — numbers on your card"
          autoComplete="off"
        />
      </label>
    </div>
  );
}

function ReasonStep({
  form,
  onChange,
  showError,
}: {
  form: PatientIntake;
  onChange: <K extends keyof PatientIntake>(key: K, value: PatientIntake[K]) => void;
  showError: boolean;
}) {
  const inv = showError && form.reasonForVisit.trim().length === 0;
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Reason for visit</h2>
      <p className="mt-3 text-lg text-slate-600">
        A few words are enough — our team will review with you in person.
      </p>
      <label className="mt-6 block text-lg font-medium text-slate-800">
        What brings you in today?
        <textarea
          className={`${fieldClass(inv)} min-h-[140px] resize-y`}
          value={form.reasonForVisit}
          onChange={(e) => onChange("reasonForVisit", e.target.value)}
          placeholder="e.g. sore throat and fever since yesterday"
        />
      </label>
    </div>
  );
}

function HealthStep({
  form,
  onChange,
}: {
  form: PatientIntake;
  onChange: <K extends keyof PatientIntake>(key: K, value: PatientIntake[K]) => void;
}) {
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Allergies &amp; medications</h2>
      <p className="mt-3 text-lg text-slate-600">
        If you&apos;re not sure, you can write &quot;unsure&quot; or leave blank and tell the nurse.
      </p>
      <label className="mt-6 block text-lg font-medium text-slate-800">
        Allergies
        <textarea
          className={`${fieldClass(false)} min-h-[100px]`}
          value={form.allergies}
          onChange={(e) => onChange("allergies", e.target.value)}
          placeholder="e.g. Penicillin, or None"
        />
      </label>
      <label className="mt-4 block text-lg font-medium text-slate-800">
        Current medications
        <textarea
          className={`${fieldClass(false)} min-h-[100px]`}
          value={form.medications}
          onChange={(e) => onChange("medications", e.target.value)}
          placeholder="e.g. Lisinopril daily"
        />
      </label>
    </div>
  );
}

export { PatientCheckInWizard };
