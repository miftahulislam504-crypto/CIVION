"use client";

import { Canvas } from "@react-three/fiber";
import HelmetRig from "@/scenes/HelmetRig";
import HolographicGrid from "@/scenes/HolographicGrid";
import Effects from "@/scenes/Effects";
import { useQualityTier } from "@/hooks/useQualityTier";

export default function HelmetCanvas() {
  const tier = useQualityTier();

  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={tier === "low" ? [1, 1] : [1, 2]}
        gl={{ antialias: true }}
        camera={{ position: [0, 0.3, 3.4], fov: 32 }}
      >
        <fog attach="fog" args={["#0a0a0b", 3, 7]} />
        <HolographicGrid size={5} />
        <HelmetRig />
        {tier === "high" && <Effects />}
      </Canvas>
    </div>
  );
}
