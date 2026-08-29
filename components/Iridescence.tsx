"use client";

import { Color, Mesh, Program, Renderer, Triangle, Vec2, Vec3 } from "ogl";
import { useEffect, useRef } from "react";

const vertexShader = /* glsl */ `
attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

const fragmentShader = /* glsl */ `
precision highp float;

uniform float uTime;
uniform vec3 uColor;
uniform vec3 uResolution;
uniform vec2 uMouse;
uniform float uAmplitude;
uniform float uSpeed;

varying vec2 vUv;

void main() {
  float mr = min(uResolution.x, uResolution.y);
  vec2 uv = (vUv.xy * 2.0 - 1.0) * uResolution.xy / mr;

  uv += (uMouse - vec2(0.5)) * uAmplitude;

  float d = -uTime * 0.5 * uSpeed;
  float a = 0.0;
  for (float i = 0.0; i < 8.0; ++i) {
    a += cos(i - d - a * uv.x);
    d += sin(uv.y * i + a);
  }
  d += uTime * 0.5 * uSpeed;
  vec3 col = vec3(cos(uv * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5);
  col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5) * uColor;
  gl_FragColor = vec4(col, 1.0);
}
`;

const DEFAULT_COLOR: [number, number, number] = [
  19 / 255,
  1 / 255,
  76 / 255,
];

function parseCssColor(value: string): [number, number, number] | null {
  const hex = value.trim();
  const match = /^#?([0-9a-f]{6})$/i.exec(hex);
  if (!match) {
    return null;
  }
  const n = Number.parseInt(match[1], 16);
  return [(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

type IridescenceProps = {
  color?: [number, number, number];
  speed?: number;
  amplitude?: number;
  mouseReact?: boolean;
  className?: string;
};

export function Iridescence({
  color = DEFAULT_COLOR,
  speed = 0.45,
  amplitude = 0.08,
  mouseReact = false,
  className = "",
}: IridescenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const renderer = new Renderer({
      alpha: true,
      antialias: false,
      dpr: Math.min(window.devicePixelRatio || 1, 1.5),
      powerPreference: "low-power",
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    const canvas = gl.canvas;
    canvas.style.cssText =
      "position:absolute;inset:0;display:block;width:100%;height:100%;pointer-events:none;";
    container.appendChild(canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new Color(...color) },
        uResolution: { value: new Vec3() },
        uMouse: { value: new Vec2(0.5, 0.5) },
        uAmplitude: { value: amplitude },
        uSpeed: { value: prefersReducedMotion ? 0 : speed },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });

    let frame = 0;
    let visible = true;
    let lastAccent = "";

    const syncColor = () => {
      const accent = getComputedStyle(container)
        .getPropertyValue("--hero-accent")
        .trim();
      if (accent === lastAccent) {
        return;
      }
      lastAccent = accent;
      const parsed = parseCssColor(accent) ?? color;
      program.uniforms.uColor.value.set(parsed[0], parsed[1], parsed[2]);
    };

    const resize = () => {
      const width = Math.max(1, container.clientWidth);
      const height = Math.max(1, container.clientHeight);
      renderer.setSize(width, height);
      program.uniforms.uResolution.value.set(
        gl.canvas.width,
        gl.canvas.height,
        gl.canvas.width / gl.canvas.height,
      );
    };

    const update = (time: number) => {
      frame = requestAnimationFrame(update);
      if (!visible) {
        return;
      }
      syncColor();
      program.uniforms.uTime.value = prefersReducedMotion ? 0 : time * 0.001;
      renderer.render({ scene: mesh });
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      program.uniforms.uMouse.value.set(
        (event.clientX - rect.left) / rect.width,
        1 - (event.clientY - rect.top) / rect.height,
      );
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();
    syncColor();

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = Boolean(entry?.isIntersecting);
      },
      { rootMargin: "80px" },
    );
    intersectionObserver.observe(container);

    if (mouseReact) {
      container.addEventListener("mousemove", handleMouseMove);
    }

    frame = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      if (mouseReact) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
      if (container.contains(canvas)) {
        container.removeChild(canvas);
      }
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [amplitude, color, mouseReact, speed]);

  return <div ref={containerRef} className={className} aria-hidden="true" />;
}
