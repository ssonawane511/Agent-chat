import { ICONS } from "../../../constants/icons";
import type { AgentId } from "../../../types/chat";

export function getAgentIcon(agentId: AgentId) {
  switch (agentId) {
    case "strategist":
      return ICONS.strategist;
    case "designer":
      return ICONS.designer;
    case "writer":
      return ICONS.writer;
  }
}
