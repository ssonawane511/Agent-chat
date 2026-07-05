import Animated, { FadeInUp } from "react-native-reanimated";
import { View, Text } from "react-native";

import { styles } from "./user-message.styles";

type UserMessageProps = {
  text: string;
  index: number;
};

export function UserMessageBubble({ text }: UserMessageProps) {
  return (
    <Animated.View
      entering={FadeInUp.duration(200)}
      style={styles.wrapper}
      accessibilityRole="text"
      accessibilityLabel={`You said: ${text}`}
    >
      <View style={styles.bubble}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </Animated.View>
  );
}
