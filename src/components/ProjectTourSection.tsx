"use client";

import { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { gsap, ScrollTrigger } from "@/utils/gsap";
import { useProjectSelection } from "@/hooks/useProjectSelection";
import { PROJECT_LANDMARKS } from "@/scenes/projectLandmarks";

export default function ProjectTourSection() {
  return (
    <>
      {PROJECT_LANDMARKS.map((landmark, i) => (
        <section
          key={landmark.id}
          id={`project-tour-${i}`}
          className="relative h-[100vh]"
        >
          <div className="sticky top-0 h-screen pointer-events-none flex flex-col items-start justify-center px-6">
            <ProjectLabel landmark={landmark} index={i} />
          </div>
        </section>
      ))}
    </>
  );
}

function ProjectLabel({
  landmark,
  index,
}: {
  landmark: (typeof PROJECT_LANDMARKS)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { select } = useProjectSelection();

  useEffect(() => {
    if (!ref.current) return;
    const sectionId = `project-tour-${index}`;

    const fadeIn = gsap.fromTo(
      ref.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: `#${sectionId}`,
          start: "top 55%",
          end: "top 20%",
          scrub: 0.6,
        },
      }
    );

    const fadeOut = gsap.to(ref.current, {
      opacity: 0,
      y: -20,
      ease: "power2.in",
      scrollTrigger: {
        trigger: `#${sectionId}`,
        start: "bottom 60%",
        end: "bottom 20%",
        scrub: 0.6,
      },
    });

    return () => {
      fadeIn.scrollTrigger?.kill();
      fadeIn.kill();
      fadeOut.scrollTrigger?.kill();
      fadeOut.kill();
    };
  }, [index]);

  const handleEnter = useCallback(() => {
    select(landmark);
    setTimeout(() => {
      router.push(`/project/${landmark.id}`);
    }, 1200);
  }, [landmark, select, router]);

  return (
    <div ref={ref} className="opacity-0 max-w-xs">
      {/* Counter */}
      <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-neon-cyan/50 mb-3">
        PORTFOLIO_CO_{String(index + 1).padStart(2, "0")}
      </p>

      {/* Project name */}
      <h2 className="font-mono text-3xl sm:text-4xl font-bold leading-tight text-soft-white mb-1">
        {landmark.title}
      </h2>

      {/* Tag */}
      <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-neon-cyan/50 mb-2">
        {landmark.tag}
      </p>

      {/* Separator */}
      <div className="w-8 h-px bg-neon-cyan/30 mb-5" />

      {/* Enter button */}
      <button
        type="button"
        onClick={handleEnter}
        className="pointer-events-auto font-mono text-[11px] tracking-[0.2em] uppercase text-soft-white/60 hover:text-neon-cyan transition-colors border-b border-soft-white/20 hover:border-neon-cyan/50 pb-0.5"
      >
        Click to Explore →
      </button>
    </div>
  );
}
