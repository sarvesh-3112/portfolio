"use client";
import { useEffect, useRef } from "react";

export default function MouseSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      ref={ref}
      className="fixed pointer-events-none z-0 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        background: "radial-gradient(circle, rgba(108,99,255,0.04) 0%, transparent 60%)",
        transition: "left 0.15s ease, top 0.15s ease",
      }}
    />
  );
}
