"use client";

import { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { gsap, ScrollTrigger } from "@/utils/gsap";
import { useProjectSelection } from "@/hooks/useProjectSelection";
import { PROJECT_LANDMARKS } from "@/scenes/projectLandmarks";

/**
 * ProjectTourSection — scroll করলে camera একটা একটা করে প্রতিটা
 * project building-এ move করে (WorldCameraRig waypoints দিয়ে)।
 *
 * প্রতিটা building-এ:
 *   - Center-এ project নাম + tag + "Enter Building" button দেখায়
 *   - "Enter Building" click করলে:
 *       1. Camera zoom করে building-এর ভেতরে (focus override via select())
 *       2. 1.2s পর /project/[id] page-এ navigate করে
 *       3. নতুন page-এ: title, summary, description, stats, Visit Site link
 */
export default function ProjectTourSection() {
  return (
    <>
      {PROJECT_LANDMARKS.map((landmark, i) => (
        <section
          key={landmark.id}
          id={`project-tour-${i}`}
          className="relative h-[100vh]"
        >
          <div className="sticky top-0 h-screen pointer-events-none flex flex-col items-center justify-center px-6">
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

  // Fade in / fade out driven by this section's scroll position
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

  // Click: camera flies into building → then navigate to detail page
  const handleEnter = useCallback(() => {
    // 1. Trigger camera focus (WorldCameraRig zooms in)
    select(landmark);
    // 2. After camera zoom duration, navigate to detail page
    setTimeout(() => {
      router.push(`/project/${landmark.id}`);
    }, 1200);
  }, [landmark, select, router]);

  return (
    <div ref={ref} className="text-center opacity-0">
      {/* Counter */}
      <p className="font-body text-[10px] tracking-[0.35em] uppercase text-neon-cyan/50 mb-4">
        {String(index + 1).padStart(2, "0")} / {String(PROJECT_LANDMARKS.length).padStart(2, "0")}
      </p>

      {/* Project name */}
      <h2 className="font-display text-3xl sm:text-4xl mb-2 text-soft-white">
        {landmark.title}
      </h2>

      {/* Tag */}
      <p className="font-body text-xs tracking-[0.2em] uppercase text-neon-cyan/60 mb-8">
        {landmark.tag}
      </p>

      {/* Enter button — pointer-events-auto because parent is pointer-events-none */}
      <button
        type="button"
        onClick={handleEnter}
        className="pointer-events-auto inline-flex items-center gap-2 px-6 py-3 border border-neon-cyan/30 text-neon-cyan/80 font-body text-[11px] tracking-[0.25em] uppercase rounded-sm hover:border-neon-cyan hover:text-neon-cyan hover:bg-neon-cyan/5 active:scale-95 transition-all duration-300"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan/70 animate-pulse" />
        Enter Building
      </button>
    </div>
  );
}
