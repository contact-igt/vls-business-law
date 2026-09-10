import { Reveal } from "../ui/Reveal";
import { Eyebrow } from "../ui/Eyebrow";
import { Container } from "../ui/Container";

export function CourseObjective() {
  return (
    <section id="why-this-course" className="bg-white py-20">
      <Container className="max-w-3xl">
        <Reveal>
          <Eyebrow>Course Objective</Eyebrow>
          <h2 className="mt-3 font-serif text-[32px] font-medium leading-tight text-vls-black md:text-[40px]">
            Learn DRT &amp; SARFAESI as an Area of Legal Practice.
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-vls-muted">
            The programme connects the statutory framework referenced in the approved VLS
            curriculum with the practical structure of SARFAESI proceedings and adjudication
            before the Debt Recovery Tribunal and Debt Recovery Appellate Tribunal.
          </p>
          <p className="mt-4 text-[17px] leading-relaxed text-vls-muted">
            The objective is not merely to know the law.
          </p>
          <p className="mt-4 font-serif text-[20px] font-medium italic text-vls-black">
            The practical question is: when a matter arises, what is the proceeding and where
            does it go next?
          </p>
          <p className="mt-6 font-serif text-[22px] font-medium leading-snug text-vls-black md:text-[26px]">
            Practice becomes clearer when you understand the procedure and the forum.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
