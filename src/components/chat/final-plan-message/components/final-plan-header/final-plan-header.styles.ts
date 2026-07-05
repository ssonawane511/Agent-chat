import { StyleSheet } from "react-native";

import { colors, radius, spacing, typography } from "../../../../../constants/tokens";

export const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    minHeight: 28,
  },
  iconCircle: {
    backgroundColor: colors.synthesizer,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  iconGlyph: {
    alignItems: "center",
    justifyContent: "center",
    transform: [{ translateY: 1.5 }],
  },
  title: {
    ...typography.bodyStrong,
    flex: 1,
    fontSize: 15,
    lineHeight: 18,
    color: colors.textPrimary,
  },
  titleLarge: {
    ...typography.h3,
    fontSize: 18,
    lineHeight: 22,
  },
  trailingSlot: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
});
