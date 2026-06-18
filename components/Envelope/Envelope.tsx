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
  isOpen: boolean;
  onOpened: () => void;
}

export default function Envelope({ activeBurst, isOpen, onOpened }: Props) {
  const [flapOpen, setFlapOpen]       = useState(false);
  const [cardRising, setCardRising]   = useState(false);
  const [showBurst, setShowBurst]     = useState(false);
  const burstConfig = bursts.find(b => b.id === activeBurst)!;

  const triggerOpen = useCallback(() => {
    if (isOpen) return;
    onOpened();
  }, [isOpen, onOpened]);

  // Sync state with parent's isOpen prop
  useEffect(() => {
    if (isOpen) {
      setFlapOpen(true);
      setCardRising(true);
      
      const t1 = setTimeout(() => setShowBurst(true), 1200);
      const t2 = setTimeout(() => setShowBurst(false), 2800);
      
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    } else {
      setFlapOpen(false);
      setCardRising(false);
      setShowBurst(false);
    }
  }, [isOpen]);

  // Trigger on wheel (mouse scroll) or touch move (swipe up)
  useEffect(() => {
    if (isOpen) return;

    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      // detect scroll down
      if (e.deltaY > 10) {
        triggerOpen();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchEndY = e.touches[0].clientY;
      const diffY = touchStartY - touchEndY; // positive means swipe up
      if (diffY > 30) {
        triggerOpen();
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
  }, [isOpen, triggerOpen]);

  // Also allow click/tap on the envelope scene
  const handleClick = () => triggerOpen();

  return (
    <section 
      className={`${styles.scene} ${flapOpen ? styles.opened : ""}`} 
      id="envelope" 
      onClick={handleClick}
    >
      {/* Corner ornaments */}
      <span className={`${styles.corner} ${styles.tl}`}>❧</span>
      <span className={`${styles.corner} ${styles.tr}`}>❧</span>
      <span className={`${styles.corner} ${styles.bl}`}>❧</span>
      <span className={`${styles.corner} ${styles.br}`}>❧</span>

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

      {/* Card rising out */}
      <div className={styles.cardPeek}>
        <span className={styles.cardPeekContent}>With love ♥</span>
      </div>

      {/* Flap & Flap Shadow */}
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
      <div className={styles.flapShadow} />

      {/* Wax seal */}
      <div className={styles.seal}>
        <div className={styles.sealDisc}>
          <span className={styles.sealInitials}>A &amp; P</span>
        </div>
        {!isOpen && (
          <div className={styles.prompt}>
            Scroll or Click to open
            <span className={styles.promptArrow} />
          </div>
        )}
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

