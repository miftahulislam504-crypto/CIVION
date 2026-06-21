"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "@/utils/gsap";

/**
 * Small floating readout confirming scroll progress is being tracked.
 * Useful for debugging now; can stay on as a real HUD element later or
 * get folded into a shared scroll-progress hook once more components
 * need the same value (CameraRig currently tracks its own copy too).
 */
export default function ScrollHUD() {
  const valueRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        if (valueRef.current) {
          valueRef.current.textContent = `${Math.round(self.progress * 100)}%`;
        }
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed bottom-6 right-6 z-20 font-body text-xs tracking-[0.2em] text-neon-cyan/80"
    >
      SCROLL <span ref={valueRef}>0%</span>
    </div>
  );
}
