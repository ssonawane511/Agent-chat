import Animated, {
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import { View, Text, useWindowDimensions } from "react-native";

import { AGENTS } from "../../../constants/agents";
import { withAlpha } from "../../../constants/tokens";
import { AgentBadge } from "../agent-badge";

import { styles } from "./thinking-message.styles";

type ThinkingMessageProps = {
  index: number;
};

export function ThinkingBubble({ index }: ThinkingMessageProps) {
  const { width } = useWindowDimensions();
  const maxWidth = width * 0.88;
  const writerColor = AGENTS.writer.color;
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.45, { duration: 700 }),
        withTiming(1, { duration: 700 }),
      ),
      -1,
      false,
    );
  }, [opacity]);

  const animatedStatus = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      entering={FadeInUp.delay(index * 80).duration(200)}
      style={[styles.wrapper, { maxWidth }]}
      accessibilityRole="text"
      accessibilityLabel="Agent is thinking"
      accessibilityLiveRegion="polite"
    >
      <Animated.View style={animatedStatus}>
        <AgentBadge agentId="writer" statusText="is working on ideas…" />
      </Animated.View>

      <View style={[styles.blockquote, { borderLeftColor: writerColor }]}>
        <Text style={styles.quoteText}>
          "Work smarter, not longer — let AI take care of the rest."
        </Text>
        <Text style={[styles.followUp, { color: withAlpha(writerColor, 0.9) }]}>
          Would you like something punchier?
        </Text>
      </View>
    </Animated.View>
  );
}
