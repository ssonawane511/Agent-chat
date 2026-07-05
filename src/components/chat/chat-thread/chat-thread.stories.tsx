import type { Meta, StoryObj } from "@storybook/react-native";

import type { Message } from "../../../types/chat";
import {
  ChatThread,
  ChatThreadBottomOffsetProvider,
} from "./chat-thread";

const sampleMessages: Message[] = [
  {
    id: "1",
    role: "user",
    text: "Help me plan a product launch for our AI assistant.",
  },
  {
    id: "2",
    role: "agent",
    agentId: "strategist",
    text: "Start with a clear ICP and a three-phase rollout: awareness, activation, and retention.",
  },
  {
    id: "3",
    role: "user",
    text: "Can you also suggest messaging angles?",
  },
  {
    id: "4",
    role: "agent",
    agentId: "writer",
    text: "“Ship faster with an AI team that plans, writes, and designs together.”\n\nWant a shorter variant?",
  },
];

const meta = {
  title: "Chat/ChatThread",
  component: ChatThread,
  decorators: [
    (Story) => (
      <ChatThreadBottomOffsetProvider value={120}>
        <Story />
      </ChatThreadBottomOffsetProvider>
    ),
  ],
} satisfies Meta<typeof ChatThread>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Conversation: Story = {
  render: () => <ChatThread messages={sampleMessages} />,
};

export const SingleMessage: Story = {
  render: () => (
    <ChatThread
      messages={[
        {
          id: "1",
          role: "user",
          text: "Quick question about our launch timeline.",
        },
      ]}
    />
  ),
};
