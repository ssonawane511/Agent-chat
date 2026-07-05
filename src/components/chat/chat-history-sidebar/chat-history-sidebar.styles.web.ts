import { StyleSheet } from "react-native";

import { colors, radius, spacing, typography } from "../../../constants/tokens";

export const styles = StyleSheet.create({
  panel: {
    height: "100%",
    width: "100%",
    paddingHorizontal: spacing.xl,
    backgroundColor: colors.surface0,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    width: "100%",
    paddingBottom: spacing.xl,
  },
  navRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.md,
  },
  navIcon: {
    width: 22,
    alignItems: "center",
  },
  navLabel: {
    ...typography.body,
    color: colors.textPrimary,
  },
  chatList: {
    marginTop: spacing.xl,
    width: "100%",
  },
  chatRowWrap: {
    position: "relative",
    width: "100%",
  },
  chatRow: {
    width: "100%",
    paddingVertical: 11,
    paddingRight: 36,
  },
  chatRowPressed: {
    opacity: 0.6,
  },
  rowMenuButton: {
    position: "absolute",
    top: 4,
    right: 0,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.sm,
  },
  rowMenuButtonInner: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  rowMenuButtonPressed: {
    opacity: 0.7,
    backgroundColor: colors.surface1,
  },
  rowTooltip: {
    position: "absolute",
    top: 4,
    right: 0,
    zIndex: 2,
    backgroundColor: colors.surface0,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    boxShadow: "0 4px 14px rgba(17, 24, 39, 0.06)",
  },
  rowTooltipPressed: {
    opacity: 0.7,
  },
  rowTooltipLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: colors.textPrimary,
  },
  chatTitle: {
    flexShrink: 1,
    width: "100%",
    fontSize: 16,
    fontWeight: "400",
    color: colors.textPrimary,
    lineHeight: 22,
  },
  chatTitleActive: {
    fontWeight: "600",
  },
  emptyState: {
    paddingTop: spacing.xxxl,
  },
  emptyBody: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textMuted,
  },
});
