import Image from "next/image";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";

const POINTS = [
  "Experienced legal faculty",
  "Practice-focused learning",
  "Structured legal learning",
  "Structured support for young advocates",
  "Chennai-based legal learning community",
];

export function WhyVls() {
  return (
    <section className="bg-vls-off-white py-20">
      <Container className="grid gap-12 md:grid-cols-2 md:items-center">
        <Reveal>
          <h2 className="font-serif text-[30px] font-medium leading-tight text-vls-black md:text-[36px]">
            Learn the Law. Understand the Practice.
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-vls-muted">
            VLS Law Academy bridges the gap between knowing legal concepts and understanding
            their professional application. DRT &amp; SARFAESI Proceedings follows the same
            philosophy by connecting the legal framework with the proceeding, the Debt Recovery
            Tribunal and the appellate tribunal pathway.
          </p>
          <ul className="mt-7 flex flex-col">
            {POINTS.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 border-t border-vls-border py-3.5 text-[15px] text-vls-black first:border-t-0"
              >
                <span aria-hidden="true" className="mt-0.5 text-vls-red">
                  ✓
                </span>
                {point}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delayMs={100} className="grid grid-cols-2 gap-3">
          <div className="col-span-2 aspect-[16/10] overflow-hidden">
            <Image
              src="/assets/vls/classroom/classroom-wide-session.jpg"
              alt="A VLS Law Academy training session in progress"
              width={1500}
              height={1125}
              className="img-zoom h-full w-full object-cover object-[center_40%]"
              sizes="(min-width: 768px) 560px, 100vw"
            />
          </div>
          <div className="aspect-square overflow-hidden">
            <Image
              src="/assets/vls/classroom/academy-interior.jpg"
              alt="VLS Law Academy premises with the branded legal-heritage wall"
              width={1500}
              height={1125}
              className="img-zoom h-full w-full object-cover"
              sizes="(min-width: 768px) 270px, 50vw"
            />
          </div>
          <div className="aspect-square overflow-hidden">
            <Image
              src="/assets/vls/classroom/classroom-faculty-teaching.jpg"
              alt="VLS Law Academy faculty teaching a class"
              width={2568}
              height={1444}
              className="img-zoom h-full w-full object-cover"
              sizes="(min-width: 768px) 270px, 50vw"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
