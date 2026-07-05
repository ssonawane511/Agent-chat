import { StyleSheet } from "react-native";

import { colors, radius, spacing, typography } from "../../../constants/tokens";

export const styles = StyleSheet.create({
  wrapper: {
    alignItems: "flex-end",
    marginBottom: spacing.xl,
  },
  bubble: {
    maxWidth: "70%",
    backgroundColor: colors.userBubble,
    borderRadius: radius.xl,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md + 2,
  },
  text: {
    ...typography.body,
    color: colors.textPrimary,
    lineHeight: 22,
  },
});
