import { Host, Icon } from "@expo/ui";
import { View } from "react-native";

import { AGENTS } from "../../../constants/agents";
import type { AgentId } from "../../../types/chat";

import { styles } from "./agent-icon.styles";
import { getAgentIcon } from "./agent-icon.utils";

type AgentIconProps = {
  agentId: AgentId;
  size?: number;
};

export function AgentIcon({ agentId, size = 28 }: AgentIconProps) {
  const agent = AGENTS[agentId];
  const iconSize = Math.max(12, Math.round(size * 0.5));

  return (
    <View
      style={[
        styles.circle,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: agent.color,
        },
      ]}
    >
      <Host matchContents>
        <Icon name={getAgentIcon(agentId)} size={iconSize} color="#FFFFFF" />
      </Host>
    </View>
  );
}

export { getAgentIcon } from "./agent-icon.utils";
