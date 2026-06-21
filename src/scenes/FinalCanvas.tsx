"use client";

import { Canvas } from "@react-three/fiber";
import FinalCameraRig from "@/scenes/FinalCameraRig";
import SmartCityGrid from "@/scenes/SmartCityGrid";
import StarField from "@/scenes/StarField";
import HolographicGrid from "@/scenes/HolographicGrid";
import Effects from "@/scenes/Effects";
import { useQualityTier } from "@/hooks/useQualityTier";

/**
 * Deliberately reuses SmartCityGrid rather than building a near-duplicate
 * city — narratively this IS the same city, just seen from much farther
 * away as the camera exits its atmosphere.
 */
export default function FinalCanvas() {
  const tier = useQualityTier();

  return (
    <div className="absolute inset-0">
      <Canvas dpr={tier === "low" ? [1, 1] : [1, 2]} gl={{ antialias: true }}>
        <fog attach="fog" args={["#0a0a0b", 30, 110]} />
        <FinalCameraRig />
        <StarField count={tier === "low" ? 300 : 800} />
        <HolographicGrid size={50} />
        <SmartCityGrid count={tier === "low" ? 36 : 81} />
        {tier === "high" && <Effects />}
      </Canvas>
    </div>
  );
}
