import { AGENTS } from "../../../constants/agents";
import { withAlpha } from "../../../constants/tokens";
import type { AgentId } from "../../../types/chat";

export function getAgentTint(agentId: AgentId): string {
  return withAlpha(AGENTS[agentId].color, 0.12);
}

export function getAgentColor(agentId: AgentId): string {
  return AGENTS[agentId].color;
}
