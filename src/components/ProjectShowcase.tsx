"use client";

import GlassPanel from "@/components/ui/GlassPanel";
import { useProjectSelection } from "@/hooks/useProjectSelection";

/**
 * ProjectShowcase — DOM overlay that appears when a landmark tower is
 * clicked. Shows the project name, Bengali summary, live stats, and a
 * "Visit Site" link that opens the actual deployed app. The panel slides
 * up from the bottom, and closes when the user taps "Back To City".
 *
 * Scroll is locked during the detail view (ProjectSelectionProvider
 * calls lenis.stop() on select and lenis.start() on close) so the
 * camera zoom-into-building transition never fights the scroll path.
 */
export default function ProjectShowcase() {
  const { selected, close } = useProjectSelection();

  return (
    <div className="relative min-h-[30vh] flex items-center justify-center px-6">
      {!selected && (
        <p className="font-body text-xs tracking-[0.3em] uppercase text-soft-white/40 animate-civion-pulse text-center">
          Tap A Building To Explore
        </p>
      )}

      {/* ── Detail panel — slides up from bottom on select ── */}
      <div
        className={`fixed inset-x-0 bottom-0 z-20 flex justify-center px-4 pb-6 transition-all duration-500 ease-out ${
          selected
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-8 pointer-events-none"
        }`}
      >
        {selected && (
          <GlassPanel className="w-full max-w-md p-6 sm:p-8">

            {/* Back button */}
            <button
              type="button"
              data-cursor-hover
              onClick={close}
              className="font-body text-[11px] tracking-[0.2em] uppercase text-soft-white/50 hover:text-neon-cyan transition-colors mb-5"
            >
              ‹ Back To City
            </button>

            {/* Meta row */}
            <p className="font-body text-[11px] tracking-[0.2em] uppercase text-neon-cyan/70 mb-1">
              {selected.location} — {selected.year}
            </p>

            {/* Title */}
            <h3 className="font-display text-2xl sm:text-3xl mb-1 leading-tight">
              {selected.title}
            </h3>

            {/* Tag line */}
            <p className="font-body text-xs tracking-[0.15em] uppercase text-neon-cyan/50 mb-4">
              {selected.tag}
            </p>

            {/* Bengali summary */}
            <p className="font-body text-sm text-soft-white/70 mb-6 leading-relaxed">
              {selected.summary}
            </p>

            {/* Stats grid */}
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

            {/* Action row — Visit Site + Close */}
            <div className="flex gap-3">
              <a
                href={selected.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
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
                data-cursor-hover
                onClick={close}
                className="px-5 py-2.5 rounded-sm border border-soft-white/20 text-soft-white/50 font-body text-xs tracking-[0.15em] uppercase hover:border-soft-white/40 hover:text-soft-white/80 transition-all duration-200"
              >
                Close
              </button>
            </div>
          </GlassPanel>
        )}
      </div>
    </div>
  );
}
