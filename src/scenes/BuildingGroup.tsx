"use client";

import * as THREE from "three";
import { Edges } from "@react-three/drei";
import {
  buildingBoxGeometry,
  beaconSphereGeometry,
  type Building,
} from "@/scenes/cityBuildings";

const PARAPET = 0.08; // thin roof lip, breaks up the flat box silhouette

const FILL = "#10121a";
const EDGE = "#2de2e6";

/**
 * Renders one building as a small composite of blueprint-style wireframe
 * parts rather than a single plain box. `detail` gates the richer variants
 * off on low-tier devices so the mesh count stays cheap there — same
 * silhouette as the original plain box.
 *
 * `groupRef` is exposed so CityScape can animate the whole composite's
 * scale.y for the "rises from the ground" intro effect — scaling the
 * outer group scales every child's height and y-position together,
 * exactly like the old single-mesh scale hack did, just generalized.
 */
export function BuildingGroup({
  building,
  detail = true,
  riseFrom,
  groupRef,
}: {
  building: Building;
  detail?: boolean;
  /** If set, the group renders pre-squashed to this Y scale (e.g. 0.02)
   *  so a caller can animate scale.y back up to 1 — used by CityScape's
   *  "rises from the ground" intro. Omit for full size immediately. */
  riseFrom?: number;
  groupRef?: (el: THREE.Group | null) => void;
}) {
  const { width, depth, height, variant } = building;
  const showVariant = detail && variant !== "simple";

  return (
    <group
      ref={groupRef}
      position={building.position}
      rotation={[0, building.rotationY, 0]}
      scale={[1, riseFrom ?? 1, 1]}
    >
      <mesh geometry={buildingBoxGeometry} scale={[width, height, depth]}>
        <meshBasicMaterial color={FILL} transparent opacity={0.6} />
        <Edges color={EDGE} />
      </mesh>

      {detail && (
        <mesh
          geometry={buildingBoxGeometry}
          position={[0, height, 0]}
          scale={[width + PARAPET, PARAPET, depth + PARAPET]}
        >
          <meshBasicMaterial color={FILL} transparent opacity={0.55} />
          <Edges color={EDGE} />
        </mesh>
      )}

      {showVariant && variant === "setback" && (
        <>
          <mesh
            geometry={buildingBoxGeometry}
            position={[0, height + PARAPET, 0]}
            scale={[width * 0.55, height * 0.4, depth * 0.55]}
          >
            <meshBasicMaterial color={FILL} transparent opacity={0.6} />
            <Edges color={EDGE} />
          </mesh>
          <mesh
            geometry={buildingBoxGeometry}
            position={[0, height + PARAPET + height * 0.4, 0]}
            scale={[width * 0.55 + PARAPET, PARAPET, depth * 0.55 + PARAPET]}
          >
            <meshBasicMaterial color={FILL} transparent opacity={0.55} />
            <Edges color={EDGE} />
          </mesh>
        </>
      )}

      {showVariant && variant === "landmark" && (
        <>
          {/* slim antenna/spire */}
          <mesh
            geometry={buildingBoxGeometry}
            position={[0, height + PARAPET, 0]}
            scale={[0.05, height * 0.28, 0.05]}
          >
            <meshBasicMaterial color={EDGE} />
          </mesh>
          {/* aviation-warning beacon — bright enough to bloom on its own */}
          <mesh
            geometry={beaconSphereGeometry}
            position={[0, height + PARAPET + height * 0.28, 0]}
            scale={[0.06, 0.06, 0.06]}
          >
            <meshBasicMaterial color="#ff7a45" />
          </mesh>
        </>
      )}
    </group>
  );
}
