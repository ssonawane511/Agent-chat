import { Platform, type ViewStyle } from "react-native";

export const colors = {
  bgPrimary: "#F9F9F9",
  bgGradientTop: "#F9F9F9",
  bgGradientBottom: "#D0B8ED",
  surface0: "#FFFFFF",
  surface1: "#F2F2F4",
  userBubble: "#EFEFEF",
  documentSurface: "#F7F7FB",
  border: "#E6E8F0",
  borderLight: "#ECEEF4",
  textPrimary: "#1A1A1A",
  textSecondary: "#6B7280",
  textMuted: "#9CA3AF",
  brandPurple: "#8B5CF6",
  brandPurpleLight: "#F3E8FF",
  brandPurpleBorder: "#DDD6FE",
  brandPurpleText: "#6D28D9",
  chipSecondaryBg: "#FFFFFF",
  chipSecondaryBorder: "#E5E7EB",
  iconButtonBg: "#F3F4F6",
  iconButtonPlusBg: "#DADCE8",
  strategist: "#6ECFB2",
  designer: "#F4A574",
  writer: "#B794F6",
  synthesizer: "#3B82F6",
  avatarPurple: "#B794F6",
  avatarTeal: "#6ECFB2",
  avatarSalmon: "#F4A574",
  avatarGray: "#4B5563",
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 22,
  xxl: 24,
  pill: 999,
} as const;

export const typography = {
  h1: { fontSize: 34, fontWeight: "700" as const, lineHeight: 40 },
  h2: { fontSize: 24, fontWeight: "600" as const },
  h3: { fontSize: 17, fontWeight: "600" as const },
  body: { fontSize: 16, fontWeight: "400" as const },
  bodyStrong: { fontSize: 16, fontWeight: "600" as const },
  caption: { fontSize: 13, fontWeight: "500" as const },
  micro: { fontSize: 11, fontWeight: "400" as const },
};

export function withAlpha(hex: string, alpha: number): string {
  const normalized = hex.replace("#", "");
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function shadowSm(): ViewStyle {
  return Platform.select({
    ios: {
      shadowColor: "#111827",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
    },
    android: { elevation: 2 },
    default: {},
  }) as ViewStyle;
}

export function shadowMd(): ViewStyle {
  return Platform.select({
    ios: {
      shadowColor: "#111827",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.06,
      shadowRadius: 14,
    },
    android: { elevation: 4 },
    default: {},
  }) as ViewStyle;
}

export function shadowInput(): ViewStyle {
  return Platform.select({
    ios: {
      shadowColor: "#111827",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.05,
      shadowRadius: 16,
    },
    android: { elevation: 3 },
    default: {},
  }) as ViewStyle;
}
