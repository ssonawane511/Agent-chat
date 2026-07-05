import type { Meta, StoryObj } from "@storybook/react-native";

import { AgentMessageBubble } from "./agent-message";

const meta = {
  title: "Chat/AgentMessage",
  component: AgentMessageBubble,
  argTypes: {
    agentId: {
      control: "select",
      options: ["strategist", "designer", "writer"],
    },
    text: { control: "text" },
    index: { control: "number" },
  },
} satisfies Meta<typeof AgentMessageBubble>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Strategist: Story = {
  args: {
    agentId: "strategist",
    text: "Lead with a clear positioning statement and a phased rollout across paid and organic channels.",
    index: 0,
  },
};

export const Designer: Story = {
  args: {
    agentId: "designer",
    text: "Use a bold hero visual with high contrast and a single primary CTA above the fold.",
    index: 1,
  },
};

export const WriterWithQuote: Story = {
  args: {
    agentId: "writer",
    text: "**Positioning:** For product teams who ship under pressure.\n\nWant me to draft a headline?",
    index: 2,
  },
};

export const WithMarkdown: Story = {
  args: {
    agentId: "strategist",
    text: "**Week 1 checklist:**\n\n- Finalize ICP doc\n- Lock hero tagline\n- Set up waitlist with UTM tracking\n\nDon't build more features unless they block the demo.",
    index: 3,
  },
};
