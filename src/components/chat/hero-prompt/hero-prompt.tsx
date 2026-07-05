import { Text, View } from "react-native";

import { styles } from "./hero-prompt.styles";

export function HeroPrompt() {
  return (
    <View style={styles.container} accessibilityRole="text">
      <Text style={styles.title} accessibilityRole="header">
        Hey, how can I help you?
      </Text>
      <Text style={styles.subtitle}>
        Start a new project or ask for help.
      </Text>
    </View>
  );
}
