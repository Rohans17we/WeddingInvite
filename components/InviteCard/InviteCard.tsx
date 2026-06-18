"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./InviteCard.module.css";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function InviteCard() {
  const ref = useRef(null);

  return (
    <section className={`section ${styles.section}`} id="invite">
      <div className={styles.inner} ref={ref}>
        {/* Ganesh */}
        <motion.div
          className={styles.ganeshWrapper}
          variants={fadeUp} custom={0}
          initial="hidden" whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className={styles.ganeshFallback}>🐘</div>
        </motion.div>

        {/* Om Ganeshaya Namaha */}
        <motion.p
          className={styles.om}
          variants={fadeUp} custom={1}
          initial="hidden" whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          ॐ गणेशाय नमः
        </motion.p>

        {/* Script heading */}
        <motion.h1
          className={styles.blessing}
          variants={fadeUp} custom={2}
          initial="hidden" whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          With Great Joy & Blessings
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          variants={fadeUp} custom={3}
          initial="hidden" whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          We joyfully invite you to the wedding of
        </motion.p>

        <div className="divider">
          <span className="divider-icon">🪷</span>
        </div>

        {/* Family grid */}
        <motion.div
          className={styles.familyGrid}
          variants={fadeUp} custom={4}
          initial="hidden" whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Groom */}
          <div className={styles.familyCard}>
            <h2 className={styles.personName}>[GROOM_NAME]</h2>
            <p className={styles.parentsLabel}>Son of</p>
            <p className={styles.parentsName}>
              [GROOM_FATHER]<br />
              &amp; [GROOM_MOTHER]
            </p>
          </div>

          {/* And */}
          <div className={styles.andSymbol}>&amp;</div>

          {/* Bride */}
          <div className={styles.familyCard}>
            <h2 className={styles.personName}>[BRIDE_NAME]</h2>
            <p className={styles.parentsLabel}>Daughter of</p>
            <p className={styles.parentsName}>
              [BRIDE_FATHER]<br />
              &amp; [BRIDE_MOTHER]
            </p>
          </div>
        </motion.div>
      </div>

      <div className="scroll-indicator">scroll to see the magic ✨</div>
    </section>
  );
}
