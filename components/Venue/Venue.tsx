"use client";
import { motion } from "framer-motion";
import styles from "./Venue.module.css";

// ⚠️ Update these with actual venue details
const VENUE_NAME    = "[VENUE_NAME]";
const VENUE_ADDRESS = "[VENUE_ADDRESS], [CITY], [STATE]";
const WEDDING_DATE  = "February 14, 2025";
const WEDDING_TIME  = "11:00 AM onwards";
const MAPS_URL      = "https://maps.google.com";

export default function Venue() {
  return (
    <section className={`section ${styles.section}`} id="venue">
      <motion.h2
        className={styles.heading}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        The Venue
      </motion.h2>

      <motion.p
        className={styles.subheading}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Where we say our vows
      </motion.p>

      <div className="divider">
        <span className="divider-icon">📍</span>
      </div>

      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 50, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <h3 className={styles.venueName}>{VENUE_NAME}</h3>
        <div className="divider">
          <span className="divider-icon">✦</span>
        </div>
        <p className={styles.venueDetails}>
          <strong>{VENUE_ADDRESS}</strong><br /><br />
          📅 {WEDDING_DATE}<br />
          🕐 {WEDDING_TIME}
        </p>

        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.mapBtn}
          id="venue-directions-btn"
        >
          <span className={styles.mapEmoji}>🗺️</span>
          Get Directions
        </a>
      </motion.div>

      <div className="scroll-indicator" style={{ marginTop: 40 }}>
        scroll to see the magic ✨
      </div>
    </section>
  );
}
