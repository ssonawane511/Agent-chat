import { action } from "storybook/actions";
import type { Meta, StoryObj } from "@storybook/react-native";

import { AgentSelectorSheet } from "./agent-selector-sheet";

const meta = {
  title: "Chat/AgentSelectorSheet",
  component: AgentSelectorSheet,
  argTypes: {
    visible: { control: "boolean" },
    activeAgents: { control: "object" },
  },
} satisfies Meta<typeof AgentSelectorSheet>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    visible: true,
    activeAgents: ["strategist", "designer", "writer"],
    onClose: action("onClose"),
    onToggleAll: action("onToggleAll"),
    onToggleAgent: action("onToggleAgent"),
  },
};

export const PartialSelection: Story = {
  args: {
    visible: true,
    activeAgents: ["writer"],
    onClose: action("onClose"),
    onToggleAll: action("onToggleAll"),
    onToggleAgent: action("onToggleAgent"),
  },
};
