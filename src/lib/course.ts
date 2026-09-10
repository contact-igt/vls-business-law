/**
 * Single source of truth for all mutable commercial / programme data.
 *
 * No approved batch date, time, duration, price, delivery mode or language exists
 * for the DRT & SARFAESI Proceedings programme yet. Until VLS approves those
 * values, every unknown stays `"TBA"` and the page runs in waitlist mode. Do not
 * hard-code any of these strings inside components — read them from here.
 */
export const course = {
  name: "DRT & SARFAESI Proceedings",
  subtitle: "Procedure & Practice",

  // Commercial fields — none approved yet.
  date: "TBA",
  time: "TBA",
  duration: "TBA",
  price: null as string | null,
  mode: "TBA",
  language: "TBA",

  // Registration
  registrationMode: "WAITLIST" as const,
  ctaLabel: "Join Waitlist",
  secondaryCtaLabel: "Explore the Curriculum ↓",

  // Copy that depends on the (unknown) commercial data
  formBlurb:
    "DRT & SARFAESI Proceedings · Procedure & Practice. Live-session dates and fee will be announced with the next registration window.",
  bandBlurb:
    "Procedure & Practice · Live-session dates & fee to be announced · Waitlist open",
  successHeading: "You're on the waitlist.",
  successBody:
    "We'll send registration details for the next DRT & SARFAESI Proceedings session as soon as they're confirmed.",

  // Hero metadata cards — value/label pairs. Values stay "To be announced" until approved.
  heroMetaCards: [
    { label: "Class Date", value: "To be announced" },
    { label: "Class Time", value: "To be announced" },
    { label: "Duration", value: "To be announced" },
    { label: "Registration", value: "Waitlist Open" },
  ] as const,
} as const;

export const isWaitlist = course.registrationMode === "WAITLIST";
