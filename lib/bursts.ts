export type BurstId = "marigold" | "stars" | "rose" | "lotus";

export interface BurstConfig {
  id: BurstId;
  label: string;
  emoji: string;
  options: any; // Using any to avoid version mismatch issues in @tsparticles type exports
}

const baseConfig = {
  fullScreen: { enable: false },
  detectRetina: true,
};

export const bursts: BurstConfig[] = [
  {
    id: "marigold",
    label: "Marigold Petals",
    emoji: "🌸",
    options: {
      ...baseConfig,
      particles: {
        number: { value: 120 },
        color: { value: ["#FF8C00", "#FFA500", "#FFD700", "#FF6600", "#FF4500"] },
        shape: {
          type: "char",
          options: {
            char: { value: ["🌸", "🌼", "✿", "❀"], font: "Verdana", style: "", weight: "400" },
          },
        },
        opacity: { value: { min: 0.4, max: 1 }, animation: { enable: true, speed: 1, minimumValue: 0, destroy: "min" } },
        size: { value: { min: 12, max: 28 } },
        move: {
          enable: true,
          speed: { min: 3, max: 8 },
          direction: "none",
          outModes: { default: "destroy" },
          gravity: { enable: true, acceleration: 4 },
          drift: { min: -2, max: 2 },
        },
        rotate: { value: { min: 0, max: 360 }, animation: { enable: true, speed: 15 }, direction: "random" },
        life: { duration: { sync: false, value: 3 }, count: 1 },
        wobble: { enable: true, distance: 10, speed: 10 },
      },
      emitters: {
        direction: "none",
        life: { count: 1, duration: 0.3, delay: 0 },
        rate: { delay: 0, quantity: 120 },
        size: { width: 0, height: 0 },
        position: { x: 50, y: 50 },
      },
    },
  },
  {
    id: "stars",
    label: "Gold Stars",
    emoji: "✨",
    options: {
      ...baseConfig,
      particles: {
        number: { value: 150 },
        color: { value: ["#D4AF37", "#F5D98A", "#FFD700", "#FFF8E1", "#C9A600"] },
        shape: { type: ["star", "circle"] },
        opacity: { value: { min: 0.3, max: 1 }, animation: { enable: true, speed: 2, minimumValue: 0, destroy: "min" } },
        size: { value: { min: 2, max: 10 } },
        move: {
          enable: true,
          speed: { min: 2, max: 10 },
          direction: "none",
          outModes: { default: "destroy" },
          gravity: { enable: true, acceleration: 2 },
          drift: { min: -3, max: 3 },
        },
        rotate: { value: { min: 0, max: 360 }, animation: { enable: true, speed: 20 }, direction: "random" },
        life: { duration: { sync: false, value: 4 }, count: 1 },
        twinkle: { particles: { enable: true, frequency: 0.05, color: "#FFD700", opacity: 1 } },
      },
      emitters: {
        direction: "none",
        life: { count: 1, duration: 0.3, delay: 0 },
        rate: { delay: 0, quantity: 150 },
        size: { width: 0, height: 0 },
        position: { x: 50, y: 50 },
      },
    },
  },
  {
    id: "rose",
    label: "Rose Petals",
    emoji: "🌺",
    options: {
      ...baseConfig,
      particles: {
        number: { value: 100 },
        color: { value: ["#FF4B6E", "#FF1744", "#E91E63", "#FF80AB", "#C2185B"] },
        shape: {
          type: "char",
          options: {
            char: { value: ["🌺", "🌹", "❤", "✿"], font: "Verdana", style: "", weight: "400" },
          },
        },
        opacity: { value: { min: 0.5, max: 1 }, animation: { enable: true, speed: 1, minimumValue: 0, destroy: "min" } },
        size: { value: { min: 14, max: 26 } },
        move: {
          enable: true,
          speed: { min: 2, max: 6 },
          direction: "bottom",
          outModes: { default: "destroy" },
          gravity: { enable: true, acceleration: 3 },
          drift: { min: -3, max: 3 },
        },
        rotate: { value: { min: 0, max: 360 }, animation: { enable: true, speed: 10 }, direction: "random" },
        life: { duration: { sync: false, value: 5 }, count: 1 },
        wobble: { enable: true, distance: 15, speed: 5 },
      },
      emitters: {
        direction: "top",
        life: { count: 1, duration: 0.5, delay: 0 },
        rate: { delay: 0.05, quantity: 10 },
        size: { width: 100, height: 0 },
        position: { x: 50, y: 0 },
      },
    },
  },
  {
    id: "lotus",
    label: "Lotus Flowers",
    emoji: "🪷",
    options: {
      ...baseConfig,
      particles: {
        number: { value: 80 },
        color: { value: ["#9C27B0", "#E91E63", "#F48FB1", "#CE93D8", "#FF80AB"] },
        shape: {
          type: "char",
          options: {
            char: { value: ["🪷", "✿", "❋", "❀"], font: "Verdana", style: "", weight: "400" },
          },
        },
        opacity: { value: { min: 0.4, max: 1 }, animation: { enable: true, speed: 0.8, minimumValue: 0, destroy: "min" } },
        size: { value: { min: 16, max: 32 } },
        move: {
          enable: true,
          speed: { min: 2, max: 7 },
          direction: "none",
          outModes: { default: "destroy" },
          gravity: { enable: true, acceleration: 1.5 },
          drift: { min: -2, max: 2 },
        },
        rotate: { value: { min: 0, max: 360 }, animation: { enable: true, speed: 8 }, direction: "random" },
        life: { duration: { sync: false, value: 5 }, count: 1 },
        wobble: { enable: true, distance: 12, speed: 6 },
      },
      emitters: {
        direction: "none",
        life: { count: 1, duration: 0.4, delay: 0 },
        rate: { delay: 0, quantity: 80 },
        size: { width: 0, height: 0 },
        position: { x: 50, y: 50 },
      },
    },
  },
];

export const defaultBurst: BurstId = "marigold";
