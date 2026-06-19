"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./Preloader.module.css";

interface PreloaderProps {
  onComplete: () => void;
}

const PRELOAD_IMAGES = [
  "/textures/stamp.png",
  "/textures/envelope-texture.png",
  "/textures/envelope-inside.png",
  "/textures/card-texture-1.jpg",
  "/textures/card-border-2.png",
  "/textures/invite-arch.png",
  "/textures/invite-bg.png",
  "/textures/invite-ganesh.png",
  "/textures/invite-lantern.png",
  "/textures/invite-mandala.png",
];

const PRELOAD_VIDEOS = [
  "/textures/mobile-view.mp4",
  "/textures/desktop-view.mp4",
];

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Invoking blessings...");

  useEffect(() => {
    let active = true;
    let loadedCount = 0;
    const totalCount = PRELOAD_IMAGES.length + PRELOAD_VIDEOS.length + 1; // +1 for fonts

    const updateProgress = () => {
      if (!active) return;
      loadedCount++;
      const percent = Math.min(Math.round((loadedCount / totalCount) * 100), 100);
      setProgress(percent);

      // Dynamic traditional status text updates based on progress
      if (percent < 30) {
        setStatusText("Invoking blessings... ॐ");
      } else if (percent < 60) {
        setStatusText("Preparing the golden envelope... 🪷");
      } else if (percent < 90) {
        setStatusText("Weaving the floral cards... 🌸");
      } else {
        setStatusText("Almost ready... ✨");
      }

      if (loadedCount >= totalCount) {
        setTimeout(() => {
          if (active) onComplete();
        }, 800); // Small delay for visual completion
      }
    };

    // 1. Preload Fonts
    const loadFonts = async () => {
      try {
        if (typeof document !== "undefined" && document.fonts) {
          // Put a timeout of 4 seconds so fonts don't hold the loader indefinitely
          await Promise.race([
            document.fonts.ready,
            new Promise((resolve) => setTimeout(resolve, 4000))
          ]);
        }
      } catch (err) {
        console.warn("Fonts loading deferred", err);
      } finally {
        updateProgress();
      }
    };

    // 2. Preload Images
    const loadImages = () => {
      PRELOAD_IMAGES.forEach((src) => {
        const img = new Image();
        img.src = src;

        const handleLoad = () => {
          img.onload = null;
          img.onerror = null;
          updateProgress();
        };

        // Fallback timeout per image (5 seconds)
        const timeoutId = setTimeout(handleLoad, 5000);

        img.onload = () => {
          clearTimeout(timeoutId);
          handleLoad();
        };
        img.onerror = () => {
          clearTimeout(timeoutId);
          handleLoad();
        };
      });
    };

    // 3. Preload Videos
    const loadVideos = () => {
      PRELOAD_VIDEOS.forEach((src) => {
        const video = document.createElement("video");
        video.src = src;
        video.preload = "auto";
        video.muted = true;

        const handleLoad = () => {
          video.onloadedmetadata = null;
          video.oncanplay = null;
          video.onerror = null;
          updateProgress();
        };

        // Fallback timeout per video (6 seconds)
        const timeoutId = setTimeout(handleLoad, 6000);

        video.onloadedmetadata = () => {
          clearTimeout(timeoutId);
          handleLoad();
        };
        video.oncanplay = () => {
          clearTimeout(timeoutId);
          handleLoad();
        };
        video.onerror = () => {
          clearTimeout(timeoutId);
          handleLoad();
        };
      });
    };

    // Run loaders
    loadFonts();
    loadImages();
    loadVideos();

    return () => {
      active = false;
    };
  }, [onComplete]);

  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className={styles.container}>
        {/* Animated Ornate Golden Mandala */}
        <div className={styles.mandalaWrapper}>
          <svg viewBox="0 0 100 100" className={styles.mandala}>
            {/* Outer rings */}
            <circle cx="50" cy="50" r="46" className={styles.mandalaRing} strokeWidth="0.5" strokeDasharray="3, 3" />
            <circle cx="50" cy="50" r="42" className={styles.mandalaRing} strokeWidth="1" />
            <circle cx="50" cy="50" r="36" className={styles.mandalaRing} strokeWidth="0.5" strokeDasharray="1, 1" />
            
            {/* Center concentric design */}
            <circle cx="50" cy="50" r="12" className={styles.mandalaRing} strokeWidth="0.75" />
            <circle cx="50" cy="50" r="4" className={styles.mandalaRingFill} />

            {/* Geometric Petal Paths */}
            {Array.from({ length: 12 }).map((_, i) => {
              const rotation = i * (360 / 12);
              return (
                <path
                  key={i}
                  d="M 50,50 C 40,30 45,15 50,10 C 55,15 60,30 50,50 Z"
                  transform={`rotate(${rotation} 50 50)`}
                  className={styles.mandalaPetal}
                  strokeWidth="0.5"
                />
              );
            })}
            
            {/* Secondary Inner Petals */}
            {Array.from({ length: 12 }).map((_, i) => {
              const rotation = (i * (360 / 12)) + 15;
              return (
                <path
                  key={i}
                  d="M 50,50 C 45,35 48,25 50,20 C 52,25 55,35 50,50 Z"
                  transform={`rotate(${rotation} 50 50)`}
                  className={styles.mandalaInnerPetal}
                  strokeWidth="0.5"
                />
              );
            })}
          </svg>
        </div>

        {/* Traditional Sanskrit Greeting */}
        <div className={styles.shloka}>ॐ श्री गणेशाय नमः</div>

        {/* Calligraphic Couple Names */}
        <h1 className={styles.names}>Ritik & Ameesha</h1>
        <p className={styles.inviteWording}>Wedding Invitation</p>

        {/* Loading Progress Interface */}
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className={styles.progressDetails}>
            <span className={styles.statusText}>{statusText}</span>
            <span className={styles.percentText}>{progress}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
