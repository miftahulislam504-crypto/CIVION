"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { gsap } from "@/utils/gsap";
import { generateCity } from "@/scenes/cityBuildings";
import { BuildingGroup } from "@/scenes/BuildingGroup";

/**
 * Procedural skyline for the Hero canvas — see cityBuildings.ts for the
 * shared generator and BuildingGroup.tsx for the per-building composite
 * (parapet / setback / landmark variants). This file only owns the
 * "structures emerge from terrain" rise effect.
 */
export default function CityScape({
  rise,
  detail = true,
  count = 64,
}: {
  rise: boolean;
  detail?: boolean;
  count?: number;
}) {
  const buildings = useMemo(() => generateCity(count), [count]);
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
