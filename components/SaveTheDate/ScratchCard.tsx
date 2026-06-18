"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import styles from "./SaveTheDate.module.css";

interface Props {
  reveal: string;
  label: string;
}

export default function ScratchCard({ reveal, label }: Props) {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [revealed,  setRevealed]  = useState(false);
  const [progress,  setProgress]  = useState(0);

  // Draw the scratch surface
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Gold shimmer gradient
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0,   "#D4AF37");
    grad.addColorStop(0.3, "#F5D98A");
    grad.addColorStop(0.5, "#FFF8E1");
    grad.addColorStop(0.7, "#F5D98A");
    grad.addColorStop(1,   "#C9A600");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // "Scratch me" text on surface
    ctx.fillStyle = "rgba(120, 80, 0, 0.6)";
    ctx.font      = `bold ${canvas.width * 0.12}px 'Cormorant Garamond', serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✦ Scratch ✦", canvas.width / 2, canvas.height / 2);
  }, []);

  const getPos = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    if ("touches" in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const scratch = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || revealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pos = getPos(e, canvas);
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 28, 0, Math.PI * 2);
    ctx.fill();

    // Check revealed %
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparent = 0;
    for (let i = 3; i < imgData.data.length; i += 4) {
      if (imgData.data[i] === 0) transparent++;
    }
    const pct = (transparent / (canvas.width * canvas.height)) * 100;
    setProgress(pct);
    if (pct > 55) {
      setRevealed(true);
      // Clear the canvas fully
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, [isDrawing, revealed]);

  return (
    <div className={styles.scratchCard}>
      <span className={styles.scratchLabel}>{label}</span>
      <div className={styles.canvasWrapper}>
        {/* Revealed content beneath */}
        <div className={`${styles.revealText} ${revealed ? styles.revealed : ""}`}>
          {reveal}
        </div>
        {/* Scratch surface */}
        {!revealed && (
          <canvas
            ref={canvasRef}
            className={styles.canvas}
            onMouseDown={() => setIsDrawing(true)}
            onMouseUp={() => setIsDrawing(false)}
            onMouseLeave={() => setIsDrawing(false)}
            onMouseMove={scratch}
            onTouchStart={(e) => { e.preventDefault(); setIsDrawing(true); }}
            onTouchEnd={() => setIsDrawing(false)}
            onTouchMove={(e) => { e.preventDefault(); scratch(e); }}
          />
        )}
      </div>
    </div>
  );
}
