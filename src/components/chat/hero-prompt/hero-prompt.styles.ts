import { StyleSheet } from "react-native";

import { colors, spacing, typography } from "../../../constants/tokens";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxxl,
  },
  title: {
    ...typography.h1,
    color: colors.textPrimary,
    textAlign: "center",
    letterSpacing: -0.5,
  },
  subtitle: {
    marginTop: spacing.sm,
    fontSize: 17,
    lineHeight: 24,
    color: colors.textSecondary,
    textAlign: "center",
  },
});
