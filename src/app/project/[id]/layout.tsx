import type { Metadata } from "next";

/**
 * Project detail pages get their own minimal layout — no 3D WorldScene,
 * no Lenis smooth scroll, no IntroLoader. Just a plain scrollable page.
 *
 * Next.js App Router: a layout.tsx here wraps the page INSIDE the root
 * layout, but we use a CSS override to restore native scroll and hide
 * the fixed 3D canvas that the root layout mounts globally.
 */
export const metadata: Metadata = {
  title: "CIVION",
};

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Hide the 3D city canvas and all its overlays on project pages */}
      <style>{`
        /* Hide WorldScene canvas */
        canvas { display: none !important; }
        /* Hide AudioToggle, SoundOff button */
        [data-audio-toggle] { display: none !important; }
        /* Restore native scroll — Lenis adds data-lenis-prevent or
           transforms <html>; we override to ensure normal page scroll */
        html, body {
          overflow: auto !important;
          height: auto !important;
          transform: none !important;
        }
        [data-lenis-wrapper], [data-lenis-content] {
          transform: none !important;
          overflow: visible !important;
          height: auto !important;
        }
        /* Hide custom cursor on these pages */
        [data-custom-cursor] { display: none !important; }
        body { cursor: auto !important; }
      `}</style>
      {children}
    </>
  );
}
