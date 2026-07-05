"use client";
import { motion } from "framer-motion";

/* ─── Section divider: centered 1px vertical gradient line ──────────────── */
export function SectionDivider() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      padding: "0",
      pointerEvents: "none",
    }}>
      <div style={{
        width: "1px",
        height: "60px",
        background: "linear-gradient(to bottom, transparent, rgba(100,116,139,0.5), transparent)",
      }} />
    </div>
  );
}

/* ─── Aurora background: fixed blobs, z-0, pointer-events none ─────────── */
export function AuroraBackground() {
  return (
    <div style={{
      position: "fixed", inset: 0,
      pointerEvents: "none",
      zIndex: 0,
      overflow: "hidden",
    }}>
      {/* Purple blob — top-left, 600px, opacity ~0.12 */}
      <motion.div
        animate={{
          x: [0, 60, 0],
          y: [0, 40, 0],
          opacity: [0.08, 0.14, 0.08],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "-150px", left: "-150px",
          width: "600px", height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, #6C63FF, transparent 65%)",
        }}
      />

      {/* Cyan blob — bottom-right, 500px, opacity ~0.10 */}
      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, -30, 0],
          opacity: [0.06, 0.11, 0.06],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        style={{
          position: "absolute",
          bottom: "-150px", right: "-150px",
          width: "500px", height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, #00E5FF, transparent 65%)",
        }}
      />

      {/* Subtle purple mid accent */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.03, 0.07, 0.03],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 8 }}
        style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px", height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, #a855f7, transparent 65%)",
        }}
      />
    </div>
  );
}
