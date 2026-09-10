import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";

const ITEMS = [
  {
    n: "01",
    title: "Understand the Framework",
    body: "The SARFAESI subject matter referenced in the approved VLS curriculum.",
  },
  {
    n: "02",
    title: "Identify the Proceeding",
    body: "Approach the matter through a structured procedural lens.",
  },
  {
    n: "03",
    title: "Understand the DRT Forum",
    body: "The role of the Debt Recovery Tribunal within the programme scope.",
  },
  {
    n: "04",
    title: "Understand the Appellate Forum",
    body: "The role of the Debt Recovery Appellate Tribunal in the adjudicatory pathway.",
  },
  {
    n: "05",
    title: "Connect the Law With Practice",
    body: "Link the legal framework with the forum and the procedural journey.",
  },
];

export function PracticalFramework() {
  return (
    <section className="bg-vls-off-white py-20">
      <Container>
        <Reveal className="max-w-2xl">
          <h2 className="font-serif text-[32px] font-medium leading-tight text-vls-black md:text-[40px]">
            Every Recovery Matter Has a Procedural Journey.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-x-10 md:grid-cols-2">
          {ITEMS.map((item, i) => (
            <Reveal key={item.n} delayMs={i * 70}>
              <div className="flex gap-5 border-t border-vls-border py-6">
                <span className="font-serif text-[20px] font-medium text-vls-red">
                  {item.n}
                </span>
                <div>
                  <p className="text-[16px] font-semibold text-vls-black">{item.title}</p>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-vls-muted">
                    {item.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
