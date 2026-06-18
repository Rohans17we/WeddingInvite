"use client";
import { useState, useEffect } from "react";
import { themes, type ThemeId, applyTheme } from "@/lib/themes";
import { bursts, type BurstId } from "@/lib/bursts";

interface Props {
  activeBurst: BurstId;
  onBurstChange: (b: BurstId) => void;
}

export default function DevSwitcher({ activeBurst, onBurstChange }: Props) {
  const [open, setOpen]         = useState(false);
  const [activeTheme, setTheme] = useState<ThemeId>("maroon");

  const handleTheme = (id: ThemeId) => {
    setTheme(id);
    applyTheme(id);
  };

  // Only render in development
  if (process.env.NODE_ENV !== "development") return null;

  return (
    <div style={{
      position: "fixed",
      bottom: "24px",
      right: "24px",
      zIndex: 99999,
      fontFamily: "system-ui, sans-serif",
    }}>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        title="Dev Theme Switcher"
        style={{
          width: 48, height: 48,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #D4AF37, #8B1A1A)",
          border: "2px solid rgba(255,255,255,0.3)",
          color: "#fff",
          fontSize: "1.2rem",
          cursor: "pointer",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: "auto",
          transition: "transform 0.3s ease",
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
        }}
      >
        🎨
      </button>

      {/* Panel */}
      {open && (
        <div style={{
          position: "absolute",
          bottom: "60px",
          right: 0,
          width: "220px",
          background: "rgba(10, 5, 5, 0.95)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(212,175,55,0.3)",
          borderRadius: "16px",
          padding: "16px",
          boxShadow: "0 16px 60px rgba(0,0,0,0.5)",
          color: "#fff",
        }}>
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(212,175,55,0.7)", marginBottom: "10px" }}>
            🎨 Theme
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", marginBottom: "16px" }}>
            {themes.map(t => (
              <button
                key={t.id}
                onClick={() => handleTheme(t.id)}
                style={{
                  padding: "8px 6px",
                  borderRadius: "8px",
                  border: `1px solid ${activeTheme === t.id ? "#D4AF37" : "rgba(255,255,255,0.1)"}`,
                  background: activeTheme === t.id ? "rgba(212,175,55,0.2)" : "rgba(255,255,255,0.05)",
                  color: activeTheme === t.id ? "#D4AF37" : "rgba(255,255,255,0.6)",
                  fontSize: "0.7rem",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  lineHeight: 1.3,
                }}
              >
                {t.emoji} {t.label.split(" & ")[0]}
              </button>
            ))}
          </div>

          <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(212,175,55,0.7)", marginBottom: "10px" }}>
            💥 Burst
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
            {bursts.map(b => (
              <button
                key={b.id}
                onClick={() => onBurstChange(b.id)}
                style={{
                  padding: "8px 6px",
                  borderRadius: "8px",
                  border: `1px solid ${activeBurst === b.id ? "#D4AF37" : "rgba(255,255,255,0.1)"}`,
                  background: activeBurst === b.id ? "rgba(212,175,55,0.2)" : "rgba(255,255,255,0.05)",
                  color: activeBurst === b.id ? "#D4AF37" : "rgba(255,255,255,0.6)",
                  fontSize: "0.7rem",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  lineHeight: 1.3,
                }}
              >
                {b.emoji} {b.label}
              </button>
            ))}
          </div>

          <p style={{
            marginTop: "14px",
            fontSize: "0.6rem",
            color: "rgba(255,255,255,0.25)",
            textAlign: "center",
          }}>
            Hidden in production build
          </p>
        </div>
      )}
    </div>
  );
}
