import Animated, { FadeInUp } from "react-native-reanimated";
import { Text, useWindowDimensions, View } from "react-native";

import type { AgentId } from "../../../types/chat";
import { AgentBadge, getAgentColor } from "../agent-badge";

import { styles } from "./agent-message.styles";

type AgentMessageProps = {
  agentId: AgentId;
  text: string;
  index: number;
};

function WriterMessageBody({ text }: { text: string }) {
  const accent = getAgentColor("writer");
  const parts = text.split("\n\n");
  const quote = parts[0] ?? text;
  const followUp = parts[1];

  return (
    <View style={[styles.blockquote, { borderLeftColor: accent }]}>
      <Text style={styles.quoteText}>{quote}</Text>
      {followUp ? (
        <Text style={[styles.followUp, { color: accent }]}>{followUp}</Text>
      ) : null}
    </View>
  );
}

export function AgentMessageBubble({
  agentId,
  text,
  index,
}: AgentMessageProps) {
  const { width } = useWindowDimensions();
  const maxWidth = width * 0.88;

  return (
    <Animated.View
      entering={FadeInUp.delay(index * 80).duration(200)}
      style={[styles.wrapper, { maxWidth }]}
      accessibilityRole="text"
      accessibilityLabel={`Agent message: ${text}`}
    >
      <AgentBadge agentId={agentId} />
      {agentId === "writer" ? (
        <WriterMessageBody text={text} />
      ) : (
        <Text style={styles.text}>{text}</Text>
      )}
    </Animated.View>
  );
}
