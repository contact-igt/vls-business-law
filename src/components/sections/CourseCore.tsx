import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";

export function CourseCore() {
  return (
    <section className="bg-white py-20">
      <Container className="max-w-3xl text-center">
        <Reveal>
          <p className="text-[11px] font-extrabold uppercase tracking-[1.8px] text-vls-red">
            Core / 01 · Course core message
          </p>
          <h2 className="mt-4 font-serif text-[30px] font-medium leading-tight text-vls-black md:text-[36px]">
            DRT practice begins where the law meets the tribunal.
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-vls-muted">
            Understanding the subject requires more than recognising the legislation. A legal
            professional must be able to place the matter within its proceeding, identify the
            relevant forum and understand how the dispute progresses.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
