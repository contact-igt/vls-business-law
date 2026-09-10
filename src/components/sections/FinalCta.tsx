"use client";

import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { RegistrationForm } from "../RegistrationForm";
import { DisputeJourneyVisual } from "../ui/DisputeJourneyVisual";
import { useCourse } from "@/components/CourseProvider";

export function FinalCta() {
  const course = useCourse();
  return (
    <section className="bg-vls-near-black py-20">
      <Container className="grid gap-10 md:grid-cols-2 md:gap-16">
        <Reveal>
          <p className="text-[11px] font-extrabold uppercase tracking-[1.8px] text-vls-gold">
            {course.eyebrow}
          </p>
          <h2 className="mt-4 font-serif text-[34px] font-medium leading-tight text-white md:text-[42px]">
            When a DRT or SARFAESI Matter Comes to You, Understand the Procedure and the Forum.
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-[#c8c8c4]">
            Understand the framework. Understand the proceeding. Understand the tribunal.
            Understand the appellate pathway.
          </p>
          <div className="mt-8 border-t border-white/10 pt-8">
            <DisputeJourneyVisual compact />
          </div>
        </Reveal>

        <Reveal id="final-form" delayMs={100} className="bg-white p-7 sm:p-8">
          <RegistrationForm formId="final" />
        </Reveal>
      </Container>
    </section>
  );
}
