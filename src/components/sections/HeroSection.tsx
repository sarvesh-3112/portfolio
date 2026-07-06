"use client";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Download, Mail, ExternalLink } from "lucide-react";
import { GitHubIcon, LinkedInIcon, LeetCodeIcon } from "@/components/ui/SocialIcons";
import dynamic from "next/dynamic";
import { PERSONAL_INFO } from "@/constants";

const HeroBackground = dynamic(() => import("@/components/3d/HeroBackground"), {
  ssr: false,
});

const ROLES = PERSONAL_INFO.roles;

/* ─── Stable dot-grid positions (client-only, avoids hydration mismatch) ── */
const DOT_COUNT = 30;
function makeDots() {
  return Array.from({ length: DOT_COUNT }, (_, i) => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    delay: i * 0.12,
    duration: 2 + Math.random() * 3,
  }));
}

/* ─── Typing animation ──────────────────────────────────────────────────── */
function TypingText() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (pause) {
      const t = setTimeout(() => setPause(false), 1500);
      return () => clearTimeout(t);
    }
    const role = ROLES[currentRole];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting) {
      if (displayed.length < role.length) {
        timeout = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 80);
      } else {
        setPause(true);
        setTimeout(() => setDeleting(true), 1500);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
      } else {
        setDeleting(false);
        setCurrentRole((prev) => (prev + 1) % ROLES.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, currentRole, pause]);

  return (
    <span style={{ background: "linear-gradient(135deg, #00E5FF 0%, #6C63FF 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }} className="font-bold">
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="inline-block w-[2px] h-[1em] ml-1 align-middle"
        style={{ background: "#00E5FF", WebkitTextFillColor: "initial" }}
      />
    </span>
  );
}

/* ─── Floating code snippet ─────────────────────────────────────────────── */
const CODE_SNIPPETS = [
  { code: "public class Developer {", color: "#6C63FF", top: "20%", side: "left" },
  { code: "def solve(problem): ...",   color: "#00E5FF", top: "45%", side: "right" },
  { code: "GET /api/hire/{me}",         color: "#a855f7", top: "68%", side: "left" },
];

/* ─── Main component ────────────────────────────────────────────────────── */
export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const dots = useMemo(() => makeDots(), []);
  const router = useRouter();

  useEffect(() => { setMounted(true); }, []);

  const socials = [
    { icon: <GitHubIcon size={18} />, href: PERSONAL_INFO.social.github, label: "GitHub" },
    { icon: <LinkedInIcon size={18} />, href: PERSONAL_INFO.social.linkedin, label: "LinkedIn" },
    { icon: <LeetCodeIcon size={18} />, href: PERSONAL_INFO.social.leetcode, label: "LeetCode" },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#050816" }}
    >
      {/* ── 3D Star field ── */}
      <HeroBackground />

      {/* ── Ambient glow blobs ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-48 -left-48 w-[700px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(108,99,255,0.18) 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.45, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2, ease: "easeInOut" }}
          className="absolute -bottom-48 -right-48 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,229,255,0.15) 0%, transparent 70%)" }}
        />
      </div>

      {/* ── Animated dot grid ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{
          backgroundImage: "radial-gradient(rgba(108,99,255,0.12) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* ── Floating ambient dots (client only) ── */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          {dots.map((d, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{ top: d.top, left: d.left, background: i % 2 === 0 ? "rgba(108,99,255,0.4)" : "rgba(0,229,255,0.3)" }}
              animate={{ opacity: [0, 0.7, 0], scale: [0.5, 1, 0.5] }}
              transition={{ duration: d.duration, delay: d.delay, repeat: Infinity }}
            />
          ))}
        </div>
      )}

      {/* ── Floating code snippets (desktop) ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block" aria-hidden="true">
        {CODE_SNIPPETS.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: s.side === "left" ? -40 : 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 + i * 0.3, duration: 0.8 }}
            className="absolute rounded-xl px-4 py-3 font-mono text-xs"
            style={{
              top: s.top,
              [s.side]: "4%",
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: `1px solid ${s.color}40`,
              color: s.color,
            }}
          >
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
            >
              {s.code}
            </motion.span>
          </motion.div>
        ))}
      </div>

      {/* ══════════════════════ MAIN CONTENT ══════════════════════ */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center">

        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs mb-8"
          style={{
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "#94a3b8",
          }}
        >
          <motion.span
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-2 h-2 rounded-full"
            style={{ background: "#22c55e" }}
          />
          Available for opportunities
        </motion.div>

        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg mb-2"
          style={{ color: "#94a3b8", fontFamily: "Space Grotesk, sans-serif" }}
        >
          Hi, I&apos;m
        </motion.p>

        {/* Name — text-7xl on mobile, 9xl on large screens */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-black leading-none tracking-tight mb-4"
          style={{ fontFamily: "Sora, sans-serif", fontSize: "clamp(3.5rem, 10vw, 7.5rem)" }}
        >
          <span
            style={{
              background: "linear-gradient(135deg, #6C63FF 0%, #00E5FF 50%, #a855f7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Sri Sarvesh{" "}
          </span>
          <span style={{ color: "rgba(255,255,255,0.92)" }}>R</span>
        </motion.h1>

        {/* Typing role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-2xl md:text-3xl font-semibold mb-6"
          style={{ minHeight: "2.5rem" }}
        >
          <TypingText />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
          style={{ color: "#94a3b8" }}
        >
          CS undergraduate from Tamil Nadu, building elegant solutions with{" "}
          <span style={{ color: "#6C63FF", fontWeight: 600 }}>Java</span>,{" "}
          <span style={{ color: "#00E5FF", fontWeight: 600 }}>Python</span> &amp; modern web
          tech. Passionate about clean code and impactful products.
        </motion.p>

        {/* ── CTA Buttons ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          {/* View Projects */}
          <motion.button
            whileHover={{ scale: 1.06, boxShadow: "0 0 35px rgba(108,99,255,0.55)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="flex items-center gap-2 font-bold text-white cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #6C63FF, #00E5FF)",
              padding: "1rem 2rem",
              borderRadius: "1rem",
              fontSize: "0.95rem",
              border: "none",
            }}
          >
            <ExternalLink size={16} />
            View Projects
          </motion.button>

          {/* Download Resume */}
          <motion.button
            onClick={() => router.push("/resume")}
            whileHover={{ scale: 1.06, boxShadow: "0 0 25px rgba(0,229,255,0.2)" }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 font-bold text-white cursor-pointer"
            style={{
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.12)",
              padding: "1rem 2rem",
              borderRadius: "1rem",
              fontSize: "0.95rem",
              textDecoration: "none",
            }}
          >
            <Download size={16} />
            Download Resume
          </motion.button>

          {/* Contact Me */}
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="flex items-center gap-2 font-semibold cursor-pointer"
            style={{
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.15)",
              padding: "1rem 2rem",
              borderRadius: "1rem",
              fontSize: "0.95rem",
              color: "#94a3b8",
            }}
          >
            <Mail size={16} />
            Contact Me
          </motion.button>
        </motion.div>

        {/* ── Social icons ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex items-center justify-center gap-4"
        >
          {socials.map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              whileHover={{ scale: 1.2, y: -4, boxShadow: "0 0 20px rgba(108,99,255,0.4)" }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center"
              style={{
                width: "2.75rem",
                height: "2.75rem",
                borderRadius: "0.875rem",
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#94a3b8",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
            >
              {s.icon}
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
      >
        <span
          className="text-xs font-mono tracking-widest uppercase"
          style={{ color: "#475569", letterSpacing: "0.25em" }}
        >
          Scroll
        </span>
        {/* Animated mouse icon */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-start justify-center pt-1.5"
          style={{
            width: "1.5rem",
            height: "2.25rem",
            borderRadius: "999px",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <div
            className="rounded-full"
            style={{ width: "0.25rem", height: "0.5rem", background: "#6C63FF" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
