import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileStickyCta } from "@/components/MobileStickyCta";
import { Hero } from "@/components/sections/Hero";
import { EarlyTrust } from "@/components/sections/EarlyTrust";
import { Faculty } from "@/components/sections/Faculty";
import { Testimonials } from "@/components/sections/Testimonials";
import { PracticeGap } from "@/components/sections/PracticeGap";
import { CoreVisual } from "@/components/sections/CoreVisual";
import { EarlyCtaBand } from "@/components/sections/EarlyCtaBand";
import { CourseObjective } from "@/components/sections/CourseObjective";
import { WhyProgramme } from "@/components/sections/WhyProgramme";
import { GapFix } from "@/components/sections/GapFix";
import { Curriculum } from "@/components/sections/Curriculum";
import { ForumStrip } from "@/components/sections/ForumStrip";
import { CourseCore } from "@/components/sections/CourseCore";
import { PracticalFramework } from "@/components/sections/PracticalFramework";
import { DisputeJourney } from "@/components/sections/DisputeJourney";
import { Outcomes } from "@/components/sections/Outcomes";
import { WhoShouldAttend } from "@/components/sections/WhoShouldAttend";
import { WhyVls } from "@/components/sections/WhyVls";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <EarlyTrust />
        <Faculty />
        <Testimonials />
        <PracticeGap />
        <CoreVisual />
        <EarlyCtaBand />
        <CourseObjective />
        <WhyProgramme />
        <GapFix />
        <Curriculum />
        <ForumStrip />
        <CourseCore />
        <PracticalFramework />
        <DisputeJourney />
        <Outcomes />
        <WhoShouldAttend />
        <WhyVls />
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
      <MobileStickyCta />
    </>
  );
}
