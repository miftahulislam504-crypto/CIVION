import HeroText from "@/components/HeroText";
import SmartCitySection from "@/components/SmartCitySection";
import ProjectTourSection from "@/components/ProjectTourSection";
import FinalCinematicSection from "@/components/FinalCinematicSection";
import ContactHelmet from "@/components/ContactHelmet";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Home() {
  return (
    <main>
      {/* ── 1. Hero — camera descends into the city ── */}
      <section
        id="hero"
        className="h-[200vh] flex items-start justify-center pt-[28vh]"
      >
        <HeroText />
      </section>

      {/* ── 2. Smart City — camera rises above the skyline ── */}
      <SmartCitySection />

      {/* ── 3. Project Tour — camera visits each building one by one ── */}
      <ProjectTourSection />

      {/* ── 4. Final Cinematic — camera pulls out to orbit ── */}
      <FinalCinematicSection />

      {/* ── 5. Contact ── */}
      <section id="contact" className="relative py-32 px-6">
        <SectionHeading title="Let's Build Something" />
        <ContactHelmet />
      </section>
    </main>
  );
}
