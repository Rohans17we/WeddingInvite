"use client";
import { motion } from "framer-motion";
import styles from "./Festivities.module.css";

// ⚠️ Update dates, times, and venues for each event
const events = [
  {
    icon: "🌿",
    name: "Haldi",
    date: "[DATE]",
    time: "[TIME]",
    venue: "[VENUE]",
    description: "A turmeric blessing ceremony",
  },
  {
    icon: "🌸",
    name: "Mehendi",
    date: "[DATE]",
    time: "[TIME]",
    venue: "[VENUE]",
    description: "An evening of henna & celebrations",
  },
  {
    icon: "🎶",
    name: "Sangeet",
    date: "[DATE]",
    time: "[TIME]",
    venue: "[VENUE]",
    description: "Dance, music & merrymaking",
  },
  {
    icon: "💍",
    name: "Engagement",
    date: "[DATE]",
    time: "[TIME]",
    venue: "[VENUE]",
    description: "The ring ceremony & commitment",
  },
  {
    icon: "🔥",
    name: "Pheras · Vivah",
    date: "[DATE]",
    time: "[TIME]",
    venue: "[VENUE]",
    description: "The sacred wedding ceremony",
  },
  {
    icon: "🥂",
    name: "Reception",
    date: "[DATE]",
    time: "[TIME]",
    venue: "[VENUE]",
    description: "An evening of joy & celebration",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

export default function Festivities() {
  return (
    <section className={`section ${styles.section}`} id="festivities">
      <motion.h2
        className={styles.heading}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        The Celebrations
      </motion.h2>

      <motion.p
        className={styles.subheading}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Join us for every moment of joy
      </motion.p>

      <div className="divider">
        <span className="divider-icon">🎊</span>
      </div>

      <div className={styles.grid}>
        {events.map((event, i) => (
          <motion.div
            key={i}
            className={styles.card}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <span className={styles.icon}>{event.icon}</span>
            <h3 className={styles.eventName}>{event.name}</h3>
            <p className={styles.details}>
              {event.description}
              <strong>{event.venue}</strong>
            </p>
            <span className={styles.dateChip}>
              {event.date} · {event.time}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="scroll-indicator" style={{ marginTop: 48 }}>
        scroll to see the magic ✨
      </div>
    </section>
  );
}
