import Image from "next/image";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";

const TESTIMONIALS = [
  { src: "/assets/vls/testimonials/testimonial-1.jpg", w: 705, h: 608 },
  { src: "/assets/vls/testimonials/testimonial-2.png", w: 601, h: 711 },
  { src: "/assets/vls/testimonials/testimonial-3.png", w: 477, h: 751 },
];

export function Testimonials() {
  return (
    <section className="bg-white py-20">
      <Container className="max-w-2xl text-center">
        <Reveal>
          <p className="text-[11px] font-extrabold uppercase tracking-[1.8px] text-vls-red">
            Student Voices
          </p>
          <h2 className="mt-3 font-serif text-[28px] font-medium leading-tight text-vls-black md:text-[34px]">
            Trusted by the VLS legal learning community.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-vls-muted">
            Approved student feedback from VLS programmes and practical legal training.
          </p>
        </Reveal>
      </Container>

      <Container className="mt-10 grid gap-4 sm:grid-cols-3">
        {TESTIMONIALS.map((item, i) => (
          <Reveal key={item.src} delayMs={i * 90}>
            <div className="card-lift h-full overflow-hidden border border-vls-border">
              <Image
                src={item.src}
                alt="VLS Law Academy student testimonial"
                width={item.w}
                height={item.h}
                className="img-zoom h-full w-full object-cover"
                sizes="(min-width: 640px) 33vw, 100vw"
              />
            </div>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}
