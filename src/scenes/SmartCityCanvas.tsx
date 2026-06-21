"use client";

import { Canvas } from "@react-three/fiber";
import SmartCityCameraRig from "@/scenes/SmartCityCameraRig";
import SmartCityGrid from "@/scenes/SmartCityGrid";
import HolographicGrid from "@/scenes/HolographicGrid";
import Effects from "@/scenes/Effects";
import { useQualityTier } from "@/hooks/useQualityTier";

/**
 * Unlike CanvasBackground (Hero's page-fixed canvas), this one is local to
 * its own section — it fills whatever positioned ancestor it's placed in.
 * SmartCitySection wraps it in a sticky container so it still reads as
 * "pinned" to the viewport while its camera animates with scroll, and only
 * mounts this at all once scrolled near (see useInView in SmartCitySection).
 */
export default function SmartCityCanvas() {
  const tier = useQualityTier();

  return (
    <div className="absolute inset-0">
      <Canvas dpr={tier === "low" ? [1, 1] : [1, 2]} gl={{ antialias: true }}>
        <fog attach="fog" args={["#0a0a0b", 10, 40]} />
        <SmartCityCameraRig />
        <HolographicGrid size={50} />
        <SmartCityGrid count={tier === "low" ? 36 : 81} />
        {tier === "high" && <Effects />}
      </Canvas>
    </div>
  );
}
