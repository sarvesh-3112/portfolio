"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail, MapPin, CheckCircle } from "lucide-react";
import { GitHubIcon, LinkedInIcon, LeetCodeIcon } from "@/components/ui/SocialIcons";
import { PERSONAL_INFO } from "@/constants";

/* ─── Tokens ──────────────────────────────────────────────────────────── */
const ACCENT = "#6C63FF";
const CYAN   = "#00E5FF";
const S400   = "#94a3b8";
const S500   = "#64748b";

const CARD: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.09)",
  borderRadius: "1rem",
  padding: "1.5rem",
};

/* ─── Input base — all longhand border props, NO shorthand ────────────── */
const inputBase: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.04)",
  /* Use longhand so framer-motion can animate borderColor without conflict */
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "rgba(255,255,255,0.1)",
  borderRadius: "0.75rem",
  padding: "0.75rem 1rem",
  fontSize: "0.875rem",
  color: "#f1f5f9",
  outline: "none",
  boxSizing: "border-box" as const,
  fontFamily: "inherit",
  transition: "border-color 0.2s, box-shadow 0.2s",
};

/* ─── Focus styles (pure JS state — no framer-motion borderColor) ───── */
const focusedStyle: React.CSSProperties = {
  borderColor: ACCENT,
  boxShadow: `0 0 0 3px ${ACCENT}28`,
};
const blurredStyle: React.CSSProperties = {
  borderColor: "rgba(255,255,255,0.1)",
  boxShadow: "none",
};

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  const [form, setForm]             = useState({ name: "", email: "", message: "" });
  const [sending, setSending]       = useState(false);
  const [sent, setSent]             = useState(false);
  const [errors, setErrors]         = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [focusedField, setFocused]  = useState<string | null>(null);

  /* Client-side validation (mirrors server) */
  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim())                              e.name    = "Name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email   = "Valid email required.";
    if (form.message.trim().length < 10)                e.message = "Message must be at least 10 characters.";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setSubmitError(null);
    setSending(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      });

      if (res.ok) {
        setSent(true);
        setForm({ name: "", email: "", message: "" });
      } else {
        const data = await res.json().catch(() => ({}));
        setSubmitError(
          data?.error ?? "Something went wrong. Please email me directly at srisarvesh2006@gmail.com"
        );
      }
    } catch {
      setSubmitError(
        "Something went wrong. Please email me directly at srisarvesh2006@gmail.com"
      );
    } finally {
      setSending(false);
    }
  };

  /* Per-field inline focus style (pure state, no framer-motion borderColor) */
  const fieldStyle = (field: string): React.CSSProperties => ({
    ...inputBase,
    ...(focusedField === field ? focusedStyle : blurredStyle),
  });

  const socials = [
    { icon: <GitHubIcon size={18} />,   href: PERSONAL_INFO.social.github,   label: "GitHub"   },
    { icon: <LinkedInIcon size={18} />, href: PERSONAL_INFO.social.linkedin, label: "LinkedIn" },
    { icon: <LeetCodeIcon size={18} />, href: PERSONAL_INFO.social.leetcode, label: "LeetCode" },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      style={{ position: "relative", padding: "8rem 0", overflow: "hidden" }}
    >
      {/* Ambient glow */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{
          position: "absolute", top: 0, left: "50%",
          transform: "translateX(-50%)",
          width: "600px", height: "300px", borderRadius: "50%",
          background: `radial-gradient(ellipse, ${ACCENT}10, transparent 70%)`,
        }} />
      </div>

      <div style={{ maxWidth: "64rem", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <p style={{ color: ACCENT, fontSize: "0.75rem", fontFamily: "Space Mono, monospace", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            Let&apos;s Work Together
          </p>
          <h2 style={{ fontSize: "clamp(2.5rem,6vw,4rem)", fontWeight: 900, fontFamily: "Sora, sans-serif", color: "#fff", lineHeight: 1.1, marginBottom: "1rem" }}>
            Get In{" "}
            <span style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, ${CYAN} 50%, #a855f7 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Touch
            </span>
          </h2>
          <p style={{ color: S500, maxWidth: "28rem", margin: "0 auto", fontSize: "0.9rem" }}>
            Have a project idea or opportunity? I&apos;d love to hear from you.
          </p>
        </motion.div>

        {/* ── 2-col grid: info | form ── */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 3fr", gap: "2rem", alignItems: "start" }}>

          {/* ════ LEFT — Info cards ════ */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {/* Email card */}
            <div style={CARD}>
              <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "0.625rem", background: `${ACCENT}20`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                <Mail size={18} color={ACCENT} />
              </div>
              <p style={{ fontSize: "0.7rem", color: S500, margin: "0 0 0.25rem", textTransform: "uppercase", letterSpacing: "0.12em" }}>Email</p>
              <p style={{ fontSize: "0.875rem", color: "#f1f5f9", fontWeight: 500, margin: 0, wordBreak: "break-all" }}>
                srisarvesh2006@gmail.com
              </p>
            </div>

            {/* Location card */}
            <div style={CARD}>
              <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "0.625rem", background: `${CYAN}18`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                <MapPin size={18} color={CYAN} />
              </div>
              <p style={{ fontSize: "0.7rem", color: S500, margin: "0 0 0.25rem", textTransform: "uppercase", letterSpacing: "0.12em" }}>Location</p>
              <p style={{ fontSize: "0.875rem", color: "#f1f5f9", fontWeight: 500, margin: 0 }}>Tamil Nadu, India</p>
            </div>

            {/* Socials card */}
            <div style={CARD}>
              <p style={{ fontSize: "0.7rem", color: S500, margin: "0 0 1rem", textTransform: "uppercase", letterSpacing: "0.12em" }}>Find Me On</p>
              <div style={{ display: "flex", gap: "0.75rem" }}>
                {socials.map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      width: "2.5rem", height: "2.5rem",
                      borderRadius: "0.625rem",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: S400, textDecoration: "none",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.09)",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = S400)}
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Available status pill */}
            <div style={{
              background: "rgba(34,197,94,0.06)",
              border: "1px solid rgba(34,197,94,0.25)",
              borderRadius: "1rem",
              padding: "0.875rem 1.25rem",
              display: "flex", alignItems: "center", gap: "0.625rem",
            }}>
              <motion.div
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ width: "0.5rem", height: "0.5rem", borderRadius: "50%", background: "#22c55e", flexShrink: 0 }}
              />
              <span style={{ fontSize: "0.82rem", fontWeight: 500, color: "#4ade80" }}>
                Available for opportunities
              </span>
            </div>
          </motion.div>

          {/* ════ RIGHT — Form ════ */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <div style={{
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.09)",
              borderRadius: "1.5rem",
              padding: "2rem",
            }}>
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "16rem", textAlign: "center", gap: "1rem" }}
                >
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}>
                    <CheckCircle style={{ width: "4rem", height: "4rem", color: "#4ade80" }} />
                  </motion.div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#f1f5f9", margin: 0 }}>Message Sent!</h3>
                  <p style={{ fontSize: "0.875rem", color: S400, margin: 0 }}>
                    I&apos;ll get back to you within 24–48 hours. Check your inbox for a confirmation email.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    style={{ fontSize: "0.78rem", color: ACCENT, background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
                  >
                    Send another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

                  {/* Name */}
                  <div>
                    <label style={{ display: "block", fontSize: "0.68rem", color: S500, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "0.5rem" }}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      placeholder="John Doe"
                      style={fieldStyle("name")}
                    />
                    {errors.name && <p style={{ fontSize: "0.72rem", color: "#f87171", margin: "0.25rem 0 0" }}>{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label style={{ display: "block", fontSize: "0.68rem", color: S500, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "0.5rem" }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      placeholder="john@example.com"
                      style={fieldStyle("email")}
                    />
                    {errors.email && <p style={{ fontSize: "0.72rem", color: "#f87171", margin: "0.25rem 0 0" }}>{errors.email}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <label style={{ display: "block", fontSize: "0.68rem", color: S500, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "0.5rem" }}>
                      Message
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      placeholder="Tell me about your project or opportunity..."
                      rows={5}
                      style={{ ...fieldStyle("message"), resize: "none" }}
                    />
                    {errors.message && <p style={{ fontSize: "0.72rem", color: "#f87171", margin: "0.25rem 0 0" }}>{errors.message}</p>}
                  </div>

                  {/* Inline submit error */}
                  {submitError && (
                    <p style={{
                      fontSize: "0.8rem",
                      color: "#f87171",
                      background: "rgba(248,113,113,0.08)",
                      border: "1px solid rgba(248,113,113,0.2)",
                      borderRadius: "0.625rem",
                      padding: "0.75rem 1rem",
                      margin: 0,
                      lineHeight: 1.5,
                    }}>
                      {submitError}
                    </p>
                  )}

                  {/* Submit button */}
                  <motion.button
                    type="submit"
                    disabled={sending}
                    whileHover={{ scale: 1.02, boxShadow: `0 0 30px ${ACCENT}55` }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      width: "100%",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                      padding: "0.875rem",
                      borderRadius: "0.75rem",
                      fontWeight: 700, fontSize: "0.9rem",
                      color: "#ffffff",
                      border: "none",
                      cursor: sending ? "not-allowed" : "pointer",
                      opacity: sending ? 0.75 : 1,
                      background: `linear-gradient(135deg, ${ACCENT}, ${CYAN})`,
                    }}
                  >
                    {sending ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          style={{ width: "1rem", height: "1rem", borderWidth: "2px", borderStyle: "solid", borderColor: "rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%" }}
                        />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
