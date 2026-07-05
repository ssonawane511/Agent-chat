import { action } from "storybook/actions";
import type { Meta, StoryObj } from "@storybook/react-native";

import { InputDock } from "./input-dock";

const meta = {
  title: "Chat/InputDock",
  component: InputDock,
  argTypes: {
    value: { control: "text" },
    activeAgents: { control: "object" },
  },
} satisfies Meta<typeof InputDock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    value: "",
    activeAgents: ["strategist", "designer", "writer"],
    onChangeText: action("onChangeText"),
    onSubmit: action("onSubmit"),
    onOpenAgentSheet: action("onOpenAgentSheet"),
    onStartVoiceInput: action("onStartVoiceInput"),
    onStopVoiceInput: action("onStopVoiceInput"),
  },
};

export const WithText: Story = {
  args: {
    value: "Draft a launch plan for our new feature",
    activeAgents: ["strategist", "writer"],
    onChangeText: action("onChangeText"),
    onSubmit: action("onSubmit"),
    onOpenAgentSheet: action("onOpenAgentSheet"),
    onStartVoiceInput: action("onStartVoiceInput"),
    onStopVoiceInput: action("onStopVoiceInput"),
  },
};
