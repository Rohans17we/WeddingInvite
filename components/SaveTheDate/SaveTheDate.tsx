"use client";
import { motion } from "framer-motion";
import ScratchCard from "./ScratchCard";
import styles from "./SaveTheDate.module.css";

// ⚠️ Update these when the wedding date is confirmed
const MONTH = "February";
const DAY   = "14";
const YEAR  = "2025";

export default function SaveTheDate() {
  return (
    <section className={`section ${styles.section}`} id="save-the-date">
      <motion.h2
        className={styles.heading}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        Save the Date
      </motion.h2>

      <motion.p
        className={styles.subheading}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Scratch to reveal our wedding date
      </motion.p>

      <motion.div
        className={styles.cardsRow}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.7 }}
      >
        <ScratchCard reveal={MONTH} label="Month" />
        <ScratchCard reveal={DAY}   label="Day"   />
        <ScratchCard reveal={YEAR}  label="Year"  />
      </motion.div>

      <motion.p
        className={styles.hint}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        Use your finger or mouse to scratch the golden cards ✨
      </motion.p>

      <div className="scroll-indicator">scroll to see the magic ✨</div>
    </section>
  );
}
