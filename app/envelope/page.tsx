"use client";
import { useState } from "react";
import Envelope from "@/components/Envelope/Envelope";
import type { BurstId } from "@/lib/bursts";

export default function EnvelopePlayground() {
  const [activeBurst, setActiveBurst] = useState<BurstId>("marigold");
  const [envelopeState, setEnvelopeState] = useState<"closed" | "open" | "scrolled">("closed");

  const handleScrollDown = () => {
    if (envelopeState === "closed") {
      setEnvelopeState("open");
    } else if (envelopeState === "open") {
      setEnvelopeState("scrolled");
    }
  };

  const handleScrollUp = () => {
    if (envelopeState === "open") {
      setEnvelopeState("closed");
    } else if (envelopeState === "scrolled") {
      setEnvelopeState("open");
    }
  };

  return (
    <div style={{ height: "100vh", overflow: "hidden", background: "#111", position: "relative" }}>
      {/* Floating State Controls for isolated debugging/iteration */}
      <div style={{
        position: "fixed",
        top: 20,
        left: 20,
        zIndex: 100000,
        background: "rgba(26, 5, 5, 0.95)",
        padding: "16px",
        borderRadius: "12px",
        border: "2px solid #D4AF37",
        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        fontFamily: "sans-serif",
        color: "#FFF8E7",
        display: "flex",
        flexDirection: "column",
        gap: "12px"
      }}>
        <div style={{ fontWeight: "bold", fontSize: "14px", color: "#D4AF37", letterSpacing: "1px", textTransform: "uppercase" }}>
          ✉️ Envelope Playground
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button 
            onClick={() => setEnvelopeState("closed")}
            style={{
              padding: "8px 14px",
              background: envelopeState === "closed" ? "#D4AF37" : "#3c0c0c",
              color: envelopeState === "closed" ? "#1A0505" : "#FFF8E7",
              border: "1px solid rgba(212,175,55,0.3)",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "12px",
              transition: "all 0.2s"
            }}
          >
            Closed
          </button>
          <button 
            onClick={() => setEnvelopeState("open")}
            style={{
              padding: "8px 14px",
              background: envelopeState === "open" ? "#D4AF37" : "#3c0c0c",
              color: envelopeState === "open" ? "#1A0505" : "#FFF8E7",
              border: "1px solid rgba(212,175,55,0.3)",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "12px",
              transition: "all 0.2s"
            }}
          >
            Open
          </button>
          <button 
            onClick={() => setEnvelopeState("scrolled")}
            style={{
              padding: "8px 14px",
              background: envelopeState === "scrolled" ? "#D4AF37" : "#3c0c0c",
              color: envelopeState === "scrolled" ? "#1A0505" : "#FFF8E7",
              border: "1px solid rgba(212,175,55,0.3)",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "12px",
              transition: "all 0.2s"
            }}
          >
            Scrolled
          </button>
        </div>
        <div style={{ fontSize: "11px", opacity: 0.8, display: "flex", justifyContent: "space-between" }}>
          <span>Current state:</span>
          <strong style={{ color: "#D4AF37" }}>{envelopeState.toUpperCase()}</strong>
        </div>
      </div>

      <Envelope
        activeBurst={activeBurst}
        state={envelopeState}
        onScrollDown={handleScrollDown}
        onScrollUp={handleScrollUp}
      />
    </div>
  );
}
