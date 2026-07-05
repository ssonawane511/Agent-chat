import { Pressable, Text, View } from "react-native";

import { IconSlot } from "../../ui/icon-slot.web";
import { MaterialIcon } from "../../ui/material-icon.web";
import { colors } from "../../../constants/tokens";

import { styles } from "./app-header.styles";

type DesktopAppHeaderProps = {
  onOpenHistory: () => void;
  onNewChat: () => void;
};

export function DesktopAppHeader({
  onOpenHistory,
  onNewChat,
}: DesktopAppHeaderProps) {
  return (
    <View style={styles.container}>
      <Pressable
        hitSlop={8}
        style={({ pressed }) => [styles.sideSlot, pressed && styles.pressed]}
        onPress={onOpenHistory}
        accessibilityRole="button"
        accessibilityLabel="Toggle chat history"
        testID="open-chat-history"
      >
        <View style={styles.sideSlotInner} pointerEvents="none">
          <IconSlot>
            <MaterialIcon name="menu" size={22} color={colors.textPrimary} />
          </IconSlot>
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
          <IconSlot>
            <MaterialIcon name="compose" size={22} color={colors.textPrimary} />
          </IconSlot>
        </View>
      </Pressable>
    </View>
  );
}
