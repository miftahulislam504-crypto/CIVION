"use client";

import { useState } from "react";
import { Edges } from "@react-three/drei";
import { Html } from "@react-three/drei";
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
 * All portfolio projects rendered as distinct landmark towers within the
 * city — taller and more slender than the procedural fill, each with its
 * own beacon and a floating HTML label above it so the user can identify
 * every project without having to click first.
 *
 * Label visibility: always shown (not just on hover) so the city reads
 * as a navigable portfolio from the moment the intro hand-off completes.
 * The label fades to a lighter tint on hover, acting as a subtle "ready
 * to interact" cue. On click, onSelect fires and WorldCameraRig zooms
 * the camera toward that building's cameraPosition/cameraLookAt pair.
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
  const labelY = height + PARAPET + height * 0.22 + 0.6; // just above the beacon

  return (
    <group position={landmark.position}>
      {/* ── Main tower mesh ── */}
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
          opacity={dimmed ? 0.25 : hovered ? 0.8 : 0.6}
        />
        <Edges color={edgeColor} />
      </mesh>

      {/* ── Parapet ── */}
      <mesh
        geometry={buildingBoxGeometry}
        position={[0, height, 0]}
        scale={[width + PARAPET, PARAPET, depth + PARAPET]}
      >
        <meshBasicMaterial
          color={FILL}
          transparent
          opacity={dimmed ? 0.2 : 0.55}
        />
        <Edges color={edgeColor} />
      </mesh>

      {/* ── Spire ── */}
      <mesh
        geometry={buildingBoxGeometry}
        position={[0, height + PARAPET, 0]}
        scale={[0.05, height * 0.22, 0.05]}
      >
        <meshBasicMaterial
          color={edgeColor}
          transparent={dimmed}
          opacity={dimmed ? 0.3 : 1}
        />
      </mesh>

      {/* ── Beacon ── */}
      <mesh
        geometry={beaconSphereGeometry}
        position={[0, height + PARAPET + height * 0.22, 0]}
        scale={[0.08, 0.08, 0.08]}
      >
        <meshBasicMaterial
          color="#ff7a45"
          transparent={dimmed}
          opacity={dimmed ? 0.3 : 1}
        />
      </mesh>

      {/* ── Floating HTML label ── */}
      <Html
        position={[0, labelY, 0]}
        center
        distanceFactor={18}
        occlude={false}
        style={{ pointerEvents: "none" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2px",
            opacity: dimmed ? 0.2 : hovered ? 1 : 0.65,
            transition: "opacity 0.25s ease",
            userSelect: "none",
          }}
        >
          {/* Connecting line from label to beacon */}
          <div
            style={{
              width: "1px",
              height: "12px",
              background: hovered ? "#ff7a45" : "#2de2e6",
              transition: "background 0.2s ease",
              marginBottom: "2px",
            }}
          />
          {/* Project name tag */}
          <div
            style={{
              fontFamily: "monospace",
              fontSize: "9px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: hovered ? "#ff7a45" : "#2de2e6",
              background: "rgba(10, 10, 11, 0.75)",
              border: `1px solid ${hovered ? "rgba(255,122,69,0.5)" : "rgba(45,226,230,0.3)"}`,
              padding: "2px 7px",
              whiteSpace: "nowrap",
              transition: "color 0.2s ease, border-color 0.2s ease",
              maxWidth: "120px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              textAlign: "center",
            }}
          >
            {landmark.title}
          </div>
        </div>
      </Html>

      {/* ── Wide invisible hit target (easier tap on mobile) ── */}
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
