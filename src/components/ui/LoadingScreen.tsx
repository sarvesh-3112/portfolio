"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

const ACCENT = "#6C63FF";
const CYAN   = "#00E5FF";

const PARTICLE_COUNT = 6;

function makeParticles() {
  return Array.from({ length: PARTICLE_COUNT }, () => ({
    ix: Math.random() * 400 - 200,
    iy: Math.random() * 400 - 200,
    ax1: Math.random() * 400 - 200,
    ay1: Math.random() * 400 - 200,
    ax2: Math.random() * 400 - 200,
    ay2: Math.random() * 400 - 200,
  }));
}

export default function LoadingScreen() {
  const [loading, setLoading]   = useState(true);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted]   = useState(false);
  const particles = useMemo(() => makeParticles(), []);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return p + Math.random() * 14;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const pct = Math.min(Math.round(progress), 100);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: "fixed", inset: 0, zIndex: 99999,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            background: "#050816",
          }}
        >
          {/* SR logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: "3rem", textAlign: "center" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", justifyContent: "center", marginBottom: "0.5rem" }}>
              {["S", "R"].map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, rotateX: 90 }}
                  animate={{ opacity: 1, rotateX: 0 }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  style={{
                    fontSize: "3.5rem",
                    fontWeight: 900,
                    fontFamily: "Sora, sans-serif",
                    background: `linear-gradient(135deg, ${ACCENT} 0%, ${CYAN} 50%, #a855f7 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    lineHeight: 1,
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{
                fontSize: "0.7rem",
                color: "#475569",
                fontFamily: "Space Mono, monospace",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
              }}
            >
              Sri Sarvesh R
            </motion.p>
          </motion.div>

          {/* Counter */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              fontSize: "0.75rem",
              color: "#475569",
              fontFamily: "Space Mono, monospace",
              marginBottom: "0.75rem",
              letterSpacing: "0.05em",
            }}
          >
            {pct}%
          </motion.p>

          {/* Progress bar */}
          <div style={{
            width: "12rem",
            height: "2px",
            background: "rgba(255,255,255,0.07)",
            borderRadius: "999px",
            overflow: "hidden",
          }}>
            <motion.div
              style={{
                height: "100%",
                borderRadius: "999px",
                background: `linear-gradient(90deg, ${ACCENT}, ${CYAN})`,
                width: `${pct}%`,
              }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Ambient particles — client-only */}
          {mounted && particles.map((p, i) => (
            <motion.div
              key={i}
              initial={{ x: p.ix, y: p.iy, opacity: 0 }}
              animate={{ x: [p.ax1, p.ax2], y: [p.ay1, p.ay2], opacity: [0, 0.5, 0] }}
              transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.3 }}
              style={{
                position: "absolute",
                width: "4px", height: "4px",
                borderRadius: "50%",
                background: `${ACCENT}66`,
                pointerEvents: "none",
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
