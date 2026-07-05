import { View } from "react-native";

import { AGENT_LIST } from "../../../constants/agents";
import type { AgentId } from "../../../types/chat";
import { AgentIcon } from "../agent-icon";

import { styles } from "./agent-avatar-cluster.styles";

const AVATAR_SIZE = 22;
const OVERLAP = 8;

type AgentAvatarClusterProps = {
  agentIds?: AgentId[];
};

export function AgentAvatarCluster({ agentIds }: AgentAvatarClusterProps) {
  const agents = agentIds
    ? AGENT_LIST.filter((agent) => agentIds.includes(agent.id))
    : AGENT_LIST;

  return (
    <View style={styles.cluster}>
      {agents.map((agent, index) => (
        <View
          key={agent.id}
          style={[
            styles.avatarWrap,
            {
              marginLeft: index === 0 ? 0 : -OVERLAP,
              zIndex: agents.length - index,
            },
          ]}
        >
          <AgentIcon agentId={agent.id} size={AVATAR_SIZE} />
        </View>
      ))}
    </View>
  );
}
