"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "@/utils/gsap";

/**
 * Returns the document scroll-fraction (0–1) at which a given element id's
 * top and bottom currently sit, re-measured on ScrollTrigger refresh
 * (layout changes, resize) so callers never have to hand-guess "this
 * section is roughly 45% of the way down the page" — a guess that breaks
 * the moment any earlier section's height changes (text reflow, a new
 * project card, etc).
 *
 * Returns a ref (not state) since this feeds useFrame loops where we want
 * to read the latest value without triggering React re-renders.
 */
export function useSectionScrollRange(id: string) {
  const range = useRef<{ start: number; end: number }>({ start: 0, end: 1 });

  useEffect(() => {
    const resolve = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const el = document.getElementById(id);
      if (!el || docHeight <= 0) return;

      range.current = {
        start: el.offsetTop / docHeight,
        end: (el.offsetTop + el.offsetHeight) / docHeight,
      };
    };

    resolve();
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onRefresh: resolve,
    });
    window.addEventListener("resize", resolve);

    return () => {
      trigger.kill();
      window.removeEventListener("resize", resolve);
    };
  }, [id]);

  return range;
}
