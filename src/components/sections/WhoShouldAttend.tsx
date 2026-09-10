import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { Eyebrow } from "../ui/Eyebrow";

const AUDIENCE = [
  {
    n: "01",
    title: "Practicing Advocates",
    body: "Build structured exposure to DRT and SARFAESI practice.",
  },
  {
    n: "02",
    title: "Junior Advocates",
    body: "Develop early familiarity with tribunal-oriented legal work.",
  },
  {
    n: "03",
    title: "Law Graduates",
    body: "Move from academic knowledge toward procedure and forum understanding.",
  },
  {
    n: "04",
    title: "Law Students",
    body: "Gain early exposure to business-law and tribunal practice.",
  },
  {
    n: "05",
    title: "Legal Professionals",
    body: "Strengthen your understanding of SARFAESI, DRT and the tribunal pathway.",
  },
];

export function WhoShouldAttend() {
  return (
    <section className="bg-white py-20">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>Who Should Attend</Eyebrow>
          <h2 className="mt-3 font-serif text-[32px] font-medium leading-tight text-vls-black md:text-[40px]">
            For People Who Want to Understand DRT &amp; SARFAESI in Legal Practice.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {AUDIENCE.map((item, i) => (
            <Reveal key={item.n} delayMs={(i % 3) * 70}>
              <div className="card-lift h-full border-t border-vls-border py-6 md:pr-4">
                <span className="font-serif text-[18px] font-medium text-vls-red">
                  {item.n}
                </span>
                <p className="mt-2 text-[16px] font-semibold text-vls-black">{item.title}</p>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-vls-muted">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
