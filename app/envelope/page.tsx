"use client";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

export default function EnvelopePlayground() {
  const [svgContent, setSvgContent] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

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

    // Run GSAP within a clean react context
    const ctx = gsap.context(() => {
      // Configure initial states
      gsap.set("#paper-mask-full", { autoAlpha: 0 });

      // Create timeline
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power2.inOut" },
        onUpdate: () => {
          if (tl) {
            setAnimationProgress(Math.round(tl.progress() * 100));
          }
        },
        onComplete: () => setIsOpen(true),
        onReverseComplete: () => setIsOpen(false),
      });

      // Sequence from Patryk's setup
      tl
        // 1. Initial text and arrow reveal
        .from("#text > *", { autoAlpha: 0, stagger: 0.1, duration: 0.6 })
        .from("#arrow", { y: "+=10", repeat: -1, yoyo: true, duration: 0.6, ease: "power1.inOut" }, "-=0.2")

        // 2. Hide interactive elements
        .addLabel("openStart")
        .to("#arrow", { autoAlpha: 0, duration: 0.3 })
        .to("#button", { autoAlpha: 0, scale: 0, transformOrigin: "center center", duration: 0.3 }, "<")
        .to("#text > *", { autoAlpha: 0, stagger: 0.05, duration: 0.3 }, "<")

        // 3. Envelope top flap opening (scaleY flipped upside down)
        .to("#closed", {
          duration: 1.5,
          transformOrigin: "center top",
          fill: "#f5f5f5",
          scaleY: -1,
          ease: "power1.inOut",
        })
        
        // 4. Pattern top emergence (inside flap lining)
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

        // 5. Paper card sliding out
        .from(
          "#paper",
          {
            duration: 1.8,
            scaleY: 0,
            transformOrigin: "center bottom",
          },
          "-=1.8"
        )
        .to("#paper-mask", { y: "+=500", duration: 2.2 })
        .to(
          [
            "#pattern-top",
            "#closed",
            "#shadows-inner",
            "#pattern-bottom",
            "#accents",
            "#body",
            "#bottom-shadow",
          ],
          {
            y: "+=500",
            duration: 2.3,
          },
          "<"
        )

        // 6. Final inner shadow reveal
        .from("#paper-mask-full", { autoAlpha: 0, duration: 0.01 }, "-=0.8")
        .from("#shadows-inner", { autoAlpha: 0, y: "+=2", duration: 0.3 }, "-=0.2");

      timelineRef.current = tl;
    }, containerRef);

    return () => ctx.revert();
  }, [svgContent]);

  // Click handler to toggle envelope state
  const handleToggle = () => {
    const tl = timelineRef.current;
    if (!tl) return;

    if (tl.progress() === 0 || tl.reversed()) {
      tl.play();
    } else if (tl.progress() === 1 || !tl.reversed()) {
      tl.reverse();
    }
  };

  const handlePlay = () => timelineRef.current?.play();
  const handleReverse = () => timelineRef.current?.reverse();
  const handleReset = () => timelineRef.current?.progress(0).pause();

  return (
    <main style={{ 
      height: "100vh", 
      width: "100vw", 
      background: "#ffffff", 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Isolated Interactive Controls */}
      <div style={{
        position: "absolute",
        top: 20,
        left: 20,
        zIndex: 100,
        background: "rgba(255, 255, 255, 0.95)",
        padding: "16px",
        borderRadius: "12px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        border: "1px solid #eaeaea",
        fontFamily: "system-ui, -apple-system, sans-serif",
        display: "flex",
        flexDirection: "column",
        gap: "12px"
      }}>
        <div style={{ fontWeight: "bold", fontSize: "14px", color: "#333", textTransform: "uppercase", letterSpacing: "0.5px" }}>
          ✉️ Envelope Controls
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={handlePlay} style={btnStyle}>Play</button>
          <button onClick={handleReverse} style={btnStyle}>Reverse</button>
          <button onClick={handleReset} style={btnStyle}>Reset</button>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#666" }}>
          <span>Status: <strong>{isOpen ? "Open" : "Closed"}</strong></span>
          <span>Progress: <strong>{animationProgress}%</strong></span>
        </div>
      </div>

      {/* SVG Container (Clicking it also toggles the animation) */}
      <div 
        ref={containerRef}
        onClick={handleToggle}
        style={{
          width: "100%",
          height: "95vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
    </main>
  );
}

const btnStyle = {
  padding: "8px 12px",
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "12px",
  fontWeight: 600,
  transition: "opacity 0.2s"
};
