import * as THREE from "three";

/**
 * All portfolio projects, each placed at a FIXED position within the
 * city so they have stable coordinates to raycast against and to fly
 * the camera to. Each landmark is a taller, more distinct tower so
 * it reads as deliberately placed, not just another block in the grid.
 *
 * Layout: arranged in a rough grid across the city footprint (±11 units).
 * 13 projects spread across 4 rows:
 *   Row A (z=-8):  4 buildings   — deep back row
 *   Row B (z=-3):  3 buildings   — mid-back
 *   Row C (z=+2):  3 buildings   — mid-front
 *   Row D (z=+7):  3 buildings   — front row
 */

export type ProjectStat = { label: string; value: string };

export type ProjectLandmark = {
  id: string;
  title: string;
  summary: string;
  url: string;
  location: string;
  year: string;
  tag: string;
  stats: ProjectStat[];
  position: [number, number, number];
  width: number;
  depth: number;
  height: number;
  cameraPosition: [number, number, number];
  cameraLookAt: [number, number, number];
};

export const PROJECT_LANDMARKS: ProjectLandmark[] = [
  // ── Row A  (z = -8, deepest back row) ──────────────────────────────
  {
    id: "admin-brotherfit",
    title: "Admin BrotherFit",
    summary:
      "BrotherFit ফিটনেস প্ল্যাটফর্মের অ্যাডমিন ড্যাশবোর্ড। ইউজার ম্যানেজমেন্ট, কন্টেন্ট মডারেশন এবং analytics সব এক জায়গায়।",
    url: "https://admin-brotherfit.vercel.app",
    location: "Bangladesh",
    year: "2026",
    tag: "Admin Dashboard",
    stats: [
      { label: "Type", value: "Admin" },
      { label: "Stack", value: "Next.js" },
      { label: "Status", value: "Live" },
    ],
    position: [-9, 0, -8],
    width: 0.85, depth: 0.85, height: 10.5,
    cameraPosition: [-7.6, 2.4, -6.0],
    cameraLookAt: [-9, 4.0, -8],
  },
  {
    id: "brotherfit",
    title: "BrotherFit",
    summary:
      "বাংলাদেশের ফিটনেস কমিউনিটির জন্য একটি সামাজিক প্ল্যাটফর্ম। ওয়ার্কআউট ট্র্যাকিং, ডায়েট প্ল্যান এবং কমিউনিটি চ্যালেঞ্জ।",
    url: "https://brotherfit.vercel.app",
    location: "Bangladesh",
    year: "2026",
    tag: "Fitness Social Platform",
    stats: [
      { label: "Type", value: "Social" },
      { label: "Stack", value: "Next.js + Firebase" },
      { label: "Status", value: "Live" },
    ],
    position: [-3, 0, -8],
    width: 0.85, depth: 0.85, height: 12,
    cameraPosition: [-1.6, 2.5, -6.0],
    cameraLookAt: [-3, 4.5, -8],
  },
  {
    id: "ummahnet",
    title: "UmmahNet",
    summary:
      "মুসলিম কমিউনিটির জন্য একটি সামাজিক নেটওয়ার্ক। ইসলামিক কন্টেন্ট শেয়ারিং, হালাল ইভেন্ট ম্যানেজমেন্ট এবং দাওয়াহ প্ল্যাটফর্ম।",
    url: "https://ummahnet.vercel.app",
    location: "Bangladesh",
    year: "2026",
    tag: "Muslim Social Network",
    stats: [
      { label: "Type", value: "Social" },
      { label: "Backend", value: "Firebase" },
      { label: "Status", value: "Live" },
    ],
    position: [3, 0, -8],
    width: 0.85, depth: 0.85, height: 9,
    cameraPosition: [4.4, 2.2, -6.0],
    cameraLookAt: [3, 3.5, -8],
  },
  {
    id: "enginex-archdrawing",
    title: "Enginex Arch Drawing",
    summary:
      "ব্রাউজারে সরাসরি আর্কিটেকচারাল ড্রয়িং তৈরির টুল। BNBC অনুযায়ী ফ্লোর প্ল্যান, এলিভেশন এবং সেকশন ড্রয়িং করা যায়। PDF/SVG এক্সপোর্ট সাপোর্ট।",
    url: "https://enginex-archdrawing.vercel.app",
    location: "Bangladesh",
    year: "2025",
    tag: "CAD / BIM in Browser",
    stats: [
      { label: "Phases", value: "12" },
      { label: "Export", value: "PDF / SVG" },
      { label: "Standard", value: "BNBC" },
    ],
    position: [9, 0, -8],
    width: 0.85, depth: 0.85, height: 11,
    cameraPosition: [10.4, 2.4, -6.0],
    cameraLookAt: [9, 4.0, -8],
  },

  // ── Row B  (z = -3, mid-back) ───────────────────────────────────────
  {
    id: "civion",
    title: "CIVION",
    summary:
      "তুমি এখন যেখানে আছো — এটি আমার 3D পোর্টফোলিও সাইট। Three.js দিয়ে তৈরি একটি interactive city যেখানে প্রতিটি বিল্ডিং একটি প্রজেক্ট।",
    url: "https://mrcivion.vercel.app",
    location: "Bangladesh",
    year: "2026",
    tag: "3D Portfolio — You Are Here",
    stats: [
      { label: "Engine", value: "Three.js" },
      { label: "Framework", value: "Next.js" },
      { label: "Status", value: "Live" },
    ],
    position: [-6, 0, -3],
    width: 1.0, depth: 1.0, height: 14,
    cameraPosition: [-4.5, 3.0, -0.8],
    cameraLookAt: [-6, 5.5, -3],
  },
  {
    id: "enginex-hub",
    title: "Enginex Hub",
    summary:
      "CivilOS ইকোসিস্টেমের কেন্দ্রীয় ড্যাশবোর্ড। সব engineering টুলের gateway — auth, user profile, project history এবং নেভিগেশন এক জায়গায়।",
    url: "https://enginex-hub.vercel.app",
    location: "Bangladesh",
    year: "2024",
    tag: "Ecosystem Data Backbone",
    stats: [
      { label: "Role", value: "Gateway" },
      { label: "Backend", value: "Firebase" },
      { label: "Status", value: "In Progress" },
    ],
    position: [0, 0, -3],
    width: 0.85, depth: 0.85, height: 10,
    cameraPosition: [1.5, 2.3, -0.8],
    cameraLookAt: [0, 3.8, -3],
  },
  {
    id: "enginex-structural",
    title: "Enginex Structural",
    summary:
      "BNBC 2020 ও ACI 318-19 মেনে পুরো structural design করার টুল। Beam, Column, Slab, Footing, Shear Wall — সব মডিউল আছে। DXF export ও seismic analysis সহ।",
    url: "https://enginex-structural.vercel.app",
    location: "Bangladesh",
    year: "2025",
    tag: "Structural Engineering End-to-End",
    stats: [
      { label: "Modules", value: "20+" },
      { label: "Compliance", value: "BNBC 2020" },
      { label: "Status", value: "Live" },
    ],
    position: [6, 0, -3],
    width: 0.85, depth: 0.85, height: 13,
    cameraPosition: [7.5, 2.7, -0.8],
    cameraLookAt: [6, 5.0, -3],
  },

  // ── Row C  (z = +2, mid-front) ──────────────────────────────────────
  {
    id: "enginex-learning",
    title: "Enginex Learning",
    summary:
      "বাংলা ভাষায় civil engineering শেখার প্ল্যাটফর্ম। MCQ, Viva, Flashcard মোড সহ BNBC সিলেবাস ভিত্তিক কোর্স। পরীক্ষার প্রস্তুতির জন্য আদর্শ।",
    url: "https://enginex-learning.vercel.app",
    location: "Bangladesh",
    year: "2024",
    tag: "Bengali Civil Eng. Learning",
    stats: [
      { label: "Modes", value: "MCQ/Viva/Flash" },
      { label: "Language", value: "Bengali" },
      { label: "Status", value: "Live" },
    ],
    position: [-7, 0, 2],
    width: 0.85, depth: 0.85, height: 9.5,
    cameraPosition: [-5.5, 2.2, 4.2],
    cameraLookAt: [-7, 3.6, 2],
  },
  {
    id: "enginex-projectmgmt",
    title: "Enginex Project Mgmt",
    summary:
      "বাংলাদেশের construction প্রজেক্টের জন্য project management সফটওয়্যার। Gantt chart, progress tracking, team coordination এবং RAJUK/CDA compliance।",
    url: "https://enginex-projectmgmt.vercel.app",
    location: "Bangladesh",
    year: "2024",
    tag: "Construction PM Tool",
    stats: [
      { label: "Type", value: "PM Software" },
      { label: "Standard", value: "RAJUK/CDA" },
      { label: "Status", value: "Live" },
    ],
    position: [0, 0, 2],
    width: 0.85, depth: 0.85, height: 8.5,
    cameraPosition: [1.5, 2.1, 4.2],
    cameraLookAt: [0, 3.2, 2],
  },
  {
    id: "enginex-estimate",
    title: "Enginex Estimate",
    summary:
      "বাংলাদেশের construction বাজার মূল্য অনুযায়ী automated cost estimation। রড, সিমেন্ট, ইট সহ সব material-এর BOQ তৈরি করে এবং report export করে।",
    url: "https://enginex-estimate.vercel.app",
    location: "Bangladesh",
    year: "2024",
    tag: "Construction Cost Estimator",
    stats: [
      { label: "Materials", value: "Local BD" },
      { label: "Export", value: "PDF / Excel" },
      { label: "Status", value: "Live" },
    ],
    position: [7, 0, 2],
    width: 0.85, depth: 0.85, height: 11,
    cameraPosition: [8.5, 2.4, 4.2],
    cameraLookAt: [7, 4.0, 2],
  },

  // ── Row D  (z = +7, front row) ──────────────────────────────────────
  {
    id: "build-enginex",
    title: "Build Enginex",
    summary:
      "বাংলাদেশের construction materials-এর অনলাইন মার্কেটপ্লেস। রড, সিমেন্ট, বালি থেকে শুরু করে সব building material। bKash ও SSLCommerz payment সাপোর্ট।",
    url: "https://build-enginex.vercel.app",
    location: "Bangladesh",
    year: "2024",
    tag: "Construction E-Commerce BD",
    stats: [
      { label: "Type", value: "E-Commerce" },
      { label: "Payments", value: "bKash / SSL" },
      { label: "Status", value: "Live" },
    ],
    position: [-7, 0, 7],
    width: 0.85, depth: 0.85, height: 10,
    cameraPosition: [-5.5, 2.3, 9.2],
    cameraLookAt: [-7, 3.8, 7],
  },
  {
    id: "enginex-reports",
    title: "Enginex Reports",
    summary:
      "Engineering calculation এর professional PDF রিপোর্ট তৈরির টুল। Structural, estimate, এবং BOQ রিপোর্ট BNBC compliant ফরম্যাটে auto-generate করে।",
    url: "https://enginex-reports.vercel.app",
    location: "Bangladesh",
    year: "2024",
    tag: "Engineering Report Generator",
    stats: [
      { label: "Output", value: "PDF" },
      { label: "Standard", value: "BNBC" },
      { label: "Status", value: "Live" },
    ],
    position: [0, 0, 7],
    width: 0.85, depth: 0.85, height: 7.5,
    cameraPosition: [1.5, 2.0, 9.2],
    cameraLookAt: [0, 2.8, 7],
  },
  {
    id: "brotherfit-universe",
    title: "BrotherFit Universe",
    summary:
      "BrotherFit এর বিস্তারিত ecosystem — fitness challenges, leaderboards, এবং community events। গেমিফিকেশন দিয়ে ব্যায়ামকে আনন্দদায়ক করে তোলে।",
    url: "https://brotherfituniverse.vercel.app",
    location: "Bangladesh",
    year: "2026",
    tag: "Gamified Fitness Ecosystem",
    stats: [
      { label: "Feature", value: "Leaderboard" },
      { label: "Type", value: "Gamified" },
      { label: "Status", value: "Live" },
    ],
    position: [7, 0, 7],
    width: 0.85, depth: 0.85, height: 9,
    cameraPosition: [8.5, 2.2, 9.2],
    cameraLookAt: [7, 3.5, 7],
  },
];

/** A small exclusion radius around each landmark so procedural buildings
 *  don't spawn on top of a landmark's position. */
export const LANDMARK_EXCLUSION_RADIUS = 1.8;

export function isNearLandmark(x: number, z: number): boolean {
  return PROJECT_LANDMARKS.some((landmark) => {
    const dx = landmark.position[0] - x;
    const dz = landmark.position[2] - z;
    return Math.sqrt(dx * dx + dz * dz) < LANDMARK_EXCLUSION_RADIUS;
  });
}

export const landmarkVector = (landmark: ProjectLandmark) =>
  new THREE.Vector3(...landmark.position);
