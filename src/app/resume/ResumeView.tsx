"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  MapPin,
  Phone,
  Mail,
  Link2,
  GitFork,
  Trophy,
} from "lucide-react";

/* ─── Design tokens ─────────────────────────────────────── */
const ACCENT = "#6C63FF";
const CYAN = "#00E5FF";
const AMBER = "#f59e0b";

/* ─── Reusable section heading ──────────────────────────── */
function SectionHeading({ label, color = ACCENT }: { label: string; color?: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div
        className="w-2 h-2 rounded-full shrink-0"
        style={{ background: color }}
      />
      <p
        className="text-xs font-mono tracking-[0.2em] uppercase"
        style={{ color }}
      >
        {label}
      </p>
      <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
    </div>
  );
}

/* ─── Glass card wrapper ────────────────────────────────── */
function GlassCard({
  children,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`rounded-2xl border border-slate-800 ${className}`}
      style={{
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Skill pill ────────────────────────────────────────── */
function Pill({ label }: { label: string }) {
  return (
    <span
      className="text-xs font-mono px-3 py-1 rounded-lg text-slate-300"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {label}
    </span>
  );
}

/* ─── Tech badge (colored) ──────────────────────────────── */
function TechBadge({ label, color = ACCENT }: { label: string; color?: string }) {
  return (
    <span
      className="text-xs font-mono px-2 py-0.5 rounded-md"
      style={{
        background: `${color}14`,
        color,
        border: `1px solid ${color}30`,
      }}
    >
      {label}
    </span>
  );
}

/* ─── Bullet list item ──────────────────────────────────── */
function BulletItem({ text, color = ACCENT }: { text: string; color?: string }) {
  return (
    <li className="flex items-start gap-2">
      <div
        className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
        style={{ background: color }}
      />
      <p className="text-sm text-slate-400 leading-relaxed">{text}</p>
    </li>
  );
}

/* ─── Score badge ───────────────────────────────────────── */
function ScoreBadge({ text, color = ACCENT }: { text: string; color?: string }) {
  return (
    <span
      className="text-xs font-mono px-2 py-0.5 rounded-lg"
      style={{
        background: `${color}14`,
        color,
        border: `1px solid ${color}28`,
      }}
    >
      {text}
    </span>
  );
}

/* ─── Section fade-up animation ─────────────────────────── */
function Section({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════════════════ */
export default function ResumeView() {
  const router = useRouter();

  return (
    <div className="min-h-screen" style={{ background: "#050816" }}>

      {/* ── Ambient glow ── */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden>
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.28, 0.45, 0.28] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-40 w-[650px] h-[650px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${ACCENT}1a 0%, transparent 70%)`,
          }}
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 11, repeat: Infinity, delay: 2, ease: "easeInOut" }}
          className="absolute -bottom-40 -right-40 w-[550px] h-[550px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${CYAN}12 0%, transparent 70%)`,
          }}
        />
      </div>

      {/* ── Dot-grid overlay ── */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-20"
        aria-hidden
        style={{
          backgroundImage: `radial-gradient(${ACCENT}22 1px, transparent 1px)`,
          backgroundSize: "36px 36px",
        }}
      />

      {/* ────────────────────────────────────────────────
          TOP BAR
      ──────────────────────────────────────────────── */}
      <div
        className="sticky top-0 z-50 border-b border-slate-800/60"
        style={{
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          background: "rgba(5,8,22,0.85)",
        }}
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-3">

          {/* Logo */}
          <Link href="/" aria-label="Back to home" style={{ textDecoration: "none" }}>
            <span
              className="font-black text-2xl"
              style={{
                fontFamily: "Sora, sans-serif",
                background: `linear-gradient(135deg, ${ACCENT}, ${CYAN})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              SR
            </span>
          </Link>

          {/* Center title */}
          <span className="hidden sm:block text-sm font-mono text-slate-500 tracking-widest">
            Resume · Sri Sarvesh R
          </span>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5">
            <motion.button
              onClick={() => router.push("/")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm text-slate-300 hover:text-white transition-all border border-slate-700 cursor-pointer"
              style={{
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(12px)",
                fontFamily: "inherit",
              }}
            >
              <ArrowLeft size={14} />
              Portfolio
            </motion.button>

            <motion.a
              href="/resume.pdf"
              download="Sri_Sarvesh_R_Resume.pdf"
              whileHover={{ scale: 1.03, boxShadow: `0 0 20px ${ACCENT}44` }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white"
              style={{
                background: `linear-gradient(135deg, ${ACCENT}, ${CYAN})`,
                textDecoration: "none",
              }}
            >
              <Download size={14} />
              Download PDF
            </motion.a>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────
          RESUME CONTENT
      ──────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 py-12 space-y-8"
      >

        {/* ══ 1. HEADER ══ */}
        <Section delay={0}>
          <div className="text-center mb-2">
            <h1
              className="text-4xl md:text-5xl font-black mb-2"
              style={{
                fontFamily: "Sora, sans-serif",
                background: `linear-gradient(135deg, ${ACCENT} 0%, ${CYAN} 50%, #a855f7 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Sri Sarvesh R
            </h1>
            <p className="text-slate-400 text-sm font-mono mb-6">
              Software Engineer · Full Stack Developer
            </p>

            {/* Contact pills */}
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { icon: <MapPin size={12} />, label: "Cuddalore, Tamil Nadu", href: undefined },
                { icon: <Phone size={12} />, label: "+91 6379315200", href: undefined },
                { icon: <Mail size={12} />, label: "srisarvesh2006@gmail.com", href: "mailto:srisarvesh2006@gmail.com" },
                { icon: <Link2 size={12} />, label: "linkedin.com/in/srisarveshr", href: "https://linkedin.com/in/srisarveshr" },
                { icon: <GitFork size={12} />, label: "github.com/sarvesh-3112", href: "https://github.com/sarvesh-3112" },
              ].map(({ icon, label, href }) => {
                const cls =
                  "flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs text-slate-300 border border-slate-800 transition-colors hover:border-slate-600";
                const style: React.CSSProperties = {
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(12px)",
                  textDecoration: "none",
                };
                return href ? (
                  <a key={label} href={href} target="_blank" rel="noreferrer" className={cls} style={style}>
                    {icon}
                    {label}
                  </a>
                ) : (
                  <span key={label} className={cls} style={style}>
                    {icon}
                    {label}
                  </span>
                );
              })}
            </div>
          </div>
        </Section>

        {/* ══ 2. PROFILE ══ */}
        <Section delay={0.08}>
          <SectionHeading label="Software Engineering Profile" color={ACCENT} />
          <GlassCard className="p-6">
            <p className="text-slate-400 text-sm leading-relaxed mb-3">
              Computer Science undergraduate (CGPA: 8.0) with hands-on experience in full stack
              development, building scalable and production-ready web applications; seeking an
              entry-level Software Engineer role.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              Strong in Java and Python with solid foundations in OOP and DBMS; experienced in
              designing backend logic, integrating APIs, and solving real-world problems through
              efficient and maintainable code.
            </p>
          </GlassCard>
        </Section>

        {/* ══ TWO-COLUMN GRID (lg+) ══ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          {/* ── LEFT: Experience + Projects ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* ══ 5. EXPERIENCE ══ */}
            <Section delay={0.32}>
              <SectionHeading label="Internship Experience" color={ACCENT} />
              <GlassCard className="p-6">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                  <p className="text-lg font-bold text-white">Full Stack Developer Trainee</p>
                  <span className="text-xs font-mono text-slate-500 shrink-0">Aug 2024 – Oct 2024</span>
                </div>
                <p className="text-sm font-semibold mb-4" style={{ color: ACCENT }}>Edu Tantr</p>
                <ul className="space-y-3">
                  <BulletItem
                    color={ACCENT}
                    text="Built 5+ responsive UI components using HTML, CSS, and JavaScript, reducing layout inconsistencies by 40% across the web application."
                  />
                  <BulletItem
                    color={ACCENT}
                    text="Developed Java backend modules and resolved 15+ reported bugs through root-cause analysis, improving overall application stability by 20%."
                  />
                  <BulletItem
                    color={ACCENT}
                    text="Integrated frontend interfaces with MySQL databases via JDBC, implementing CRUD operations that cut manual data-entry workflows by 30%."
                  />
                  <BulletItem
                    color={ACCENT}
                    text="Collaborated in a 4-member agile team using Git/GitHub, reviewing code and merging 10+ feature branches with zero integration conflicts."
                  />
                </ul>
              </GlassCard>
            </Section>

            {/* ══ 6. PROJECTS ══ */}
            <Section delay={0.40}>
              <SectionHeading label="Projects" color={CYAN} />
              <div className="space-y-4">

                {/* Smart Expense Manager */}
                <GlassCard className="p-6 group hover:border-slate-700 transition-all">
                  <p className="text-base font-bold text-white mb-1">
                    Smart Expense Manager — Personal Finance Dashboard
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {["HTML5", "CSS3", "JavaScript", "Chart.js", "Local Storage"].map((t) => (
                      <TechBadge key={t} label={t} color={CYAN} />
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 mb-3">
                    <span className="text-slate-600">Concepts: </span>
                    <span className="text-slate-500">
                      CRUD Operations, Data Visualization, Client-side Storage, Responsive Web Design
                    </span>
                  </p>
                  <ul className="space-y-2.5">
                    <BulletItem color={CYAN} text="Developed a responsive personal finance dashboard featuring CRUD operations, search, category filtering, and CSV export." />
                    <BulletItem color={CYAN} text="Integrated Chart.js visualizations to provide interactive analytics for expense insights and budget utilization." />
                    <BulletItem color={CYAN} text="Implemented client-side persistent data management using browser Local Storage and designed a glassmorphism UI with dark mode." />
                  </ul>
                </GlassCard>

                {/* HealthAI */}
                <GlassCard className="p-6 group hover:border-slate-700 transition-all">
                  <p className="text-base font-bold text-white mb-1">
                    HealthAI — Full Stack Healthcare Prediction Platform
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {["Next.js", "FastAPI", "Python", "Scikit-learn", "Render", "Vercel"].map((t) => (
                      <TechBadge key={t} label={t} color={CYAN} />
                    ))}
                  </div>
                  <p className="text-xs mb-3">
                    <span className="text-slate-600">Concepts: </span>
                    <span className="text-slate-500">REST APIs, ML Integration, Full Stack Deployment</span>
                  </p>
                  <ul className="space-y-2.5">
                    <BulletItem color={CYAN} text="Developed a full-stack AI healthcare platform featuring role-based dashboards (Patient, Hospital, Admin) for disease risk prediction." />
                    <BulletItem color={CYAN} text="Built a FastAPI backend integrating scikit-learn machine learning models with robust API endpoints and routing." />
                    <BulletItem color={CYAN} text="Designed responsive Next.js frontend interfaces and deployed the system seamlessly across Vercel and Render." />
                  </ul>
                </GlassCard>

                {/* Smart Footstep */}
                <GlassCard className="p-6 group hover:border-slate-700 transition-all">
                  <p className="text-base font-bold text-white mb-1">
                    Smart Footstep Power Generation System
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {["Arduino", "Piezoelectric Sensors", "Embedded C"].map((t) => (
                      <TechBadge key={t} label={t} color={CYAN} />
                    ))}
                  </div>
                  <p className="text-xs mb-3">
                    <span className="text-slate-600">Concepts: </span>
                    <span className="text-slate-500">Energy Harvesting, IoT Systems, Sensor Integration</span>
                  </p>
                  <ul className="space-y-2.5">
                    <BulletItem color={CYAN} text="Designed a piezoelectric energy harvesting system converting footstep pressure to electrical energy for low-power IoT devices." />
                    <BulletItem color={CYAN} text="Integrated piezoelectric sensors with Arduino to capture, condition, and monitor real-time voltage output." />
                    <BulletItem color={CYAN} text="Built and tested a functional prototype powering LEDs and sensor modules, validating it as a self-sustaining IoT power source." />
                  </ul>
                </GlassCard>
              </div>
            </Section>

          </div>{/* end LEFT col */}

          {/* ── RIGHT: Education + Skills + Certifications ── */}
          <div className="lg:col-span-1 space-y-6">

            {/* ══ 3. EDUCATION ══ */}
            <Section delay={0.16}>
              <SectionHeading label="Education" color={CYAN} />
              <div className="space-y-4">

                {/* B.E. */}
                <GlassCard className="p-5">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                    <p className="font-bold text-white text-sm">
                      B.E. Computer Science and Engineering
                    </p>
                    <span className="text-xs font-mono text-slate-500 shrink-0">2023 – 2027</span>
                  </div>
                  <p className="text-sm mb-2" style={{ color: ACCENT }}>
                    Dhanalakshmi Srinivasan Engineering College (Autonomous)
                  </p>
                  <ScoreBadge text="Current CGPA: 8.0" color={ACCENT} />
                  <p className="text-xs text-slate-500 mt-2">
                    Relevant Coursework: Data Structures &amp; Algorithms, OOP, DBMS, Operating Systems
                  </p>
                </GlassCard>

                {/* Class XII */}
                <GlassCard className="p-5">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                    <p className="font-bold text-white text-sm">Class XII – CBSE</p>
                    <span className="text-xs font-mono text-slate-500 shrink-0">Completed 2023</span>
                  </div>
                  <p className="text-sm text-slate-400 mb-2">
                    Aristo Public School, Cuddalore
                  </p>
                  <ScoreBadge text="Percentage: 64.4%" color={CYAN} />
                </GlassCard>

                {/* Class X */}
                <GlassCard className="p-5">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                    <p className="font-bold text-white text-sm">Class X – CBSE</p>
                    <span className="text-xs font-mono text-slate-500 shrink-0">Completed 2021</span>
                  </div>
                  <p className="text-sm text-slate-400 mb-2">
                    Aristo Public School, Cuddalore
                  </p>
                  <ScoreBadge text="Percentage: 67.6%" color={CYAN} />
                </GlassCard>
              </div>
            </Section>

            {/* ══ 4. TECHNICAL SKILLS ══ */}
            <Section delay={0.24}>
              <SectionHeading label="Technical Skills" color="#a855f7" />
              <GlassCard className="p-6">
                <div className="space-y-4">
                  {[
                    { label: "Languages", skills: ["Java", "Python", "C"] },
                    { label: "Web Technologies", skills: ["HTML5", "CSS3", "JavaScript (ES6)"] },
                    { label: "Database & Tools", skills: ["MySQL", "Git", "GitHub", "VS Code"] },
                    { label: "Core Concepts", skills: ["OOP", "DSA", "DBMS", "Operating Systems", "REST APIs"] },
                  ].map(({ label, skills }) => (
                    <div key={label} className="flex flex-wrap items-start gap-x-4 gap-y-2">
                      <span className="text-xs font-mono text-slate-500 w-full shrink-0 pt-1">
                        {label}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((s) => <Pill key={s} label={s} />)}
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </Section>

            {/* ══ 7. CERTIFICATIONS ══ */}
            <Section delay={0.48}>
              <SectionHeading label="Certifications" color={AMBER} />
              <div className="space-y-4">
                {[
                  {
                    title: "Full Stack Development Internship Certificate",
                    issuer: "Edu Tantr",
                    date: "Oct 2024",
                    score: undefined,
                  },
                  {
                    title: "Python for Data Science",
                    issuer: "NPTEL · IIT Madras",
                    date: "",
                    score: "Score: 61%",
                  },
                  {
                    title: "Introduction to Machine Learning",
                    issuer: "NPTEL · IIT Madras",
                    date: "",
                    score: "Score: 56%",
                  },
                  {
                    title: "Cyber Security and Privacy",
                    issuer: "NPTEL · IIT Madras",
                    date: "",
                    score: "Score: 60%",
                  },
                ].map(({ title, issuer, date, score }) => (
                  <GlassCard key={title} className="p-5">
                    <div className="flex items-start gap-2 mb-1">
                      <Trophy size={15} className="shrink-0 mt-0.5" style={{ color: AMBER }} />
                      <p className="font-semibold text-white text-sm leading-snug">{title}</p>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 pl-5">
                      {issuer}
                      {date ? ` · ${date}` : ""}
                    </p>
                    {score && (
                      <div className="pl-5 mt-2">
                        <ScoreBadge text={score} color={AMBER} />
                      </div>
                    )}
                  </GlassCard>
                ))}
              </div>
            </Section>

          </div>{/* end RIGHT col */}
        </div>{/* end grid */}

        {/* ══ BOTTOM CTA ══ */}
        <Section delay={0.56}>
          <div className="text-center py-8">
            <p className="text-slate-500 text-sm mb-5">Interested in working together?</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <motion.a
                href="/resume.pdf"
                download="Sri_Sarvesh_R_Resume.pdf"
                whileHover={{ scale: 1.04, boxShadow: `0 0 25px ${ACCENT}44` }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT}, ${CYAN})`,
                  textDecoration: "none",
                }}
              >
                <Download size={15} />
                Download PDF
              </motion.a>

              <motion.button
                onClick={() => router.push("/#contact")}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm text-slate-300 hover:text-white transition-all border border-slate-700 cursor-pointer"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  fontFamily: "inherit",
                }}
              >
                <Mail size={15} />
                Contact Me
              </motion.button>
            </div>
          </div>
        </Section>
      </motion.div>
    </div>
  );
}
