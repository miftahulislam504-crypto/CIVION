import * as THREE from "three";

/**
 * Shared building-layout generator, used once by WorldScene and rendered
 * by CityScape — one source of truth for the whole skyline.
 */
export type BuildingVariant = "simple" | "setback" | "landmark";

export type Building = {
  position: [number, number, number];
  width: number;
  depth: number;
  height: number;
  variant: BuildingVariant;
  rotationY: number;
};

// Roughly 1 in 16 buildings becomes a slim landmark tower with a beacon;
// another ~30% get a stepped-back upper block (tower-on-podium massing).
const LANDMARK_RATIO = 0.06;
const SETBACK_RATIO = 0.3;

export function generateCity(count: number): Building[] {
  const gridSize = Math.round(Math.sqrt(count));
  const spacing = 2.4;
  const buildings: Building[] = [];

  for (let x = 0; x < gridSize; x++) {
    for (let z = 0; z < gridSize; z++) {
      const jitterX = (Math.random() - 0.5) * 0.7;
      const jitterZ = (Math.random() - 0.5) * 0.7;

      const roll = Math.random();
      const variant: BuildingVariant =
        roll < LANDMARK_RATIO
          ? "landmark"
          : roll < LANDMARK_RATIO + SETBACK_RATIO
            ? "setback"
            : "simple";
      const isLandmark = variant === "landmark";

      buildings.push({
        position: [
          (x - gridSize / 2) * spacing + jitterX,
          0,
          (z - gridSize / 2) * spacing + jitterZ,
        ],
        width: isLandmark ? 0.5 + Math.random() * 0.25 : 0.7 + Math.random() * 0.7,
        depth: isLandmark ? 0.5 + Math.random() * 0.25 : 0.7 + Math.random() * 0.7,
        height: isLandmark ? 6.5 + Math.random() * 3.5 : 0.8 + Math.random() * 6.5,
        variant,
        // Tiny rotation so the skyline reads as settled, not grid-snapped.
        rotationY: (Math.random() - 0.5) * 0.06,
      });
    }
  }

  return buildings;
}

// One shared unit-box geometry (pivoted at its own base) for every building
// part across every scene — parts get their real size via mesh.scale, not
// their own geometry, so hundreds of building parts cost one geometry.
export const buildingBoxGeometry = (() => {
  const geo = new THREE.BoxGeometry(1, 1, 1);
  geo.translate(0, 0.5, 0);
  return geo;
})();

// Shared low-poly sphere for landmark beacon tips.
export const beaconSphereGeometry = new THREE.SphereGeometry(1, 8, 6);
