import Animated, { FadeInUp } from "react-native-reanimated";
import { useWindowDimensions } from "react-native";

import type { AgentId } from "../../../types/chat";
import { MarkdownDocument } from "../final-plan-message/components/markdown-document";
import { AgentBadge, getAgentColor } from "../agent-badge";

import { styles } from "./agent-message.styles";

type AgentMessageProps = {
  agentId: AgentId;
  text: string;
  index: number;
};

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
      <MarkdownDocument
        markdown={text}
        embedded
        accentColor={getAgentColor(agentId)}
        style={styles.markdown}
      />
    </Animated.View>
  );
}
