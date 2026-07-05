import { StyleSheet } from "react-native";

import { colors, radius } from "../../../constants/tokens";

export const styles = StyleSheet.create({
  cluster: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarWrap: {
    borderRadius: radius.pill,
    borderWidth: 2,
    borderColor: colors.surface0,
  },
});
