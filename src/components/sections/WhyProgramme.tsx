import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { NumberedRow } from "../ui/NumberedRow";
import { SecondaryLink } from "../ui/Button";

const POINTS = [
  { n: "01", title: "Understand the framework" },
  { n: "02", title: "Understand the proceeding" },
  { n: "03", title: "Understand the tribunal pathway" },
];

export function WhyProgramme() {
  return (
    <section className="bg-white py-20">
      <Container className="grid gap-10 md:grid-cols-2 md:gap-16">
        <Reveal>
          <h2 className="font-serif text-[30px] font-medium leading-tight text-vls-black md:text-[36px]">
            DRT &amp; SARFAESI becomes practical when you understand where the matter goes.
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-vls-muted">
            SARFAESI law is not practised in isolation. A legal professional must understand the
            underlying framework, the proceeding involved, and the role of the Debt Recovery
            Tribunal and the Debt Recovery Appellate Tribunal.
          </p>
          <div className="mt-6">
            <SecondaryLink href="#curriculum">See what you&apos;ll learn ↗</SecondaryLink>
          </div>
        </Reveal>
        <Reveal delayMs={100}>
          <div>
            {POINTS.map((p) => (
              <NumberedRow key={p.n} number={p.n} title={p.title} />
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
