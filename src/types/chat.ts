export type AgentId = "strategist" | "designer" | "writer";

export type Message =
  | { id: string; role: "user"; text: string }
  | { id: string; role: "agent"; agentId: AgentId; text: string };

export type ChatSession = {
  id: string;
  title: string;
  messages: Message[];
  updatedAt: number;
  starred?: boolean;
};
