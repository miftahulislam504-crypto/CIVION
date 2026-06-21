"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { gsap, ScrollTrigger } from "@/utils/gsap";
import { useIntroState } from "@/hooks/useIntroState";

/**
 * Hero flythrough path — starts high and back, descends into the city as
 * the user scrolls through the Hero section specifically (not the whole
 * page). Later phases will give each section its own dedicated path.
 */
const PATH_PRE_START = new THREE.Vector3(0, 14.5, 23); // cinematic arrival point
const PATH_START = new THREE.Vector3(0, 9.5, 15);
const PATH_END = new THREE.Vector3(0, 1.4, 1.5);

const ARRIVAL_DURATION = 2.6; // seconds — the slow dolly-in once the loader hands off

// How far the camera's gaze drifts in response to mouse position.
const PARALLAX_STRENGTH = new THREE.Vector2(2, 1.2);
const LOOK_SMOOTHING = 0.06;

export default function CameraRig() {
  const { camera, pointer } = useThree();
  const { introDone } = useIntroState();
  const scrollProgress = useRef(0);
  const lookTarget = useRef(new THREE.Vector3(0, 0, 0));
  const currentLook = useRef(new THREE.Vector3(0, 0, 0));
  const scrollDrivenPos = useRef(new THREE.Vector3());

  // 0 = camera sits at the far/high PRE_START arrival point (held while the
  // intro loader is up); 1 = fully handed off to scroll control. Tweened
  // once on intro hand-off for a slow establishing dolly, not switched
  // instantly — so even if the user starts scrolling mid-arrival there's
  // no jump, just a continuous blend toward wherever scroll wants to be.
  const arrival = useRef(0);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
      },
    });

    return () => trigger.kill();
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
    // Where scroll alone would put the camera right now.
    scrollDrivenPos.current.lerpVectors(PATH_START, PATH_END, scrollProgress.current);

    // Blend from the far establishing point toward that scroll-driven
    // position as `arrival` rises from 0 to 1 — a slow cinematic dolly-in
    // that still hands off cleanly to scroll control once it completes.
    camera.position.lerpVectors(PATH_PRE_START, scrollDrivenPos.current, arrival.current);

    // Mouse drives WHERE the camera looks, smoothed so it never snaps.
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
