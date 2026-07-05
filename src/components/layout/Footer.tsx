"use client";
import { motion } from "framer-motion";
import { ArrowUp, Heart } from "lucide-react";
import { GitHubIcon, LinkedInIcon, LeetCodeIcon } from "@/components/ui/SocialIcons";
import { PERSONAL_INFO } from "@/constants";

const ACCENT  = "#6C63FF";
const CYAN    = "#00E5FF";
const S400    = "#94a3b8";
const S500    = "#64748b";
const S600    = "#475569";

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const socials = [
    { icon: <GitHubIcon size={15} />,   href: PERSONAL_INFO.social.github,   label: "GitHub"   },
    { icon: <LinkedInIcon size={15} />, href: PERSONAL_INFO.social.linkedin, label: "LinkedIn" },
    { icon: <LeetCodeIcon size={15} />, href: PERSONAL_INFO.social.leetcode, label: "LeetCode" },
  ];

  return (
    <footer style={{
      position: "relative",
      borderTop: "1px solid rgba(255,255,255,0.07)",
      padding: "3rem 0",
      overflow: "hidden",
    }}>
      {/* Subtle glow */}
      <div style={{
        position: "absolute", bottom: 0, left: "50%",
        transform: "translateX(-50%)",
        width: "500px", height: "200px",
        background: `radial-gradient(ellipse, ${ACCENT}08, transparent 70%)`,
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 1.5rem" }}>
        {/* ── Three-column row ── */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1.5rem",
        }}>

          {/* Logo + name */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            <span style={{
              fontSize: "1.5rem",
              fontWeight: 900,
              fontFamily: "Sora, sans-serif",
              background: `linear-gradient(135deg, ${ACCENT} 0%, ${CYAN} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              SR
            </span>
            <div style={{ width: "1px", height: "1.5rem", background: "rgba(255,255,255,0.1)" }} />
            <span style={{ fontSize: "0.875rem", color: S500 }}>Sri Sarvesh R</span>
          </motion.div>

          {/* Copyright text */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ fontSize: "0.75rem", color: S600, display: "flex", alignItems: "center", gap: "0.3rem", margin: 0 }}
          >
            Built with{" "}
            <Heart size={11} style={{ color: ACCENT, fill: ACCENT }} />{" "}
            using Next.js &amp; Framer Motion
          </motion.p>

          {/* Social icons + back-to-top */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}
          >
            {socials.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  width: "2rem", height: "2rem",
                  borderRadius: "0.5rem",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: S500,
                  textDecoration: "none",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = S500)}
              >
                {s.icon}
              </motion.a>
            ))}

            <div style={{ width: "1px", height: "1.25rem", background: "rgba(255,255,255,0.1)" }} />

            {/* Back-to-top */}
            <motion.button
              onClick={scrollTop}
              whileHover={{ scale: 1.1, boxShadow: `0 0 18px ${ACCENT}55` }}
              whileTap={{ scale: 0.9 }}
              aria-label="Back to top"
              style={{
                width: "2rem", height: "2rem",
                borderRadius: "0.5rem",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: S400,
                cursor: "pointer",
                background: `linear-gradient(135deg, ${ACCENT}40, ${CYAN}20)`,
                border: `1px solid ${ACCENT}44`,
              }}
            >
              <ArrowUp size={13} color={S400} />
            </motion.button>
          </motion.div>
        </div>

        {/* ── Bottom copyright line ── */}
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <p style={{ fontSize: "0.72rem", color: S600, fontFamily: "Space Mono, monospace", margin: 0 }}>
            © {new Date().getFullYear()} Sri Sarvesh R · Tamil Nadu, India
          </p>
        </div>
      </div>
    </footer>
  );
}
