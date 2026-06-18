"use client";
import { motion } from "framer-motion";
import styles from "./OurStory.module.css";

// ⚠️ Replace emoji placeholders with actual <Image> components once photos are added
// Add photos to public/photos/ and update the src below
const photos = [
  { src: null, emoji: "💑", caption: "Where it all began",    rotation: -4 },
  { src: null, emoji: "🌸", caption: "Our first adventure",   rotation:  3 },
  { src: null, emoji: "✈️", caption: "Travelling together",   rotation: -2 },
  { src: null, emoji: "🌅", caption: "Watching sunsets",      rotation:  5 },
  { src: null, emoji: "🥂", caption: "Celebrating us",        rotation: -3 },
  { src: null, emoji: "💍", caption: "She said yes! 💍",      rotation:  2 },
];

const cardVariants = {
  hidden:  { opacity: 0, y: 80, rotate: 0 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotate: photos[i].rotation,
    transition: {
      delay: i * 0.12,
      duration: 0.7,
      ease: [0.34, 1.56, 0.64, 1] as const,
    },
  }),
};

const hoverVariants = {
  rest:  { rotate: (i: number) => photos[i]?.rotation ?? 0, scale: 1 },
  hover: { rotate: 0, scale: 1.06, transition: { duration: 0.3 } },
};

export default function OurStory() {
  return (
    <section className={`section ${styles.section}`} id="our-story">
      {/* Header */}
      <div className={styles.header}>
        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Our Story
        </motion.h2>
        <motion.p
          className={styles.subheading}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Forever Us
        </motion.p>
        <div className="divider">
          <span className="divider-icon">💕</span>
        </div>
      </div>

      {/* Polaroid gallery */}
      <div className={styles.gallery}>
        {photos.map((photo, i) => (
          <motion.div
            key={i}
            className={styles.polaroid}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover={{ rotate: 0, scale: 1.06, transition: { duration: 0.3 } }}
            viewport={{ once: true, amount: 0.1 }}
            style={{ rotate: `${photo.rotation}deg` }}
          >
            {photo.src ? (
              // Replace with Next.js <Image> once photos are added
              <img src={photo.src} className={styles.polaroidImg} alt={photo.caption} />
            ) : (
              <div className={styles.polaroidPlaceholder}>{photo.emoji}</div>
            )}
            <p className={styles.caption}>{photo.caption}</p>
          </motion.div>
        ))}
      </div>

      <div className="scroll-indicator" style={{ marginTop: 40 }}>
        scroll to see the magic ✨
      </div>
    </section>
  );
}
