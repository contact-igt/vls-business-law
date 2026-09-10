import Image from "next/image";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { Eyebrow } from "../ui/Eyebrow";

const TRACK_1_TOPICS = [
  "SARFAESI Act, 2002 — fundamentals",
  "Securitisation & reconstruction of financial assets",
  "Enforcement of security interest",
  "Where SARFAESI proceedings sit in legal practice",
];

const TRACK_2_SECTIONS = [
  {
    title: "Debt Recovery Tribunal (DRT)",
    body: "Proceedings before the Debt Recovery Tribunal within the VLS curriculum scope.",
  },
  {
    title: "Debt Recovery Appellate Tribunal (DRAT)",
    body: "The appellate adjudicatory pathway referenced by the curriculum.",
  },
  {
    title: "Forum & Procedural Journey",
    body: "Understand how a matter moves from the proceeding to tribunal adjudication.",
  },
];

export function Curriculum() {
  return (
    <section id="curriculum" className="bg-white py-20">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>The Curriculum</Eyebrow>
          <h2 className="mt-3 font-serif text-[32px] font-medium leading-tight text-vls-black md:text-[40px]">
            From SARFAESI Proceedings to Tribunal Adjudication.
          </h2>
        </Reveal>

        <Reveal delayMs={80} className="mt-10 overflow-hidden border border-vls-border">
          <div className="aspect-[16/9] sm:aspect-[21/9]">
            <Image
              src="/assets/vls/classroom/classroom-procedure-flowchart.jpg"
              alt="VLS Law Academy class working through a procedural flowchart on screen"
              width={1500}
              height={1125}
              className="h-full w-full object-cover object-[center_35%]"
              sizes="(min-width: 1180px) 1100px, 100vw"
            />
          </div>
        </Reveal>

        <Reveal className="mt-16">
          <div className="flex flex-col gap-2 border-b border-vls-border pb-6 md:flex-row md:items-baseline md:justify-between">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[1.8px] text-vls-red">
                Practice Track 01
              </p>
              <h3 className="mt-2 max-w-2xl font-serif text-[24px] font-medium leading-snug text-vls-black">
                SARFAESI Proceedings
              </h3>
            </div>
          </div>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-vls-muted">
            Source scope — matters and disputes relating to the Securitisation and
            Reconstruction of Financial Assets and Enforcement of Security Interest Act
            (SARFAESI), 2002. Build a structured understanding of where SARFAESI proceedings fit
            within legal practice.
          </p>

          <ul className="mt-7 flex flex-wrap gap-2.5">
            {TRACK_1_TOPICS.map((topic) => (
              <li
                key={topic}
                className="border border-vls-border bg-vls-off-white px-3.5 py-2 text-[13.5px] text-vls-black"
              >
                {topic}
              </li>
            ))}
          </ul>

          <p className="mt-7 border-t border-vls-border pt-5 text-[14px] text-vls-muted">
            <span className="font-semibold text-vls-black">Outcome — </span>
            Understand the SARFAESI framework covered by the programme and how a proceeding is
            approached in practice.
          </p>
        </Reveal>

        <Reveal className="mt-16">
          <div className="border-b border-vls-border pb-6">
            <p className="text-[11px] font-extrabold uppercase tracking-[1.8px] text-vls-red">
              Practice Track 02
            </p>
            <h3 className="mt-2 max-w-2xl font-serif text-[24px] font-medium leading-snug text-vls-black">
              Debt Recovery Tribunal &amp; Appellate Tribunal
            </h3>
          </div>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-vls-muted">
            Source scope — proceedings before the Debt Recovery Tribunal (DRT) and the Debt
            Recovery Appellate Tribunal (DRAT). Understand the forum and the adjudicatory
            journey covered by the VLS curriculum.
          </p>

          <div className="mt-7 grid gap-x-10 sm:grid-cols-2">
            {TRACK_2_SECTIONS.map((item) => (
              <div key={item.title} className="border-t border-vls-border py-5">
                <p className="font-serif text-[17px] font-medium text-vls-black">
                  {item.title}
                </p>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-vls-muted">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-2 border-t border-vls-border pt-5 text-[14px] text-vls-muted">
            <span className="font-semibold text-vls-black">Outcome — </span>
            Understand how a SARFAESI matter moves into proceedings before the Debt Recovery
            Tribunal and, on appeal, the Debt Recovery Appellate Tribunal.
          </p>
        </Reveal>

        <Reveal className="mt-16 border border-vls-border bg-vls-off-white p-7 sm:p-9">
          <p className="text-[11px] font-extrabold uppercase tracking-[1.8px] text-vls-red">
            Cross-Cutting Practice Layer
          </p>
          <h3 className="mt-2 font-serif text-[22px] font-medium leading-snug text-vls-black">
            Procedure &amp; Practice
          </h3>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-vls-muted">
            &ldquo;Procedure &amp; Practice&rdquo; is the layer connecting SARFAESI proceedings
            with the DRT and DRAT forums — the thread that runs through the entire programme.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
