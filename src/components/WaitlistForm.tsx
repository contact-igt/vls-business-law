"use client";

import { FormEvent, useState } from "react";
import { submitWaitlistLead } from "@/lib/submitWaitlist";

type Errors = Partial<Record<"fullName" | "email" | "mobile", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOBILE_RE = /^[0-9]{10}$/;

export function WaitlistForm({
  formId,
  submitLabel = "Join Waitlist",
  successHeading = "You're on the list.",
  successBody = "We'll notify you the moment the next registration window opens.",
}: {
  formId: string;
  submitLabel?: string;
  successHeading?: string;
  successBody?: string;
}) {
  const [errors, setErrors] = useState<Errors>({});
  const [submitError, setSubmitError] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");

  function validate(data: FormData): Errors {
    const next: Errors = {};
    const fullName = String(data.get("fullName") || "").trim();
    const email = String(data.get("email") || "").trim();
    const mobile = String(data.get("mobile") || "").trim();

    if (fullName.length < 2) next.fullName = "Enter your full name.";
    if (!EMAIL_RE.test(email)) next.email = "Enter a valid email address.";
    if (!MOBILE_RE.test(mobile)) next.mobile = "Enter a 10-digit mobile number.";

    return next;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const validationErrors = validate(data);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");
    setSubmitError("");
    try {
      await submitWaitlistLead({
        fullName: String(data.get("fullName")),
        email: String(data.get("email")),
        mobile: String(data.get("mobile")),
      });
      setStatus("done");
      form.reset();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Unable to submit. Please try again.");
      setStatus("idle");
    }
  }

  if (status === "done") {
    return (
      <div role="status" className="border border-vls-border bg-vls-off-white p-6 text-center">
        <p className="font-serif text-lg font-medium text-vls-black">{successHeading}</p>
        <p className="mt-2 text-[15px] text-vls-muted">{successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      {submitError && <p role="alert" className="text-sm text-vls-red">{submitError}</p>}
      <Field
        id={`${formId}-fullName`}
        name="fullName"
        label="Full Name"
        placeholder="Your full name"
        error={errors.fullName}
      />
      <Field
        id={`${formId}-email`}
        name="email"
        type="email"
        label="Email Address"
        placeholder="you@example.com"
        error={errors.email}
      />
      <Field
        id={`${formId}-mobile`}
        name="mobile"
        type="tel"
        label="Mobile Number"
        placeholder="98765 43210"
        error={errors.mobile}
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        aria-busy={status === "submitting"}
        className="mt-2 h-12 bg-vls-red text-[14px] font-bold text-vls-white transition-[background-color,transform] duration-150 ease-out hover:bg-vls-red-dark motion-safe:hover:-translate-y-px active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {status === "submitting" ? "Submitting…" : submitLabel}
      </button>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  placeholder,
  type = "text",
  error,
}: {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow mb-2 block !text-vls-muted">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="h-12 w-full border border-vls-border bg-[var(--vls-input-bg)] px-3 text-[16px] text-vls-black transition-colors duration-150 ease-out placeholder:text-vls-muted focus:border-vls-red aria-[invalid=true]:border-vls-red"
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-[13px] text-vls-red">
          {error}
        </p>
      )}
    </div>
  );
}
