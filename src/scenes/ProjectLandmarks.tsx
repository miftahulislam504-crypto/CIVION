"use client";

import { useState } from "react";
import { Edges } from "@react-three/drei";
import {
  buildingBoxGeometry,
  beaconSphereGeometry,
} from "@/scenes/cityBuildings";
import { PROJECT_LANDMARKS, type ProjectLandmark } from "@/scenes/projectLandmarks";

const FILL = "#10121a";
const EDGE = "#2de2e6";
const EDGE_HOVER = "#ff7a45";
const PARAPET = 0.1;

/**
 * The 4 portfolio projects, rendered as distinct landmark towers within
 * the city — taller and more slender than the procedural fill, each with
 * its own beacon, so they read as deliberately placed rather than random
 * skyline variety. Clicking/tapping one is the entry point into that
 * project's detail view (see WorldScene's selectedProject state, which
 * this component reports up to via onSelect).
 *
 * Hover/click use R3F's native pointer events (backed by three.js
 * raycasting against each mesh) — the first place in this codebase a 3D
 * object responds to pointer interaction directly, as opposed to a DOM
 * button layered on top of a canvas (see ContactHelmet's pattern, which
 * doesn't need this since its helmet isn't individually selectable).
 */
export function ProjectLandmarks({
  activeId,
  onSelect,
}: {
  activeId: string | null;
  onSelect: (landmark: ProjectLandmark) => void;
}) {
  return (
    <group>
      {PROJECT_LANDMARKS.map((landmark) => (
        <LandmarkTower
          key={landmark.id}
          landmark={landmark}
          dimmed={activeId !== null && activeId !== landmark.id}
          onSelect={onSelect}
        />
      ))}
    </group>
  );
}

function LandmarkTower({
  landmark,
  dimmed,
  onSelect,
}: {
  landmark: ProjectLandmark;
  dimmed: boolean;
  onSelect: (landmark: ProjectLandmark) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const { width, depth, height } = landmark;
  const edgeColor = hovered ? EDGE_HOVER : EDGE;

  return (
    <group position={landmark.position}>
      <mesh
        geometry={buildingBoxGeometry}
        scale={[width, height, depth]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(landmark);
        }}
      >
        <meshBasicMaterial
          color={FILL}
          transparent
          opacity={dimmed ? 0.25 : hovered ? 0.75 : 0.6}
        />
        <Edges color={edgeColor} />
      </mesh>

      {/* parapet */}
      <mesh
        geometry={buildingBoxGeometry}
        position={[0, height, 0]}
        scale={[width + PARAPET, PARAPET, depth + PARAPET]}
      >
        <meshBasicMaterial color={FILL} transparent opacity={dimmed ? 0.2 : 0.55} />
        <Edges color={edgeColor} />
      </mesh>

      {/* spire */}
      <mesh
        geometry={buildingBoxGeometry}
        position={[0, height + PARAPET, 0]}
        scale={[0.05, height * 0.22, 0.05]}
      >
        <meshBasicMaterial color={edgeColor} transparent={dimmed} opacity={dimmed ? 0.3 : 1} />
      </mesh>

      {/* beacon — pulsing-bright marker that reads from a distance,
          orange like the procedural landmark variant's beacon so the
          "this is a notable tower" visual language stays consistent. */}
      <mesh
        geometry={beaconSphereGeometry}
        position={[0, height + PARAPET + height * 0.22, 0]}
        scale={[0.08, 0.08, 0.08]}
      >
        <meshBasicMaterial color="#ff7a45" transparent={dimmed} opacity={dimmed ? 0.3 : 1} />
      </mesh>

      {/* Wider hit target around the tower — makes tapping a thin/tall
          building easier on touch devices than the visible mesh's actual
          footprint would allow. IMPORTANT: uses a fully transparent
          material rather than `visible={false}` — three.js's Raycaster
          skips any object with visible === false entirely (since v72), so
          a visible-false mesh would never receive clicks at all. */}
      <mesh
        position={[0, height / 2, 0]}
        scale={[width + 0.6, height, depth + 0.6]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(landmark);
        }}
        geometry={buildingBoxGeometry}
      >
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
}
