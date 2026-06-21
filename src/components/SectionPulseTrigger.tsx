"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/utils/gsap";
import { useAudioEngine } from "@/components/AudioProvider";

const SECTION_IDS = [
  "blueprint",
  "structural",
  "smart-city",
  "showcase",
  "lab",
  "timeline",
  "final",
  "contact",
];

/**
 * Mounted once, globally — sets up one ScrollTrigger per major section
 * purely to fire a pulse sound on entry, rather than wiring this into
 * every section component individually.
 */
export default function SectionPulseTrigger() {
  const { playPulse } = useAudioEngine();

  useEffect(() => {
    const triggers = SECTION_IDS.map((id) =>
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: "top 60%",
        onEnter: () => playPulse(),
      })
    );

    return () => triggers.forEach((trigger) => trigger.kill());
    // playPulse reads live state via a ref internally, so it's intentionally
    // not in the dep array — re-running this on every render would
    // needlessly recreate every ScrollTrigger.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
