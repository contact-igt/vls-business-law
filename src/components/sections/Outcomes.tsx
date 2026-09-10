import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { Eyebrow } from "../ui/Eyebrow";
import { DisputeJourneyVisual } from "../ui/DisputeJourneyVisual";

const OUTCOMES = [
  "Understand the SARFAESI framework covered by the programme",
  "Understand SARFAESI proceedings from a practice-oriented perspective",
  "Understand the role of the Debt Recovery Tribunal",
  "Understand the role of the Debt Recovery Appellate Tribunal",
  "Understand the relationship between proceeding and forum",
  "Develop a structured approach to DRT / SARFAESI legal practice",
];

export function Outcomes() {
  return (
    <section className="bg-white py-20">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>Your Outcome</Eyebrow>
          <h2 className="mt-3 font-serif text-[32px] font-medium leading-tight text-vls-black md:text-[40px]">
            Understand How DRT &amp; SARFAESI Matters Fit Into the Legal Process.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-x-10 sm:grid-cols-2">
          {OUTCOMES.map((outcome, i) => (
            <Reveal key={outcome} delayMs={(i % 3) * 60}>
              <div className="flex gap-4 border-t border-vls-border py-5">
                <span className="font-serif text-[16px] font-medium text-vls-red">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-[15px] leading-relaxed text-vls-black">{outcome}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 bg-vls-near-black py-10 text-center">
          <DisputeJourneyVisual compact />
        </Reveal>
      </Container>
    </section>
  );
}
