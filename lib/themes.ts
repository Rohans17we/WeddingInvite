export type ThemeId = "maroon" | "navy" | "saffron" | "plum";

export interface Theme {
  id: ThemeId;
  label: string;
  emoji: string;
  vars: Record<string, string>;
}

export const themes: Theme[] = [
  {
    id: "maroon",
    label: "Royal Maroon & Gold",
    emoji: "🔴",
    vars: {
      "--color-primary":    "#7B1C1C",
      "--color-primary-dark": "#4A0E0E",
      "--color-accent":     "#D4AF37",
      "--color-accent-light": "#F0D060",
      "--color-bg":         "#FFF8E7",
      "--color-bg-deep":    "#1A0505",
      "--color-surface":    "#FFF0D0",
      "--color-text":       "#2C0B0B",
      "--color-text-light": "#7B4444",
      "--color-gold":       "#D4AF37",
      "--color-gold-light": "#F5D98A",
      "--envelope-body":    "#8B1A1A",
      "--envelope-flap":    "#6B0F0F",
      "--seal-bg":          "#D4AF37",
      "--seal-text":        "#4A0E0E",
    },
  },
  {
    id: "navy",
    label: "Midnight Navy & Rose Gold",
    emoji: "🌙",
    vars: {
      "--color-primary":    "#0D1B2A",
      "--color-primary-dark": "#060D15",
      "--color-accent":     "#B76E79",
      "--color-accent-light": "#D4959E",
      "--color-bg":         "#F5F0EB",
      "--color-bg-deep":    "#060D15",
      "--color-surface":    "#EDE5DC",
      "--color-text":       "#0D1B2A",
      "--color-text-light": "#4A5568",
      "--color-gold":       "#C9A96E",
      "--color-gold-light": "#E8C99A",
      "--envelope-body":    "#0D1B2A",
      "--envelope-flap":    "#152535",
      "--seal-bg":          "#B76E79",
      "--seal-text":        "#FFF5F5",
    },
  },
  {
    id: "saffron",
    label: "Saffron & Ivory",
    emoji: "🌅",
    vars: {
      "--color-primary":    "#C45F00",
      "--color-primary-dark": "#7A3A00",
      "--color-accent":     "#FFC200",
      "--color-accent-light": "#FFD966",
      "--color-bg":         "#FFFBF0",
      "--color-bg-deep":    "#1A0A00",
      "--color-surface":    "#FFF3D0",
      "--color-text":       "#2C1500",
      "--color-text-light": "#7A4A00",
      "--color-gold":       "#FFC200",
      "--color-gold-light": "#FFD966",
      "--envelope-body":    "#C45F00",
      "--envelope-flap":    "#A04A00",
      "--seal-bg":          "#FFC200",
      "--seal-text":        "#2C1500",
    },
  },
  {
    id: "plum",
    label: "Deep Plum & Champagne",
    emoji: "💜",
    vars: {
      "--color-primary":    "#4A1040",
      "--color-primary-dark": "#2A0825",
      "--color-accent":     "#C9956A",
      "--color-accent-light": "#E8C4A0",
      "--color-bg":         "#FDF5EE",
      "--color-bg-deep":    "#150510",
      "--color-surface":    "#F2E8DF",
      "--color-text":       "#2A0825",
      "--color-text-light": "#7A4A6A",
      "--color-gold":       "#C9956A",
      "--color-gold-light": "#E8C4A0",
      "--envelope-body":    "#4A1040",
      "--envelope-flap":    "#350B2E",
      "--seal-bg":          "#C9956A",
      "--seal-text":        "#2A0825",
    },
  },
];

export const defaultTheme: ThemeId = "maroon";

export function applyTheme(id: ThemeId) {
  const theme = themes.find((t) => t.id === id);
  if (!theme) return;
  const root = document.documentElement;
  Object.entries(theme.vars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
  root.setAttribute("data-theme", id);
}
