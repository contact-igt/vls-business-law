"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Popup } from "./ui/Popup";
import { useCourse } from "@/components/CourseProvider";
import { programConfig } from "@/lib/course";
import { getRegistrationAction } from "@/lib/programStatus";
import { getUtm } from "@/lib/getUtm";
import { safeSetPaymentDetails, type RegistrationDetails } from "@/lib/paymentStorage";
import { submitBusinessLawRegistration } from "@/lib/submitBusinessLawRegistration";

type RazorpayResponse = {
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
};
type RazorpayOrder = { id: string; amount: number; currency: string };
type RazorpayOptions = {
  key?: string;
  amount: number;
  currency: string;
  name: string;
  order_id: string;
  description: string;
  prefill: { name: string; email: string; contact: string };
  theme: { color: string };
  handler: (response: RazorpayResponse) => void;
};
type RazorpayInstance = { open: () => void; on: (event: string, cb: () => void) => void };

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

const SHEET_URL = "https://script.google.com/macros/s/AKfycbxvjifx2N9h6r2EqgkZGvOMlmc2ucigf2Qv-ARpAREL3SSPVFexH2ts5iTXfPYst8uh/exec";

const validationSchema = Yup.object({
  name: Yup.string().matches(/^[a-zA-Z ]*$/, "Enter a valid name"),
  email: Yup.string()
    .required("Email required")
    .email("Enter a valid email")
    .test("lowercase", "Email must be lowercase", (v) => !v || v === v.toLowerCase()),
  mobile: Yup.string()
    .required("Mobile required")
    .matches(/^[0-9]{10}$/, "Enter a 10-digit mobile number"),
});

type FormValues = { name: string; email: string; mobile: string };

const nowIso = () => new Date().toISOString();

async function postToSheet(details: RegistrationDetails, retries = 3, delay = 1500): Promise<boolean> {
  if (!SHEET_URL) return false;
  const params = new URLSearchParams();
  Object.entries(details).forEach(([k, v]) => params.append(k, String(v ?? "")));
  try {
    const res = await fetch(SHEET_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });
    if (res.ok) return true;
    throw new Error("Sheet responded non-OK");
  } catch {
    if (retries <= 1) return false;
    await new Promise((r) => setTimeout(r, delay));
    return postToSheet(details, retries - 1, delay);
  }
}

export function RegistrationForm({
  formId,
  submitLabel,
}: {
  formId: string;
  submitLabel?: string;
}) {
  const course = useCourse();
  const router = useRouter();
  const [ipAddress, setIpAddress] = useState("");
  const [instructionOpen, setInstructionOpen] = useState(false);
  const [agree, setAgree] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    let active = true;
    fetch("https://api.ipify.org?format=json")
      .then((r) => r.json())
      .then((d) => active && setIpAddress(d.ip || ""))
      .catch(() => active && setIpAddress(""));
    return () => {
      active = false;
    };
  }, []);

  function buildPayload(
    values: FormValues,
    opts: { paid: boolean; order?: RazorpayOrder; response?: RazorpayResponse },
  ): RegistrationDetails {
    const { paid, order, response } = opts;
    return {
      name: values.name || "",
      email: values.email,
      mobile: `+91${values.mobile}`,
      amount: paid && order ? order.amount / 100 : "",
      registered_date: nowIso(),
      programm_date: paid ? programConfig.classStartAt : "TBA",
      razorpay_order_id: response?.razorpay_order_id || "",
      razorpay_payment_id: response?.razorpay_payment_id || "",
      razorpay_signature: response?.razorpay_signature || "",
      payment_status: paid ? "paid" : "waitlist",
      captured: paid,
      page_name: programConfig.pageName,
      ip_address: ipAddress,
      utm_source: getUtm("utm_source"),
      utm_medium: getUtm("utm_medium"),
      utm_campaign: getUtm("utm_campaign"),
      utm_term: getUtm("utm_term"),
      utm_content: getUtm("utm_content"),
    };
  }

  // Best-effort — the backend record must never block the user's confirmation.
  async function saveToBackend(payload: RegistrationDetails) {
    try {
      await submitBusinessLawRegistration(payload);
    } catch (error) {
      console.error("Business Law backend registration failed:", error);
    }
  }

  async function submitWaitlist(values: FormValues) {
    setProcessing(true);
    setFormError("");
    const payload = buildPayload(values, { paid: false });
    await saveToBackend(payload);
    if (!await postToSheet(payload)) {
      setFormError("We could not save your waitlist request. Please try again or contact VLS.");
      setProcessing(false);
      return;
    }
    safeSetPaymentDetails(payload);
    router.push("/thank-you");
  }

  async function finishSuccessfulPayment(
    values: FormValues,
    order: RazorpayOrder,
    response: RazorpayResponse,
  ) {
    if (!response?.razorpay_payment_id) {
      router.replace("/error");
      return;
    }
    setProcessing(true);
    const payload = buildPayload(values, { paid: true, order, response });
    await saveToBackend(payload);
    await postToSheet(payload);
    safeSetPaymentDetails(payload);
    router.push("/thank-you");
  }

  async function openRazorpay(values: FormValues) {
    if (getRegistrationAction(programConfig) !== "payment") {
      setFormError("Registration is no longer available. Please refresh for the current session status.");
      return;
    }
    if (!window.Razorpay) {
      setFormError("Payment gateway did not load. Please refresh and try again.");
      return;
    }
    setFormError("");
    try {
      const orderResponse = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 1 }),
        // body: JSON.stringify({ amount: course.fee }),
      });
      if (!orderResponse.ok) {
        const data = await orderResponse.json().catch(() => ({}));
        setFormError(
          typeof data?.error === "string" ? data.error : "Payment order could not be created.",
        );
        return;
      }
      const order: RazorpayOrder = await orderResponse.json();
      const rzp = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        // key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: values.name || "VLS Law Academy",
        order_id: order.id,
        description: `${course.name} — ${course.feeText}`,
        prefill: { name: values.name, email: values.email, contact: values.mobile },
        theme: { color: "#a51f24" },
        handler: (response) => finishSuccessfulPayment(values, order, response),
      });
      rzp.on("payment.failed", () => router.replace("/error"));
      rzp.open();
    } catch {
      setFormError("Payment could not be started. Please try again or contact support.");
    }
  }

  const formik = useFormik<FormValues>({
    initialValues: { name: "", email: "", mobile: "" },
    validationSchema,
    onSubmit: async (values) => {
      setFormError("");
      const action = getRegistrationAction(programConfig);
      if (action === "payment") {
        setAgree(false);
        setInstructionOpen(true);
      } else if (action === "waitlist") {
        await submitWaitlist(values);
      } else {
        setFormError("Payment registration is not configured yet. Please contact VLS.");
      }
    },
  });

  const busy = processing || formik.isSubmitting;

  return (
    <>
      <form onSubmit={formik.handleSubmit} noValidate className="flex flex-col gap-4">
        {formError && (
          <p role="alert" className="text-[13px] text-vls-red">
            {formError}
          </p>
        )}
        <Field
          id={`${formId}-name`}
          name="name"
          label="Full Name"
          placeholder="Your full name"
          formik={formik}
        />
        <Field
          id={`${formId}-email`}
          name="email"
          type="email"
          label="Email Address"
          placeholder="you@example.com"
          formik={formik}
        />
        <div>
          <label htmlFor={`${formId}-mobile`} className="eyebrow mb-2 block !text-vls-muted">
            Mobile Number
          </label>
          <div className="flex">
            <span className="flex h-12 items-center border border-r-0 border-vls-border bg-vls-card px-3 text-[16px] text-vls-muted">
              +91
            </span>
            <input
              id={`${formId}-mobile`}
              name="mobile"
              type="tel"
              inputMode="numeric"
              maxLength={10}
              placeholder="98765 43210"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              aria-invalid={Boolean(formik.touched.mobile && formik.errors.mobile)}
              className="h-12 w-full border border-vls-border bg-[var(--vls-input-bg)] px-3 text-[16px] text-vls-black transition-colors duration-150 ease-out placeholder:text-vls-muted focus:border-vls-red aria-[invalid=true]:border-vls-red"
            />
          </div>
          {formik.touched.mobile && formik.errors.mobile && (
            <p className="mt-1 text-[13px] text-vls-red">{formik.errors.mobile}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={busy}
          aria-busy={busy}
          className="mt-2 h-12 bg-vls-red text-[14px] font-bold text-vls-white transition-[background-color,transform] duration-150 ease-out hover:bg-vls-red-dark motion-safe:hover:-translate-y-px active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {busy ? "Processing…" : submitLabel || course.formSubmitLabel}
        </button>
        {course.isPaid && course.originalPrice && (
          <p className="text-center text-[13px] text-vls-muted">
            <span className="line-through">{course.originalPrice}</span>{" "}
            <span className="font-bold text-vls-black">{course.feeText}</span> · limited seats
          </p>
        )}
      </form>

      <Popup
        open={instructionOpen}
        onClose={() => setInstructionOpen(false)}
        dismissable={!processing}
      >
        <h3 className="font-serif text-[20px] font-medium text-vls-black">Payment Instructions</h3>
        <p className="mt-3 text-[14px] leading-relaxed text-vls-muted">
          Please wait until you are redirected to the confirmation page after completing payment.
          Do not close, refresh, or use the back button during payment — your registration may not
          be recorded correctly.
        </p>
        <label className="mt-4 flex items-start gap-2 text-[14px] font-semibold text-vls-black">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="mt-0.5 accent-vls-red"
          />
          I understand and agree.
        </label>
        <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => setInstructionOpen(false)}
            className="h-11 border border-vls-border px-5 text-[13px] font-bold text-vls-black transition-colors hover:bg-vls-card"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!agree}
            onClick={() => {
              setInstructionOpen(false);
              openRazorpay(formik.values);
            }}
            className="h-11 bg-vls-red px-5 text-[13px] font-bold text-vls-white transition-colors hover:bg-vls-red-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            I Agree &amp; Pay {course.feeText}
          </button>
        </div>
      </Popup>

      <Popup open={processing} onClose={() => {}} dismissable={false}>
        <h3 className="font-serif text-[20px] font-medium text-vls-black">
          {course.isPaid ? "Processing your registration…" : "Submitting your request…"}
        </h3>
        <p className="mt-2 text-[14px] text-vls-muted">Please do not close or refresh this page.</p>
      </Popup>
    </>
  );
}

function Field({
  id,
  name,
  label,
  placeholder,
  type = "text",
  formik,
}: {
  id: string;
  name: "name" | "email" | "mobile";
  label: string;
  placeholder: string;
  type?: string;
  formik: ReturnType<typeof useFormik<FormValues>>;
}) {
  const error = formik.touched[name] && formik.errors[name];
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
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
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
