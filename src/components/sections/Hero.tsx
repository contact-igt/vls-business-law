import { PrimaryLink, SecondaryLink } from "../ui/Button";
import { Container } from "../ui/Container";
import { WaitlistForm } from "../WaitlistForm";
import { course } from "@/lib/course";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-vls-near-black pb-16 pt-14 md:pb-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div
        aria-hidden="true"
        className="hero-rise pointer-events-none absolute right-0 top-0 h-[440px] w-[440px] opacity-30"
        style={{
          background:
            "radial-gradient(440px at 72% 22%, rgba(223,185,120,0.25), transparent 70%)",
          animationDuration: "1.2s",
        }}
      />

      <Container className="relative grid gap-10 md:grid-cols-2 md:items-start md:gap-8">
        <div>
          <p className="hero-rise text-[11px] font-extrabold uppercase tracking-[1.8px] text-vls-gold">
            VLS Law Academy · Practical Legal Training
          </p>

          <h1
            className="hero-rise mt-6 font-serif text-[40px] font-medium leading-[1.05] tracking-tight text-white sm:text-[52px] md:text-[60px]"
            style={{ animationDelay: "70ms" }}
          >
            DRT &amp; SARFAESI{" "}
            <span className="italic text-vls-gold">Proceedings</span>
          </h1>

          <p
            className="hero-rise mt-4 font-serif text-[22px] font-medium italic text-white sm:text-[26px]"
            style={{ animationDelay: "140ms" }}
          >
            {course.subtitle}
          </p>

          <p
            className="hero-rise mt-6 max-w-xl text-[19px] font-medium leading-snug text-white"
            style={{ animationDelay: "200ms" }}
          >
            Understand the Law. Understand the Tribunal. Understand the Procedure.
          </p>

          <p
            className="hero-rise mt-5 max-w-xl text-[16px] leading-relaxed text-[#c8c8c4]"
            style={{ animationDelay: "260ms" }}
          >
            Understanding DRT and SARFAESI practice is not limited to reading legislation. Legal
            practice requires clarity about the proceeding, the forum and the procedural journey
            through Debt Recovery Tribunal and appellate adjudication. This programme gives legal
            professionals a structured view of SARFAESI proceedings and the tribunal pathway
            covered by the VLS curriculum.
          </p>

          <ul
            className="hero-rise mt-9 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-white/10 pt-6 sm:grid-cols-4"
            style={{ animationDelay: "320ms" }}
          >
            {course.heroMetaCards.map((card) => (
              <InfoChip key={card.label} label={card.label} value={card.value} />
            ))}
          </ul>

          <div
            className="hero-rise mt-8 flex flex-wrap items-center gap-6"
            style={{ animationDelay: "380ms" }}
          >
            <PrimaryLink href="#waitlist">{course.ctaLabel}</PrimaryLink>
            <SecondaryLink href="#curriculum" dark>
              {course.secondaryCtaLabel}
            </SecondaryLink>
          </div>
        </div>

        <div
          id="waitlist"
          className="hero-rise relative bg-white p-7 sm:p-8"
          style={{ animationDelay: "180ms" }}
        >
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-vls-red to-vls-gold" />
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow">Early Access · Waitlist</p>
              <h2 className="mt-2 font-serif text-[24px] font-medium text-vls-black">
                Join the Waitlist
              </h2>
            </div>
          </div>
          <p className="mt-2 text-[14px] leading-relaxed text-vls-muted">{course.formBlurb}</p>
          <div className="mt-6">
            <WaitlistForm
              formId="hero"
              submitLabel={course.ctaLabel}
              successHeading={course.successHeading}
              successBody={course.successBody}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

function InfoChip({ label, value }: { label: string; value: string }) {
  return (
    <li>
      <p className="text-[15px] font-semibold text-white">{value}</p>
      <p className="mt-0.5 text-[12px] text-[#9a9a96]">{label}</p>
    </li>
  );
}
