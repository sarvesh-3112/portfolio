"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { GraduationCap, MapPin, Zap } from "lucide-react";

/* ─── Design tokens ─────────────────────────────────────────────────────── */
const ACCENT   = "#6C63FF";
const CYAN     = "#00E5FF";
const PURPLE   = "#a855f7";
const AMBER    = "#f59e0b";
const EMERALD  = "#10b981";
const PINK     = "#ec4899";

const CARD: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",
  border: "1px solid rgba(255,255,255,0.09)",
  borderRadius: "1rem",
  padding: "1.5rem",
};

const SLATE_400 = "#94a3b8";
const SLATE_500 = "#64748b";

/* ─── Animated counter ──────────────────────────────────────────────────── */
function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress === 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end]);

  return (
    <span
      ref={ref}
      style={{
        background: `linear-gradient(135deg, ${ACCENT} 0%, ${CYAN} 50%, ${PURPLE} 100%)`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        fontFamily: "Sora, sans-serif",
        fontWeight: 900,
        fontSize: "2.5rem",
        lineHeight: 1,
      }}
    >
      {count}{suffix}
    </span>
  );
}

/* ─── Skill progress bar ────────────────────────────────────────────────── */
const strengths = [
  { name: "Java",            level: 85, color: ACCENT  },
  { name: "Python",          level: 80, color: CYAN    },
  { name: "Backend Dev",     level: 78, color: PURPLE  },
  { name: "Problem Solving", level: 90, color: AMBER   },
  { name: "OOP & DBMS",      level: 82, color: EMERALD },
  { name: "REST APIs",       level: 80, color: PINK    },
];

function SkillBar({ skill, index }: { skill: typeof strengths[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem" }}>
        <span style={{ color: "#e2e8f0", fontWeight: 500 }}>{skill.name}</span>
        <span style={{ color: SLATE_500, fontFamily: "Space Mono, monospace" }}>{skill.level}%</span>
      </div>
      <div style={{ height: "6px", background: "rgba(255,255,255,0.06)", borderRadius: "999px", overflow: "hidden" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1.2, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
          style={{
            height: "100%",
            borderRadius: "999px",
            background: `linear-gradient(90deg, ${skill.color}, ${skill.color}66)`,
          }}
        />
      </div>
    </div>
  );
}

/* ─── Stat data ─────────────────────────────────────────────────────────── */
const STATS = [
  { label: "CGPA",           value: 8,  suffix: ".0" },
  { label: "Projects",       value: 3,  suffix: "+"  },
  { label: "Certifications", value: 4,  suffix: "+"  },
  { label: "Experience",     value: 2,  suffix: "+"  },
];

/* ─── Java code lines ───────────────────────────────────────────────────── */
const CODE_LINES = [
  [{ t: "public class ", c: ACCENT  }, { t: "SriSarvesh",      c: "#e2e8f0"  }, { t: " {", c: "#e2e8f0" }],
  [{ t: "  String ",    c: CYAN    }, { t: "role",             c: "#e2e8f0"  }, { t: ' = "Full Stack Dev";', c: SLATE_400 }],
  [{ t: "  int ",       c: CYAN    }, { t: "cgpa",             c: "#e2e8f0"  }, { t: " = 8;",               c: SLATE_400 }],
  [{ t: "  boolean ",   c: CYAN    }, { t: "available",        c: "#e2e8f0"  }, { t: " = true;",            c: EMERALD  }],
  [],
  [{ t: "  void ",      c: PURPLE  }, { t: "solve",            c: "#e2e8f0"  }, { t: "(Problem p) {",       c: "#e2e8f0" }],
  [{ t: "    return ",  c: ACCENT  }, { t: "elegantSolution;", c: AMBER      }],
  [{ t: "  }",          c: "#e2e8f0" }],
  [{ t: "}",            c: "#e2e8f0" }],
];

const TRAITS = ["Clean Code", "REST APIs", "OOP", "DBMS", "Problem Solving", "Backend Dev", "Git & GitHub"];

/* ─── Section label style ───────────────────────────────────────────────── */
const labelStyle: React.CSSProperties = {
  color: ACCENT,
  fontSize: "0.75rem",
  fontFamily: "Space Mono, monospace",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  marginBottom: "0.75rem",
};

/* ══════════════════════ MAIN COMPONENT ══════════════════════ */
export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.1 });

  const fadeLeft  = { initial: { opacity: 0, x: -40 }, animate: inView ? { opacity: 1, x: 0 } : {} };
  const fadeRight = { initial: { opacity: 0, x:  40 }, animate: inView ? { opacity: 1, x: 0 } : {} };
  const fadeUp    = { initial: { opacity: 0, y:  30 }, animate: inView ? { opacity: 1, y: 0 } : {} };

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{ position: "relative", padding: "8rem 0", overflow: "hidden", background: "transparent" }}
    >
      {/* Ambient glow */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{
          position: "absolute", top: "50%", left: "-10%",
          transform: "translateY(-50%)",
          width: "500px", height: "500px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(108,99,255,0.08) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", bottom: "10%", right: "-5%",
          width: "400px", height: "400px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%)",
        }} />
      </div>

      <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* ── Section header ── */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: "5rem" }}
        >
          <p style={labelStyle}>Who I Am</p>
          <h2 style={{ fontSize: "clamp(2.5rem,6vw,4rem)", fontWeight: 900, fontFamily: "Sora, sans-serif", color: "#ffffff", lineHeight: 1.1 }}>
            About{" "}
            <span style={{
              background: `linear-gradient(135deg, ${ACCENT} 0%, ${CYAN} 50%, ${PURPLE} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Me
            </span>
          </h2>
        </motion.div>

        {/* ── Two-column grid ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px,1fr))", gap: "3rem", alignItems: "start" }}>

          {/* ════ LEFT COLUMN ════ */}
          <motion.div
            {...fadeLeft}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            {/* Card 1 — Education */}
            <div style={CARD}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "1rem" }}>
                {/* Icon box */}
                <div style={{
                  width: "2.75rem", height: "2.75rem", borderRadius: "0.75rem",
                  background: "rgba(108,99,255,0.18)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <GraduationCap size={20} color={ACCENT} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ color: "#f1f5f9", fontWeight: 600, fontSize: "0.875rem", margin: 0 }}>
                    B.E Computer Science
                  </p>
                  <p style={{ color: SLATE_500, fontSize: "0.75rem", margin: 0, marginTop: "0.125rem" }}>
                    Dhanalakshmi Srinivasan Engineering College
                  </p>
                </div>
                {/* CGPA badge */}
                <div style={{
                  flexShrink: 0,
                  fontSize: "0.7rem",
                  fontFamily: "Space Mono, monospace",
                  color: ACCENT,
                  border: `1px solid ${ACCENT}44`,
                  borderRadius: "0.5rem",
                  padding: "0.2rem 0.6rem",
                  whiteSpace: "nowrap",
                }}>
                  CGPA: 8.0
                </div>
              </div>
              <p style={{ color: SLATE_400, fontSize: "0.85rem", lineHeight: "1.7", margin: 0 }}>
                Computer Science undergraduate with a strong foundation in Java, Python, OOP, DBMS,
                and backend development. Passionate about building scalable systems and solving
                real-world problems through code.
              </p>
            </div>

            {/* Card 2 — Location */}
            <div style={CARD}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "1rem" }}>
                <div style={{
                  width: "2.75rem", height: "2.75rem", borderRadius: "0.75rem",
                  background: "rgba(0,229,255,0.12)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <MapPin size={20} color={CYAN} />
                </div>
                <div>
                  <p style={{ color: "#f1f5f9", fontWeight: 600, fontSize: "0.875rem", margin: 0 }}>
                    Tamil Nadu, India
                  </p>
                  <p style={{ color: SLATE_500, fontSize: "0.75rem", margin: 0, marginTop: "0.125rem" }}>
                    Open to remote &amp; relocation
                  </p>
                </div>
              </div>
              <p style={{ color: SLATE_400, fontSize: "0.85rem", lineHeight: "1.7", margin: 0 }}>
                I thrive at the intersection of clean backend architecture and modern frontend experiences.
                My journey spans from embedded IoT systems to AI-powered web platforms.
              </p>
            </div>

            {/* Card 3 — Core Strengths */}
            <div style={CARD}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "1.25rem" }}>
                <div style={{
                  width: "2.75rem", height: "2.75rem", borderRadius: "0.75rem",
                  background: "rgba(168,85,247,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <Zap size={20} color={PURPLE} />
                </div>
                <p style={{ color: "#f1f5f9", fontWeight: 600, fontSize: "0.875rem", margin: 0 }}>
                  Core Strengths
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                {strengths.map((skill, i) => (
                  <SkillBar key={skill.name} skill={skill} index={i} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* ════ RIGHT COLUMN ════ */}
          <motion.div
            {...fadeRight}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            {/* 2×2 stat grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.45 + i * 0.1, duration: 0.5 }}
                  style={{ ...CARD, textAlign: "center", padding: "1.5rem 1rem" }}
                >
                  <Counter end={stat.value} suffix={stat.suffix} />
                  <p style={{
                    color: SLATE_500,
                    fontSize: "0.7rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    margin: "0.5rem 0 0",
                  }}>
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Code block card */}
            <div style={{ ...CARD, padding: 0, overflow: "hidden" }}>
              {/* Traffic light bar */}
              <div style={{
                display: "flex", alignItems: "center", gap: "0.5rem",
                padding: "0.75rem 1rem",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
              }}>
                <div style={{ width: "0.75rem", height: "0.75rem", borderRadius: "50%", background: "rgba(239,68,68,0.7)"  }} />
                <div style={{ width: "0.75rem", height: "0.75rem", borderRadius: "50%", background: "rgba(234,179,8,0.7)"  }} />
                <div style={{ width: "0.75rem", height: "0.75rem", borderRadius: "50%", background: "rgba(34,197,94,0.7)"  }} />
                <span style={{ marginLeft: "0.5rem", fontSize: "0.7rem", color: SLATE_500, fontFamily: "Space Mono, monospace" }}>
                  Developer.java
                </span>
              </div>

              {/* Syntax-highlighted code */}
              <div style={{ padding: "1.25rem", fontFamily: "Space Mono, monospace", fontSize: "0.75rem", lineHeight: "1.8" }}>
                {CODE_LINES.map((tokens, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.6 + i * 0.07 }}
                    style={{ minHeight: "1.2em" }}
                  >
                    {tokens.map((tok, j) => (
                      <span key={j} style={{ color: tok.c }}>{tok.t}</span>
                    ))}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Trait pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {TRAITS.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, y: 8 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 + i * 0.06 }}
                  whileHover={{ scale: 1.06, borderColor: ACCENT }}
                  style={{
                    padding: "0.375rem 0.875rem",
                    borderRadius: "0.5rem",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    color: SLATE_400,
                    background: "rgba(255,255,255,0.04)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    cursor: "default",
                    transition: "border-color 0.2s",
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
