import { getRegistrationAction, isRegistrationOpen } from "./programStatus";

export const programConfig = {
  sessionStatus: "announced",
  classStartAt: "2026-09-20T10:30:00+05:30",
  date: "Sunday, September 20, 2026",
  time: "10:30 AM – 01:30 PM IST",

  // Commercial — programme identity used by the registration payload.
  pageName: "drt-sarfaesi-proceedings",
  phone: "+919500207811",

  /**
   * Approved registration fee in INR. `null` blocks payment for an open session.
   * Set a number here ONLY once VLS approves the fee; that
   * plus the Razorpay env keys activates the paid Razorpay flow.
   */
  fee: 499 as number | null,
  originalPrice: null as string | null,

  // WhatsApp "event_remainder" template arguments (used only in paid mode).
  whatsappProgramName: "DRT & SARFAESI Proceedings — Procedure & Practice masterclass",
  whatsappPlatform: "Google Meet",
  whatsappLinkDate: "one day before the session",
};

export type ProgramConfig = typeof programConfig;

export const isPaidMode = (config: ProgramConfig, now: number) =>
  getRegistrationAction(config, now) === "payment";

export function getCourse(now: number) {
  const open = isRegistrationOpen(programConfig, now);
  const paid = isPaidMode(programConfig, now);
  const date = open ? programConfig.date : "To be announced";
  const time = open ? programConfig.time : "To be announced";
  const schedule = open ? `${date} - ${time}` : "Date and time will be announced shortly";
  const feeText = paid ? `₹${programConfig.fee}` : null;
  return {
    name: "DRT & SARFAESI Proceedings",
    subtitle: "Procedure & Practice",
    date,
    time,
    fee: programConfig.fee,
    feeText,
    originalPrice: programConfig.originalPrice,
    phone: programConfig.phone,
    whatsappSchedule: `${programConfig.date} ${programConfig.time}`,
    registrationMode: paid ? "PAID" : open ? "ACTIVE" : "WAITLIST",
    isPaid: paid,
    isOpen: open,
    ctaLabel: open ? "Register Now" : "Join Waitlist",
    ctaLabelWithFee: paid ? `Register Now — ${feeText}` : open ? "Register Now" : "Join Waitlist",
    formHeading: open ? "Register Here" : "Join the Waitlist",
    formSubmitLabel: open ? "Register Now" : "Join Waitlist",
    eyebrow: open ? "Registration Open" : "Early Access · Waitlist",
    stickySubtitle: open ? date : "Procedure & Practice",
    secondaryCtaLabel: "Explore the Curriculum ↓",
    formBlurb: `DRT & SARFAESI Proceedings · Procedure & Practice. ${schedule}.${
      feeText ? ` Fee ${feeText}.` : " Fee will be announced shortly."
    }`,
    bandBlurb: `Procedure & Practice · ${schedule} · ${open ? "Registration open" : "Waitlist open"}`,
    nextClassAnswer: open
      ? `The next class is on ${date}, from ${time}. Register for the upcoming session.`
      : "The next session date and time will be announced shortly. Join the waitlist for updates.",
    feeAnswer: paid
      ? `The fee for this session is ${feeText}${
          programConfig.originalPrice ? ` (standard ${programConfig.originalPrice})` : ""
        }. Complete registration to reserve your seat.`
      : open
        ? "The fee will be announced shortly. Registration for this session is open — join now to be notified first."
        : "The fee will be announced with the next registration window. Join the waitlist for updates.",
    successHeading: paid ? "Registration confirmed." : "You're on the waitlist.",
    successBody: paid
      ? "Your seat is booked. Session joining details will be sent to your email and mobile."
      : "We'll send registration details for the next DRT & SARFAESI Proceedings session as soon as they're confirmed.",
    heroMetaCards: [
      { label: "Class Date", value: date },
      { label: "Class Time", value: time },
      { label: "Duration", value: "3 Hours" },
      { label: "Registration", value: open ? "Registration Open" : "Waitlist Open" },
    ],
  };
}
