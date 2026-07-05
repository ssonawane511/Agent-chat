import type { Meta, StoryObj } from "@storybook/react-native";

import { AgentBadge } from "./agent-badge";

const meta = {
  title: "Chat/AgentBadge",
  component: AgentBadge,
  argTypes: {
    agentId: {
      control: "select",
      options: ["strategist", "designer", "writer"],
    },
    statusText: { control: "text" },
  },
} satisfies Meta<typeof AgentBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    agentId: "strategist",
  },
};

export const WithStatus: Story = {
  args: {
    agentId: "writer",
    statusText: "is working on ideas…",
  },
};
