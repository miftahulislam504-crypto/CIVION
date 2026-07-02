"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "@/hooks/useLenis";

/**
 * InfiniteScrollLoop — makes the one-way cinematic scroll journey feel
 * endless. When the user is already at (or essentially at) the bottom
 * of the page and keeps trying to scroll further down, we smooth-scroll
 * back to the top instead of just stopping — like the page wraps around.
 *
 * Deliberately conservative about *when* it triggers:
 *   - Only near the very bottom (within BOTTOM_THRESHOLD px), so normal
 *     scrolling through the site is completely unaffected.
 *   - Requires a couple of "extra" downward scroll attempts once at the
 *     bottom (not the single scroll tick that lands you there), so
 *     arriving at the contact section doesn't itself trigger the loop.
 *   - Has a cooldown after looping so the wheel/touch momentum that's
 *     still settling right after the reset can't immediately re-trigger
 *     another loop.
 *
 * Listens to wheel + touch directly (rather than only Lenis's "scroll"
 * event) because once Lenis reports progress === 1, it stops emitting
 * further scroll deltas for continued downward input — we need the raw
 * input events to know the user is still pushing past the end.
 */

const BOTTOM_THRESHOLD = 4; // px of scrollable distance considered "at bottom"
const TRIGGER_ATTEMPTS = 2; // downward inputs needed at bottom before looping
const COOLDOWN_MS = 1200;

export default function InfiniteScrollLoop() {
  const lenis = useLenis();
  const attemptsRef = useRef(0);
  const coolingDownRef = useRef(false);

  useEffect(() => {
    if (!lenis) return;

    const isAtBottom = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return false;
      return scrollable - window.scrollY <= BOTTOM_THRESHOLD;
    };

    const loopToTop = () => {
      coolingDownRef.current = true;
      attemptsRef.current = 0;
      lenis.scrollTo(0, {
        duration: 1.8,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
      });
      window.setTimeout(() => {
        coolingDownRef.current = false;
      }, COOLDOWN_MS);
    };

    const registerDownwardAttempt = () => {
      if (coolingDownRef.current) return;
      if (!isAtBottom()) {
        attemptsRef.current = 0;
        return;
      }
      attemptsRef.current += 1;
      if (attemptsRef.current >= TRIGGER_ATTEMPTS) {
        loopToTop();
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) registerDownwardAttempt();
    };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0]?.clientY ?? 0;
      // Swiping upward on the screen = scrolling down the page
      if (touchStartY - currentY > 8) {
        registerDownwardAttempt();
        touchStartY = currentY;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [lenis]);

  return null;
}
