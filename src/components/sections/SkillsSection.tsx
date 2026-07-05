"use client";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { SKILLS } from "@/constants";

/* ─── Design tokens ─────────────────────────────────────────────────────── */
const ACCENT  = "#6C63FF";
const CYAN    = "#00E5FF";
const PURPLE  = "#a855f7";
const SLATE_500 = "#64748b";
const SLATE_600 = "#475569";
const BG      = "#050816";

/* ─── 3-D tilt card ─────────────────────────────────────────────────────── */
function SkillCard({
  item,
  color,
  delay,
  inView,
}: {
  item: string;
  color: string;
  delay: number;
  inView: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-50, 50], [12, -12]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mx, [-50, 50], [-12, 12]), { stiffness: 300, damping: 30 });

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(e.clientX - r.left - r.width  / 2);
    my.set(e.clientY - r.top  - r.height / 2);
  };
  const handleLeave = () => { mx.set(0); my.set(0); };

  /* Abbreviation: first 2 meaningful chars */
  const abbr = item.replace(/[^a-zA-Z0-9+#.]/g, "").slice(0, 2).toUpperCase();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, scale: 0.82 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay, duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "800px",
        /* Glass card base */
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.09)",
        borderRadius: "1rem",
        padding: "1.25rem 1rem",
        minHeight: "120px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.75rem",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
        transition: "border-color 0.25s, box-shadow 0.25s",
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={{
        scale: 1.06,
        borderColor: color,
        boxShadow: `0 0 22px ${color}44, 0 8px 32px rgba(0,0,0,0.4)`,
      }}
    >
      {/* Radial glow layer (shows on hover via whileHover above, but kept dim always) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "1rem",
          background: `radial-gradient(circle at center, ${color}18, transparent 68%)`,
          pointerEvents: "none",
        }}
      />

      {/* Shine top-left */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "1rem",
          background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />

      {/* Icon box */}
      <div
        style={{
          width: "2.5rem",
          height: "2.5rem",
          borderRadius: "0.6rem",
          background: `${color}22`,
          border: `1px solid ${color}44`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Space Mono, monospace",
          fontWeight: 700,
          fontSize: "0.8rem",
          color,
          flexShrink: 0,
          position: "relative",
          zIndex: 1,
        }}
      >
        {abbr}
      </div>

      {/* Skill name — full, centered */}
      <p
        style={{
          fontSize: "0.8rem",
          fontWeight: 600,
          color: "#f1f5f9",
          textAlign: "center",
          lineHeight: 1.3,
          position: "relative",
          zIndex: 1,
          wordBreak: "break-word",
          margin: 0,
        }}
      >
        {item}
      </p>
    </motion.div>
  );
}

/* ─── Marquee pill ──────────────────────────────────────────────────────── */
function MarqueePill({ label }: { label: string }) {
  return (
    <span
      style={{
        whiteSpace: "nowrap",
        fontSize: "0.8rem",
        fontFamily: "Space Mono, monospace",
        color: SLATE_500,
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "999px",
        padding: "0.4rem 1rem",
        background: "rgba(255,255,255,0.03)",
        flexShrink: 0,
      }}
    >
      {label}
    </span>
  );
}

const MARQUEE_ITEMS = [
  "Java", "Python", "Next.js", "FastAPI", "MySQL", "Git", "REST API",
  "Arduino", "JDBC", "Chart.js", "Vercel", "Render", "TypeScript", "HTML/CSS",
];

/* ─── Section ───────────────────────────────────────────────────────────── */
export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.1 });

  let delayCounter = 0;

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{ position: "relative", padding: "8rem 0", overflow: "hidden" }}
    >
      {/* BG accent blobs */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{
          position: "absolute", right: "-5%", top: "50%",
          transform: "translateY(-50%)",
          width: "420px", height: "420px", borderRadius: "50%",
          background: `radial-gradient(circle, ${CYAN}12, transparent 70%)`,
        }} />
        <div style={{
          position: "absolute", left: "-5%", top: "20%",
          width: "320px", height: "320px", borderRadius: "50%",
          background: `radial-gradient(circle, ${ACCENT}0e, transparent 70%)`,
        }} />
      </div>

      <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: "5rem" }}
        >
          <p style={{
            color: ACCENT,
            fontSize: "0.75rem",
            fontFamily: "Space Mono, monospace",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: "0.75rem",
          }}>
            What I Work With
          </p>
          <h2 style={{
            fontSize: "clamp(2.5rem,6vw,4rem)",
            fontWeight: 900,
            fontFamily: "Sora, sans-serif",
            color: "#ffffff",
            lineHeight: 1.1,
            marginBottom: "1rem",
          }}>
            My{" "}
            <span style={{
              background: `linear-gradient(135deg, ${ACCENT} 0%, ${CYAN} 50%, ${PURPLE} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Skills
            </span>
          </h2>
          <p style={{ color: SLATE_500, maxWidth: "28rem", margin: "0 auto", fontSize: "0.9rem" }}>
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        {/* ── Skill categories ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>
          {SKILLS.map((cat, catIdx) => (
            <div key={cat.category}>
              {/* Category header: colored dash + label + gray full-width line */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: catIdx * 0.12 + 0.15 }}
                style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "1.5rem" }}
              >
                <div style={{ width: "2rem", height: "1px", background: cat.color, flexShrink: 0 }} />
                <span style={{
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  fontFamily: "Space Mono, monospace",
                  color: cat.color,
                  flexShrink: 0,
                }}>
                  {cat.category}
                </span>
                <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.07)" }} />
              </motion.div>

              {/* Skill cards grid */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                gap: "1rem",
              }}>
                {cat.items.map((item) => {
                  const d = delayCounter * 0.05 + 0.1;
                  delayCounter++;
                  return (
                    <SkillCard
                      key={item}
                      item={item}
                      color={cat.color}
                      delay={d}
                      inView={inView}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* ── Scrolling marquee ── */}
        <div style={{ marginTop: "5rem", position: "relative", overflow: "hidden" }}>
          {/* Fade masks */}
          <div style={{
            position: "absolute", left: 0, top: 0, bottom: 0, width: "6rem",
            background: `linear-gradient(to right, ${BG}, transparent)`,
            zIndex: 10, pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", right: 0, top: 0, bottom: 0, width: "6rem",
            background: `linear-gradient(to left, ${BG}, transparent)`,
            zIndex: 10, pointerEvents: "none",
          }} />

          {/* The scrolling row — two copies for seamless loop */}
          <motion.div
            animate={{ x: [0, "-50%"] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            style={{ display: "flex", gap: "1.5rem", width: "max-content" }}
          >
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((tech, i) => (
              <MarqueePill key={`${i}-${tech}`} label={tech} />
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
