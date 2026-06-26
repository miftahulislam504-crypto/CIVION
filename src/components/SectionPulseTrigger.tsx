"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/utils/gsap";
import { useAudioEngine } from "@/components/AudioProvider";
import { PROJECT_LANDMARKS } from "@/scenes/projectLandmarks";

const STATIC_SECTION_IDS = [
  "smart-city",
  "final",
  "contact",
];

export default function SectionPulseTrigger() {
  const { playPulse } = useAudioEngine();

  useEffect(() => {
    const staticTriggers = STATIC_SECTION_IDS.map((id) =>
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: "top 60%",
        onEnter: () => playPulse(),
      })
    );

    // প্রতিটা project building-এ পৌঁছালে pulse sound
    const projectTriggers = PROJECT_LANDMARKS.map((_, i) =>
      ScrollTrigger.create({
        trigger: `#project-tour-${i}`,
        start: "top 55%",
        onEnter: () => playPulse(),
      })
    );

    return () => {
      [...staticTriggers, ...projectTriggers].forEach((t) => t.kill());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
