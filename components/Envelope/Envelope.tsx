"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import type { BurstId } from "@/lib/bursts";
import { bursts } from "@/lib/bursts";
import styles from "./Envelope.module.css";

// Lazy-load tsParticles to avoid SSR issues
const Particles = dynamic(() => import("@tsparticles/react").then(m => m.Particles), { ssr: false });

interface Props {
  activeBurst: BurstId;
  state: "closed" | "open" | "scrolled";
  onScrollDown: () => void;
  onScrollUp: () => void;
}

export default function Envelope({ activeBurst, state, onScrollDown, onScrollUp }: Props) {
  const [flapOpen, setFlapOpen] = useState(false);
  const [cardRising, setCardRising] = useState(false);
  const [showBurst, setShowBurst] = useState(false);
  const burstConfig = bursts.find(b => b.id === activeBurst)!;
  const prevStateRef = useRef(state);

  const isOpen = state !== "closed";

  // Sync state changes from parent state machine
  useEffect(() => {
    const prev = prevStateRef.current;
    prevStateRef.current = state;

    if (state === "open" || state === "scrolled") {
      setFlapOpen(true);
      setCardRising(true);

      // Only trigger particles if transitioning from closed to open
      if (prev === "closed" && state === "open") {
        const t1 = setTimeout(() => setShowBurst(true), 1200);
        const t2 = setTimeout(() => setShowBurst(false), 2800);
        return () => {
          clearTimeout(t1);
          clearTimeout(t2);
        };
      }
    } else {
      setFlapOpen(false);
      setCardRising(false);
      setShowBurst(false);
    }
  }, [state]);

  // Intercept scroll wheel/swipes when the scroll container is locked
  useEffect(() => {
    // If the scroll container is fully scrolled and unlocked, let native scrolling snap it
    if (state === "scrolled") return;

    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 10) {
        onScrollDown();
      } else if (e.deltaY < -10) {
        onScrollUp();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchEndY = e.touches[0].clientY;
      const diffY = touchStartY - touchEndY; // positive means swipe up (scroll down)

      if (diffY > 30) {
        onScrollDown();
      } else if (diffY < -30) {
        onScrollUp();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [state, onScrollDown, onScrollUp]);

  // Click handler: opens or goes to scrolled detail state
  const handleClick = () => {
    if (state === "closed" || state === "open") {
      onScrollDown();
    }
  };

  return (
    <section
      className={`${styles.scene} ${flapOpen ? styles.opened : ""}`}
      id="envelope"
      onClick={handleClick}
    >

      <div className={styles.envelope}>
        {/* Envelope Body background and side/bottom folds */}
        <div className={styles.envelopeBody}>
          <div className={styles.envelopeBorder} />
          <div className={styles.leftFold} />
          <div className={styles.rightFold} />
          <div className={styles.bottomFold} />

          {/* SVG overlays to draw prominent lines for envelope shape */}
          <svg className={styles.bodyLines} viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Subtle drop shadow lines behind the folds */}
            <line x1="0" y1="100" x2="50" y2="55" stroke="#000000" strokeWidth="1.2" opacity="0.45" />
            <line x1="100" y1="100" x2="50" y2="55" stroke="#000000" strokeWidth="1.2" opacity="0.45" />

            {/* Ornate gold lines tracing the fold edges */}
            <line x1="0" y1="100" x2="50" y2="55" stroke="var(--color-gold)" strokeWidth="0.4" opacity="0.8" />
            <line x1="100" y1="100" x2="50" y2="55" stroke="var(--color-gold)" strokeWidth="0.4" opacity="0.8" />
          </svg>
        </div>

        {/* Inside lining behind the card */}
        <div className={styles.insideLining}>
          {/* SVG overlays inside lining to match flap styling */}
          <svg className={styles.insideLiningLines} viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Subtle gold line along the edge of the inside lining */}
            <line x1="0" y1="0" x2="50" y2="90" stroke="var(--color-gold)" strokeWidth="0.4" opacity="0.6" />
            <line x1="100" y1="0" x2="50" y2="90" stroke="var(--color-gold)" strokeWidth="0.4" opacity="0.6" />
          </svg>
        </div>

        {/* Card rising out */}
        <div className={styles.cardPeek}>
          <div className={styles.cardPeekContent}>
            <div className={styles.cardLine1}>With Love</div>
            <div className={styles.cardLine2}>From</div>
            <div className={styles.cardLine3}>
              Ritik <span className={styles.ampersand}>&amp;</span> Ameesha
            </div>
          </div>
        </div>

        {/* Flap (Note: flapShadow horizontal line is removed) */}
        <div className={styles.flap}>
          {/* SVG overlays inside flap to rotate with it in 3D */}
          <svg className={styles.flapLines} viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Shadow along flap edge */}
            <line x1="0" y1="0" x2="50" y2="90" stroke="#000000" strokeWidth="1.2" opacity="0.45" />
            <line x1="100" y1="0" x2="50" y2="90" stroke="#000000" strokeWidth="1.2" opacity="0.45" />

            {/* Gold highlight line along flap edge */}
            <line x1="0" y1="0" x2="50" y2="90" stroke="var(--color-gold)" strokeWidth="0.4" opacity="0.8" />
            <line x1="100" y1="0" x2="50" y2="90" stroke="var(--color-gold)" strokeWidth="0.4" opacity="0.8" />
          </svg>
        </div>

        {/* Wax seal */}
        <div className={styles.seal}>
          <img
            src="/textures/stamp.png"
            alt="Wax Seal"
            className={styles.sealImage}
          />
        </div>
      </div>

      {/* Particle burst */}
      {showBurst && (
        <div className="particles-overlay">
          <Particles
            id="burst-particles"
            options={burstConfig.options}
          />
        </div>
      )}

      {/* Scroll indicator at bottom */}
      {!isOpen && (
        <div className="scroll-indicator">scroll to see the magic ✨</div>
      )}
    </section>
  );
}

