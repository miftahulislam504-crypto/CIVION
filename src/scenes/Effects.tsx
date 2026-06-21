"use client";

import {
  EffectComposer,
  Bloom,
  Noise,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

/**
 * Shared across every 3D canvas (Hero, Smart City, Final Cinematic) so the
 * cinematic "glow" look stays consistent. Bloom is what actually makes the
 * neon-cyan wireframe edges read as glowing rather than flat-colored lines.
 */
export default function Effects() {
  return (
    <EffectComposer>
      <Bloom
        intensity={0.7}
        luminanceThreshold={0.15}
        luminanceSmoothing={0.4}
        mipmapBlur
      />
      <ChromaticAberration offset={[0.0006, 0.0006]} />
      <Noise opacity={0.035} blendFunction={BlendFunction.OVERLAY} />
    </EffectComposer>
  );
}
