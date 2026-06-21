"use client";

import GlassPanel from "@/components/ui/GlassPanel";
import Button from "@/components/ui/Button";
import { useProjectSelection } from "@/hooks/useProjectSelection";

/**
 * Used to pin this section and horizontally scroll-jack through a row of
 * project cards (GSAP ScrollTrigger pin:true) — its own flat DOM
 * carousel, fully disconnected from the 3D world. Two problems with that
 * for what we're building now: (1) it's exactly the "text list" pattern
 * we're moving away from, and (2) a pinned section stretches a fixed
 * screen-height of real scroll into a much longer virtual scroll
 * distance, which would have badly distorted WorldCameraRig's
 * scroll-to-curve mapping through this part of the page.
 *
 * The 4 projects are now landmark towers placed directly in the city (see
 * ProjectLandmarks inside WorldScene) — tapping one flies the camera in
 * (WorldCameraRig's focus override) and opens the detail panel below,
 * igloo.inc-style: the object IS the entry point, not a card describing
 * it. This component only owns: (1) a small hint label while nothing is
 * selected, prompting the user to tap a tower, and (2) the detail panel
 * that appears once one is selected.
 */
export default function ProjectShowcase() {
  const { selected, close } = useProjectSelection();

  return (
    <div className="relative min-h-[30vh] flex items-center justify-center px-6">
      {!selected && (
        <p className="font-body text-xs tracking-[0.3em] uppercase text-soft-white/40 animate-civion-pulse text-center">
          Tap A Tower To Explore
        </p>
      )}

      <div
        className={`fixed inset-x-0 bottom-0 z-20 flex justify-center px-4 pb-6 transition-all duration-500 ease-out ${
          selected
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-6 pointer-events-none"
        }`}
      >
        {selected && (
          <GlassPanel className="w-full max-w-md p-6 sm:p-8">
            <button
              type="button"
              data-cursor-hover
              onClick={close}
              className="font-body text-[11px] tracking-[0.2em] uppercase text-soft-white/50 hover:text-neon-cyan transition-colors mb-4"
            >
              ‹ Back To City
            </button>

            <p className="font-body text-[11px] tracking-[0.2em] uppercase text-neon-cyan/70 mb-1">
              {selected.location} — {selected.year}
            </p>
            <h3 className="font-display text-2xl sm:text-3xl mb-2">{selected.title}</h3>
            <p className="font-body text-sm text-soft-white/60 mb-6">{selected.tag}</p>

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

            <Button variant="solid" onClick={close}>
              Close
            </Button>
          </GlassPanel>
        )}
      </div>
    </div>
  );
}
