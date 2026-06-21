"use client";

import { useMemo } from "react";

function generateStarPositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const radius = 40 + Math.random() * 60;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] =
      Math.abs(radius * Math.sin(phi) * Math.sin(theta)) + 10; // biased above the city
    positions[i * 3 + 2] = radius * Math.cos(phi);
  }
  return positions;
}

export default function StarField({ count = 800 }: { count?: number }) {
  const positions = useMemo(() => generateStarPositions(count), [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#f4f4f2"
        size={0.15}
        sizeAttenuation
        transparent
        opacity={0.7}
      />
    </points>
  );
}
