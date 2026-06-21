"use client";

export default function Page2() {
  return (
    <main style={{
      height: "100vh",
      width: "100vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#1a1a1a",
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
          z-index: 1;
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

        /* Mobile specific adjustments */
        @media (max-width: 768px) {
          .flower-wrapper.left {
            transform: translate(-85%, -50%);
          }
          .flower-wrapper.right {
            transform: translate(85%, -50%);
          }
          .foreground-arch {
            width: 90%;
          }
        }
      `}</style>

      {/* Left side flower wrapper */}
      <div className="flower-wrapper left">
        <img
          src="/Page 2/flower1.svg"
          alt="Flower left"
          className="flower-img"
        />
      </div>

      {/* Right side flower wrapper */}
      <div className="flower-wrapper right">
        <img
          src="/Page 2/flower1.svg"
          alt="Flower right"
          className="flower-img reverse"
        />
      </div>

      {/* Foreground arch frame */}
      <img
        src="/Page 2/arch-red.svg"
        alt="Page 2 Foreground"
        className="foreground-arch"
      />
    </main>
  );
}
