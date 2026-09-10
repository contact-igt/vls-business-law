"use client";

import { useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import { Container } from "./ui/Container";
import { programConfig } from "@/lib/course";
import { readPaymentDetails, type RegistrationDetails } from "@/lib/paymentStorage";

export function Response({ variant }: { variant: "thank-you" | "error" }) {
  const success = variant === "thank-you";

  // Read the registration payload from localStorage once, after hydration.
  const snapshot = useRef<RegistrationDetails | null>(null);
  const read = useRef(false);
  const details = useSyncExternalStore(
    () => () => {},
    () => {
      if (!read.current) {
        read.current = true;
        snapshot.current = readPaymentDetails();
      }
      return snapshot.current;
    },
    () => null,
  );

  const paid = details?.payment_status === "paid";

  return (
    <section className="flex min-h-[70vh] items-center bg-vls-off-white py-20">
      <Container className="max-w-[560px] text-center">
        <span
          aria-hidden="true"
          className={`mx-auto flex h-20 w-20 items-center justify-center ${
            success ? "bg-vls-red" : "border border-vls-border bg-vls-card"
          }`}
        >
          {success ? (
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="square">
              <path d="M4 12.5l5 5 11-11" />
            </svg>
          ) : (
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="var(--vls-red)" strokeWidth="2.5" strokeLinecap="square">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          )}
        </span>

        <h1 className="mt-6 font-serif text-[30px] font-medium text-vls-black md:text-[36px]">
          {success
            ? paid
              ? "Registration confirmed"
              : "You're on the waitlist"
            : "Something went wrong"}
        </h1>

        <p className="mx-auto mt-4 max-w-md text-[16px] leading-relaxed text-vls-muted">
          {success
            ? paid
              ? "Your seat is booked. Session joining details will be sent to your email and mobile number."
              : "We'll notify you as soon as the next DRT & SARFAESI Proceedings session is confirmed."
            : "We couldn't complete your request. If any amount was debited it will be refunded automatically. Please try again or contact us."}
        </p>

        {success && paid && details && (
          <dl className="mx-auto mt-8 max-w-sm space-y-2 border border-vls-border bg-vls-white p-6 text-left text-[14px]">
            <Row label="Name" value={details.name} />
            <Row label="Email" value={details.email} />
            <Row label="Mobile" value={details.mobile} />
            <Row label="Amount" value={details.amount ? `₹${details.amount}` : "-"} />
            <Row label="Transaction ID" value={details.razorpay_payment_id || "-"} />
          </dl>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center bg-vls-black px-6 text-[13px] font-bold text-vls-white transition-colors hover:bg-vls-near-black"
          >
            Back to Home
          </Link>
          {!success && (
            <a
              href={`tel:${programConfig.phone}`}
              className="inline-flex h-12 items-center justify-center border border-vls-border px-6 text-[13px] font-bold text-vls-black transition-colors hover:bg-vls-card"
            >
              Call Support
            </a>
          )}
        </div>
      </Container>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-vls-muted">{label}</dt>
      <dd className="font-semibold text-vls-black">{value}</dd>
    </div>
  );
}
