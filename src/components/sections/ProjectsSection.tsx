"use client";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { GitHubIcon } from "@/components/ui/SocialIcons";
import { PROJECTS } from "@/constants";

/* ─── Design tokens ─────────────────────────────────────────────────────── */
const ACCENT  = "#6C63FF";
const CYAN    = "#00E5FF";
const PURPLE  = "#a855f7";
const SLATE_400 = "#94a3b8";
const SLATE_500 = "#64748b";
const BG        = "#050816";

/* ─── Project emoji map ─────────────────────────────────────────────────── */
const EMOJIS: Record<number, string> = { 1: "🏥", 2: "💰", 3: "⚡" };

/* ─── Glass helper ──────────────────────────────────────────────────────── */
const glass = (extra: React.CSSProperties = {}): React.CSSProperties => ({
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.09)",
  ...extra,
});

/* ══════════════════════ PROJECT CARD ════════════════════════ */
function ProjectCard({
  project,
  index,
  inView,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
  inView: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  /* 3-D tilt */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-120, 120], [7, -7]),  { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(mx, [-120, 120], [-7,  7]), { stiffness: 200, damping: 30 });

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(e.clientX - r.left - r.width  / 2);
    my.set(e.clientY - r.top  - r.height / 2);
  };
  const handleLeave = () => { mx.set(0); my.set(0); setHovered(false); };

  /* Gradient colours from project.gradient string: "from-purple-600/20 to-blue-600/20" → use project.color */
  const previewGrad = `linear-gradient(135deg, ${project.color}28 0%, ${BG} 100%)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.23, 1, 0.32, 1] }}
      style={{ height: "100%" }}
    >
      <motion.div
        ref={ref}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          ...glass({
            borderRadius: "1.5rem",
            overflow: "hidden",
            cursor: "default",
            border: `1px solid ${hovered ? project.color + "55" : "rgba(255,255,255,0.09)"}`,
            transition: "border-color 0.3s, box-shadow 0.3s",
            boxShadow: hovered ? `0 0 40px ${project.color}25, 0 20px 60px rgba(0,0,0,0.5)` : "none",
          }),
        }}
        onMouseMove={handleMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleLeave}
      >
        {/* ── Top accent bar ── */}
        <div style={{
          height: "3px",
          background: `linear-gradient(90deg, ${project.color}, ${project.color}00)`,
          flexShrink: 0,
        }} />

        {/* ── Preview area ── */}
        <div style={{
          position: "relative",
          height: "13rem",
          background: previewGrad,
          overflow: "hidden",
          flexShrink: 0,
        }}>
          {/* Animated grid overlay */}
          <div style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(${project.color}18 1px, transparent 1px),
              linear-gradient(90deg, ${project.color}18 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
            opacity: 0.6,
          }} />

          {/* Extra radial glow */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at 50% 50%, ${project.color}20, transparent 70%)`,
          }} />

          {/* Centered floating emoji card */}
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <motion.div
              animate={{ scale: [1, 1.06, 1], rotate: [0, 1.5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{
                ...glass({
                  borderRadius: "0.875rem",
                  padding: "1rem 1.25rem",
                  textAlign: "center",
                  border: `1px solid ${project.color}33`,
                }),
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "0.35rem", lineHeight: 1 }}>
                {EMOJIS[project.id] ?? "🚀"}
              </div>
              <p style={{ fontSize: "0.65rem", fontFamily: "Space Mono, monospace", color: SLATE_400 }}>
                {project.title}
              </p>
            </motion.div>
          </div>

          {/* Hover overlay with CTA buttons */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "absolute", inset: 0,
              display: "flex", alignItems: "center", justifyContent: "center", gap: "0.875rem",
              background: "rgba(5,8,22,0.82)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              pointerEvents: hovered ? "auto" : "none",
            }}
          >
            <motion.a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                display: "flex", alignItems: "center", gap: "0.4rem",
                padding: "0.6rem 1.1rem",
                borderRadius: "0.75rem",
                fontSize: "0.82rem",
                fontWeight: 600,
                color: "#ffffff",
                background: project.color,
                textDecoration: "none",
                border: "none",
              }}
            >
              <ExternalLink size={13} />
              Live Demo
            </motion.a>
            <motion.a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                display: "flex", alignItems: "center", gap: "0.4rem",
                padding: "0.6rem 1.1rem",
                borderRadius: "0.75rem",
                fontSize: "0.82rem",
                fontWeight: 600,
                color: "#ffffff",
                textDecoration: "none",
                ...glass({ border: "1px solid rgba(255,255,255,0.18)" }),
              }}
            >
              <GitHubIcon size={13} />
              Code
            </motion.a>
          </motion.div>
        </div>

        {/* ── Content area ── */}
        <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", flex: 1 }}>
          {/* Title row */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "0.625rem" }}>
            <div style={{ flex: 1, minWidth: 0, paddingRight: "0.75rem" }}>
              <h3 style={{
                fontSize: "1.15rem", fontWeight: 700, color: "#f1f5f9",
                fontFamily: "Sora, sans-serif", margin: "0 0 0.2rem",
                lineHeight: 1.2,
              }}>
                {project.title}
              </h3>
              <p style={{ fontSize: "0.75rem", fontWeight: 600, color: project.color, margin: 0 }}>
                {project.subtitle}
              </p>
            </div>
            {/* Arrow icon — GitHub link */}
            <motion.a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.12, rotate: 12 }}
              whileTap={{ scale: 0.9 }}
              style={{
                width: "2.25rem", height: "2.25rem",
                borderRadius: "0.625rem",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: SLATE_400,
                textDecoration: "none",
                flexShrink: 0,
                ...glass(),
              }}
            >
              <ArrowUpRight size={15} color={SLATE_400} />
            </motion.a>
          </div>

          {/* Description — 3 lines clamped */}
          <p style={{
            fontSize: "0.83rem",
            color: SLATE_400,
            lineHeight: "1.65",
            marginBottom: "1.1rem",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}>
            {project.description}
          </p>

          {/* Tech chips */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem", marginTop: "auto" }}>
            {project.tech.map((t) => (
              <span
                key={t}
                style={{
                  fontSize: "0.68rem",
                  fontFamily: "Space Mono, monospace",
                  color: SLATE_400,
                  padding: "0.2rem 0.6rem",
                  borderRadius: "0.45rem",
                  ...glass({ border: "1px solid rgba(255,255,255,0.1)" }),
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ══════════════════════ SECTION ════════════════════════ */
export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.08 });

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{ position: "relative", padding: "8rem 0", overflow: "hidden" }}
    >
      {/* Ambient glow */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "20%", left: "50%",
          transform: "translateX(-50%)",
          width: "700px", height: "400px", borderRadius: "50%",
          background: `radial-gradient(ellipse, ${ACCENT}0a, transparent 70%)`,
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
            color: ACCENT, fontSize: "0.75rem",
            fontFamily: "Space Mono, monospace",
            letterSpacing: "0.2em", textTransform: "uppercase",
            marginBottom: "0.75rem",
          }}>
            What I&apos;ve Built
          </p>
          <h2 style={{
            fontSize: "clamp(2.5rem,6vw,4rem)", fontWeight: 900,
            fontFamily: "Sora, sans-serif", color: "#ffffff",
            lineHeight: 1.1, marginBottom: "1rem",
          }}>
            Featured{" "}
            <span style={{
              background: `linear-gradient(135deg, ${ACCENT} 0%, ${CYAN} 50%, ${PURPLE} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Projects
            </span>
          </h2>
          <p style={{ color: SLATE_500, maxWidth: "28rem", margin: "0 auto", fontSize: "0.9rem" }}>
            Real-world solutions built with modern tech stacks
          </p>
        </motion.div>

        {/* ── Cards: equal 2-column side-by-side grid ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1.5rem",
          alignItems: "stretch",
        }}>
          {PROJECTS.map((project, i) => (
            <div key={project.id} style={{ width: "100%" }}>
              <ProjectCard project={project} index={i} inView={inView} />
            </div>
          ))}
        </div>

        {/* ── GitHub CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.65 }}
          style={{ textAlign: "center", marginTop: "3rem" }}
        >
          <motion.a
            href="https://github.com/sarvesh-3112"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${ACCENT}44` }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              padding: "0.875rem 2rem",
              borderRadius: "0.875rem",
              fontWeight: 600,
              fontSize: "0.9rem",
              color: SLATE_400,
              textDecoration: "none",
              transition: "color 0.2s",
              ...glass({ border: "1px solid rgba(255,255,255,0.12)" }),
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = SLATE_400)}
          >
            <GitHubIcon size={18} />
            View All on GitHub
            <ArrowUpRight size={16} />
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}
