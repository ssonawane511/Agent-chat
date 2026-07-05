import type { Meta, StoryObj } from "@storybook/react-native";

import { ThinkingBubble } from "./thinking-message";

const meta = {
  title: "Chat/ThinkingMessage",
  component: ThinkingBubble,
  argTypes: {
    index: { control: "number" },
  },
} satisfies Meta<typeof ThinkingBubble>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    index: 0,
  },
};
