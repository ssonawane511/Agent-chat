import { colors } from "../../../constants/tokens";

function hexToRgb(hex: string) {
  const normalized = hex.replace("#", "");
  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  };
}

function lerpColor(from: string, to: string, amount: number) {
  const start = hexToRgb(from);
  const end = hexToRgb(to);
  const r = Math.round(start.r + (end.r - start.r) * amount);
  const g = Math.round(start.g + (end.g - start.g) * amount);
  const b = Math.round(start.b + (end.b - start.b) * amount);
  return `#${[r, g, b].map((value) => value.toString(16).padStart(2, "0")).join("")}`;
}

/** Eased lilac stops for a smooth GPU linear gradient. */
const GRADIENT_STEPS = 8;

const gradientStops = Array.from({ length: GRADIENT_STEPS }, (_, index) => {
  const location = index / (GRADIENT_STEPS - 1);
  const eased = location ** 0.95;
  return {
    location,
    color: lerpColor(colors.bgGradientTop, colors.bgGradientBottom, eased),
  };
});

export const bottomFadeGradient = {
  colors: gradientStops.map((stop) => stop.color),
  locations: gradientStops.map((stop) => stop.location),
} as const;

export const FADE_HEIGHT_RATIO = 0.72;
