"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { Building } from "@/scenes/cityBuildings";

const CITY_SPAN = 22; // matches the grid's spread, used to wrap traffic lanes

type Lane = {
  horizontal: boolean;
  offset: number;
  phase: number;
  speed: number;
};

function buildLanes(count: number): Lane[] {
  return Array.from({ length: count }, (_, i) => ({
    horizontal: i % 2 === 0,
    offset: (Math.floor(i / 2) - count / 4) * 2.4,
    phase: Math.random(),
    speed: 0.04 + Math.random() * 0.04,
  }));
}

function pickRandomBuildings(buildings: Building[], count: number): Building[] {
  return [...buildings].sort(() => Math.random() - 0.5).slice(0, count);
}

type DataStreamSource = { x: number; z: number; baseY: number; phase: number };

function buildDataStreamSources(
  buildings: Building[],
  count: number
): DataStreamSource[] {
  return pickRandomBuildings(buildings, count).map((b) => ({
    x: b.position[0],
    z: b.position[2],
    baseY: b.height,
    phase: Math.random(),
  }));
}

type EnergyPulseSource = { x: number; y: number; z: number; phase: number };

function buildEnergyPulseSources(
  buildings: Building[],
  count: number
): EnergyPulseSource[] {
  return pickRandomBuildings(buildings, count).map((b) => ({
    x: b.position[0],
    y: b.height + 0.05,
    z: b.position[2],
    phase: Math.random(),
  }));
}

export function TrafficFlows() {
  const count = 20;
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const lanes = useMemo(() => buildLanes(count), [count]);

  useFrame(({ clock }) => {
    refs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const lane = lanes[i];
      const t = (clock.elapsedTime * lane.speed + lane.phase) % 1;
      const pos = t * CITY_SPAN * 2 - CITY_SPAN;
      if (lane.horizontal) {
        mesh.position.set(pos, 0.05, lane.offset);
      } else {
        mesh.position.set(lane.offset, 0.05, pos);
      }
    });
  });

  return (
    <>
      {lanes.map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
        >
          <boxGeometry args={[0.3, 0.05, 0.12]} />
          <meshBasicMaterial color="#4d7cfe" />
        </mesh>
      ))}
    </>
  );
}

export function DataStreams({ buildings }: { buildings: Building[] }) {
  const count = 14;
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const sources = useMemo(
    () => buildDataStreamSources(buildings, count),
    [buildings, count]
  );

  useFrame(({ clock }) => {
    refs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const s = sources[i];
      const t = (clock.elapsedTime * 0.3 + s.phase) % 1;
      mesh.position.set(s.x, s.baseY + t * 4, s.z);
      const material = mesh.material as THREE.MeshBasicMaterial;
      material.opacity = 1 - t;
    });
  });

  return (
    <>
      {sources.map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
        >
          <boxGeometry args={[0.06, 0.5, 0.06]} />
          <meshBasicMaterial color="#2de2e6" transparent opacity={1} />
        </mesh>
      ))}
    </>
  );
}

export function EnergyPulses({ buildings }: { buildings: Building[] }) {
  const count = 6;
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const sources = useMemo(
    () => buildEnergyPulseSources(buildings, count),
    [buildings, count]
  );

  useFrame(({ clock }) => {
    refs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const s = sources[i];
      const t = (clock.elapsedTime * 0.4 + s.phase) % 1;
      mesh.position.set(s.x, s.y, s.z);
      mesh.scale.setScalar(0.2 + t * 2.2);
      const material = mesh.material as THREE.MeshBasicMaterial;
      material.opacity = 1 - t;
    });
  });

  return (
    <>
      {sources.map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <ringGeometry args={[0.3, 0.4, 24]} />
          <meshBasicMaterial
            color="#ff7a45"
            transparent
            opacity={1}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </>
  );
}
