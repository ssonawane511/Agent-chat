import { StyleSheet } from "react-native";

import { colors, radius, shadowMd, spacing, typography } from "../../../constants/tokens";

export const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.surface0,
  },
  panel: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    paddingHorizontal: spacing.xl,
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
  navRowPressed: {
    opacity: 0.6,
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
  },
  chatRowPressed: {
    opacity: 0.6,
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
    ...shadowMd(),
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
