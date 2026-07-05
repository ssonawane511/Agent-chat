import { StyleSheet } from "react-native";

import { colors, spacing, typography } from "../../../constants/tokens";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    height: 52,
  },
  sideSlot: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  sideSlotInner: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.82,
  },
  title: {
    flex: 1,
    ...typography.h3,
    color: colors.textPrimary,
    textAlign: "center",
  },
});
