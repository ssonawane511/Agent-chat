import type { AndroidSymbol } from "expo-symbols";

/** Material Symbol names for web — mirrors `ICONS` keys in icons.ts. */
export const MATERIAL_ICONS = {
  menu: "menu",
  compose: "edit_square",
  sparkles: "wand_stars",
  groupThinking: "forum",
  bolt: "bolt",
  search: "search",
  mic: "mic",
  plus: "add",
  send: "arrow_upward",
  chevronDown: "keyboard_arrow_down",
  chevronUp: "keyboard_arrow_up",
  close: "close",
  strategist: "psychology",
  designer: "theater_comedy",
  writer: "edit",
  synthesis: "description",
  checkmark: "check",
  moreHorizontal: "more_horiz",
} as const satisfies Record<string, AndroidSymbol>;

export type MaterialIconName = keyof typeof MATERIAL_ICONS;
