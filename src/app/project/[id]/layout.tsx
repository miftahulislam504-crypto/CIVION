import type { Metadata } from "next";
import ProjectPageScrollRelease from "@/components/ProjectPageScrollRelease";

/**
 * Project detail pages get their own minimal layout — no 3D WorldScene,
 * no Lenis smooth scroll, no IntroLoader. Just a plain scrollable page.
 *
 * Next.js App Router: a layout.tsx here wraps the page INSIDE the root
 * layout. WorldScene, Lenis, and the custom cursor all mount in the
 * ROOT layout and stay mounted across this navigation, so:
 *   - ProjectPageScrollRelease actually calls lenis.stop()/start()
 *     (a real API call, not a CSS trick) so this page's native scroll
 *     is never fought by Lenis's wheel/touch listeners.
 *   - The CSS below only handles pure visuals (hiding the 3D canvas,
 *     cursor, audio toggle) — it no longer tries to neutralize Lenis's
 *     scroll transform, since that never actually stopped Lenis from
 *     intercepting input.
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
      <ProjectPageScrollRelease />
      {/* Hide the 3D city canvas and all its overlays on project pages */}
      <style>{`
        canvas { display: none !important; }
        [data-audio-toggle] { display: none !important; }
        [data-custom-cursor] { display: none !important; }
        body { cursor: auto !important; }
      `}</style>
      {children}
    </>
  );
}
