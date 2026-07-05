import { StyleSheet } from "react-native";

import { colors } from "../../../constants/tokens";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bgGradientTop,
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
  },
});
