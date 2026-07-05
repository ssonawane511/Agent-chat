import { StyleSheet } from "react-native";

import { colors, spacing, typography, withAlpha } from "../../../constants/tokens";

export const styles = StyleSheet.create({
  wrapper: {
    alignSelf: "flex-start",
    marginBottom: spacing.xl,
  },
  blockquote: {
    borderLeftWidth: 2,
    paddingLeft: spacing.md,
    marginLeft: 2,
    gap: spacing.sm,
  },
  quoteText: {
    ...typography.body,
    color: colors.textPrimary,
    lineHeight: 24,
    fontStyle: "italic",
  },
  followUp: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "500",
  },
});
