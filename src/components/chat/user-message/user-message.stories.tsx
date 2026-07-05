import type { Meta, StoryObj } from "@storybook/react-native";

import { UserMessageBubble } from "./user-message";

const meta = {
  title: "Chat/UserMessage",
  component: UserMessageBubble,
  argTypes: {
    text: { control: "text" },
    index: { control: "number" },
  },
} satisfies Meta<typeof UserMessageBubble>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Short: Story = {
  args: {
    text: "Help me plan a product launch",
    index: 0,
  },
};

export const Long: Story = {
  args: {
    text: "I need a full go-to-market plan with messaging, timeline, and channel strategy for a B2B SaaS launch in Q3.",
    index: 1,
  },
};
