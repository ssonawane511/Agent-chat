import { View } from "react-native";

import { AGENTS } from "../../../constants/agents";
import type { MaterialIconName } from "../../../constants/material-icons.web";
import type { AgentId } from "../../../types/chat";
import { IconSlot } from "../../ui/icon-slot.web";
import { MaterialIcon } from "../../ui/material-icon.web";

import { styles } from "./agent-icon.styles";

type AgentIconProps = {
  agentId: AgentId;
  size?: number;
};

function getAgentMaterialIcon(agentId: AgentId): MaterialIconName {
  switch (agentId) {
    case "strategist":
      return "strategist";
    case "designer":
      return "designer";
    case "writer":
      return "writer";
  }
}

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
      <IconSlot fill>
        <MaterialIcon
          name={getAgentMaterialIcon(agentId)}
          size={iconSize}
          color="#FFFFFF"
        />
      </IconSlot>
    </View>
  );
}

export { getAgentIcon } from "./agent-icon.utils";
