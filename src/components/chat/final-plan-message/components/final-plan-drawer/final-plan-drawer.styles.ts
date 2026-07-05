import { StyleSheet } from "react-native";

import { colors, radius, shadowMd, spacing } from "../../../../../constants/tokens";

export const styles = StyleSheet.create({
  sheet: {
    backgroundColor: colors.surface0,
    borderTopLeftRadius: radius.xxl,
    borderTopRightRadius: radius.xxl,
    ...shadowMd(),
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: radius.pill,
    backgroundColor: colors.border,
  },
  handleHitArea: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
    width: "100%",
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
  },
  dragZone: {
    width: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderLight,
    gap: spacing.sm,
  },
  headerTitle: {
    flex: 1,
  },
  closeButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
});
