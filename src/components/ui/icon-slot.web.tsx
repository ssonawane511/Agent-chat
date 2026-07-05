import type { ReactNode } from "react";
import { View, StyleSheet } from "react-native";

type IconSlotProps = {
  children: ReactNode;
  /** When true, fills the parent flex container (e.g. 44×44 icon circles). */
  fill?: boolean;
};

/** Web stand-in for `@expo/ui` Host with matchContents. */
export function IconSlot({ children, fill = false }: IconSlotProps) {
  return <View style={[styles.slot, fill && styles.fill]}>{children}</View>;
}

const styles = StyleSheet.create({
  slot: {
    alignItems: "center",
    justifyContent: "center",
  },
  fill: {
    width: "100%",
    height: "100%",
  },
});
