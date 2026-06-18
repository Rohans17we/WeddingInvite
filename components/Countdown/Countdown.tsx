"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useCountdown } from "@/hooks/useCountdown";
import styles from "./Countdown.module.css";

// ⚠️ Update to actual wedding date
const WEDDING_DATE = new Date("2025-02-14T11:00:00+05:30");
const WEDDING_DATE_DISPLAY = "February 14, 2025";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function FlipUnit({ value, label }: { value: string; label: string }) {
  return (
    <div className={styles.flipCard}>
      <div className={styles.flipInner}>
        <div className={styles.flipTop}>{value}</div>
        <div className={styles.flipBottom}>{value}</div>
      </div>
      <span className={styles.flipLabel}>{label}</span>
    </div>
  );
}

export default function Countdown() {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(WEDDING_DATE);

  return (
    <section className={`section ${styles.section}`} id="countdown">
      <motion.p
        className={styles.quote}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        &ldquo;A lifetime of togetherness begins with one sacred step&rdquo;
      </motion.p>

      <div className="divider">
        <span className="divider-icon" style={{ color: "var(--color-gold)" }}>✦</span>
      </div>

      <motion.h2
        className={styles.weddingLabel}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        The Wedding
      </motion.h2>

      <motion.p
        className={styles.weddingDate}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.7 }}
      >
        {WEDDING_DATE_DISPLAY}
      </motion.p>

      <motion.div
        className={styles.countdownGrid}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        {isExpired ? (
          <p className={styles.expiredMessage}>The celebration has begun! 🎉</p>
        ) : (
          <>
            <FlipUnit value={String(days)}      label="Days"    />
            <span className={styles.separator}>:</span>
            <FlipUnit value={pad(hours)}         label="Hours"   />
            <span className={styles.separator}>:</span>
            <FlipUnit value={pad(minutes)}       label="Minutes" />
            <span className={styles.separator}>:</span>
            <FlipUnit value={pad(seconds)}       label="Seconds" />
          </>
        )}
      </motion.div>

      <div className="scroll-indicator" style={{ color: "rgba(212,175,55,0.7)" }}>
        scroll to see the magic ✨
      </div>
    </section>
  );
}
