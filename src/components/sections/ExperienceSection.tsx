"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Award, CheckCircle2, Calendar } from "lucide-react";
import { EXPERIENCE, CERTIFICATIONS } from "@/constants";

/* ─── Tokens ──────────────────────────────────────────────────────────── */
const ACCENT   = "#6C63FF";
const CYAN     = "#00E5FF";
const S400     = "#94a3b8";
const S500     = "#64748b";
const BG       = "#050816";

const CARD: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.09)",
  borderRadius: "1rem",
};

const ACHIEVEMENTS = [
  { label: "LeetCode",           desc: "Active problem solver",    icon: "🧩" },
  { label: "GitHub",             desc: "Open source contributor",  icon: "🐙" },
  { label: "Placement Prep",     desc: "DSA & System Design",      icon: "🎯" },
  { label: "Continuous Learning",desc: "Always upskilling",        icon: "📚" },
];

export default function ExperienceSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="experience"
      ref={ref}
      style={{ position: "relative", padding: "8rem 0", overflow: "hidden" }}
    >
      {/* Ambient glow */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{
          position: "absolute", bottom: 0, left: "50%",
          transform: "translateX(-50%)",
          width: "600px", height: "300px", borderRadius: "50%",
          background: `radial-gradient(ellipse, ${ACCENT}10, transparent 70%)`,
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
          <p style={{ color: ACCENT, fontSize: "0.75rem", fontFamily: "Space Mono, monospace", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            My Journey
          </p>
          <h2 style={{ fontSize: "clamp(2.5rem,6vw,4rem)", fontWeight: 900, fontFamily: "Sora, sans-serif", color: "#fff", lineHeight: 1.1 }}>
            Experience &amp;{" "}
            <span style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, ${CYAN} 50%, #a855f7 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Certs
            </span>
          </h2>
        </motion.div>

        {/* ── Two columns ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px,1fr))", gap: "4rem", alignItems: "start" }}>

          {/* ════ LEFT — Timeline ════ */}
          <div>
            {/* Sub-header */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2.5rem" }}
            >
              <div style={{ width: "2rem", height: "2rem", borderRadius: "0.5rem", background: `${ACCENT}22`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Briefcase size={15} color={ACCENT} />
              </div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#f1f5f9", fontFamily: "Sora, sans-serif", margin: 0 }}>
                Work Experience
              </h3>
            </motion.div>

            {/* Timeline container */}
            <div style={{ position: "relative", paddingLeft: "2rem" }}>
              {/* Animated vertical line */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={inView ? { scaleY: 1 } : {}}
                transition={{ duration: 1.3, delay: 0.3 }}
                style={{
                  position: "absolute", left: "0.625rem", top: "1rem",
                  width: "1px", height: "calc(100% - 1rem)",
                  background: `linear-gradient(to bottom, ${ACCENT}, transparent)`,
                  transformOrigin: "top",
                }}
              />

              {/* Experience entry */}
              {EXPERIENCE.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.15 }}
                  style={{ position: "relative", marginBottom: "1.75rem" }}
                >
                  {/* Dot */}
                  <div style={{
                    position: "absolute", left: "-2rem", top: "1.5rem",
                    width: "1rem", height: "1rem", borderRadius: "50%",
                    border: `2px solid ${ACCENT}`, background: BG,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transform: "translateX(-25%)",
                  }}>
                    <div style={{ width: "0.4rem", height: "0.4rem", borderRadius: "50%", background: ACCENT }} />
                  </div>

                  <div style={{ ...CARD, padding: "1.5rem" }}>
                    {/* Period badge */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.75rem" }}>
                      <Calendar size={11} color={S500} />
                      <span style={{ fontSize: "0.72rem", fontFamily: "Space Mono, monospace", color: S500 }}>{exp.period}</span>
                    </div>
                    <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#f1f5f9", margin: "0 0 0.2rem" }}>{exp.role}</h4>
                    <p style={{ fontSize: "0.85rem", fontWeight: 600, color: ACCENT, margin: "0 0 0.875rem" }}>{exp.company}</p>
                    <p style={{ fontSize: "0.82rem", color: S400, lineHeight: "1.65", margin: "0 0 1rem" }}>{exp.description}</p>
                    <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem", listStyle: "none", padding: 0, margin: 0 }}>
                      {exp.achievements.map((a, j) => (
                        <motion.li
                          key={j}
                          initial={{ opacity: 0, x: -8 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 0.6 + j * 0.07 }}
                          style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.78rem", color: S400 }}
                        >
                          <CheckCircle2 size={12} color={ACCENT} style={{ flexShrink: 0, marginTop: "0.15rem" }} />
                          {a}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}

              {/* Education entry */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.7 }}
                style={{ position: "relative" }}
              >
                <div style={{
                  position: "absolute", left: "-2rem", top: "1.5rem",
                  width: "1rem", height: "1rem", borderRadius: "50%",
                  border: `2px solid ${CYAN}`, background: BG,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transform: "translateX(-25%)",
                }}>
                  <div style={{ width: "0.4rem", height: "0.4rem", borderRadius: "50%", background: CYAN }} />
                </div>
                <div style={{ ...CARD, padding: "1.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.75rem" }}>
                    <Calendar size={11} color={S500} />
                    <span style={{ fontSize: "0.72rem", fontFamily: "Space Mono, monospace", color: S500 }}>2022 – Present</span>
                  </div>
                  <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#f1f5f9", margin: "0 0 0.2rem" }}>B.E Computer Science</h4>
                  <p style={{ fontSize: "0.85rem", fontWeight: 600, color: CYAN, margin: "0 0 0.875rem" }}>
                    Dhanalakshmi Srinivasan Engineering College
                  </p>
                  <span style={{ fontSize: "0.72rem", fontFamily: "Space Mono, monospace", color: ACCENT, background: `${ACCENT}15`, border: `1px solid ${ACCENT}30`, borderRadius: "0.5rem", padding: "0.2rem 0.65rem" }}>
                    CGPA: 8.0
                  </span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* ════ RIGHT — Certs + Achievements ════ */}
          <div>
            {/* Sub-header */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2.5rem" }}
            >
              <div style={{ width: "2rem", height: "2rem", borderRadius: "0.5rem", background: `${CYAN}20`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Award size={15} color={CYAN} />
              </div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#f1f5f9", fontFamily: "Sora, sans-serif", margin: 0 }}>
                Certifications
              </h3>
            </motion.div>

            {/* Cert cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
              {CERTIFICATIONS.map((cert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30, scale: 0.95 }}
                  animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.12, ease: [0.23, 1, 0.32, 1] }}
                  whileHover={{ scale: 1.02, borderColor: cert.color + "55" }}
                  style={{ ...CARD, display: "flex", alignItems: "center", gap: "1rem", padding: "1.1rem 1.25rem", cursor: "default" }}
                >
                  {/* Icon box */}
                  <div style={{ width: "3rem", height: "3rem", borderRadius: "0.75rem", background: cert.color + "20", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", flexShrink: 0 }}>
                    🏆
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{ fontSize: "0.875rem", fontWeight: 700, color: "#f1f5f9", margin: "0 0 0.15rem" }}>{cert.title}</h4>
                    <p style={{ fontSize: "0.75rem", color: S500, margin: 0 }}>{cert.issuer} · {cert.year}</p>
                  </div>
                  {/* Badge */}
                  <div style={{ fontSize: "0.68rem", fontFamily: "Space Mono, monospace", color: cert.color, background: cert.color + "15", border: `1px solid ${cert.color}44`, borderRadius: "0.45rem", padding: "0.2rem 0.6rem", flexShrink: 0 }}>
                    Certified
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Achievements 2×2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              style={{ ...CARD, padding: "1.5rem" }}
            >
              <h4 style={{ fontSize: "0.875rem", fontWeight: 700, color: "#f1f5f9", margin: "0 0 1rem" }}>Key Achievements</h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                {ACHIEVEMENTS.map((a) => (
                  <div
                    key={a.label}
                    style={{
                      display: "flex", alignItems: "flex-start", gap: "0.6rem",
                      padding: "0.75rem",
                      borderRadius: "0.75rem",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <span style={{ fontSize: "1.1rem", lineHeight: 1, flexShrink: 0 }}>{a.icon}</span>
                    <div>
                      <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "#f1f5f9", margin: "0 0 0.15rem" }}>{a.label}</p>
                      <p style={{ fontSize: "0.7rem", color: S500, margin: 0 }}>{a.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
