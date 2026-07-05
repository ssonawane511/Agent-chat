import { action } from "storybook/actions";
import type { Meta, StoryObj } from "@storybook/react-native";

import type { ChatSession } from "../../../types/chat";
import { ChatHistoryDrawer } from "./chat-history-drawer";

const sampleSessions: ChatSession[] = [
  {
    id: "session-1",
    title: "Product launch plan",
    updatedAt: Date.now() - 1000 * 60 * 5,
    messages: [],
  },
  {
    id: "session-2",
    title: "Homepage copy refresh",
    updatedAt: Date.now() - 1000 * 60 * 60 * 3,
    messages: [],
    starred: true,
  },
  {
    id: "session-3",
    title: "Q3 campaign ideas",
    updatedAt: Date.now() - 1000 * 60 * 60 * 24,
    messages: [],
  },
];

const meta = {
  title: "Chat/ChatHistoryDrawer",
  component: ChatHistoryDrawer,
} satisfies Meta<typeof ChatHistoryDrawer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ChatHistoryDrawer
      sessions={sampleSessions}
      activeSessionId="session-1"
      onSelectChat={action("onSelectChat")}
    />
  ),
};

export const Empty: Story = {
  render: () => (
    <ChatHistoryDrawer
      sessions={[]}
      activeSessionId=""
      onSelectChat={action("onSelectChat")}
    />
  ),
};
