"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import {
  holographicGridVertexShader,
  holographicGridFragmentShader,
} from "@/shaders/holographicGrid";

/**
 * A flat, glowing, pulsing grid laid on the ground beneath the world.
 * Sized to extend past the farthest point the camera travels (see
 * WorldCameraRig's final waypoint) so the ground plane never runs out
 * from under the camera mid-scroll.
 */
export default function HolographicGrid({ size = 220 }: { size?: number }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#2de2e6") },
    }),
    []
  );

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.elapsedTime;
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
      <planeGeometry args={[size, size]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={holographicGridVertexShader}
        fragmentShader={holographicGridFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}
