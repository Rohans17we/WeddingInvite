"use client";

import { inviteConfig } from "../../config/inviteDetails";
import ArchSVG from "../../components/ArchSVG";

export default function Page2() {
  const { page2 } = inviteConfig;

  return (
    <main style={{
      height: "100vh",
      width: "100vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundImage: "url('/textures/invite-bg.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      overflow: "hidden",
      position: "relative",
    }}>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
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

        .ampersand {
          font-family: var(--font-script);
          font-size: 3.5rem;
          line-height: 1;
        }

        .gold-text-gradient {
          background: linear-gradient(135deg, #ffe29a 0%, #d4af37 40%, #a37c1e 55%, #f7e2a9 85%, #d4af37 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
        }

        .outro-text {
          font-family: var(--font-body);
          font-size: 1rem;
          color: #e0e0e0;
          letter-spacing: 2px;
          text-transform: uppercase;
          line-height: 1.6;
          margin-top: 1vh;
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

        .lantern-img {
          width: 100%;
          height: auto;
          filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));
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


      {/* Decorative Lanterns */}
      <div className="lantern-wrapper left">
        <img src="/Page 2/ElementLanterns.svg" alt="Lantern Left" className="lantern-img" />
      </div>
      <div className="lantern-wrapper right">
        <img src="/Page 2/ElementLanterns.svg" alt="Lantern Right" className="lantern-img" />
      </div>

    </main>
  );
}
