"use client";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer
      id="footer"
      style={{
        background: "var(--color-bg-deep)",
        color: "rgba(255,255,255,0.85)",
        textAlign: "center",
        padding: "clamp(60px, 10vh, 100px) clamp(24px, 5vw, 80px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Faint mandala bg */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "clamp(200px, 50vw, 500px)",
        opacity: 0.03, pointerEvents: "none",
      }}>🕉</div>

      <motion.div
        style={{ position: "relative", zIndex: 1 }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p style={{
          fontFamily: "var(--font-script)",
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          color: "var(--color-gold)",
          lineHeight: 1.2,
          marginBottom: "8px",
        }}>
          Your presence is our greatest blessing
        </p>

        <p style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1rem, 2vw, 1.3rem)",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "rgba(212,175,55,0.6)",
          margin: "16px 0 32px",
        }}>
          [GROOM_NAME] &amp; [BRIDE_NAME] · [DD Month YYYY]
        </p>

        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          marginBottom: "48px",
        }}>
          <span style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, rgba(212,175,55,0.4))", maxWidth: 120 }} />
          <span style={{ color: "var(--color-gold)", fontSize: "1.2rem" }}>🪷</span>
          <span style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, rgba(212,175,55,0.4))", maxWidth: 120 }} />
        </div>

        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.8rem",
          color: "rgba(255,255,255,0.25)",
          letterSpacing: "0.15em",
        }}>
          Designed with ❤️ by Rohan
        </p>
      </motion.div>
    </footer>
  );
}
