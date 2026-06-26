"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { gsap, ScrollTrigger } from "@/utils/gsap";
import { useIntroState } from "@/hooks/useIntroState";
import { useProjectSelection } from "@/hooks/useProjectSelection";
import { PROJECT_LANDMARKS } from "@/scenes/projectLandmarks";

/**
 * WorldCameraRig — single continuous camera path for the whole page.
 *
 * Flow:
 *   Hero (descend) → Smart City (rise above skyline) →
 *   Project Tour (visit each building one by one, scroll-driven) →
 *   Final (pull out to orbit) → Contact
 *
 * Waypoints are anchored to real section IDs so positions don't shift
 * if section heights change. Project tour waypoints are anchored to
 * "project-tour-{index}" sections created by ProjectTourSection.
 *
 * When a building is clicked, focus override (0→1) lerps the camera
 * smoothly from the scroll path to that building's close-up position.
 */

const PATH_PRE_START = new THREE.Vector3(0, 14.5, 23);

type Waypoint = {
  pos: THREE.Vector3;
  lookAt: THREE.Vector3; // explicit lookAt per waypoint for more control
  anchorId: string;
  anchorFraction: number; // 0 = top of section, 1 = bottom
};

// ── Helper: compute a camera position slightly in front of a building ──
// Each building's cameraPosition is its "click zoom" position (very close).
// For the scroll tour we want a wider, more scenic framing — pull back a
// bit along the Z axis and raise the camera slightly.
function tourCamPos(cp: [number, number, number], bldgZ: number): THREE.Vector3 {
  // "in front" direction: if building is at negative Z we approach from
  // positive Z (and vice versa). Pull back 3-5 units further than the
  // click-zoom position so the whole building is framed, not just its base.
  const pullBack = bldgZ < 0 ? 4.5 : bldgZ > 3 ? -4.5 : 0;
  return new THREE.Vector3(cp[0], cp[1] + 1.2, cp[2] + pullBack);
}

function tourLookAt(la: [number, number, number]): THREE.Vector3 {
  return new THREE.Vector3(la[0], la[1], la[2]);
}

// ── Build waypoints ────────────────────────────────────────────────────
const HERO_WAYPOINTS: Waypoint[] = [
  {
    pos: new THREE.Vector3(0, 9.5, 15),
    lookAt: new THREE.Vector3(0, 0, 0),
    anchorId: "hero",
    anchorFraction: 0.35,
  },
  {
    pos: new THREE.Vector3(0, 1.4, 1.5),
    lookAt: new THREE.Vector3(0, 0, 0),
    anchorId: "hero",
    anchorFraction: 0.9,
  },
];

const SMART_CITY_WAYPOINTS: Waypoint[] = [
  {
    pos: new THREE.Vector3(0, 2, 14),
    lookAt: new THREE.Vector3(0, 0, 0),
    anchorId: "smart-city",
    anchorFraction: 0.05,
  },
  {
    pos: new THREE.Vector3(0, 16, 0.1),
    lookAt: new THREE.Vector3(0, 0, 0),
    anchorId: "smart-city",
    anchorFraction: 0.65,
  },
];

// প্রতিটা project building-এর জন্য একটা waypoint — section 50% এ থামে
const PROJECT_WAYPOINTS: Waypoint[] = PROJECT_LANDMARKS.map((lm, i) => ({
  pos: tourCamPos(lm.cameraPosition, lm.position[2]),
  lookAt: tourLookAt(lm.cameraLookAt),
  anchorId: `project-tour-${i}`,
  anchorFraction: 0.5,
}));

const FINAL_WAYPOINTS: Waypoint[] = [
  {
    pos: new THREE.Vector3(0, 10, 22),
    lookAt: new THREE.Vector3(0, 0, 0),
    anchorId: "final",
    anchorFraction: 0.05,
  },
  {
    pos: new THREE.Vector3(0, 95, 75),
    lookAt: new THREE.Vector3(0, 0, 0),
    anchorId: "final",
    anchorFraction: 0.95,
  },
];

const WAYPOINTS: Waypoint[] = [
  ...HERO_WAYPOINTS,
  ...SMART_CITY_WAYPOINTS,
  ...PROJECT_WAYPOINTS,
  ...FINAL_WAYPOINTS,
];

const ARRIVAL_DURATION = 2.6;
const PARALLAX_STRENGTH = new THREE.Vector2(2, 1.2);
const LOOK_SMOOTHING = 0.06;

// Position curve (CatmullRom through all waypoint positions)
const positionCurve = new THREE.CatmullRomCurve3(
  WAYPOINTS.map((w) => w.pos),
  false,
  "catmullrom",
  0.4
);

// LookAt curve (same — interpolates look targets smoothly)
const lookAtCurve = new THREE.CatmullRomCurve3(
  WAYPOINTS.map((w) => w.lookAt),
  false,
  "catmullrom",
  0.4
);

function resolveWaypointFractions(): number[] {
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (docHeight <= 0) {
    return WAYPOINTS.map((_, i) => i / (WAYPOINTS.length - 1));
  }

  return WAYPOINTS.map((w, i) => {
    const el = document.getElementById(w.anchorId);
    if (!el) return i / (WAYPOINTS.length - 1);
    const sectionStart = el.offsetTop;
    const sectionHeight = el.offsetHeight;
    const target = sectionStart + sectionHeight * w.anchorFraction;
    return THREE.MathUtils.clamp(target / docHeight, 0, 1);
  });
}

function scrollFractionToCurveT(
  scrollFraction: number,
  waypointFractions: number[]
): number {
  const segments = waypointFractions.length - 1;
  for (let i = 0; i < segments; i++) {
    const a = waypointFractions[i];
    const b = waypointFractions[i + 1];
    if (scrollFraction >= a && scrollFraction <= b) {
      const localT = b > a ? (scrollFraction - a) / (b - a) : 0;
      return (i + localT) / segments;
    }
  }
  return scrollFraction <= waypointFractions[0] ? 0 : 1;
}

export default function WorldCameraRig() {
  const { camera, pointer } = useThree();
  const { introDone } = useIntroState();
  const { selected } = useProjectSelection();

  const scrollFraction = useRef(0);
  const waypointFractions = useRef<number[]>(
    WAYPOINTS.map((_, i) => i / (WAYPOINTS.length - 1))
  );

  const currentLook = useRef(new THREE.Vector3(0, 0, 0));
  const scrollDrivenPos = useRef(new THREE.Vector3());
  const scrollDrivenLook = useRef(new THREE.Vector3());
  const scrollOrIntroPos = useRef(new THREE.Vector3());
  const parallaxOffset = useRef(new THREE.Vector3());

  const arrival = useRef(0);
  const focus = useRef(0);
  const focusTarget = useRef(new THREE.Vector3());
  const focusLookAt = useRef(new THREE.Vector3());

  // Focus tween: scroll path → building close-up
  useEffect(() => {
    const obj = { t: focus.current };
    const tween = gsap.to(obj, {
      t: selected ? 1 : 0,
      duration: selected ? 1.6 : 1.4,
      ease: "power3.inOut",
      onUpdate: () => {
        focus.current = obj.t;
      },
    });

    if (selected) {
      focusTarget.current.set(...selected.cameraPosition);
      focusLookAt.current.set(...selected.cameraLookAt);
    }

    return () => {
      tween.kill();
    };
  }, [selected]);

  // Scroll tracker + waypoint resolver
  useEffect(() => {
    const resolve = () => {
      waypointFractions.current = resolveWaypointFractions();
    };
    // Delay slightly to let all project-tour sections render and measure
    const timer = setTimeout(resolve, 100);

    window.addEventListener("resize", resolve);

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onRefresh: resolve,
      onUpdate: (self) => {
        scrollFraction.current = self.progress;
      },
    });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", resolve);
      trigger.kill();
    };
  }, []);

  // Intro arrival tween
  useEffect(() => {
    if (!introDone) return;
    const obj = { t: 0 };
    const tween = gsap.to(obj, {
      t: 1,
      duration: ARRIVAL_DURATION,
      ease: "power2.inOut",
      onUpdate: () => {
        arrival.current = obj.t;
      },
    });
    return () => {
      tween.kill();
    };
  }, [introDone]);

  useFrame(() => {
    const curveT = scrollFractionToCurveT(
      scrollFraction.current,
      waypointFractions.current
    );

    // Sample both position and lookAt curves at the same T
    positionCurve.getPoint(curveT, scrollDrivenPos.current);
    lookAtCurve.getPoint(curveT, scrollDrivenLook.current);

    // Blend 1: intro arrival (PRE_START → scroll path)
    scrollOrIntroPos.current
      .copy(PATH_PRE_START)
      .lerp(scrollDrivenPos.current, arrival.current);

    // Blend 2: focus override (scroll path → building close-up)
    camera.position.lerpVectors(
      scrollOrIntroPos.current,
      focusTarget.current,
      focus.current
    );

    // LookAt: scroll-driven lookAt + slight parallax offset, blends to
    // building's exact lookAt when focused
    parallaxOffset.current.set(
      pointer.x * PARALLAX_STRENGTH.x,
      pointer.y * PARALLAX_STRENGTH.y,
      0
    );

    // When touring (not focused), add subtle parallax to the curve's lookAt
    const baseLook = scrollDrivenLook.current
      .clone()
      .add(parallaxOffset.current.multiplyScalar(1 - focus.current));

    currentLook.current.lerp(
      focus.current > 0.5 ? focusLookAt.current : baseLook,
      LOOK_SMOOTHING
    );

    camera.lookAt(currentLook.current);
  });

  return null;
}
