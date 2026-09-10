import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";

const GAP_POINTS = [
  "No clear procedural roadmap",
  "Uncertainty about where DRT fits",
  "Confusion about tribunal progression",
  "Limited exposure to forum-based legal practice",
  "Difficulty connecting legislation with procedure",
];

const FIX_POINTS = [
  "Understand the legal framework",
  "Understand the SARFAESI proceeding",
  "Identify the role of DRT",
  "Understand the appellate tribunal pathway",
  "Connect legislation with practical legal procedure",
];

export function GapFix() {
  return (
    <section className="bg-vls-off-white py-20">
      <Container className="grid gap-10 md:grid-cols-2 md:gap-12">
        <Reveal>
          <p className="text-[11px] font-extrabold uppercase tracking-[1.8px] text-vls-muted">
            The Gap
          </p>
          <h3 className="mt-3 font-serif text-[24px] font-medium leading-snug text-vls-black">
            Knowing the legislation is not the same as understanding tribunal practice.
          </h3>
          <ul className="mt-6 flex flex-col">
            {GAP_POINTS.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 border-t border-vls-border py-4 text-[15px] text-vls-muted first:border-t-0"
              >
                <span aria-hidden="true" className="mt-1 text-vls-red">
                  ×
                </span>
                {point}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delayMs={100}>
          <p className="eyebrow">The Fix</p>
          <h3 className="mt-3 font-serif text-[24px] font-medium leading-snug text-vls-black">
            A structured view of DRT and SARFAESI procedure &amp; practice.
          </h3>
          <ul className="mt-6 flex flex-col">
            {FIX_POINTS.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 border-t border-vls-border py-4 text-[15px] text-vls-black first:border-t-0"
              >
                <span aria-hidden="true" className="mt-1 text-vls-red">
                  ✓
                </span>
                {point}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
