"use client";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import type { BurstId } from "@/lib/bursts";

// Components
import Preloader     from "@/components/Preloader/Preloader";
import EnvelopeHero  from "@/components/EnvelopeHero/EnvelopeHero";
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
  const [isLoading, setIsLoading] = useState(false);
  const [activeBurst, setActiveBurst] = useState<BurstId>("marigold");
  const [unlocked, setUnlocked] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  // Pending scroll flag: set when we want to scroll to next section.
  // A useEffect watches this + unlocked to fire after the DOM paints the unlocked state.
  const pendingScrollRef = useRef(false);

  // Called by EnvelopeHero once the close animation finishes and navigation should happen
  const handleScrollToNext = () => {
    pendingScrollRef.current = true;
    setUnlocked(true); // triggers re-render; useEffect below fires after DOM updates
  };


  // Fire the scroll to InviteCard AFTER the DOM has applied the unlocked class.
  // This useEffect runs after every render where unlocked changes to true.
  useEffect(() => {
    if (unlocked && pendingScrollRef.current && mainRef.current) {
      pendingScrollRef.current = false;
      // Double-rAF ensures the browser has painted the new overflow-y: scroll
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          mainRef.current?.scrollTo({ top: window.innerHeight, behavior: "smooth" });
        });
      });
    }
  }, [unlocked]);

  // Re-lock the container when the user scrolls back to the envelope section
  // so EnvelopeHero intercepts scroll events again
  const handleMainScroll = () => {
    const el = mainRef.current;
    if (!el || !unlocked) return;
    if (el.scrollTop < 10) {
      setUnlocked(false);
    }
  };


  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* ─── Full-screen scroll-snap container ─── */}
      <main
        ref={mainRef}
        className={`snapContainer${unlocked ? " unlocked" : ""}`}
        style={{ pointerEvents: isLoading ? "none" : "auto" }}
        onScroll={handleMainScroll}
      >

        {/* 🫙 Envelope — first snap section, always visible */}
        <div className="snapSection envelopeSection">
          <EnvelopeHero onScrollToNext={handleScrollToNext} />
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
