"use client";
import { useEffect, useRef, useMemo, useState } from "react";
import { gsap } from "gsap";
import Page2Content from "../../components/Page2Content";

export default function EnvelopePlayground() {
  const [svgContent, setSvgContent] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  // Refs for the new layered approach
  const svg1Ref = useRef<HTMLDivElement>(null);
  const svg2Ref = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // State and Refs for scroll locking
  const isUnlockedRef = useRef(false);
  const isAtTopRef = useRef(true);
  
  const setIsUnlocked = (val: boolean) => {
    isUnlockedRef.current = val;
    if (mainRef.current) {
      if (val) mainRef.current.classList.add('unlocked');
      else mainRef.current.classList.remove('unlocked');
    }
  };

  // 1. Fetch and modify SVG
  useEffect(() => {
    fetch("/envelope-reference.svg")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load SVG");
        return res.text();
      })
      .then((text) => {
        // Strip foreignObject to use robust HTML layering across ALL browsers
        const stripped = text.replace(/<g mask="url\(#mask\)[\s\S]*?<foreignObject[\s\S]*?<\/foreignObject>\s*<\/g>/gi, "");
        setSvgContent(stripped);
      })
      .catch((err) => console.error("Error loading envelope SVG:", err));
  }, []);

  // 2. GSAP Timeline
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
        ease: "power1.inOut"
      });

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power2.inOut" },
        onComplete: () => {
          setIsUnlocked(true);
        },
        onUpdate: () => {
          const currentTl = timelineRef.current;
          if (!currentTl || !svg2Ref.current) return;
          if (currentTl.progress() < 0.95) {
            svg2Ref.current.style.zIndex = "3";
          } else {
            svg2Ref.current.style.zIndex = "1";
          }
        },
        onReverseComplete: () => setIsUnlocked(false)
      });

      // Sequence
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
        );

      if (cardRef.current && svg1Ref.current && svg2Ref.current) {
        // --- UNIFIED HTML LAYERED PATH ---
        tl
          // 4. Slide HTML card up
          .fromTo(
            cardRef.current,
            { y: "68.2%" },
            { y: "0%", duration: 1.8 },
            "-=1.8"
          )
          // Move the SVGs (envelope) down
          .to([svg1Ref.current, svg2Ref.current], { y: "97.4%", duration: 2.3 }, "<");
      }

      // 6. Final inner shadow reveal
      tl.from("#shadows-inner", { autoAlpha: 0, y: "+=2", duration: 0.3 }, "-=0.2");

      timelineRef.current = tl;
    }, containerRef);

    return () => ctx.revert();
  }, [svgContent]);

  // 3. Scroll and swipe gesture detection
  useEffect(() => {
    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      const tl = timelineRef.current;
      if (!tl) return;
      
      const isUnlockedLocal = isUnlockedRef.current;
      const isAtTopLocal = isAtTopRef.current;

      // If we are unlocked and NOT at the top, let natural scrolling happen!
      if (isUnlockedLocal && !isAtTopLocal) return;

      if (e.deltaY > 10 && isAtTopLocal && tl.progress() === 0) {
        tl.play();
      } else if (e.deltaY < -10 && isAtTopLocal && tl.progress() === 1) {
        setIsUnlocked(false);
        tl.reverse();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const tl = timelineRef.current;
      if (!tl) return;
      
      const isUnlockedLocal = isUnlockedRef.current;
      const isAtTopLocal = isAtTopRef.current;

      if (isUnlockedLocal && !isAtTopLocal) return;

      const touchEndY = e.touches[0].clientY;
      const diffY = touchStartY - touchEndY;
      
      if (diffY > 30 && isAtTopLocal && tl.progress() === 0) {
        tl.play();
      } else if (diffY < -30 && isAtTopLocal && tl.progress() === 1) {
        setIsUnlocked(false);
        tl.reverse();
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

  // 4. Track scroll position for locking/unlocking logic using the snapContainer
  useEffect(() => {
    const mainEl = mainRef.current;
    if (!mainEl) return;

    const handleScroll = () => {
      isAtTopRef.current = mainEl.scrollTop < 10;
    };
    mainEl.addEventListener("scroll", handleScroll, { passive: true });
    return () => mainEl.removeEventListener("scroll", handleScroll);
  }, []);

  // (Removed manual document.body.style.overflow logic as it is now handled by .snapContainer classes)

  const handleToggle = () => {
    const tl = timelineRef.current;
    if (!tl) return;
    if (tl.progress() === 0 || tl.reversed()) {
      tl.play();
    } else if (tl.progress() === 1 || !tl.reversed()) {
      setIsUnlocked(false);
      tl.reverse();
    }
  };

  const envelopeLayers = useMemo(() => {
    if (!svgContent) return null;
    return (
      <>
        {/* SVG 1: Back Layer */}
        <div 
          ref={svg1Ref}
          style={{ position: "absolute", inset: 0, zIndex: 1 }}
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />

        {/* HTML Card Layer */}
        <div ref={cardRef} className="card-wrapper-safari" style={{ zIndex: 2 }}>
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
      </>
    );
  }, [svgContent]);

  return (
    <main 
      ref={mainRef}
      className="snapContainer"
      style={{ width: "100vw", position: "relative" }}
    >
      <section 
        id="section1" 
        className="snapSection envelopeSection"
        style={{ 
          height: "100vh", 
          width: "100vw", 
        backgroundImage: "url('/textures/invite-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        position: "relative",
        overflow: "hidden"
      }}>
      <style>{`
        .envelope-wrapper {
          position: relative;
          width: 97vw;
          height: 97vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .envelope-wrapper svg {
          width: 100% !important;
          height: 100% !important;
          overflow: visible !important;
        }
        @media (max-width: 1024px) {
          .envelope-wrapper {
            width: 200vw;
            height: 97vh;
            left: -50vw;
            position: absolute;
          }
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
      `}</style>

      <div ref={containerRef} className="envelope-wrapper" onClick={handleToggle} style={{ cursor: "pointer" }}>
        {envelopeLayers}
      </div>
      </section>
      <Page2Content />
    </main>
  );
}
