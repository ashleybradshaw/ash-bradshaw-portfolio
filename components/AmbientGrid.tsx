"use client";

import { useEffect, useRef, type CSSProperties } from "react";

export function AmbientGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const coordsRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef(0);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) {
      return;
    }

    const apply = () => {
      frameRef.current = 0;
      node.style.setProperty("--mouse-x", `${coordsRef.current.x}px`);
      node.style.setProperty("--mouse-y", `${coordsRef.current.y}px`);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      coordsRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };

      if (!frameRef.current) {
        frameRef.current = window.requestAnimationFrame(apply);
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      style={
        {
          "--mouse-x": "50%",
          "--mouse-y": "50%",
        } as CSSProperties
      }
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "8px 8px",
          maskImage:
            "radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), #000 0%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), #000 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
