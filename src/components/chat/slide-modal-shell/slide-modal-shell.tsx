import type { ReactNode } from "react";
import { Modal, Pressable, View, type ViewStyle } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { type AnimatedStyle } from "react-native-reanimated";

import { styles } from "./slide-modal-shell.styles";

type SlideModalShellProps = {
  mounted: boolean;
  onClose: () => void;
  backdropStyle: AnimatedStyle<ViewStyle>;
  panelStyle: AnimatedStyle<ViewStyle>;
  panelPosition: "left" | "bottom";
  children: ReactNode;
};

export function SlideModalShell({
  mounted,
  onClose,
  backdropStyle,
  panelStyle,
  panelPosition,
  children,
}: SlideModalShellProps) {
  if (!mounted) return null;

  return (
    <Modal visible transparent animationType="none" onRequestClose={onClose}>
      <GestureHandlerRootView style={styles.root}>
        <Pressable
          style={styles.backdropPressable}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel="Close"
        >
          <Animated.View
            pointerEvents="none"
            style={[styles.backdropFill, backdropStyle]}
          />
        </Pressable>

        <Animated.View
          style={[
            panelPosition === "left" ? styles.panelLeft : styles.panelBottom,
            panelStyle,
          ]}
        >
          {children}
        </Animated.View>
      </GestureHandlerRootView>
    </Modal>
  );
}
