import type { Meta, StoryObj } from "@storybook/react-native";

import { MicIcon } from "./components/mic-icon";

const meta = {
  title: "Chat/MicIcon",
  component: MicIcon,
  argTypes: {
    recording: { control: "boolean" },
  },
} satisfies Meta<typeof MicIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Idle: Story = {
  args: {
    recording: false,
  },
};

export const Recording: Story = {
  args: {
    recording: true,
  },
};
