import HeroText from "@/components/HeroText";
import SmartCitySection from "@/components/SmartCitySection";
import ProjectTourSection from "@/components/ProjectTourSection";
import FinalCinematicSection from "@/components/FinalCinematicSection";
import ContactHelmet from "@/components/ContactHelmet";

export default function Home() {
  return (
    <main>
      <section
        id="hero"
        className="h-[200vh] flex items-start justify-center pt-[28vh]"
      >
        <HeroText />
      </section>

      <SmartCitySection />

      <ProjectTourSection />

      <FinalCinematicSection />

      <section id="contact" className="relative py-32 px-6">
        {/* igloo-style contact heading */}
        <div className="max-w-lg mx-auto mb-14">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-neon-cyan/50 mb-3">
            /////// Contact
          </p>
          <h2 className="font-mono text-3xl sm:text-4xl font-bold leading-tight text-soft-white">
            Let&apos;s Build<br />Something.
          </h2>
          <div className="w-8 h-px mt-4" style={{ background: "rgba(45,226,230,0.35)" }} />
        </div>
        <ContactHelmet />
      </section>
    </main>
  );
}
