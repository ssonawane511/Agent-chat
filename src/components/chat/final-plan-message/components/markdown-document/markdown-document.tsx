import { Text, View, type ViewStyle } from "react-native";

import { colors } from "../../../../../constants/tokens";

import { styles } from "./markdown-document.styles";
import { parseBlocks, renderInline } from "./markdown-document.utils";

type MarkdownDocumentProps = {
  markdown: string;
  accentColor?: string;
  style?: ViewStyle;
  /** Render without the card chrome — for use inside the full-screen drawer. */
  embedded?: boolean;
  /** Show only the first N blocks, with an ellipsis when truncated. */
  previewMaxItems?: number;
};

function InlineText({
  text,
  style,
  numberOfLines,
}: {
  text: string;
  style?: object;
  numberOfLines?: number;
}) {
  return (
    <Text
      style={[styles.body, style]}
      numberOfLines={numberOfLines}
      ellipsizeMode="tail"
    >
      {renderInline(text, "inline")}
    </Text>
  );
}

function MarkdownBody({
  markdown,
  previewMaxItems,
}: {
  markdown: string;
  previewMaxItems?: number;
}) {
  const blocks = parseBlocks(markdown);
  const truncated =
    previewMaxItems != null && blocks.length > previewMaxItems;
  const visibleBlocks =
    previewMaxItems != null ? blocks.slice(0, previewMaxItems) : blocks;

  return (
    <View style={styles.bodyWrap}>
      {visibleBlocks.map((block, index) => {
        switch (block.type) {
          case "heading":
            return (
              <InlineText
                key={index}
                text={block.text}
                style={
                  block.level === 1
                    ? styles.heading1
                    : block.level === 2
                      ? styles.heading2
                      : styles.heading3
                }
              />
            );
          case "list-item":
            return (
              <View key={index} style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <View style={styles.listContent}>
                  <InlineText
                    text={block.text}
                    numberOfLines={
                      previewMaxItems != null && index === visibleBlocks.length - 1
                        ? 3
                        : undefined
                    }
                  />
                </View>
              </View>
            );
          case "paragraph":
            return (
              <InlineText
                key={index}
                text={block.text}
                style={styles.paragraph}
                numberOfLines={
                  previewMaxItems != null && index === visibleBlocks.length - 1
                    ? 3
                    : undefined
                }
              />
            );
        }
      })}
      {truncated ? <Text style={styles.ellipsis}>…</Text> : null}
    </View>
  );
}

export function MarkdownDocument({
  markdown,
  accentColor = colors.synthesizer,
  style,
  embedded = false,
  previewMaxItems,
}: MarkdownDocumentProps) {
  const body = (
    <MarkdownBody markdown={markdown} previewMaxItems={previewMaxItems} />
  );

  if (embedded) {
    return <View style={style}>{body}</View>;
  }

  return (
    <View style={[styles.card, { borderLeftColor: accentColor }, style]}>
      {body}
    </View>
  );
}

export { parseBlocks } from "./markdown-document.utils";
