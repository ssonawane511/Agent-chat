import type { ReactNode } from "react";
import { Text } from "react-native";

import { styles } from "./markdown-document.styles";

export type Block =
  | { type: "heading"; level: number; text: string }
  | { type: "list-item"; text: string }
  | { type: "paragraph"; text: string };

export function parseBlocks(markdown: string): Block[] {
  const lines = markdown.split("\n");
  const blocks: Block[] = [];
  let paragraphBuffer: string[] = [];

  const flushParagraph = () => {
    if (paragraphBuffer.length === 0) return;
    blocks.push({ type: "paragraph", text: paragraphBuffer.join(" ") });
    paragraphBuffer = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flushParagraph();
      continue;
    }

    const heading = trimmed.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      blocks.push({ type: "heading", level: heading[1].length, text: heading[2] });
      continue;
    }

    const listItem = trimmed.match(/^[-*•]\s+(.+)$/);
    if (listItem) {
      flushParagraph();
      blocks.push({ type: "list-item", text: listItem[1] });
      continue;
    }

    paragraphBuffer.push(trimmed);
  }

  flushParagraph();
  return blocks;
}

export function renderInline(text: string, keyPrefix: string) {
  const pattern = /(\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`)/g;
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let index = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (match[2]) {
      nodes.push(
        <Text key={`${keyPrefix}-b-${index++}`} style={styles.strong}>
          {match[2]}
        </Text>,
      );
    } else if (match[3]) {
      nodes.push(
        <Text key={`${keyPrefix}-i-${index++}`} style={styles.em}>
          {match[3]}
        </Text>,
      );
    } else if (match[4]) {
      nodes.push(
        <Text key={`${keyPrefix}-c-${index++}`} style={styles.code}>
          {match[4]}
        </Text>,
      );
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}
