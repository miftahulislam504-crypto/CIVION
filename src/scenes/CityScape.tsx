"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Edges } from "@react-three/drei";
import { gsap } from "@/utils/gsap";

type Building = {
  position: [number, number, number];
  width: number;
  depth: number;
  height: number;
};

/**
 * Procedural skyline — no Blender asset exists (or is needed) for this.
 * A grid of jittered boxes, lit only by their own wireframe edges, reads
 * as a city silhouette from a distance and as a blueprint up close.
 */
function generateCity(count: number): Building[] {
  const gridSize = Math.round(Math.sqrt(count));
  const spacing = 2.4;
  const buildings: Building[] = [];

  for (let x = 0; x < gridSize; x++) {
    for (let z = 0; z < gridSize; z++) {
      const jitterX = (Math.random() - 0.5) * 0.7;
      const jitterZ = (Math.random() - 0.5) * 0.7;

      buildings.push({
        position: [
          (x - gridSize / 2) * spacing + jitterX,
          0,
          (z - gridSize / 2) * spacing + jitterZ,
        ],
        width: 0.7 + Math.random() * 0.7,
        depth: 0.7 + Math.random() * 0.7,
        height: 0.8 + Math.random() * 6.5,
      });
    }
  }

  return buildings;
}

export default function CityScape({
  rise,
  count = 64,
}: {
  rise: boolean;
  count?: number;
}) {
  const buildings = useMemo(() => generateCity(count), [count]);
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  // Pivot the unit box at its base so scaling grows it upward from y=0
  // instead of from its center.
  const baseGeometry = useMemo(() => {
    const geo = new THREE.BoxGeometry(1, 1, 1);
    geo.translate(0, 0.5, 0);
    return geo;
  }, []);

  // "Structures emerge from terrain" — stagger each building up from the
  // ground once the intro loader hands off.
  useEffect(() => {
    if (!rise) return;

    const tweens = meshRefs.current.map((mesh, i) => {
      if (!mesh) return null;
      return gsap.to(mesh.scale, {
        y: buildings[i].height,
        duration: 1.3,
        delay: 0.15 + i * 0.012,
        ease: "power3.out",
      });
    });

    return () => tweens.forEach((tween) => tween?.kill());
  }, [rise, buildings]);

  return (
    <group>
      {buildings.map((building, i) => (
        <mesh
          key={i}
          ref={(el) => {
            meshRefs.current[i] = el;
          }}
          geometry={baseGeometry}
          position={building.position}
          scale={[building.width, 0.01, building.depth]}
        >
          <meshBasicMaterial color="#10121a" transparent opacity={0.6} />
          <Edges color="#2de2e6" />
        </mesh>
      ))}
    </group>
  );
}
