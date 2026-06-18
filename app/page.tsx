"use client";
import { useState } from "react";
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
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [scrollUnlocked, setScrollUnlocked] = useState(false);

  const handleOpen = () => {
    setEnvelopeOpened(true);
    // Wait for the opening sequence animation to finish before unlocking scroll
    setTimeout(() => {
      setScrollUnlocked(true);
    }, 2800);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scroller = e.currentTarget;
    // When scrolled back close to the top, close the envelope and force scroll back to 0
    if (envelopeOpened && scroller.scrollTop < 30) {
      setEnvelopeOpened(false);
      setScrollUnlocked(false);
      scroller.scrollTop = 0;
    }
  };

  return (
    <>
      {/* ─── Full-screen scroll-snap container ─── */}
      <main 
        className={`snapContainer ${scrollUnlocked ? "unlocked" : ""}`}
        onScroll={handleScroll}
      >

        {/* 🫙 Envelope — always first snap point */}
        <div className="snapSection envelopeSection">
          <Envelope
            activeBurst={activeBurst}
            isOpen={envelopeOpened}
            onOpened={handleOpen}
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
