"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { NAV_LINKS } from "@/constants";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { activeSection, progress } = useScrollProgress();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  /* Pill glass styles — inline so they survive any Tailwind version */
  const pillStyle: React.CSSProperties = {
    background: scrolled ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    border: "1px solid rgba(255,255,255,0.1)",
    boxShadow: scrolled ? "0 0 30px rgba(108,99,255,0.12)" : "none",
    transition: "all 0.4s ease",
  };

  const logoGradient: React.CSSProperties = {
    background: "linear-gradient(135deg, #6C63FF 0%, #00E5FF 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    fontFamily: "Sora, sans-serif",
    fontWeight: 800,
    fontSize: "1.2rem",
  };

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[1000] origin-left"
        style={{
          background: "linear-gradient(90deg, #6C63FF, #00E5FF)",
          scaleX: progress / 100,
        }}
      />

      {/* Nav pill */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-[999]"
        style={{ width: scrolled ? "88%" : "92%", maxWidth: "52rem", transition: "width 0.4s ease" }}
      >
        {/* Pill container */}
        <div
          className="flex items-center justify-between px-6 py-3 rounded-2xl"
          style={pillStyle}
        >
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollTo("#home"); }}
            whileHover={{ scale: 1.06 }}
            className="cursor-pointer select-none"
            style={logoGradient}
          >
            SR
          </motion.a>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <li key={link.name}>
                  <motion.button
                    onClick={() => scrollTo(link.href)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative px-4 py-2 text-sm font-medium rounded-xl cursor-pointer transition-colors duration-200"
                    style={{
                      color: isActive ? "#ffffff" : "#94a3b8",
                      background: "transparent",
                      border: "none",
                    }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-xl"
                        style={{ background: "rgba(255,255,255,0.08)" }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </motion.button>
                </li>
              );
            })}
          </ul>

          {/* Hire Me CTA */}
          <div className="hidden md:flex items-center">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(108,99,255,0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo("#contact")}
              className="text-sm font-semibold text-white cursor-pointer"
              style={{
                padding: "0.5rem 1.25rem",
                borderRadius: "0.75rem",
                background: "linear-gradient(135deg, #6C63FF, #00E5FF)",
                border: "none",
              }}
            >
              Hire Me
            </motion.button>
          </div>

          {/* Mobile hamburger */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg cursor-pointer"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#94a3b8",
            }}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </motion.button>
        </div>

        {/* Mobile dropdown */}
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.95 }}
          animate={{
            opacity: menuOpen ? 1 : 0,
            y: menuOpen ? 0 : -8,
            scale: menuOpen ? 1 : 0.95,
          }}
          className="md:hidden mt-2 rounded-2xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
            border: "1px solid rgba(255,255,255,0.12)",
            pointerEvents: menuOpen ? "auto" : "none",
          }}
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollTo(link.href)}
              className="block w-full text-left px-6 py-3 text-sm transition-colors duration-150 cursor-pointer"
              style={{ color: "#cbd5e1" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                e.currentTarget.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#cbd5e1";
              }}
            >
              {link.name}
            </button>
          ))}
        </motion.div>
      </motion.nav>
    </>
  );
}
