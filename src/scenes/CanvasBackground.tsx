"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import CameraRig from "@/scenes/CameraRig";
import CityScape from "@/scenes/CityScape";
import HolographicGrid from "@/scenes/HolographicGrid";
import Effects from "@/scenes/Effects";
import { useIntroState } from "@/hooks/useIntroState";
import { useQualityTier } from "@/hooks/useQualityTier";

/**
 * Lives once in the root layout, fixed behind all scrolling HTML content.
 * Unlike the section-local canvases, this one can't be unmounted when
 * scrolled away from (Hero needs it ready to go from the very top of the
 * page) — so instead we pause its render loop entirely (frameloop="never")
 * once Hero is no longer anywhere near the viewport, and resume it when
 * scrolling back. This was a known gap flagged since Phase 3.
 */
export default function CanvasBackground() {
  const { introDone } = useIntroState();
  const tier = useQualityTier();
  const [heroNearby, setHeroNearby] = useState(true);

  useEffect(() => {
    const heroEl = document.getElementById("hero");
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHeroNearby(entry.isIntersecting),
      { rootMargin: "400px" }
    );
    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        dpr={tier === "low" ? [1, 1] : [1, 2]}
        gl={{ antialias: true }}
        frameloop={heroNearby ? "always" : "never"}
      >
        <fog attach="fog" args={["#0a0a0b", 9, 34]} />
        <CameraRig />
        <HolographicGrid />
        <CityScape
          rise={introDone}
          detail={tier === "high"}
          count={tier === "low" ? 36 : 64}
        />
        {tier === "high" && <Effects />}
      </Canvas>
    </div>
  );
}
