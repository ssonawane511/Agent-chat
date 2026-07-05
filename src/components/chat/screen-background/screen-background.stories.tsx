import type { Meta, StoryObj } from "@storybook/react-native";
import { Text } from "react-native";

import { ScreenBackground } from "./screen-background";

const meta = {
  title: "Chat/ScreenBackground",
  component: ScreenBackground,
} satisfies Meta<typeof ScreenBackground>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ScreenBackground>
      <Text style={{ textAlign: "center", fontSize: 16, color: "#1A1A1A" }}>
        Content on gradient background
      </Text>
    </ScreenBackground>
  ),
};
