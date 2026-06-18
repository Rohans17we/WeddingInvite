"use client";
import { useEffect, useRef, useState } from "react";

export default function MuteButton() {
  const audioRef  = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted]       = useState(false);
  const [started, setStarted]   = useState(false);

  // Start audio on first user interaction
  useEffect(() => {
    const audio = new Audio("/audio/shahnai.mp3");
    audio.loop   = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    // Silently check if audio file exists before trying to play
    fetch("/audio/shahnai.mp3", { method: "HEAD" })
      .then(r => {
        if (!r.ok) return; // File not yet added — skip silently
        const tryPlay = () => {
          if (!started) {
            audio.play().then(() => setStarted(true)).catch(() => {});
          }
        };
        window.addEventListener("click",      tryPlay, { once: true });
        window.addEventListener("scroll",     tryPlay, { once: true });
        window.addEventListener("touchstart", tryPlay, { once: true });
      })
      .catch(() => {}); // Offline or missing — ignore

    return () => { audio.pause(); };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (muted) {
      audio.muted = false;
      setMuted(false);
    } else {
      audio.muted = true;
      setMuted(true);
    }
  };

  return (
    <button
      onClick={toggle}
      title={muted ? "Unmute music" : "Mute music"}
      id="mute-btn"
      style={{
        position: "fixed",
        bottom: "24px",
        left: "24px",
        zIndex: 99999,
        width: 48, height: 48,
        borderRadius: "50%",
        background: "rgba(212, 175, 55, 0.15)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(212, 175, 55, 0.4)",
        color: "var(--color-gold)",
        fontSize: "1.2rem",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.1)")}
      onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
    >
      {muted ? "🔇" : "🎵"}
    </button>
  );
}
