"use client";

import { useEffect } from "react";
import { useLenis } from "@/hooks/useLenis";
import { useProjectSelection } from "@/hooks/useProjectSelection";

/**
 * Project detail pages (/project/[id]) are plain scrollable HTML pages —
 * they don't use Lenis or the 3D WorldScene. But Lenis, WorldScene, and
 * ProjectSelectionProvider all live in the ROOT layout, so they stay
 * mounted (and Lenis stays in whatever stop/start state it was left in)
 * across the navigation into this page.
 *
 * The previous approach tried to neutralize Lenis with a CSS override
 * (`transform: none !important` etc). That doesn't work — Lenis still
 * owns the wheel/touch event listeners on <html>/<body> and keeps
 * intercepting input even when its visual transform is overridden,
 * which is what made this page feel "stuck" / impossible to scroll.
 *
 * This component actually calls the real Lenis API instead of fighting
 * it with CSS:
 *   - on mount: lenis.stop() is a no-op if already stopped (from the
 *     "Click to Explore" 3D transition), but if the user landed here
 *     some other way, this guarantees Lenis won't try to smooth-scroll
 *     a page it doesn't control.
 *   - on unmount (navigating back to "/"): lenis.start() so the home
 *     page's smooth scroll resumes, and close() clears the stale
 *     project selection so WorldCameraRig doesn't still think a
 *     building is "selected" the next time the 3D scene is visible.
 */
export default function ProjectPageScrollRelease() {
  const lenis = useLenis();
  const { close } = useProjectSelection();

  useEffect(() => {
    lenis?.stop();

    return () => {
      lenis?.start();
      close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lenis]);

  return null;
}
