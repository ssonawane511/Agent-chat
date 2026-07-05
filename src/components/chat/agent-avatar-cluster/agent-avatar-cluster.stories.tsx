import type { Meta, StoryObj } from "@storybook/react-native";

import { AgentAvatarCluster } from "./agent-avatar-cluster";

const meta = {
  title: "Chat/AgentAvatarCluster",
  component: AgentAvatarCluster,
  argTypes: {
    agentIds: {
      control: "object",
    },
  },
} satisfies Meta<typeof AgentAvatarCluster>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AllAgents: Story = {};

export const TwoAgents: Story = {
  args: {
    agentIds: ["strategist", "writer"],
  },
};

export const SingleAgent: Story = {
  args: {
    agentIds: ["designer"],
  },
};
