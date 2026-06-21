"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import * as THREE from "three";

const FILL = "#10121a";
const EDGE = "#2de2e6";
const BAND = "#ff7a45";

const DOME_RADIUS = 1;
const DOME_THETA = 1.15; // shallow cap angle — a hardhat dome, not a full hemisphere
const DOME_DROP = DOME_RADIUS * Math.cos(DOME_THETA); // shifts the cap so its rim sits at y=0

/**
 * A low-poly faceted dome reads as a geodesic shell in wireframe — the
 * same "structural" visual language as the city's wireframe buildings,
 * just literalized into a hardhat. Deliberately schematic, not literal,
 * so it sits comfortably next to the rest of the site rather than trying
 * (and failing) to look like a photoreal product render.
 */
export default function HelmetRig() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.22;
    groupRef.current.position.y = Math.sin(t * 0.9) * 0.05;
  });

  return (
    <group ref={groupRef}>
      {/* dome shell — faceted low-poly cap, edges read as a geodesic structure */}
      <mesh position={[0, -DOME_DROP, 0]}>
        <sphereGeometry args={[DOME_RADIUS, 9, 5, 0, Math.PI * 2, 0, DOME_THETA]} />
        <meshBasicMaterial color={FILL} transparent opacity={0.55} side={THREE.DoubleSide} />
        <Edges color={EDGE} threshold={1} />
      </mesh>

      {/* brim */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[DOME_RADIUS * 0.95, DOME_RADIUS * 1.32, 28]} />
        <meshBasicMaterial color={FILL} transparent opacity={0.6} side={THREE.DoubleSide} />
        <Edges color={EDGE} />
      </mesh>

      {/* hi-vis band — the one warm accent on an otherwise monochrome object */}
      <mesh position={[0, 0.04, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[DOME_RADIUS * 0.97, 0.016, 6, 32]} />
        <meshBasicMaterial color={BAND} />
      </mesh>
    </group>
  );
}
