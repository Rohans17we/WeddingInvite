"use client";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

interface Props {
  /** Called when the envelope animation finishes and the user scrolls down again */
  onScrollToNext: () => void;
}

export default function EnvelopeHero({ onScrollToNext }: Props) {
  const [svgContent, setSvgContent] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  // Whether the opening animation has fully completed
  const isOpenRef = useRef(false);
  // Ref so scroll handlers always see the latest callback
  const onScrollToNextRef = useRef(onScrollToNext);
  useEffect(() => { onScrollToNextRef.current = onScrollToNext; }, [onScrollToNext]);

  // 1. Fetch the reference SVG at runtime
  useEffect(() => {
    fetch("/envelope-reference.svg")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load SVG");
        return res.text();
      })
      .then((text) => setSvgContent(text))
      .catch((err) => console.error("Error loading envelope SVG:", err));
  }, []);

  // 2. Set up the GSAP timeline once the SVG content is loaded
  useEffect(() => {
    if (!svgContent || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Configure initial states
      gsap.set("#paper-mask-full", { autoAlpha: 0 });

      // Continuous bouncing arrow animation
      gsap.to("#arrow", {
        y: "+=10",
        repeat: -1,
        yoyo: true,
        duration: 0.6,
        ease: "power1.inOut",
      });

      // Create timeline
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power2.inOut" },
        onComplete: () => { isOpenRef.current = true; },
        onReverseComplete: () => { isOpenRef.current = false; },
      });

      tl
        // 1. Hide interactive elements
        .to("#arrow", { autoAlpha: 0, duration: 0.3 })
        .to("#button", { autoAlpha: 0, scale: 0, transformOrigin: "center center", duration: 0.3 }, "<")
        .to("#text > *", { autoAlpha: 0, stagger: 0.05, duration: 0.3 }, "<")

        // 2. Envelope top flap opening
        .to("#closed", {
          duration: 1.5,
          transformOrigin: "center top",
          fill: "#BF6363",
          scaleY: -1,
          ease: "power1.inOut",
        })

        // 3. Pattern top emergence (inside flap lining)
        .from(
          "#pattern-top",
          {
            duration: 1.2,
            transformOrigin: "center bottom",
            scaleY: 0,
            ease: "power1.inOut",
          },
          "-=1.0"
        )

        // 4. Paper card sliding out
        .fromTo(
          "#paper",
          { y: 350 },
          { y: 0, duration: 1.8 },
          "-=1.8"
        )
        .to("#paper-mask", { y: "+=500", duration: 2.2 })
        .to(
          "#envelope-interactive",
          { y: 500, duration: 2.3 },
          "<"
        )

        // 5. Final inner shadow reveal
        .to("#paper-mask-full", { autoAlpha: 1, duration: 0.01 }, "-=0.8")
        .from("#shadows-inner", { autoAlpha: 0, y: "+=2", duration: 0.3 }, "-=0.2");

      timelineRef.current = tl;
    }, containerRef);

    return () => ctx.revert();
  }, [svgContent]);

  // 3. Scroll and swipe gesture detection
  useEffect(() => {
    let touchStartY = 0;
    // Cooldown to prevent rapid repeated triggers
    let lastScrollTime = 0;

    const handleWheel = (e: WheelEvent) => {
      const tl = timelineRef.current;
      if (!tl) return;

      if (e.deltaY > 10) {
        if (isOpenRef.current) {
          // Animation done — hand off to parent to scroll to next section
          const now = Date.now();
          if (now - lastScrollTime > 1200) {
            lastScrollTime = now;
            onScrollToNextRef.current();
          }
        } else {
          tl.play();
        }
      } else if (e.deltaY < -10) {
        if (!isOpenRef.current) {
          tl.reverse();
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const tl = timelineRef.current;
      if (!tl) return;

      const touchEndY = e.touches[0].clientY;
      const diffY = touchStartY - touchEndY;

      if (diffY > 30) {
        if (isOpenRef.current) {
          const now = Date.now();
          if (now - lastScrollTime > 1200) {
            lastScrollTime = now;
            onScrollToNextRef.current();
          }
        } else {
          tl.play();
        }
      } else if (diffY < -30) {
        if (!isOpenRef.current) {
          tl.reverse();
        }
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
  }, []);

  // Click handler to toggle envelope state
  const handleToggle = () => {
    const tl = timelineRef.current;
    if (!tl) return;

    if (isOpenRef.current) {
      tl.reverse();
    } else {
      tl.play();
    }
  };

  return (
    <section
      style={{
        height: "100vh",
        width: "100vw",
        backgroundImage: "url('/textures/envelope-inside-page.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      <style>{`
        svg {
          width: 97vw !important;
          height: 97vh !important;
          margin: 0 auto !important;
          overflow: visible !important;
        }

        .card-wrapper {
          position: absolute;
          inset: 40px;
          padding: 0;
          filter: drop-shadow(0 15px 35px rgba(0, 0, 0, 0.45));
        }

        .card-inner {
          position: absolute;
          inset: 0;
          background-image: url('/textures/card-texture-1.jpg');
          background-size: cover;
          background-position: center;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          overflow: hidden;
          clip-path: inset(0 round 8px);
          padding: 20px;
        }

        .card-inner::before {
          content: '';
          position: absolute;
          inset: -35px -35px -15px -15px;
          background-image: url('/textures/card-border-2.png');
          background-size: 100% 100%;
          background-repeat: no-repeat;
          pointer-events: none;
          z-index: 2;
        }

        .card-content {
          width: 85%;
          height: 85%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          gap: 15px;
          z-index: 10;
          box-sizing: border-box;
        }

        .card-line-1, .card-line-2 {
          font-family: "Pinyon Script", "above-the-sky-script", cursive, serif;
          font-size: 28px;
          background: linear-gradient(135deg, #ffe29a 0%, #d4af37 40%, #a37c1e 55%, #f7e2a9 85%, #d4af37 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
          letter-spacing: 0.05em;
          line-height: 1.1;
        }

        .card-line-3 {
          font-family: "Pinyon Script", "above-the-sky-script", cursive, serif;
          font-size: 54px;
          background: linear-gradient(135deg, #ffe29a 0%, #d4af37 40%, #a37c1e 55%, #f7e2a9 85%, #d4af37 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.25));
          letter-spacing: 0.03em;
          line-height: 1.1;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
        }

        .card-name {
          display: inline-block;
        }

        .card-ampersand {
          font-size: 24px;
          margin: 0 8px;
          background: linear-gradient(135deg, #ffe29a 0%, #d4af37 40%, #a37c1e 55%, #f7e2a9 85%, #d4af37 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        @media (max-width: 1024px) {
          svg {
            width: 200vw !important;
            height: 97vh !important;
            left: -50vw !important;
            position: absolute !important;
          }

          #paper {
            x: 535px !important;
            width: 377.5px !important;
          }
        }
      `}</style>

      {/* SVG Container */}
      <div
        ref={containerRef}
        onClick={handleToggle}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
    </section>
  );
}
