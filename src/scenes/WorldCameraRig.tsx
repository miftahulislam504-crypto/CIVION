"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { gsap, ScrollTrigger } from "@/utils/gsap";
import { useIntroState } from "@/hooks/useIntroState";

/**
 * Single continuous camera path for the whole page. Replaces the old
 * per-section rigs (Hero's CameraRig, SmartCityCameraRig, FinalCameraRig)
 * which each lived in their own mounted/unmounted Canvas and reset the
 * camera back to a fresh starting point every time a new section scrolled
 * into view. This rig never resets — one ScrollTrigger spans the entire
 * document, and the camera moves smoothly through a single chain of
 * waypoints, the same way igloo.inc holds one scene and just keeps moving
 * the camera through it.
 *
 * IMPORTANT: waypoints are anchored to actual section positions, not a
 * blind even 0–1 split across total scroll. The original three rigs each
 * owned their own short section (e.g. SmartCity was exactly "180vh", and
 * its rig's t=0..1 only ever had to cover that one section). Once merged
 * into one rig spanning the WHOLE document — including blueprint,
 * structural, showcase, and files sections that have no camera waypoint of
 * their own — an even split would put e.g. the "rise above the city"
 * moment at a fixed fraction of total page height that has nothing to do
 * with where the Smart City section actually sits. Instead, each waypoint
 * is tagged with the id of the section it belongs to, and at runtime we
 * measure where that section actually starts/ends and build the curve's
 * t-mapping from that.
 */
const PATH_PRE_START = new THREE.Vector3(0, 14.5, 23); // cinematic arrival point, held during intro

type Waypoint = {
  pos: THREE.Vector3;
  /** Section id this waypoint should align with, and how far into that
   *  section's scroll range (0 = its top, 1 = its bottom). Sections with
   *  no waypoint of their own are simply passed through at a steady speed
   *  between their neighbors' waypoints. */
  anchorId: string;
  anchorFraction: number;
};

const WAYPOINTS: Waypoint[] = [
  { pos: new THREE.Vector3(0, 9.5, 15), anchorId: "hero", anchorFraction: 0.35 },
  { pos: new THREE.Vector3(0, 1.4, 1.5), anchorId: "hero", anchorFraction: 0.9 },
  { pos: new THREE.Vector3(0, 2, 14), anchorId: "smart-city", anchorFraction: 0.05 },
  { pos: new THREE.Vector3(0, 16, 0.1), anchorId: "smart-city", anchorFraction: 0.65 },
  { pos: new THREE.Vector3(0, 10, 22), anchorId: "final", anchorFraction: 0.05 },
  { pos: new THREE.Vector3(0, 95, 75), anchorId: "final", anchorFraction: 0.95 },
];

const ARRIVAL_DURATION = 2.6; // seconds — the slow dolly-in once the loader hands off

const PARALLAX_STRENGTH = new THREE.Vector2(2, 1.2);
const LOOK_SMOOTHING = 0.06;

const curve = new THREE.CatmullRomCurve3(
  WAYPOINTS.map((w) => w.pos),
  false,
  "catmullrom",
  0.4
);

/** Resolves each waypoint's document scroll-fraction (0–1 of total page
 *  height) by measuring its anchor section's actual offsetTop/height.
 *  Falls back to an even spread if a section isn't found (shouldn't
 *  happen, but guards against a renamed/removed id breaking the camera
 *  entirely). */
function resolveWaypointFractions(): number[] {
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (docHeight <= 0) {
    return WAYPOINTS.map((_, i) => i / (WAYPOINTS.length - 1));
  }

  return WAYPOINTS.map((w, i) => {
    const el = document.getElementById(w.anchorId);
    if (!el) return i / (WAYPOINTS.length - 1);
    const sectionStart = el.offsetTop;
    const sectionEnd = el.offsetTop + el.offsetHeight;
    const target = sectionStart + (sectionEnd - sectionStart) * w.anchorFraction;
    return THREE.MathUtils.clamp(target / docHeight, 0, 1);
  });
}

/** Given the document's current scroll fraction (0–1) and the resolved
 *  waypoint fractions, find where along the curve's own 0–1 parameter
 *  space we should sample — piecewise-linear between whichever two
 *  waypoint fractions the scroll position falls between. */
function scrollFractionToCurveT(scrollFraction: number, waypointFractions: number[]): number {
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
  const scrollFraction = useRef(0);
  const waypointFractions = useRef<number[]>(
    WAYPOINTS.map((_, i) => i / (WAYPOINTS.length - 1))
  );
  const lookTarget = useRef(new THREE.Vector3(0, 0, 0));
  const currentLook = useRef(new THREE.Vector3(0, 0, 0));
  const scrollDrivenPos = useRef(new THREE.Vector3());

  // 0 = camera sits at the far/high PRE_START arrival point (held while the
  // intro loader is up); 1 = fully handed off to scroll control.
  const arrival = useRef(0);

  useEffect(() => {
    // Resolve real section positions after layout settles (and again on
    // resize, since section heights can change with viewport width —
    // e.g. text reflow changes a section's offsetHeight).
    const resolve = () => {
      waypointFractions.current = resolveWaypointFractions();
    };
    resolve();

    const onResize = () => resolve();
    window.addEventListener("resize", onResize);

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
      window.removeEventListener("resize", onResize);
      trigger.kill();
    };
  }, []);

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
    const curveT = scrollFractionToCurveT(scrollFraction.current, waypointFractions.current);
    curve.getPoint(curveT, scrollDrivenPos.current);

    camera.position.lerpVectors(PATH_PRE_START, scrollDrivenPos.current, arrival.current);

    lookTarget.current.set(
      pointer.x * PARALLAX_STRENGTH.x,
      pointer.y * PARALLAX_STRENGTH.y,
      0
    );
    currentLook.current.lerp(lookTarget.current, LOOK_SMOOTHING);

    camera.lookAt(currentLook.current);
  });

  return null;
}
