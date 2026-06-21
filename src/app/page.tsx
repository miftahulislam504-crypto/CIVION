import HeroText from "@/components/HeroText";
import BlueprintScene from "@/components/BlueprintScene";
import StructuralScene from "@/components/StructuralScene";
import SmartCitySection from "@/components/SmartCitySection";
import ProjectShowcase from "@/components/ProjectShowcase";
import ProjectFiles from "@/components/ProjectFiles";
import FinalCinematicSection from "@/components/FinalCinematicSection";
import ContactHelmet from "@/components/ContactHelmet";
import SectionHeading from "@/components/ui/SectionHeading";

// NOTE (Phase 1 — world rebuild): sections no longer paint an opaque
// bg-graphite background or a border-t divider. The whole document now
// scrolls over ONE persistent 3D world (see WorldScene, mounted once in
// layout.tsx) instead of each section owning its own canvas + background
// color. Keeping a solid background per section would just hide the world
// behind a wall of flat color again — the opposite of what we want.
// Timeline and EngineeringLab sections were removed; they were flat
// DOM-only content disconnected from the 3D world and out of scope for
// this site.
export default function Home() {
  return (
    <main>
      <section
        id="hero"
        className="h-[200vh] flex items-start justify-center pt-[28vh]"
      >
        <HeroText />
      </section>

      <section id="blueprint" className="relative py-32 px-6">
        <SectionHeading title="The Birth Of Ideas" />
        <BlueprintScene />
      </section>

      <section id="structural" className="relative py-32 px-6">
        <SectionHeading title="Where Mathematics Becomes Reality" />
        <StructuralScene />
      </section>

      <SmartCitySection />

      <section id="showcase" className="relative">
        <ProjectShowcase />
      </section>

      <section id="files" className="relative py-32 px-6">
        <SectionHeading title="Field Reports" subtitle="Structural design, architectural drawings, and BOQ documents from real project work." />
        <ProjectFiles />
      </section>

      <FinalCinematicSection />

      <section id="contact" className="relative py-32 px-6">
        <SectionHeading title="Let's Build Something" />
        <ContactHelmet />
      </section>
    </main>
  );
}
