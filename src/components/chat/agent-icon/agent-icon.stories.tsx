import type { Meta, StoryObj } from "@storybook/react-native";

import { AgentIcon } from "./agent-icon";

const meta = {
  title: "Chat/AgentIcon",
  component: AgentIcon,
  argTypes: {
    agentId: {
      control: "select",
      options: ["strategist", "designer", "writer"],
    },
    size: { control: "number" },
  },
} satisfies Meta<typeof AgentIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Strategist: Story = {
  args: {
    agentId: "strategist",
    size: 40,
  },
};

export const Designer: Story = {
  args: {
    agentId: "designer",
    size: 40,
  },
};

export const Writer: Story = {
  args: {
    agentId: "writer",
    size: 40,
  },
};
