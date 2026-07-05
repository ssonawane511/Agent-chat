import Animated, { FadeInUp } from "react-native-reanimated";
import { View, Text, useWindowDimensions } from "react-native";

import { styles } from "./user-message.styles";

type UserMessageProps = {
  text: string;
  index: number;
};

export function UserMessageBubble({ text, index }: UserMessageProps) {
  const { width } = useWindowDimensions();
  const maxWidth = width * 0.78;

  return (
    <Animated.View
      entering={FadeInUp.delay(index * 80).duration(200)}
      style={styles.wrapper}
      accessibilityRole="text"
      accessibilityLabel={`You said: ${text}`}
    >
      <View style={[styles.bubble, { maxWidth }]}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </Animated.View>
  );
}
