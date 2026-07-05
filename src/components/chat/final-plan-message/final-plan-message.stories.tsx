import type { Meta, StoryObj } from "@storybook/react-native";

import { FinalPlanMessage } from "./final-plan-message";

const samplePlan = `Final Plan

## Overview
Launch an AI team chat experience with strategist, designer, and writer agents.

## Phase 1 — Awareness
- Publish teaser on social channels
- Run a waitlist landing page

## Phase 2 — Activation
- Onboarding flow with hero prompt
- Agent selector for tailored responses

## Phase 3 — Retention
- Saved chat history
- Final plan export`;

const meta = {
  title: "Chat/FinalPlanMessage",
  component: FinalPlanMessage,
  argTypes: {
    text: { control: "text" },
    index: { control: "number" },
  },
} satisfies Meta<typeof FinalPlanMessage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: samplePlan,
    index: 0,
  },
};
