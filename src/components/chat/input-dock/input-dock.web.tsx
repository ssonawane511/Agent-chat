import { IconSlot } from "../../ui/icon-slot.web";
import { MaterialIcon } from "../../ui/material-icon.web";
import { useCallback, useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type NativeSyntheticEvent,
  type TextInputContentSizeChangeEventData,
} from "react-native";
import { colors } from "../../../constants/tokens";
import type { AgentId } from "../../../types/chat";
import { AgentAvatarCluster } from "../agent-avatar-cluster";
import {
  MicIcon,
  getActiveAgentsLabel,
  showAttachmentOptions,
} from "../agent-selector-sheet";

import { styles } from "./input-dock.styles";

const MIN_INPUT_HEIGHT = 44;
const MAX_INPUT_HEIGHT = 120;

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
  const [inputHeight, setInputHeight] = useState(MIN_INPUT_HEIGHT);
  const canSend = value.trim().length > 0;

  useEffect(() => {
    if (!value) {
      setInputHeight(MIN_INPUT_HEIGHT);
    }
  }, [value]);

  const handleContentSizeChange = useCallback(
    (event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {
      const nextHeight = Math.min(
        MAX_INPUT_HEIGHT,
        Math.max(MIN_INPUT_HEIGHT, event.nativeEvent.contentSize.height),
      );
      setInputHeight(nextHeight);
    },
    [],
  );

  const handlePrimaryAction = () => {
    if (canSend) {
      onSubmit();
      return;
    }
    showAttachmentOptions();
  };

  return (
    <View style={styles.container}>
      <View style={[styles.card, webStyles.card]}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="Ask your AI team..."
          placeholderTextColor={colors.textMuted}
          multiline
          returnKeyType="default"
          blurOnSubmit={false}
          scrollEnabled={inputHeight >= MAX_INPUT_HEIGHT}
          onContentSizeChange={handleContentSizeChange}
          style={[
            styles.input,
            webStyles.input,
            { height: inputHeight },
          ]}
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
              <IconSlot>
                <MaterialIcon name="chevronDown" size={12} color={colors.textMuted} />
              </IconSlot>
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
                <IconSlot fill>
                  <MicIcon recording={recording} />
                </IconSlot>
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
                <IconSlot fill>
                  <MaterialIcon
                    name={canSend ? "send" : "plus"}
                    size={18}
                    color={canSend ? colors.surface0 : colors.textPrimary}
                  />
                </IconSlot>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const webStyles = StyleSheet.create({
  card: {
    borderColor: colors.border,
    boxShadow: "0 6px 16px rgba(17, 24, 39, 0.05)",
  },
  input: {
    minHeight: MIN_INPUT_HEIGHT,
    maxHeight: MAX_INPUT_HEIGHT,
    outlineStyle: "none",
    outlineWidth: 0,
    boxShadow: "none",
    resize: "none",
  } as object,
});
