import { Host, Icon } from "@expo/ui";
import { Pressable, ScrollView, View, useWindowDimensions } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ICONS } from "../../../../../constants/icons";
import { colors, spacing } from "../../../../../constants/tokens";
import { useSlidePanel } from "../../../../../hooks/use-slide-panel";
import { SlideModalShell } from "../../../slide-modal-shell";
import { FinalPlanHeader } from "../final-plan-header";
import { MarkdownDocument } from "../markdown-document";

import { styles } from "./final-plan-drawer.styles";

type FinalPlanDrawerProps = {
  visible: boolean;
  markdown: string;
  onClose: () => void;
};

export function FinalPlanDrawer({ visible, markdown, onClose }: FinalPlanDrawerProps) {
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const sheetHeight = height - insets.top - spacing.sm;

  const { mounted, backdropStyle, panelStyle, dismissGesture } = useSlidePanel({
    visible,
    axis: "bottom",
    distance: sheetHeight,
    onClose,
    dismissGestureEnabled: true,
  });

  const dragHeader = (
    <Animated.View style={styles.dragZone} collapsable={false}>
      <View style={styles.handleHitArea}>
        <View style={styles.handle} />
      </View>

      <View style={styles.header}>
        <FinalPlanHeader iconSize={30} large style={styles.headerTitle} />
        <Pressable
          hitSlop={8}
          onPress={onClose}
          style={styles.closeButton}
          accessibilityRole="button"
          accessibilityLabel="Close final plan"
          testID="close-final-plan"
        >
          <Host matchContents>
            <Icon name={ICONS.close} size={18} color={colors.textSecondary} />
          </Host>
        </Pressable>
      </View>
    </Animated.View>
  );

  return (
    <SlideModalShell
      mounted={mounted}
      onClose={onClose}
      backdropStyle={backdropStyle}
      panelStyle={panelStyle}
      panelPosition="bottom"
    >
      <View style={[styles.sheet, { height: sheetHeight, paddingBottom: insets.bottom }]}>
        {dismissGesture ? (
          <GestureDetector gesture={dismissGesture}>{dragHeader}</GestureDetector>
        ) : (
          dragHeader
        )}

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <MarkdownDocument markdown={markdown} embedded />
        </ScrollView>
      </View>
    </SlideModalShell>
  );
}
