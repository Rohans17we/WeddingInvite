"use client";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import type { BurstId } from "@/lib/bursts";

// Components
import Envelope      from "@/components/Envelope/Envelope";
import InviteCard    from "@/components/InviteCard/InviteCard";
import SaveTheDate   from "@/components/SaveTheDate/SaveTheDate";
import Countdown     from "@/components/Countdown/Countdown";
import OurStory      from "@/components/OurStory/OurStory";
import Venue         from "@/components/Venue/Venue";
import Festivities   from "@/components/Festivities/Festivities";
import RSVPForm      from "@/components/RSVP/RSVPForm";
import Footer        from "@/components/Footer/Footer";

const DevSwitcher = dynamic(() => import("@/components/DevSwitcher/DevSwitcher"), { ssr: false });
const MuteButton  = dynamic(() => import("@/components/MuteButton/MuteButton"),  { ssr: false });

export default function Home() {
  const [activeBurst, setActiveBurst] = useState<BurstId>("marigold");
  const [envelopeState, setEnvelopeState] = useState<"closed" | "open" | "scrolled">("closed");
  const mainRef = useRef<HTMLDivElement>(null);
  const hasScrolledDown = useRef(false);
  const lastTransitionTime = useRef(0);

  const handleScrollDown = () => {
    const now = Date.now();
    if (now - lastTransitionTime.current < 1200) return; // Cooldown to allow animations/gestures to finish

    if (envelopeState === "closed") {
      setEnvelopeState("open");
      lastTransitionTime.current = now;
    } else if (envelopeState === "open") {
      setEnvelopeState("scrolled");
      lastTransitionTime.current = now;
      hasScrolledDown.current = false;
      // Give the DOM a tiny frame to apply "unlocked" layout before we trigger smooth scroll
      setTimeout(() => {
        if (mainRef.current) {
          mainRef.current.scrollTo({
            top: window.innerHeight,
            behavior: "smooth"
          });
        }
      }, 50);
    }
  };

  const handleScrollUp = () => {
    const now = Date.now();
    if (now - lastTransitionTime.current < 1200) return;

    if (envelopeState === "open") {
      setEnvelopeState("closed");
      lastTransitionTime.current = now;
    }
  };

  useEffect(() => {
    const scroller = mainRef.current;
    if (!scroller) return;

    const handleNativeScroll = () => {
      const scrollTop = scroller.scrollTop || window.scrollY;

      // Track if they have actually scrolled down past the first section
      if (envelopeState === "scrolled" && scrollTop > 100) {
        hasScrolledDown.current = true;
      }

      // If they are scrolled down, and scroll back to Section 0 (scrollTop < 30)
      if (envelopeState === "scrolled" && hasScrolledDown.current && scrollTop < 30) {
        setEnvelopeState("open");
        hasScrolledDown.current = false;
        lastTransitionTime.current = Date.now(); // Apply cooldown on reset to absorb momentum
        scroller.scrollTop = 0;
        window.scrollTo({ top: 0 });
      }
    };

    scroller.addEventListener("scroll", handleNativeScroll, { passive: true });
    window.addEventListener("scroll", handleNativeScroll, { passive: true });

    return () => {
      scroller.removeEventListener("scroll", handleNativeScroll);
      window.removeEventListener("scroll", handleNativeScroll);
    };
  }, [envelopeState]);

  return (
    <>
      {/* ─── Full-screen scroll-snap container ─── */}
      <main 
        ref={mainRef}
        className={`snapContainer ${envelopeState === "scrolled" ? "unlocked" : ""}`}
      >

        {/* 🫙 Envelope — always first snap point */}
        <div className="snapSection envelopeSection">
          <Envelope
            activeBurst={activeBurst}
            state={envelopeState}
            onScrollDown={handleScrollDown}
            onScrollUp={handleScrollUp}
          />
        </div>

        {/* 📜 Page 1 */}
        <div className="snapSection">
          <InviteCard />
        </div>

        {/* 💌 Page 2 */}
        <div className="snapSection">
          <SaveTheDate />
        </div>

        {/* ⏳ Page 3 */}
        <div className="snapSection">
          <Countdown />
        </div>

        {/* 📸 Page 4 — taller for polaroids */}
        <div className="snapSection">
          <OurStory />
        </div>

        {/* 📍 Page 5 */}
        <div className="snapSection">
          <Venue />
        </div>

        {/* 🎊 Page 6 */}
        <div className="snapSection">
          <Festivities />
        </div>

        {/* 💌 Page 7 */}
        <div className="snapSection">
          <RSVPForm />
        </div>

        {/* 🏁 Footer */}
        <div className="snapSection">
          <Footer />
        </div>
      </main>

      {/* Floating UI — outside snap container so they stay fixed */}
      <MuteButton />
      <DevSwitcher
        activeBurst={activeBurst}
        onBurstChange={setActiveBurst}
      />
    </>
  );
}
