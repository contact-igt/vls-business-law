import { isRegistrationOpen } from "./programStatus";

export const programConfig = {
  sessionStatus: "announced",
  classStartAt: "2026-09-20T10:30:00+05:30",
  date: "Sunday, September 20, 2026",
  time: "10:30 AM – 01:30 PM IST",
};

export function getCourse(now: number) {
  const open = isRegistrationOpen(programConfig, now);
  const date = open ? programConfig.date : "To be announced";
  const time = open ? programConfig.time : "To be announced";
  const schedule = open ? `${date} - ${time}` : "Date and time will be announced shortly";
  return {
    name: "DRT & SARFAESI Proceedings",
    subtitle: "Procedure & Practice",
    date,
    time,
    registrationMode: open ? "ACTIVE" : "WAITLIST",
    ctaLabel: open ? "Register Now" : "Join Waitlist",
    formHeading: open ? "Register Here" : "Join the Waitlist",
    eyebrow: open ? "Registration Open" : "Early Access · Waitlist",
    secondaryCtaLabel: "Explore the Curriculum ↓",
    formBlurb: `DRT & SARFAESI Proceedings · Procedure & Practice. ${schedule}. Fee will be announced shortly.`,
    bandBlurb: `Procedure & Practice · ${schedule} · ${open ? "Registration open" : "Waitlist open"}`,
    nextClassAnswer: open
      ? `The next class is on ${date}, from ${time}. Register for the upcoming session.`
      : "The next session date and time will be announced shortly. Join the waitlist for updates.",
    heroMetaCards: [
      { label: "Class Date", value: date },
      { label: "Class Time", value: time },
      { label: "Duration", value: "3 Hours" },
      { label: "Registration", value: open ? "Registration Open" : "Waitlist Open" },
    ],
  };
}
