import { useState } from "react";
import Animated, { FadeInUp } from "react-native-reanimated";
import { Pressable, Text, useWindowDimensions } from "react-native";

import { FinalPlanDrawer } from "./components/final-plan-drawer";
import { FinalPlanHeader } from "./components/final-plan-header";
import { MarkdownDocument } from "./components/markdown-document";
import { styles } from "./final-plan-message.styles";
import { toMarkdown } from "./final-plan-message.utils";

type FinalPlanMessageProps = {
  text: string;
  index: number;
};

export function FinalPlanMessage({ text, index }: FinalPlanMessageProps) {
  const { width } = useWindowDimensions();
  const maxWidth = width * 0.92;
  const markdown = toMarkdown(text);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Animated.View
        entering={FadeInUp.delay(index * 80).duration(200)}
        style={[styles.wrapper, { maxWidth }]}
      >
        <Pressable
          onPress={() => setDrawerOpen(true)}
          style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
          accessibilityRole="button"
          accessibilityLabel="Open Final Plan"
          accessibilityHint="Opens the full plan in a bottom drawer"
        >
          <FinalPlanHeader showChevron iconSize={26} />

          <MarkdownDocument markdown={markdown} embedded previewMaxItems={1} />

          <Text style={styles.hint}>Tap to view full document</Text>
        </Pressable>
      </Animated.View>

      <FinalPlanDrawer
        visible={drawerOpen}
        markdown={markdown}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
}

/** @deprecated Use FinalPlanMessage */
export const SynthesisBubble = FinalPlanMessage;
