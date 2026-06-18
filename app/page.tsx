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

// Lazy-load dev-only & client-only components
const DevSwitcher = dynamic(() => import("@/components/DevSwitcher/DevSwitcher"), { ssr: false });
const MuteButton  = dynamic(() => import("@/components/MuteButton/MuteButton"),  { ssr: false });

export default function Home() {
  const [activeBurst, setActiveBurst] = useState<BurstId>("marigold");
  const [envelopeOpened, setEnvelopeOpened] = useState(false);

  return (
    <main>
      {/* 🫙 Entry — Envelope */}
      <Envelope
        activeBurst={activeBurst}
        onOpened={() => setEnvelopeOpened(true)}
      />

      {/* Show rest of the site after envelope opens, or immediately if already opened */}
      <div
        style={{
          opacity: envelopeOpened ? 1 : 0,
          transition: "opacity 0.8s ease",
          pointerEvents: envelopeOpened ? "auto" : "none",
        }}
      >
        {/* 📜 Page 1 — Invitation */}
        <InviteCard />

        {/* 💌 Page 2 — Save the Date */}
        <SaveTheDate />

        {/* ⏳ Page 3 — Countdown */}
        <Countdown />

        {/* 📸 Page 4 — Our Story */}
        <OurStory />

        {/* 📍 Page 5 — Venue */}
        <Venue />

        {/* 🎊 Page 6 — Festivities */}
        <Festivities />

        {/* 💌 Page 7 — RSVP */}
        <RSVPForm />

        {/* 🏁 Footer */}
        <Footer />
      </div>

      {/* 🎵 Floating mute button */}
      <MuteButton />

      {/* 🎨 Dev-only theme switcher (hidden in production) */}
      <DevSwitcher
        activeBurst={activeBurst}
        onBurstChange={setActiveBurst}
      />
    </main>
  );
}
