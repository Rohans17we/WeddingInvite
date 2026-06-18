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
  const wrapperRef                    = useRef<HTMLDivElement>(null);
  const burstConfig = bursts.find(b => b.id === activeBurst)!;

  const triggerOpen = useCallback(() => {
    if (hasOpened) return;
    setHasOpened(true);
    // Step 1: open flap
    setFlapOpen(true);
    // Step 2: card rises
    setTimeout(() => setCardRising(true), 800);
    // Step 3: burst
    setTimeout(() => setShowBurst(true), 1200);
    // Step 4: tell parent we're done
    setTimeout(() => {
      setShowBurst(false);
      onOpened();
    }, 2800);
  }, [hasOpened, onOpened]);

  // Trigger on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) triggerOpen();
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [triggerOpen]);

  // Also allow click/tap
  const handleClick = () => triggerOpen();

  return (
    <section className={styles.scene} id="envelope" onClick={handleClick}>
      {/* Corner ornaments */}
      <span className={`${styles.corner} ${styles.tl}`}>❧</span>
      <span className={`${styles.corner} ${styles.tr}`}>❧</span>
      <span className={`${styles.corner} ${styles.bl}`}>❧</span>
      <span className={`${styles.corner} ${styles.br}`}>❧</span>

      <div className={styles.envelopeWrapper} ref={wrapperRef}>
        <div className={styles.envelope}>
          {/* Card inside */}
          <div className={`${styles.card} ${cardRising ? styles.rising : ""}`}>
            <span className={styles.cardContent}>With love ♥</span>
          </div>

          {/* Flap */}
          <div className={`${styles.flap} ${flapOpen ? styles.open : ""}`} />

          {/* Wax seal */}
          <div className={styles.seal}>
            <span className={styles.sealText}>A &amp; P</span>
          </div>
        </div>
      </div>

      {/* Scroll / tap prompt */}
      {!hasOpened && (
        <div className={styles.prompt}>
          Scroll to open
          <span className={styles.promptArrow} />
        </div>
      )}

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
