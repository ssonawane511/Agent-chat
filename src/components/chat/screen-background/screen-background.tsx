import { LinearGradient } from "expo-linear-gradient";
import type { ReactNode } from "react";
import { View, useWindowDimensions, type ViewProps } from "react-native";

import { styles } from "./screen-background.styles";
import { FADE_HEIGHT_RATIO, bottomFadeGradient } from "./screen-background.utils";

type ScreenBackgroundProps = ViewProps & {
  children: ReactNode;
};

export function ScreenBackground({ children, style, ...props }: ScreenBackgroundProps) {
  const { height } = useWindowDimensions();
  const fadeHeight = height * FADE_HEIGHT_RATIO;

  return (
    <View style={[styles.root, style]} {...props}>
      <LinearGradient
        pointerEvents="none"
        colors={[...bottomFadeGradient.colors]}
        locations={[...bottomFadeGradient.locations]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={[styles.gradient, { height: fadeHeight }]}
      />

      <View style={styles.content}>{children}</View>
    </View>
  );
}
