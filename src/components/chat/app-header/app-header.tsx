import { Host, Icon } from "@expo/ui";
import { Pressable, Text, View } from "react-native";

import { ICONS } from "../../../constants/icons";
import { colors } from "../../../constants/tokens";

import { styles } from "./app-header.styles";

type AppHeaderProps = {
  onOpenHistory: () => void;
  onNewChat: () => void;
};

export function AppHeader({ onOpenHistory, onNewChat }: AppHeaderProps) {
  return (
    <View style={styles.container}>
      <Pressable
        hitSlop={8}
        style={({ pressed }) => [styles.sideSlot, pressed && styles.pressed]}
        onPress={onOpenHistory}
        accessibilityRole="button"
        accessibilityLabel="Open chat history"
        testID="open-chat-history"
      >
        <View style={styles.sideSlotInner} pointerEvents="none">
          <Host matchContents>
            <Icon name={ICONS.menu} size={22} color={colors.textPrimary} />
          </Host>
        </View>
      </Pressable>

      <Text style={styles.title} accessibilityRole="header">
        AI Team Chat
      </Text>

      <Pressable
        hitSlop={8}
        style={({ pressed }) => [styles.sideSlot, pressed && styles.pressed]}
        onPress={onNewChat}
        accessibilityRole="button"
        accessibilityLabel="New chat"
        testID="new-chat"
      >
        <View style={styles.sideSlotInner} pointerEvents="none">
          <Host matchContents>
            <Icon name={ICONS.compose} size={22} color={colors.textPrimary} />
          </Host>
        </View>
      </Pressable>
    </View>
  );
}
