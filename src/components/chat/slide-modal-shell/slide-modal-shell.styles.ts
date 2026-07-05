import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  backdropPressable: {
    ...StyleSheet.absoluteFill,
    zIndex: 0,
  },
  backdropFill: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(17, 24, 39, 0.28)",
  },
  panelLeft: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 2,
  },
  panelBottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
  },
});
