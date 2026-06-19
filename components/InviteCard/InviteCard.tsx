"use client";
import { useRef, useEffect } from "react";
import styles from "./InviteCard.module.css";

export default function InviteCard() {
  const containerRef = useRef<HTMLElement>(null);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const desktopVideo = desktopVideoRef.current;
    const mobileVideo = mobileVideoRef.current;

    const observeVideo = (video: HTMLVideoElement | null) => {
      if (!video) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            video.play().catch(err => {
              console.log("Video play was prevented or failed:", err);
            });
          } else {
            video.pause();
          }
        },
        { threshold: 0.1 } // play when at least 10% of the section is visible
      );

      observer.observe(video);
      return observer;
    };

    const desktopObserver = observeVideo(desktopVideo);
    const mobileObserver = observeVideo(mobileVideo);

    return () => {
      if (desktopObserver && desktopVideo) desktopObserver.unobserve(desktopVideo);
      if (mobileObserver && mobileVideo) mobileObserver.unobserve(mobileVideo);
    };
  }, []);

  return (
    <section className={styles.section} id="invite" ref={containerRef}>
      {/* Desktop Video Container (Shown on Desktop viewports) */}
      <div className={styles.desktopVideoContainer}>
        <video
          ref={desktopVideoRef}
          src="/textures/desktop-view.mp4"
          className={styles.desktopVideo}
          loop
          muted
          playsInline
        />
      </div>

      {/* Mobile/Tablet Video Container (Shown on Mobile/Tablet viewports) */}
      <div className={styles.mobileVideoContainer}>
        <video
          ref={mobileVideoRef}
          src="/textures/mobile-view.mp4"
          className={styles.mobileVideo}
          loop
          muted
          playsInline
        />
      </div>

      {/* Floating Scroll Indicator */}
      <div className="scroll-indicator">scroll to see the magic ✨</div>
    </section>
  );
}
