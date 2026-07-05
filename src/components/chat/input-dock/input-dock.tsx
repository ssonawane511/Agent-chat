import { Host, Icon } from "@expo/ui";
import { useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { ICONS } from "../../../constants/icons";
import { colors } from "../../../constants/tokens";
import type { AgentId } from "../../../types/chat";
import { AgentAvatarCluster } from "../agent-avatar-cluster";
import {
  MicIcon,
  getActiveAgentsLabel,
  showAttachmentOptions,
} from "../agent-selector-sheet";

import { styles } from "./input-dock.styles";

type InputDockProps = {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  activeAgents: AgentId[];
  onOpenAgentSheet: () => void;
  onStartVoiceInput: () => void;
  onStopVoiceInput: () => void;
};

export function InputDock({
  value,
  onChangeText,
  onSubmit,
  activeAgents,
  onOpenAgentSheet,
  onStartVoiceInput,
  onStopVoiceInput,
}: InputDockProps) {
  const [recording, setRecording] = useState(false);
  const canSend = value.trim().length > 0;

  const handlePrimaryAction = () => {
    if (canSend) {
      onSubmit();
      return;
    }
    showAttachmentOptions();
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
          <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder="Ask your AI team..."
            placeholderTextColor={colors.textMuted}
            multiline
            returnKeyType="default"
            blurOnSubmit={false}
            style={styles.input}
            textAlignVertical="top"
            accessibilityLabel="Message input"
            accessibilityHint="Type a message to send to your AI team"
            testID="message-input"
          />

          <View style={styles.toolbar}>
            <Pressable
              style={({ pressed }) => [
                styles.agentSelector,
                pressed && styles.pressed,
              ]}
              onPress={onOpenAgentSheet}
              hitSlop={4}
              accessibilityRole="button"
              accessibilityLabel={`Select agents, ${getActiveAgentsLabel(activeAgents)}`}
              testID="open-agent-selector"
            >
              <View style={styles.agentSelectorInner} pointerEvents="none">
                <AgentAvatarCluster agentIds={activeAgents} />
                <Text style={styles.agentLabel}>{getActiveAgentsLabel(activeAgents)}</Text>
                <Host matchContents>
                  <Icon name={ICONS.chevronDown} size={12} color={colors.textMuted} />
                </Host>
              </View>
            </Pressable>

            <View style={styles.actions}>
              <Pressable
                hitSlop={4}
                onPressIn={() => {
                  setRecording(true);
                  onStartVoiceInput();
                }}
                onPressOut={() => {
                  setRecording(false);
                  onStopVoiceInput();
                }}
                style={({ pressed }) => [
                  styles.iconCircle,
                  styles.micCircle,
                  (pressed || recording) && styles.pressed,
                ]}
                accessibilityRole="button"
                accessibilityLabel={recording ? "Recording voice input" : "Voice input"}
                accessibilityState={{ busy: recording }}
                testID="voice-input"
              >
                <View style={styles.iconCircleInner} pointerEvents="none">
                  <MicIcon recording={recording} />
                </View>
              </Pressable>

              <Pressable
                onPress={handlePrimaryAction}
                hitSlop={4}
                style={({ pressed }) => [
                  styles.iconCircle,
                  canSend ? styles.sendCircle : styles.plusCircle,
                  pressed && styles.pressed,
                ]}
                accessibilityRole="button"
                accessibilityLabel={canSend ? "Send message" : "Add attachment"}
                testID={canSend ? "send-message" : "add-attachment"}
              >
                <View style={styles.iconCircleInner} pointerEvents="none">
                  <Host matchContents>
                    <Icon
                      name={canSend ? ICONS.send : ICONS.plus}
                      size={18}
                      color={canSend ? colors.surface0 : colors.textPrimary}
                    />
                  </Host>
                </View>
              </Pressable>
            </View>
          </View>
      </View>
    </View>
  );
}
