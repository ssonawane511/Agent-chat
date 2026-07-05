import { Icon } from "@expo/ui";

export const ICONS = {
  menu: Icon.select({
    ios: "line.3.horizontal",
    android: require("@expo/material-symbols/menu.xml"),
  }),
  compose: Icon.select({
    ios: "square.and.pencil",
    android: require("@expo/material-symbols/edit_square.xml"),
  }),
  sparkles: Icon.select({
    ios: "sparkles",
    android: require("@expo/material-symbols/wand_stars.xml"),
  }),
  groupThinking: Icon.select({
    ios: "bubble.left.and.bubble.right.fill",
    android: require("@expo/material-symbols/forum.xml"),
  }),
  bolt: Icon.select({
    ios: "bolt.fill",
    android: require("@expo/material-symbols/bolt.xml"),
  }),
  search: Icon.select({
    ios: "magnifyingglass",
    android: require("@expo/material-symbols/search.xml"),
  }),
  mic: Icon.select({
    ios: "mic.fill",
    android: require("@expo/material-symbols/mic.xml"),
  }),
  plus: Icon.select({
    ios: "plus",
    android: require("@expo/material-symbols/add.xml"),
  }),
  send: Icon.select({
    ios: "arrow.up",
    android: require("@expo/material-symbols/arrow_upward.xml"),
  }),
  chevronDown: Icon.select({
    ios: "chevron.down",
    android: require("@expo/material-symbols/keyboard_arrow_down.xml"),
  }),
  chevronUp: Icon.select({
    ios: "chevron.up",
    android: require("@expo/material-symbols/keyboard_arrow_up.xml"),
  }),
  close: Icon.select({
    ios: "xmark",
    android: require("@expo/material-symbols/close.xml"),
  }),
  strategist: Icon.select({
    ios: "brain.head.profile",
    android: require("@expo/material-symbols/psychology.xml"),
  }),
  designer: Icon.select({
    ios: "theatermasks.fill",
    android: require("@expo/material-symbols/theater_comedy.xml"),
  }),
  writer: Icon.select({
    ios: "pencil.line",
    android: require("@expo/material-symbols/edit.xml"),
  }),
  synthesis: Icon.select({
    ios: "doc.text.fill",
    android: require("@expo/material-symbols/description.xml"),
  }),
  checkmark: Icon.select({
    ios: "checkmark",
    android: require("@expo/material-symbols/check.xml"),
  }),
} as const;
