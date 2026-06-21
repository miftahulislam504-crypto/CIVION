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
        <SectionHeading title="The Birth Of Ideas" />
        <BlueprintScene />
      </section>

      <section
        id="structural"
        className="relative bg-graphite py-32 px-6 border-t border-deep-space"
      >
        <SectionHeading title="Where Mathematics Becomes Reality" />
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
        <SectionHeading title="Test The Structure Yourself" />
        <EngineeringLab />
      </section>

      <section
        id="timeline"
        className="relative bg-graphite py-32 px-6 border-t border-deep-space"
      >
        <SectionHeading title="Evolution Of Engineering Intelligence" className="mb-20" />
        <Timeline />
      </section>

      <FinalCinematicSection />

      <section
        id="contact"
        className="relative bg-graphite py-32 px-6 border-t border-deep-space"
      >
        <SectionHeading title="Open A Channel" />
        <ContactTerminal />
      </section>
    </main>
  );
}
