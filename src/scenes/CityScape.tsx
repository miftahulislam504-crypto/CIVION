"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "@/utils/gsap";
import type { Building } from "@/scenes/cityBuildings";
import { BuildingGroup } from "@/scenes/BuildingGroup";

/**
 * Procedural skyline renderer — see cityBuildings.ts for the shared
 * generator and BuildingGroup.tsx for the per-building composite
 * (parapet / setback / landmark variants). This file only owns the
 * "structures emerge from terrain" rise effect.
 *
 * Takes the building layout as a prop (rather than generating its own via
 * generateCity) so WorldScene can generate ONE array and share it with both
 * this and the overlay systems (TrafficFlows/DataStreams/EnergyPulses) —
 * otherwise each would roll its own random layout and the particles
 * wouldn't line up with the buildings actually on screen.
 */
export default function CityScape({
  buildings,
  rise,
  detail = true,
}: {
  buildings: Building[];
  rise: boolean;
  detail?: boolean;
}) {
  const groupRefs = useRef<(THREE.Group | null)[]>([]);

  // Stagger each building's composite group up from the ground once the
  // intro loader hands off. Animating the GROUP's scale.y (rather than a
  // single mesh's) scales every part — base, parapet, setback/spire —
  // together, so the whole composite grows in proportion.
  useEffect(() => {
    if (!rise) return;

    const tweens = groupRefs.current.map((group, i) => {
      if (!group) return null;
      return gsap.to(group.scale, {
        y: 1,
        duration: 1.4,
        delay: 0.15 + i * 0.013,
        ease: "power3.out",
      });
    });

    return () => tweens.forEach((tween) => tween?.kill());
  }, [rise, buildings]);

  return (
    <group>
      {buildings.map((building, i) => (
        <BuildingGroup
          key={i}
          building={building}
          detail={detail}
          riseFrom={0.02}
          groupRef={(el) => {
            groupRefs.current[i] = el;
          }}
        />
      ))}
    </group>
  );
}
