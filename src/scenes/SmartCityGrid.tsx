"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { Edges } from "@react-three/drei";
import { TrafficFlows, DataStreams, EnergyPulses } from "@/scenes/SmartCitySystems";

export type Building = {
  position: [number, number, number];
  width: number;
  depth: number;
  height: number;
};

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

export default function SmartCityGrid({ count = 81 }: { count?: number }) {
  const buildings = useMemo(() => generateCity(count), [count]);

  const baseGeometry = useMemo(() => {
    const geo = new THREE.BoxGeometry(1, 1, 1);
    geo.translate(0, 0.5, 0);
    return geo;
  }, []);

  return (
    <group>
      {buildings.map((building, i) => (
        <mesh
          key={i}
          geometry={baseGeometry}
          position={building.position}
          scale={[building.width, building.height, building.depth]}
        >
          <meshBasicMaterial color="#10121a" transparent opacity={0.6} />
          <Edges color="#2de2e6" />
        </mesh>
      ))}

      <TrafficFlows />
      <DataStreams buildings={buildings} />
      <EnergyPulses buildings={buildings} />
    </group>
  );
}
