import { colors } from "./tokens";
import type { AgentId } from "../types/chat";

export type AgentDefinition = {
  id: AgentId;
  label: string;
  color: string;
};

export const AGENTS: Record<AgentId, AgentDefinition> = {
  strategist: {
    id: "strategist",
    label: "Strategist",
    color: colors.strategist,
  },
  designer: {
    id: "designer",
    label: "Designer",
    color: colors.designer,
  },
  writer: {
    id: "writer",
    label: "Writer",
    color: colors.writer,
  },
};

export const AGENT_LIST: AgentDefinition[] = [
  AGENTS.strategist,
  AGENTS.designer,
  AGENTS.writer,
];
