export const holographicGridVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const holographicGridFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor;
  varying vec2 vUv;

  void main() {
    vec2 grid = abs(fract(vUv * 40.0 - 0.5) - 0.5) / fwidth(vUv * 40.0);
    float line = min(grid.x, grid.y);
    float gridMask = 1.0 - min(line, 1.0);

    float dist = distance(vUv, vec2(0.5));
    float fade = smoothstep(0.5, 0.0, dist);
    float pulse = 0.5 + 0.5 * sin(uTime * 0.6 - dist * 12.0);

    vec3 color = uColor * gridMask * fade * (0.4 + 0.6 * pulse);
    gl_FragColor = vec4(color, gridMask * fade * 0.8);
  }
`;
