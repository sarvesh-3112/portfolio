"use client";
import { motion } from "framer-motion";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { NAV_LINKS } from "@/constants";

const ACCENT  = "#6C63FF";
const S500    = "#64748b";

export default function SectionProgress() {
  const { activeSection } = useScrollProgress();

  return (
    <div style={{
      position: "fixed",
      right: "1.5rem",
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 50,
      display: "none",  /* overridden on xl below via a style tag trick — use JS instead */
    }}
      /* We can't use Tailwind "hidden xl:flex" so we implement with a mounted resize observer */
      ref={(el) => {
        if (!el) return;
        const update = () => {
          el.style.display = window.innerWidth >= 1280 ? "flex" : "none";
        };
        update();
        window.addEventListener("resize", update, { passive: true });
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.75rem" }}>
        {NAV_LINKS.map((link) => {
          const id = link.href.replace("#", "");
          const active = activeSection === id;
          return (
            <button
              key={id}
              aria-label={link.name}
              onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                cursor: "pointer",
                background: "none",
                border: "none",
                padding: 0,
              }}
            >
              {/* Hover label */}
              <motion.span
                initial={{ opacity: 0, x: 6 }}
                whileHover={{ opacity: 1, x: 0 }}
                style={{
                  fontSize: "0.65rem",
                  fontFamily: "Space Mono, monospace",
                  color: active ? ACCENT : S500,
                  whiteSpace: "nowrap",
                }}
              >
                {link.name}
              </motion.span>

              {/* Dot/pill */}
              <motion.div
                animate={{
                  width:           active ? 20 : 6,
                  opacity:         active ? 1 : 0.4,
                  backgroundColor: active ? ACCENT : S500,
                }}
                transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
                style={{ height: "3px", borderRadius: "999px" }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
