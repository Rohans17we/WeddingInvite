"use client";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import styles from "./EnvelopeHero.module.css";

interface Props {
  /** Called when the envelope animation finishes and the user scrolls down again */
  onScrollToNext: () => void;
}

export default function EnvelopeHero({ onScrollToNext }: Props) {
  const [svgContent, setSvgContent] = useState<string>("");
  const [isSafari, setIsSafari] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const isOpenRef = useRef(false);
  const reverseIntentRef = useRef<"next" | "close">("close");
  const isTransitioningRef = useRef(false);
  const onScrollToNextRef = useRef(onScrollToNext);
  
  // Refs for Safari fallback layered approach
  const svg1Ref = useRef<HTMLDivElement>(null);
  const svg2Ref = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const cardMaskRef = useRef<HTMLDivElement>(null);

  useEffect(() => { onScrollToNextRef.current = onScrollToNext; }, [onScrollToNext]);

  // 1. Detect browser client-side
  useEffect(() => {
    const vendor = navigator.vendor.toLowerCase();
    // In iOS, all browsers (including Chrome/CriOS and Firefox/FxiOS) are forced to use WebKit.
    // WebKit has the foreignObject bug. Thus, any browser with the Apple vendor string needs the fallback.
    const isSafariBrowser = vendor.includes("apple");
    setIsSafari(isSafariBrowser);
  }, []);

  // 2. Fetch the reference SVG at runtime and modify if Safari
  useEffect(() => {
    fetch("/envelope-reference.svg")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load SVG");
        return res.text();
      })
      .then((text) => {
        if (isSafari) {
          // Safari workaround: strip foreignObject completely. We will render it as a sibling HTML element.
          const stripped = text.replace(/<g mask="url\(#mask\)[\s\S]*?<foreignObject[\s\S]*?<\/foreignObject>\s*<\/g>/gi, "");
          setSvgContent(stripped);
        } else {
          setSvgContent(text);
        }
      })
      .catch((err) => console.error("Error loading envelope SVG:", err));
  }, [isSafari]);

  // 3. GSAP timeline
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

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power2.inOut" },
        onComplete: () => {
          isOpenRef.current = true;
          isTransitioningRef.current = false;
        },
        onReverseComplete: () => {
          isOpenRef.current = false;
          isTransitioningRef.current = false;
          if (reverseIntentRef.current === "next") {
            reverseIntentRef.current = "close";
            onScrollToNextRef.current();
          }
        },
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
        .from("#pattern-top", {
          duration: 1.2,
          transformOrigin: "center bottom",
          scaleY: 0,
          ease: "power1.inOut",
        }, "-=1.0");

      if (isSafari && cardRef.current && svg1Ref.current && svg2Ref.current && cardMaskRef.current) {
        // --- SAFARI HTML LAYERED PATH ---
        tl
          // 4. Slide HTML card up
          .fromTo(
            cardRef.current,
            { y: "68.2%" },
            { y: "0%", duration: 1.8 },
            "-=1.8"
          )
          // Expand the mask downwards exactly synchronously with the SVGs moving down
          // to perfectly mimic the SVG mask sliding behavior
          .to(cardMaskRef.current, { height: "156.77%", duration: 2.2 }, "<")
          // Move the SVGs (envelope) down
          .to([svg1Ref.current, svg2Ref.current], { y: "97.4%", duration: 2.3 }, "<")
          // Snap mask fully open near the end to reveal corners, matching original
          .to(cardMaskRef.current, { height: "200%", duration: 0.01 }, "-=0.8");
      } else {
        // --- CHROME/FIREFOX NATIVE SVG PATH ---
        tl
          // 4. Paper card sliding out
          .fromTo("#paper", { y: 350 }, { y: 0, duration: 1.8 }, "-=1.8")
          .to("#paper-mask", { y: "+=500", duration: 2.2 })
          .to("#envelope-interactive", { y: 500, duration: 2.3 }, "<");
      }

      // 5. Final inner shadow reveal
      if (!isSafari) {
        tl.to("#paper-mask-full", { autoAlpha: 1, duration: 0.01 }, "-=0.8");
      }
      tl.from("#shadows-inner", { autoAlpha: 0, y: "+=2", duration: 0.3 }, "-=0.2");

      timelineRef.current = tl;
    }, containerRef);

    return () => ctx.revert();
  }, [svgContent, isSafari]);

  // 4. Scroll and swipe gesture detection
  useEffect(() => {
    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      const tl = timelineRef.current;
      if (!tl || isTransitioningRef.current) return;

      if (e.deltaY > 10) {
        if (isOpenRef.current) {
          isTransitioningRef.current = true;
          reverseIntentRef.current = "next";
          tl.reverse();
        } else {
          tl.play();
        }
      } else if (e.deltaY < -10) {
        if (isOpenRef.current) {
          isTransitioningRef.current = true;
          reverseIntentRef.current = "close";
          tl.reverse();
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const tl = timelineRef.current;
      if (!tl || isTransitioningRef.current) return;

      const touchEndY = e.touches[0].clientY;
      const diffY = touchStartY - touchEndY;

      if (diffY > 30) {
        if (isOpenRef.current) {
          isTransitioningRef.current = true;
          reverseIntentRef.current = "next";
          tl.reverse();
        } else {
          tl.play();
        }
      } else if (diffY < -30) {
        if (isOpenRef.current) {
          isTransitioningRef.current = true;
          reverseIntentRef.current = "close";
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
      className={styles.envelopeSection}
      style={{ backgroundImage: "url('/textures/envelope-inside-page.png')" }}
      onClick={handleToggle}
    >
      <style>{`
        .safari-layer {
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
        }

        .safari-layer svg {
          width: 100% !important;
          height: 100% !important;
          overflow: visible !important;
        }

        .envelope-hero-svg-host > svg {
          width: 97vw !important;
          height: 97vh !important;
          margin: 0 auto !important;
          overflow: visible !important;
        }

        .card-wrapper-safari {
          position: absolute;
          left: 0.43%;
          top: -1.65%;
          width: 99.02%;
          height: 103.26%;
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

        .card-name { display: inline-block; }

        .card-ampersand {
          font-size: 24px;
          margin: 0 8px;
          background: linear-gradient(135deg, #ffe29a 0%, #d4af37 40%, #a37c1e 55%, #f7e2a9 85%, #d4af37 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        @media (max-width: 1024px) {
          .envelope-hero-svg-host > svg, .safari-layer-container {
            width: 200vw !important;
            height: 97vh !important;
            left: -50vw !important;
            position: absolute !important;
          }
          #paper {
            x: 535px !important;
            width: 377.5px !important;
          }
          .card-wrapper-safari {
            left: 23%;
            width: 53.9%;
          }
        }
      `}</style>

      <div
        ref={containerRef}
        className="envelope-hero-svg-host"
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          position: "relative",
        }}
      >
        {isSafari ? (
          <div className="safari-layer-container" style={{ position: "absolute", inset: 0 }}>
            {/* SVG 1: Back Layer */}
            <div 
              ref={svg1Ref}
              style={{ position: "absolute", inset: 0, zIndex: 1 }}
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />

            {/* HTML Card Layer (Masked to hide it when pushed down) */}
            <div 
              ref={cardMaskRef} 
              style={{ 
                position: "absolute", 
                top: 0, 
                left: 0, 
                width: "100%", 
                zIndex: 2, 
                overflow: "hidden", 
                height: "59.37%",
                clipPath: "inset(0)",
                transform: "translateZ(0)"
              }}
            >
              <div ref={cardRef} className="card-wrapper-safari">
                <div className="card-wrapper">
                  <div className="card-inner">
                    <div className="card-content">
                      <div className="card-line-1">With Love</div>
                      <div className="card-line-2">From</div>
                      <div className="card-line-3">
                        <span className="card-name">Ritik</span>
                        <span className="card-ampersand">&amp;</span>
                        <span className="card-name">Ameesha</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SVG 2: Front Layer (Clipped to only show the front pocket) */}
            <div 
              ref={svg2Ref}
              style={{ 
                position: "absolute", 
                inset: 0,
                zIndex: 3, 
                pointerEvents: "none",
                clipPath: "polygon(0% 0%, 4.54% 15.67%, 49.96% 59.37%, 95.37% 15.76%, 100% 0%, 100% 100%, 0% 100%)"
              }}
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />
          </div>
        ) : (
          /* Chrome/Firefox Native SVG */
          <div 
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1
            }}
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        )}
      </div>
    </section>
  );
}
