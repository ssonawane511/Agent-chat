import { StyleSheet } from "react-native";

import { colors, spacing } from "../../../constants/tokens";

export const styles = StyleSheet.create({
  wrapper: {
    alignSelf: "stretch",
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.xs,
  },
  pressable: {
    gap: spacing.sm,
  },
  pressed: {
    opacity: 0.92,
  },
  hint: {
    fontSize: 12,
    color: colors.textMuted,
    textAlign: "center",
    marginTop: spacing.xs,
  },
});
