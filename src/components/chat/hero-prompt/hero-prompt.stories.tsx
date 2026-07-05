import type { Meta, StoryObj } from "@storybook/react-native";

import { HeroPrompt } from "./hero-prompt";

const meta = {
  title: "Chat/HeroPrompt",
  component: HeroPrompt,
} satisfies Meta<typeof HeroPrompt>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
