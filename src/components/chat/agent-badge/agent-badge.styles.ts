import { StyleSheet } from "react-native";

import { colors, spacing, typography } from "../../../constants/tokens";

export const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  label: {
    ...typography.bodyStrong,
    color: colors.textPrimary,
    fontSize: 15,
  },
  status: {
    fontSize: 14,
    fontStyle: "italic",
    fontWeight: "400",
  },
});
