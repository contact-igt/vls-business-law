import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { DisputeJourneyVisual } from "../ui/DisputeJourneyVisual";

export function CoreVisual() {
  return (
    <section className="bg-vls-near-black py-20">
      <Container className="text-center">
        <Reveal>
          <DisputeJourneyVisual />
          <p className="mt-8 text-[15px] text-[#c8c8c4]">
            Understand the journey from the proceeding to tribunal adjudication.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
