"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { ScrollTrigger } from "@/utils/gsap";

const PATH_START = new THREE.Vector3(0, 2, 14);
const PATH_END = new THREE.Vector3(0, 16, 0.1);

const PARALLAX_STRENGTH = new THREE.Vector2(1.2, 0.6);
const LOOK_SMOOTHING = 0.06;

export default function SmartCityCameraRig() {
  const { camera, pointer } = useThree();
  const progress = useRef(0);
  const lookTarget = useRef(new THREE.Vector3(0, 0, 0));
  const currentLook = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: "#smart-city",
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        progress.current = self.progress;
      },
    });

    return () => trigger.kill();
  }, []);

  useFrame(() => {
    camera.position.lerpVectors(PATH_START, PATH_END, progress.current);

    // Looking near the city center naturally reads as "looking down" once
    // the camera has risen — no extra angle math needed.
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
