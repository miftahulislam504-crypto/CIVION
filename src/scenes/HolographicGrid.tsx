"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import {
  holographicGridVertexShader,
  holographicGridFragmentShader,
} from "@/shaders/holographicGrid";

/**
 * A flat, glowing, pulsing grid laid on the ground beneath a scene —
 * reused by Hero, Smart City, and Final Cinematic so the "engineering HUD"
 * grid language carries through every 3D scene, not just the 2D sections.
 */
export default function HolographicGrid({ size = 60 }: { size?: number }) {
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
