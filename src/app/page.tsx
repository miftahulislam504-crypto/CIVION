import HeroText from "@/components/HeroText";
import BlueprintScene from "@/components/BlueprintScene";
import StructuralScene from "@/components/StructuralScene";
import SmartCitySection from "@/components/SmartCitySection";
import ProjectShowcase from "@/components/ProjectShowcase";
import EngineeringLab from "@/components/EngineeringLab";
import Timeline from "@/components/Timeline";
import FinalCinematicSection from "@/components/FinalCinematicSection";
import ContactTerminal from "@/components/ContactTerminal";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Home() {
  return (
    <main>
      <section
        id="hero"
        className="h-[200vh] flex items-start justify-center pt-[28vh]"
      >
        <HeroText />
      </section>

      <section
        id="blueprint"
        className="relative bg-graphite py-32 px-6 border-t border-deep-space"
      >
        <SectionHeading
          eyebrow="02 — The Blueprint"
          title="The Birth Of Ideas"
          subtitle="Hover the markers for project data."
        />
        <BlueprintScene />
      </section>

      <section
        id="structural"
        className="relative bg-graphite py-32 px-6 border-t border-deep-space"
      >
        <SectionHeading
          eyebrow="03 — Structural Engineering"
          eyebrowColor="electric-blue"
          title="Where Mathematics Becomes Reality"
          subtitle="Columns rise, cables tension, then a live load crosses the span."
        />
        <StructuralScene />
      </section>

      <SmartCitySection />

      <section id="showcase" className="relative bg-graphite border-t border-deep-space">
        <ProjectShowcase />
      </section>

      <section
        id="lab"
        className="relative bg-graphite py-32 px-6 border-t border-deep-space"
      >
        <SectionHeading
          eyebrow="06 — Engineering Lab"
          title="Test The Structure Yourself"
          subtitle="Drag the load along the beam. Switch materials. Run a seismic test."
        />
        <EngineeringLab />
      </section>

      <section
        id="timeline"
        className="relative bg-graphite py-32 px-6 border-t border-deep-space"
      >
        <SectionHeading
          eyebrow="07 — Timeline"
          eyebrowColor="electric-blue"
          title="Evolution Of Engineering Intelligence"
          className="mb-20"
        />
        <Timeline />
      </section>

      <FinalCinematicSection />

      <section
        id="contact"
        className="relative bg-graphite py-32 px-6 border-t border-deep-space"
      >
        <SectionHeading
          eyebrow="08 — Contact"
          eyebrowColor="warm-orange"
          title="Open A Channel"
        />
        <ContactTerminal />
      </section>
    </main>
  );
}
