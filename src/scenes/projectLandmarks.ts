import * as THREE from "three";

/**
 * The 4 portfolio projects, each placed at a FIXED position within the
 * city (not part of the random generateCity() fill) so they have stable
 * coordinates to raycast against and to fly the camera to. Carried over
 * from the old ProjectShowcase card data — same titles/stats, now objects
 * in the world instead of a horizontal-scroll card list.
 *
 * Positions are hand-placed inside the core city's footprint (city spans
 * roughly ±11 units — see cityBuildings.ts) at spots that don't collide
 * with the procedural grid's likely building centers, spaced apart enough
 * that the camera can frame each one individually when zooming in.
 */
export type ProjectStat = { label: string; value: string };

export type ProjectLandmark = {
  id: string;
  title: string;
  location: string;
  year: string;
  tag: string;
  stats: ProjectStat[];
  position: [number, number, number];
  /** Footprint + height for the landmark's main tower volume. Taller and
   *  more slender than the average procedural building so it reads as
   *  deliberately placed, not just another block in the grid. */
  width: number;
  depth: number;
  height: number;
  /** Camera framing position when zoomed into this landmark, and the
   *  point the camera looks at while there (usually the building's own
   *  position, slightly above its base). */
  cameraPosition: [number, number, number];
  cameraLookAt: [number, number, number];
};

export const PROJECT_LANDMARKS: ProjectLandmark[] = [
  {
    id: "civilos-structural",
    title: "CivilOS Structural",
    location: "Bangladesh",
    year: "2025",
    tag: "Structural engineering, end to end",
    stats: [
      { label: "Modules", value: "20+" },
      { label: "Compliance", value: "BNBC 2020" },
      { label: "Status", value: "Live" },
    ],
    position: [-6.5, 0, -4.5],
    width: 0.9,
    depth: 0.9,
    height: 11,
    cameraPosition: [-5.4, 2.4, -2.3],
    cameraLookAt: [-6.5, 4, -4.5],
  },
  {
    id: "architectural-drawing",
    title: "Architectural Drawing App",
    location: "Bangladesh",
    year: "2025",
    tag: "CAD/BIM in the browser",
    stats: [
      { label: "Phases", value: "12" },
      { label: "Export", value: "PDF / SVG" },
      { label: "Status", value: "Live" },
    ],
    position: [6.5, 0, -4.5],
    width: 0.9,
    depth: 0.9,
    height: 9.5,
    cameraPosition: [7.6, 2.1, -2.3],
    cameraLookAt: [6.5, 3.5, -4.5],
  },
  {
    id: "civilos-hub",
    title: "CivilOS Hub",
    location: "Bangladesh",
    year: "2024",
    tag: "The ecosystem's data backbone",
    stats: [
      { label: "Role", value: "Data Backbone" },
      { label: "Backend", value: "Firebase" },
      { label: "Status", value: "In Progress" },
    ],
    position: [-6.5, 0, 4.5],
    width: 0.9,
    depth: 0.9,
    height: 10.5,
    cameraPosition: [-5.4, 2.3, 6.7],
    cameraLookAt: [-6.5, 3.8, 4.5],
  },
  {
    id: "build-enginex",
    title: "Build Engineering Hub",
    location: "Bangladesh",
    year: "2024",
    tag: "Construction materials, online",
    stats: [
      { label: "Type", value: "E-Commerce" },
      { label: "Payments", value: "bKash / Nagad" },
      { label: "Status", value: "Live" },
    ],
    position: [6.5, 0, 4.5],
    width: 0.9,
    depth: 0.9,
    height: 8.5,
    cameraPosition: [7.6, 2, 6.7],
    cameraLookAt: [6.5, 3.2, 4.5],
  },
];

/** A small exclusion radius around each landmark, used when generating the
 *  random city fill so procedural buildings don't spawn on top of a
 *  landmark's position. */
export const LANDMARK_EXCLUSION_RADIUS = 1.6;

export function isNearLandmark(x: number, z: number): boolean {
  return PROJECT_LANDMARKS.some((landmark) => {
    const dx = landmark.position[0] - x;
    const dz = landmark.position[2] - z;
    return Math.sqrt(dx * dx + dz * dz) < LANDMARK_EXCLUSION_RADIUS;
  });
}

export const landmarkVector = (landmark: ProjectLandmark) =>
  new THREE.Vector3(...landmark.position);
