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
  onOpened: () => void;
}

export default function Envelope({ activeBurst, onOpened }: Props) {
  const [flapOpen, setFlapOpen]       = useState(false);
  const [cardRising, setCardRising]   = useState(false);
  const [showBurst, setShowBurst]     = useState(false);
  const [hasOpened, setHasOpened]     = useState(false);
  const burstConfig = bursts.find(b => b.id === activeBurst)!;

  const triggerOpen = useCallback(() => {
    if (hasOpened) return;
    setHasOpened(true);
    // Step 1: open flap
    setFlapOpen(true);
    // Step 2: card rises (CSS handles card rising via translateY in 1.4s)
    setCardRising(true);
    // Step 3: burst of particles
    setTimeout(() => setShowBurst(true), 1200);
    // Step 4: tell parent we're done (unlock scrolling)
    setTimeout(() => {
      setShowBurst(false);
      onOpened();
    }, 2800);
  }, [hasOpened, onOpened]);

  // Trigger on wheel (mouse scroll) or touch move (swipe up)
  useEffect(() => {
    if (hasOpened) return;

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
  }, [hasOpened, triggerOpen]);

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
        <div className={styles.bottomFold} />
      </div>

      {/* Card rising out */}
      <div className={styles.cardPeek}>
        <span className={styles.cardPeekContent}>With love ♥</span>
      </div>

      {/* Flap & Flap Shadow */}
      <div className={styles.flap} />
      <div className={styles.flapShadow} />

      {/* Wax seal */}
      <div className={styles.seal}>
        <div className={styles.sealDisc}>
          <span className={styles.sealInitials}>A &amp; P</span>
        </div>
        {!hasOpened && (
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
      {!hasOpened && (
        <div className="scroll-indicator">scroll to see the magic ✨</div>
      )}
    </section>
  );
}

