"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { ScrollTrigger } from "@/utils/gsap";

/**
 * Hero flythrough path — starts high and back, descends into the city as
 * the user scrolls through the Hero section specifically (not the whole
 * page). Later phases will give each section its own dedicated path.
 */
const PATH_START = new THREE.Vector3(0, 9.5, 15);
const PATH_END = new THREE.Vector3(0, 1.4, 1.5);

// How far the camera's gaze drifts in response to mouse position.
const PARALLAX_STRENGTH = new THREE.Vector2(2, 1.2);
const LOOK_SMOOTHING = 0.06;

export default function CameraRig() {
  const { camera, pointer } = useThree();
  const scrollProgress = useRef(0);
  const lookTarget = useRef(new THREE.Vector3(0, 0, 0));
  const currentLook = useRef(new THREE.Vector3(0, 0, 0));

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

  useFrame(() => {
    // Scroll drives WHERE the camera is.
    camera.position.lerpVectors(PATH_START, PATH_END, scrollProgress.current);

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
