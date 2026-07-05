import { Text, View } from "react-native";

import { AGENTS } from "../../../constants/agents";
import { withAlpha } from "../../../constants/tokens";
import type { AgentId } from "../../../types/chat";
import { AgentIcon } from "../agent-icon";

import { styles } from "./agent-badge.styles";
export { getAgentColor, getAgentTint } from "./agent-badge.utils";

type AgentBadgeProps = {
  agentId: AgentId;
  statusText?: string;
};

export function AgentBadge({ agentId, statusText }: AgentBadgeProps) {
  const agent = AGENTS[agentId];

  return (
    <View style={styles.badge}>
      <AgentIcon agentId={agentId} size={26} />
      <Text style={styles.label}>{agent.label}</Text>
      {statusText ? (
        <Text style={[styles.status, { color: withAlpha(agent.color, 0.85) }]}>
          {statusText}
        </Text>
      ) : null}
    </View>
  );
}

export { getAgentIcon } from "../agent-icon";
