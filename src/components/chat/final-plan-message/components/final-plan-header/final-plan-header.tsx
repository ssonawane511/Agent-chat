import { Host, Icon } from "@expo/ui";
import { Text, View } from "react-native";

import { ICONS } from "../../../../../constants/icons";
import { colors } from "../../../../../constants/tokens";

import { styles } from "./final-plan-header.styles";

type FinalPlanHeaderProps = {
  iconSize?: number;
  /** Chevron on the right — used in the chat preview card. */
  showChevron?: boolean;
  /** Larger title — used in the full-screen drawer. */
  large?: boolean;
  style?: object;
};

function DocIconBadge({ size }: { size: number }) {
  const iconSize = Math.max(12, Math.round(size * 0.47));

  return (
    <View
      style={[
        styles.iconCircle,
        { width: size, height: size, borderRadius: size / 2 },
      ]}
    >
      <View style={[styles.iconGlyph, { width: iconSize, height: iconSize }]}>
        <Host matchContents>
          <Icon name={ICONS.synthesis} size={iconSize} color="#FFFFFF" />
        </Host>
      </View>
    </View>
  );
}

export function FinalPlanHeader({
  iconSize = 26,
  showChevron = false,
  large = false,
  style,
}: FinalPlanHeaderProps) {
  return (
    <View style={[styles.row, { minHeight: iconSize }, style]}>
      <DocIconBadge size={iconSize} />
      <Text style={[styles.title, large && styles.titleLarge]}>Final Plan</Text>
      {showChevron ? (
        <View style={styles.trailingSlot}>
          <Host matchContents>
            <Icon name={ICONS.chevronUp} size={13} color={colors.textMuted} />
          </Host>
        </View>
      ) : null}
    </View>
  );
}
