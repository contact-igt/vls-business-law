import { Reveal } from "../ui/Reveal";
import { Eyebrow } from "../ui/Eyebrow";
import { Container } from "../ui/Container";

const CARDS = [
  {
    n: "01",
    label: "The Framework",
    q: "What legal framework is the matter operating within?",
    a: "Understand the relationship between the approved SARFAESI subject matter and tribunal practice.",
  },
  {
    n: "02",
    label: "The Proceeding",
    q: "What proceeding are you dealing with?",
    a: "Learn to approach the matter through a structured procedural lens.",
  },
  {
    n: "03",
    label: "The Tribunal",
    q: "Where does DRT fit?",
    a: "Understand the role of the Debt Recovery Tribunal within the programme scope.",
  },
  {
    n: "04",
    label: "The Appeal",
    q: "Where does the matter go next?",
    a: "Understand the Debt Recovery Appellate Tribunal within the approved adjudicatory pathway.",
  },
];

export function PracticeGap() {
  return (
    <section className="bg-vls-off-white py-20">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>The Practice Gap</Eyebrow>
          <h2 className="mt-3 font-serif text-[32px] font-medium leading-tight text-vls-black md:text-[40px]">
            Studying SARFAESI Law is one thing.
            <br />
            Understanding DRT Practice is another.
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-vls-muted">
            A matter does not remain inside the pages of legislation. Practical legal work
            requires understanding the proceeding, the tribunal and the available adjudicatory
            pathway.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-x-10 md:grid-cols-2">
          {CARDS.map((card, i) => (
            <Reveal key={card.n} delayMs={i * 70}>
              <div className="card-lift flex h-full gap-5 border-t border-vls-border py-6 md:pr-4">
                <span className="font-serif text-[20px] font-medium text-vls-red">
                  {card.n}
                </span>
                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-[1.4px] text-vls-red">
                    {card.label}
                  </p>
                  <p className="mt-2 font-serif text-[18px] font-medium text-vls-black">
                    {card.q}
                  </p>
                  <p className="mt-2 text-[15px] leading-relaxed text-vls-muted">{card.a}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
