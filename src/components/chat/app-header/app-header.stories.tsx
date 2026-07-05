import { action } from "storybook/actions";
import type { Meta, StoryObj } from "@storybook/react-native";

import { AppHeader } from "./app-header";

const meta = {
  title: "Chat/AppHeader",
  component: AppHeader,
} satisfies Meta<typeof AppHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onOpenHistory: action("onOpenHistory"),
    onNewChat: action("onNewChat"),
  },
};
