import { StyleSheet } from "react-native";

import { colors, radius, spacing, typography } from "../../../../../constants/tokens";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.documentSurface,
    borderLeftWidth: 3,
    borderRadius: radius.xl,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingLeft: spacing.lg + 2,
  },
  bodyWrap: {
    gap: spacing.sm,
  },
  body: {
    color: colors.textPrimary,
    fontSize: typography.body.fontSize,
    lineHeight: 24,
  },
  paragraph: {
    marginBottom: spacing.xs,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: spacing.sm,
  },
  bullet: {
    width: 16,
    lineHeight: 24,
    color: colors.textSecondary,
    fontSize: typography.body.fontSize,
  },
  listContent: {
    flex: 1,
  },
  strong: {
    fontWeight: "700",
    color: colors.textPrimary,
  },
  em: {
    fontStyle: "italic",
    color: colors.textSecondary,
  },
  code: {
    backgroundColor: colors.surface1,
    borderRadius: radius.sm,
    fontFamily: "Menlo",
    fontSize: 14,
  },
  heading1: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  heading2: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  heading3: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  ellipsis: {
    ...typography.body,
    color: colors.textMuted,
    lineHeight: 24,
    marginTop: spacing.xs,
  },
});
