import type { ChatSession } from "../../../types/chat";

export function getDrawerWidth(screenWidth: number): number {
  return Math.min(screenWidth * 0.78, 320);
}

export const PUSH_DRAWER_INSETS = {
  vertical: 12,
  horizontal: 12,
} as const;

export function sortSessionsByRecent(sessions: ChatSession[]): ChatSession[] {
  return [...sessions].sort((a, b) => b.updatedAt - a.updatedAt);
}
