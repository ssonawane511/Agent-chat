import { StyleSheet } from "react-native";

import {
  colors,
  radius,
  shadowMd,
  spacing,
  typography,
} from "../../../constants/tokens";

export const styles = StyleSheet.create({
  sheet: {
    backgroundColor: colors.surface0,
    borderTopLeftRadius: radius.xxl,
    borderTopRightRadius: radius.xxl,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    ...shadowMd(),
  },
  handle: {
    alignSelf: "center",
    width: 36,
    height: 4,
    borderRadius: radius.pill,
    backgroundColor: colors.border,
    marginBottom: spacing.lg,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
  },
  headerCopy: {
    flex: 1,
    paddingRight: spacing.md,
  },
  title: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  closeButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.pill,
    backgroundColor: colors.surface1,
  },
  closeButtonInner: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonPressed: {
    opacity: 0.82,
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.brandPurpleLight,
    borderWidth: 1,
    borderColor: colors.brandPurpleBorder,
    marginBottom: spacing.lg,
  },
  summaryText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: colors.brandPurpleText,
  },
  optionGroup: {
    borderRadius: radius.lg,
    backgroundColor: colors.surface1,
    borderWidth: 1,
    borderColor: colors.borderLight,
    overflow: "hidden",
  },
  row: {
    minHeight: 52,
  },
  rowInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    minHeight: 52,
  },
  rowHighlighted: {
    backgroundColor: colors.surface0,
  },
  rowPressed: {
    opacity: 0.82,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    flex: 1,
  },
  rowLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: colors.textPrimary,
  },
  rowLabelMuted: {
    color: colors.textSecondary,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.borderLight,
    marginLeft: spacing.md,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface0,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    borderColor: colors.brandPurpleText,
    backgroundColor: colors.brandPurpleText,
  },
  checkboxIncluded: {
    borderColor: colors.brandPurpleBorder,
    backgroundColor: colors.brandPurpleLight,
  },
  doneButton: {
    marginTop: spacing.lg,
    backgroundColor: colors.brandPurpleText,
    borderRadius: radius.pill,
    paddingVertical: spacing.md,
    alignItems: "center",
  },
  doneButtonPressed: {
    opacity: 0.9,
  },
  doneText: {
    color: colors.surface0,
    fontSize: 15,
    fontWeight: "600",
  },
});
