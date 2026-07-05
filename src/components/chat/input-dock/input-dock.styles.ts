import { StyleSheet } from "react-native";

import {
  colors,
  radius,
  shadowInput,
  spacing,
} from "../../../constants/tokens";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  card: {
    backgroundColor: colors.surface0,
    borderRadius: radius.xxl,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...shadowInput(),
  },
  input: {
    minHeight: 44,
    maxHeight: 120,
    fontSize: 17,
    lineHeight: 22,
    color: colors.textPrimary,
    paddingTop: spacing.xs,
    paddingBottom: spacing.sm,
  },
  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: spacing.xs,
  },
  agentSelector: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 44,
    paddingVertical: spacing.xs,
    paddingRight: spacing.sm,
    flexShrink: 1,
  },
  agentSelectorInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    flexShrink: 1,
  },
  agentLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: "500",
    flexShrink: 1,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
  },
  iconCircleInner: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.82,
  },
  micCircle: {
    backgroundColor: colors.iconButtonBg,
  },
  micRecording: {
    backgroundColor: colors.brandPurpleLight,
    borderWidth: 1,
    borderColor: colors.brandPurpleBorder,
  },
  plusCircle: {
    backgroundColor: colors.iconButtonPlusBg,
  },
  sendCircle: {
    backgroundColor: colors.brandPurpleText,
  },
});
