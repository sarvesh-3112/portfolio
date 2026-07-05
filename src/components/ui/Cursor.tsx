"use client";
import { motion } from "framer-motion";
import { useCursor } from "@/hooks/useCursor";

export default function Cursor() {
  const { position, isPointer, isHidden, isClicking } = useCursor();

  return (
    <>
      {/* Small dot — snaps instantly */}
      <motion.div
        animate={{
          x: position.x - 6,
          y: position.y - 6,
          scale: isClicking ? 0.5 : 1,
          opacity: isHidden ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 2000, damping: 100, mass: 0.1 }}
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: "12px", height: "12px",
          borderRadius: "50%",
          background: "#ffffff",
          zIndex: 99999,
          pointerEvents: "none",
        }}
      />

      {/* Larger ring — follows with spring lag */}
      <motion.div
        animate={{
          x: position.x - (isPointer ? 24 : 20),
          y: position.y - (isPointer ? 24 : 20),
          width:  isPointer ? 48 : 40,
          height: isPointer ? 48 : 40,
          borderColor: isPointer ? "rgba(108,99,255,0.85)" : "rgba(255,255,255,0.28)",
          scale: isClicking ? 0.75 : 1,
          opacity: isHidden ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        style={{
          position: "fixed",
          top: 0, left: 0,
          borderRadius: "50%",
          border: "1.5px solid rgba(255,255,255,0.28)",
          zIndex: 99998,
          pointerEvents: "none",
        }}
      />
    </>
  );
}
