import { Host, Icon } from "@expo/ui";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AGENT_LIST } from "../../../constants/agents";
import { ICONS } from "../../../constants/icons";
import { colors, spacing } from "../../../constants/tokens";
import { useSlidePanel } from "../../../hooks/use-slide-panel";
import type { AgentId } from "../../../types/chat";
import { AgentAvatarCluster } from "../agent-avatar-cluster";
import { AgentIcon } from "../agent-icon";
import { SlideModalShell } from "../slide-modal-shell";

import { styles } from "./agent-selector-sheet.styles";
import { getSelectionSummary } from "./agent-selector-sheet.utils";

const SHEET_SLIDE_DISTANCE = 420;

type AgentSelectorSheetProps = {
  visible: boolean;
  activeAgents: AgentId[];
  onClose: () => void;
  onToggleAll: () => void;
  onToggleAgent: (agentId: AgentId) => void;
};

type SelectionRowProps = {
  label: string;
  checked: boolean;
  included?: boolean;
  onPress: () => void;
  agentId?: AgentId;
  showDivider?: boolean;
};

function SelectionRow({
  label,
  checked,
  included = false,
  onPress,
  agentId,
  showDivider = true,
}: SelectionRowProps) {
  return (
    <>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.row,
          checked && styles.rowHighlighted,
          pressed && styles.rowPressed,
        ]}
        accessibilityRole="checkbox"
        accessibilityLabel={label}
        accessibilityState={{ checked }}
      >
        <View style={styles.rowInner} pointerEvents="none">
          <View style={styles.rowLeft}>
            {agentId ? <AgentIcon agentId={agentId} size={28} /> : null}
            <Text
              style={[
                styles.rowLabel,
                included && !checked && styles.rowLabelMuted,
              ]}
            >
              {label}
            </Text>
          </View>

          <View
            style={[
              styles.checkbox,
              checked && styles.checkboxChecked,
              included && !checked && styles.checkboxIncluded,
            ]}
          >
            {checked ? (
              <Host matchContents>
                <Icon name={ICONS.checkmark} size={12} color={colors.surface0} />
              </Host>
            ) : null}
          </View>
        </View>
      </Pressable>
      {showDivider ? <View style={styles.divider} /> : null}
    </>
  );
}

export function AgentSelectorSheet({
  visible,
  activeAgents,
  onClose,
  onToggleAll,
  onToggleAgent,
}: AgentSelectorSheetProps) {
  const insets = useSafeAreaInsets();
  const allActive = activeAgents.length === AGENT_LIST.length;

  const { mounted, backdropStyle, panelStyle } = useSlidePanel({
    visible,
    axis: "bottom",
    distance: SHEET_SLIDE_DISTANCE,
  });

  return (
    <SlideModalShell
      mounted={mounted}
      onClose={onClose}
      backdropStyle={backdropStyle}
      panelStyle={panelStyle}
      panelPosition="bottom"
    >
      <View style={[styles.sheet, { paddingBottom: insets.bottom + spacing.xl }]}>
        <View style={styles.handle} />

        <View style={styles.header}>
          <View style={styles.headerCopy}>
            <Text style={styles.title}>Active agents</Text>
            <Text style={styles.subtitle}>
              Choose who responds to your next message.
            </Text>
          </View>

          <Pressable
            hitSlop={8}
            onPress={onClose}
            style={({ pressed }) => [
              styles.closeButton,
              pressed && styles.closeButtonPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Close"
          >
            <View style={styles.closeButtonInner} pointerEvents="none">
              <Host matchContents>
                <Icon name={ICONS.close} size={16} color={colors.textSecondary} />
              </Host>
            </View>
          </Pressable>
        </View>

        <View style={styles.summaryRow}>
          <AgentAvatarCluster agentIds={activeAgents} />
          <Text style={styles.summaryText}>
            {getSelectionSummary(activeAgents)}
          </Text>
        </View>

        <View style={styles.optionGroup}>
          <SelectionRow
            label="All agents"
            checked={allActive}
            onPress={onToggleAll}
          />

          {AGENT_LIST.map((agent, index) => {
            const isActive = activeAgents.includes(agent.id);
            const isLast = index === AGENT_LIST.length - 1;

            return (
              <SelectionRow
                key={agent.id}
                label={agent.label}
                agentId={agent.id}
                checked={!allActive && isActive}
                included={allActive}
                onPress={() => onToggleAgent(agent.id)}
                showDivider={!isLast}
              />
            );
          })}
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.doneButton,
            pressed && styles.doneButtonPressed,
          ]}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel="Done"
          testID="agent-selector-done"
        >
          <Text style={styles.doneText}>Done</Text>
        </Pressable>
      </View>
    </SlideModalShell>
  );
}

export {
  getActiveAgentsLabel,
  getSelectionSummary,
  showAttachmentOptions,
} from "./agent-selector-sheet.utils";
export { MicIcon } from "./components/mic-icon";
