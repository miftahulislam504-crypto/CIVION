"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/utils/gsap";
import { useProjectSelection } from "@/hooks/useProjectSelection";
import { PROJECT_LANDMARKS } from "@/scenes/projectLandmarks";
import GlassPanel from "@/components/ui/GlassPanel";

/**
 * ProjectTourSection — scroll করলে camera একটা একটা করে প্রতিটা
 * project building-এ move করে। প্রতিটা project-এর জন্য 100vh sticky
 * section আছে — scroll করলে camera সেই building-এর সামনে থামে,
 * building-এর নাম + tag center-এ দেখায়, এবং "Click to Enter" hint থাকে।
 * Building click করলে WorldCameraRig-এর focus override কাজ করে
 * (ProjectSelectionProvider থেকে) — camera ভেতরে zoom করে।
 *
 * Camera movement: WorldCameraRig এর waypoints এই section-এর
 * প্রতিটা project sub-section-এর সাথে anchor করা।
 * Sub-section id: "project-tour-{index}" (0-based)
 */
export default function ProjectTourSection() {
  const { selected, select, close } = useProjectSelection();
  const panelRef = useRef<HTMLDivElement>(null);

  // Detail panel slide-up যখন selected হয়
  useEffect(() => {
    if (!panelRef.current) return;
    if (selected) {
      gsap.to(panelRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.45,
        ease: "power3.out",
      });
    } else {
      gsap.to(panelRef.current, {
        y: 32,
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
      });
    }
  }, [selected]);

  return (
    <>
      {/* প্রতিটা project-এর জন্য একটা 100vh section */}
      {PROJECT_LANDMARKS.map((landmark, i) => (
        <section
          key={landmark.id}
          id={`project-tour-${i}`}
          className="relative h-[100vh]"
        >
          {/* Sticky overlay — camera এই building-এর সামনে থাকলে দেখায় */}
          <div className="sticky top-0 h-screen pointer-events-none flex flex-col items-center justify-center px-6">
            <ProjectLabel
              landmark={landmark}
              index={i}
              onSelect={() => select(landmark)}
            />
          </div>
        </section>
      ))}

      {/* Detail panel — building click করলে slide up হয় */}
      <div
        ref={panelRef}
        className="fixed inset-x-0 bottom-0 z-30 flex justify-center px-4 pb-6 pointer-events-none"
        style={{ opacity: 0, transform: "translateY(32px)" }}
      >
        {selected && (
          <div className="pointer-events-auto w-full max-w-md">
            <GlassPanel className="p-6 sm:p-8">
              {/* Back button */}
              <button
                type="button"
                onClick={close}
                className="font-body text-[11px] tracking-[0.2em] uppercase text-soft-white/50 hover:text-neon-cyan transition-colors mb-5"
              >
                ‹ Back
              </button>

              {/* Meta */}
              <p className="font-body text-[11px] tracking-[0.2em] uppercase text-neon-cyan/70 mb-1">
                {selected.location} — {selected.year}
              </p>

              {/* Title */}
              <h3 className="font-display text-2xl sm:text-3xl mb-1 leading-tight">
                {selected.title}
              </h3>

              {/* Tag */}
              <p className="font-body text-xs tracking-[0.15em] uppercase text-neon-cyan/50 mb-4">
                {selected.tag}
              </p>

              {/* Bengali summary */}
              <p className="font-body text-sm text-soft-white/70 mb-6 leading-relaxed">
                {selected.summary}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-6 border-t border-deep-space pt-4">
                {selected.stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="font-body text-[10px] tracking-[0.15em] uppercase text-soft-white/40">
                      {stat.label}
                    </p>
                    <p className="font-display text-sm sm:text-base text-neon-cyan">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <a
                  href={selected.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm bg-neon-cyan/10 border border-neon-cyan/40 text-neon-cyan font-body text-xs tracking-[0.15em] uppercase hover:bg-neon-cyan/20 hover:border-neon-cyan transition-all duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-3.5 h-3.5 shrink-0"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h5a.75.75 0 0 1 0 1.5h-5Z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M6.194 12.753a.75.75 0 0 0 1.06.053L16.5 4.44v2.81a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.553l-9.056 8.194a.75.75 0 0 0-.053 1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Visit Site
                </a>
                <button
                  type="button"
                  onClick={close}
                  className="px-5 py-2.5 rounded-sm border border-soft-white/20 text-soft-white/50 font-body text-xs tracking-[0.15em] uppercase hover:border-soft-white/40 hover:text-soft-white/80 transition-all duration-200"
                >
                  Close
                </button>
              </div>
            </GlassPanel>
          </div>
        )}
      </div>
    </>
  );
}

// ── প্রতিটা building-এর জন্য center label ──────────────────────────────
function ProjectLabel({
  landmark,
  index,
  onSelect,
}: {
  landmark: (typeof PROJECT_LANDMARKS)[0];
  index: number;
  onSelect: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const sectionId = `project-tour-${index}`;

    // Fade in যখন এই section viewport-এ আসে, fade out যখন চলে যায়
    const tween = gsap.fromTo(
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

    // Fade out যখন পরের section আসে
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
      tween.scrollTrigger?.kill();
      tween.kill();
      fadeOut.scrollTrigger?.kill();
      fadeOut.kill();
    };
  }, [index]);

  return (
    <div ref={ref} className="text-center opacity-0">
      {/* Project number */}
      <p className="font-body text-[10px] tracking-[0.35em] uppercase text-neon-cyan/50 mb-3">
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

      {/* Click to enter — pointer-events-auto কারণ parent pointer-events-none */}
      <button
        type="button"
        onClick={onSelect}
        className="pointer-events-auto inline-flex items-center gap-2 px-6 py-2.5 border border-neon-cyan/30 text-neon-cyan/70 font-body text-[11px] tracking-[0.25em] uppercase rounded-sm hover:border-neon-cyan hover:text-neon-cyan hover:bg-neon-cyan/5 transition-all duration-300"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan/60 animate-pulse" />
        Enter Building
      </button>
    </div>
  );
}
