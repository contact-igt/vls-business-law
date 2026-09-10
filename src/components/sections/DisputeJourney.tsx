import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";

const STEPS = [
  { n: "01", title: "SARFAESI Framework", body: null },
  { n: "02", title: "The Proceeding", body: null },
  {
    n: "03",
    title: "Debt Recovery Tribunal",
    body: "The forum for adjudication within the programme scope.",
  },
  {
    n: "04",
    title: "Debt Recovery Appellate Tribunal",
    body: "The appellate pathway referenced by the VLS curriculum.",
  },
];

export function DisputeJourney() {
  return (
    <section className="bg-vls-near-black py-20">
      <Container className="max-w-2xl">
        <Reveal>
          <h2 className="font-serif text-[30px] font-medium leading-tight text-white md:text-[36px]">
            From the Proceeding to the Tribunal.
          </h2>
        </Reveal>

        <div className="mt-10">
          {STEPS.map((step, i) => (
            <Reveal key={step.n} delayMs={i * 80}>
              <div className="flex gap-5 border-t border-white/10 py-6 first:border-t-0">
                <span className="font-serif text-[20px] font-medium text-vls-gold">
                  {step.n}
                </span>
                <div>
                  <p className="text-[17px] font-semibold text-white">{step.title}</p>
                  {step.body && (
                    <p className="mt-1.5 text-[14.5px] leading-relaxed text-[#c8c8c4]">
                      {step.body}
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
