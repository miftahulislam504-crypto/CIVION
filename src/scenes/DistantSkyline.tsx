"use client";

import * as THREE from "three";
import { buildingBoxGeometry, type Building } from "@/scenes/cityBuildings";

/**
 * The core city (CityScape) only spans ~±11 units — fine up close, but the
 * camera's final waypoint pulls out to (0,95,75), distance ~124 from
 * origin. At that height the core city reads as a tiny dot in an empty
 * grid. This renders a much sparser ring of plain silhouette boxes further
 * out (no setbacks/landmarks/detail, no rise animation, no overlay
 * particles) — just enough to suggest the city keeps going past what's
 * modeled in detail, the way a real skyline thins toward the horizon.
 * Cheap on purpose: one shared geometry, one material, no per-building
 * variation logic.
 */

const RING_INNER_RADIUS = 14;
const RING_OUTER_RADIUS = 70;
const RING_COUNT = 90;

export function generateDistantSkyline(): Building[] {
  const buildings: Building[] = [];

  for (let i = 0; i < RING_COUNT; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius =
      RING_INNER_RADIUS + Math.random() * (RING_OUTER_RADIUS - RING_INNER_RADIUS);

    buildings.push({
      position: [Math.cos(angle) * radius, 0, Math.sin(angle) * radius],
      width: 0.8 + Math.random() * 1.4,
      depth: 0.8 + Math.random() * 1.4,
      // Taller toward the inner edge (reads as denser downtown just past
      // the detailed core), shorter and sparser toward the outer edge.
      height:
        (1 - (radius - RING_INNER_RADIUS) / (RING_OUTER_RADIUS - RING_INNER_RADIUS)) *
          5 +
        0.6 +
        Math.random() * 2,
      variant: "simple",
      rotationY: (Math.random() - 0.5) * 0.3,
    });
  }

  return buildings;
}

export function DistantSkyline({ buildings }: { buildings: Building[] }) {
  return (
    <group>
      {buildings.map((b, i) => (
        <mesh
          key={i}
          geometry={buildingBoxGeometry}
          position={b.position}
          rotation={[0, b.rotationY, 0]}
          scale={[b.width, b.height, b.depth]}
        >
          <meshBasicMaterial color="#14161b" />
        </mesh>
      ))}
    </group>
  );
}
