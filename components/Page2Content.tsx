"use client";

import { inviteConfig } from "../config/inviteDetails";
import ArchSVG from "./ArchSVG";

export default function Page2Content() {
  const { page2 } = inviteConfig;

  return (
    <section id="section2" className="snapSection" style={{
      height: "100vh",
      width: "100vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundImage: "url('/textures/invite-bg.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes rotateAxis {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }

        @keyframes rotateAxisRight {
          from { transform: scaleX(-1) rotateY(0deg); }
          to { transform: scaleX(-1) rotateY(360deg); }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUpCentered {
          from {
            opacity: 0;
            transform: translate(-50%, 20px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }


        .flower-wrapper {
          position: absolute;
          top: 50%;
          z-index: 2;
          aspect-ratio: 1/1;
          height: 100vh;
        }

        .flower-wrapper.left {
          left: 0;
          transform: translate(-50%, -50%);
        }

        .flower-wrapper.right {
          right: 0;
          transform: translate(50%, -50%);
        }

        .flower-img {
          width: 100%;
          height: 100%;
          animation: spin 40s linear infinite;
        }

        .flower-img.reverse {
          animation-direction: reverse;
        }

        .foreground-arch {
          width: 41%;
          height: 100%;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          z-index: 3;
          object-fit: fill;
        }

        .ganesh-img {
          position: absolute;
          top: 8vh;
          left: 50%;
          transform: translateX(-50%);
          width: 12vh;
          z-index: 4;
          opacity: 0;
          animation: fadeInUpCentered 1s ease-out 0.2s forwards;
        }

        .ganesh-text {
          position: absolute;
          top: 21vh;
          left: 50%;
          transform: translateX(-50%);
          color: #c69b34;
          font-family: var(--font-devanagari);
          font-size: 2rem;
          z-index: 4;
          white-space: nowrap;
          opacity: 0;
          animation: fadeInUpCentered 1s ease-out 0.4s forwards;
        }

        .invite-content {
          position: absolute;
          top: 28vh;
          left: 50%;
          transform: translateX(-50%);
          width: 34vw;
          text-align: center;
          z-index: 4;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5vh;
        }
        
        .intro-text {
          font-family: var(--font-script);
          font-size: 2rem;
          color: #e0e0e0;
          margin-bottom: 0.5vh;
          opacity: 0;
          animation: fadeInUp 1s ease-out 0.6s forwards;
        }

        .couple-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5vh;
          width: 100%;
        }

        .person {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5vh;
          opacity: 0;
        }

        .person:first-child {
          animation: fadeInUp 1s ease-out 0.8s forwards;
        }

        .person:last-child {
          animation: fadeInUp 1s ease-out 1.2s forwards;
        }

        .person-name {
          font-family: var(--font-display);
          font-size: 2.2rem;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .relation {
          font-family: var(--font-script);
          font-size: 1.5rem;
          color: #c69b34;
        }

        .parents {
          font-family: var(--font-body);
          font-size: 1.1rem;
          color: #e0e0e0;
          line-height: 1.4;
        }

        @keyframes subtlePulse {
          0% { filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2)); transform: scale(1); }
          50% { filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.6)); transform: scale(1.03); }
          100% { filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2)); transform: scale(1); }
        }

        .ampersand {
          font-family: var(--font-script);
          font-size: 3.5rem;
          line-height: 1;
          opacity: 0;
          animation: fadeInUp 1s ease-out 1.0s forwards, subtlePulse 3s ease-in-out 2.0s infinite;
        }

        .gold-text-gradient {
          background: linear-gradient(135deg, #ffe29a 0%, #d4af37 40%, #a37c1e 55%, #f7e2a9 85%, #d4af37 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
          display: inline-block;
        }
        
        .person-name.gold-text-gradient {
           animation: subtlePulse 4s ease-in-out 2.2s infinite;
        }

        .outro-text {
          font-family: var(--font-body);
          font-size: 1rem;
          color: #e0e0e0;
          letter-spacing: 2px;
          text-transform: uppercase;
          line-height: 1.6;
          margin-top: 1vh;
          opacity: 0;
          animation: fadeInUp 1s ease-out 1.5s forwards;
        }


        .lantern-wrapper {
          position: absolute;
          top: -2vh;
          z-index: 5;
          width: 18vw;
        }

        .lantern-wrapper.left {
          left: 18vw;
        }

        .lantern-wrapper.right {
          right: 18vw;
        }

        .lantern-wrapper.right .lantern-img {
          transform: scaleX(-1);
        }

        .desktop-lantern {
          position: absolute;
          z-index: 5;
        }

        .desktop-lantern.left-1 { left: 2vw; top: -2vh; width: 12vw; }
        .desktop-lantern.left-2 { left: 10vw; top: -8vh; width: 9vw; }

        .desktop-lantern.right-1 { right: 2vw; top: -2vh; width: 12vw; }
        .desktop-lantern.right-2 { right: 10vw; top: -8vh; width: 9vw; }

        .desktop-lantern.right-1 .lantern-img,
        .desktop-lantern.right-2 .lantern-img {
          transform: scaleX(-1);
        }

        

        .lantern-img {
          width: 100%;
          height: auto;
          filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));
        }

        .desktop-lantern .lantern-img {
          filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3)) drop-shadow(0 0 40px rgba(200, 80, 255, 0.9));
        }

        .flowers-bottom-left {
          position: absolute;
          bottom: -6vh;
          left: 29.5vw;
          width: 25vw;
          z-index: 3;
          opacity: 0.5;
          filter: drop-shadow(0 4px 6px rgba(0,0,0,0.2));
        }

        .flowers-bottom-right {
          position: absolute;
          bottom: -6vh;
          right: 29.5vw;
          width: 25vw;
          z-index: 3;
          opacity: 0.5;
          transform: scaleX(-1);
          filter: drop-shadow(0 4px 6px rgba(0,0,0,0.2));
        }

        .flowers-bottom-spread {
          position: absolute;
          bottom: -2vh;
          left: 50%;
          transform: translateX(-50%);
          width: 100vw;
          min-width: 100%;
          object-fit: cover;
          object-position: center;
          z-index: 2;
          filter: drop-shadow(0 4px 6px rgba(0,0,0,0.2));
        }

        .flowers-top-spread {
          position: absolute;
          top: -10vh;
          left: 50%;
          transform: translateX(-50%) scaleY(-1);
          width: 100vw;
          min-width: 100%;
          object-fit: cover;
          object-position: center;
          z-index: 2;
          filter: drop-shadow(0 4px 6px rgba(0,0,0,0.2));
        }

        /* Tablet specific adjustments */
        @media (max-width: 1024px) {
          .foreground-arch {
            width: 80%;
          }
          .ganesh-img {
            top: 6vh;
          }
          .ganesh-text {
            top: 19vh;
            font-size: 1.7rem;
          }
          .invite-content {
            top: 26vh;
            width: 70vw;
          }
          .lantern-wrapper {
            width: 25vw;
            top: -2vh;
          }
          .lantern-wrapper.left { left: -5vw; }
          .lantern-wrapper.right { right: -5vw; }
          .desktop-lantern { display: none; }
          .flowers-bottom-left {
            left: 10vw;
            width: 35vw;
          }
          .flowers-bottom-right {
            right: 10vw;
            width: 35vw;
          }
        }

        /* Mobile specific adjustments */
        @media (max-width: 768px) {
          .flower-wrapper {
            height: 100vh;
          }
          .flower-wrapper.left {
            transform: translate(-85%, -50%);
          }
          .flower-wrapper.right {
            transform: translate(85%, -50%);
          }
          .foreground-arch {
            width: 90%;
          }
          .ganesh-img {
            top: 4vh;
            width: 10vh;
          }
          .ganesh-text {
            top: 15vh;
            font-size: 1.4rem;
          }
          .invite-content {
            top: 22vh;
            width: 85vw;
            gap: 3vh;
          }
          .couple-section {
            gap: 3vh;
          }
          .intro-text {
            font-size: 1.8rem;
          }
          .person-name {
            font-size: 2rem;
          }
          .relation {
            font-size: 1.4rem;
          }
          .parents {
            font-size: 1.1rem;
          }
          .ampersand {
            font-size: 3rem;
          }
          .outro-text {
            font-size: 0.9rem;
            letter-spacing: 1.5px;
            margin-top: 4vh;
          }
          .lantern-wrapper {
            width: 32vw;
            top: -2vh;
          }
          .lantern-wrapper.left { left: -12vw; }
          .lantern-wrapper.right { right: -12vw; }
          .flowers-bottom-left {
            left: 5vw;
            width: 50vw;
          }
          .flowers-bottom-right {
            right: 5vw;
            width: 50vw;
          }
          .flowers-bottom-spread, .flowers-top-spread {
            height: 40vh;
          }
        }
      `}</style>

      {/* Left side flower wrapper */}
      <div className="flower-wrapper left">
        <img
          src="/Page 2/flower1.svg"
          alt="Flower left"
          className={`flower-img ${page2.flowers.left.rotationDirection === 'reverse' ? 'reverse' : ''}`}
        />
      </div>

      {/* Right side flower wrapper */}
      <div className="flower-wrapper right">
        <img
          src="/Page 2/flower1.svg"
          alt="Flower right"
          className={`flower-img ${page2.flowers.right.rotationDirection === 'reverse' ? 'reverse' : ''}`}
        />
      </div>

      {/* Foreground arch frame */}
      <ArchSVG 
        className="foreground-arch" 
        color={page2.arch.color}
      />

      {/* Lord Ganesh */}
      <img
        src="/Page 2/Lord Ganesh Desktop.svg"
        alt="Lord Ganesh"
        className="ganesh-img"
      />
      <div className="ganesh-text">
        {page2.text.hindiLine}
      </div>

      {/* Invite Content */}
      <div className="invite-content">
        <p className="intro-text">{page2.text.intro}</p>
        
        <div className="couple-section">
          <div className="person">
            <h1 className="person-name gold-text-gradient">{page2.groom.name}</h1>
            <p className="relation">{page2.groom.relation}</p>
            <p className="parents">{page2.groom.father}<br/>{page2.groom.mother}</p>
          </div>
          
          <div className="ampersand gold-text-gradient">&amp;</div>
          
          <div className="person">
            <h1 className="person-name gold-text-gradient">{page2.bride.name}</h1>
            <p className="relation">{page2.bride.relation}</p>
            <p className="parents">{page2.bride.father}<br/>{page2.bride.mother}</p>
          </div>
        </div>

        <p className="outro-text">
          {page2.text.outro}
        </p>
      </div>


      {/* Decorative Lanterns (Mobile/Tablet) */}
      <div className="lantern-wrapper left">
        <img src="/Page 2/ElementLanterns.svg" alt="Lantern Left" className="lantern-img" />
      </div>
      <div className="lantern-wrapper right">
        <img src="/Page 2/ElementLanterns.svg" alt="Lantern Right" className="lantern-img" />
      </div>

      {/* Desktop Lanterns (Lantern2.svg) */}
      <div className="desktop-lantern left-1">
        <img src="/Page 2/Lantern2.svg" alt="Lantern" className="lantern-img" />
      </div>
      <div className="desktop-lantern left-2">
        <img src="/Page 2/Lantern2.svg" alt="Lantern" className="lantern-img" />
      </div>
      <div className="desktop-lantern right-1">
        <img src="/Page 2/Lantern2.svg" alt="Lantern" className="lantern-img" />
      </div>
      <div className="desktop-lantern right-2">
        <img src="/Page 2/Lantern2.svg" alt="Lantern" className="lantern-img" />
      </div>

      {/* Bottom Left Flowers */}
      <img 
        src="/Page 2/FlowersBottom.svg" 
        alt="Flowers Bottom Left" 
        className="flowers-bottom-left" 
      />

      {/* Bottom Right Flowers */}
      <img 
        src="/Page 2/FlowersBottom.svg" 
        alt="Flowers Bottom Right" 
        className="flowers-bottom-right" 
      />

      {/* Spread Bottom Flowers (Behind Arch) */}
      <img 
        src="/Page 2/FlowersBottom2.svg" 
        alt="Flowers Spread Bottom" 
        className="flowers-bottom-spread" 
      />

      {/* Spread Top Flowers (Behind Arch) */}
      <img 
        src="/Page 2/FlowersBottom2.svg" 
        alt="Flowers Spread Top" 
        className="flowers-top-spread" 
      />

    </section>
  );
}
