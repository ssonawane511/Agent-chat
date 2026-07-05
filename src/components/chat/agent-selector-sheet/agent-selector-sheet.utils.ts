import {
  ActionSheetIOS,
  Alert,
  Platform,
} from "react-native";

import { AGENT_LIST } from "../../../constants/agents";
import type { AgentId } from "../../../types/chat";

export function getActiveAgentsLabel(activeAgents: AgentId[]): string {
  if (activeAgents.length === AGENT_LIST.length) return "Active all agents";
  if (activeAgents.length === 1) {
    const agent = AGENT_LIST.find((item) => item.id === activeAgents[0]);
    return agent ? `Active ${agent.label}` : "Active 1 agent";
  }
  return `Active ${activeAgents.length} agents`;
}

export function getSelectionSummary(activeAgents: AgentId[]): string {
  if (activeAgents.length === AGENT_LIST.length) return "Full team will respond";
  if (activeAgents.length === 1) {
    const agent = AGENT_LIST.find((item) => item.id === activeAgents[0]);
    return agent ? `${agent.label} only` : "1 agent selected";
  }
  const labels = AGENT_LIST.filter((agent) => activeAgents.includes(agent.id)).map(
    (agent) => agent.label,
  );
  return labels.join(" · ");
}

export function showAttachmentOptions() {
  const options = ["Add photo", "Add document", "Cancel"];
  const cancelIndex = 2;

  if (Platform.OS === "ios") {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex: cancelIndex,
        title: "Add to chat",
      },
      (index) => {
        if (index === 0 || index === 1) {
          Alert.alert("Coming soon", "Attachments will be available in a future update.");
        }
      },
    );
    return;
  }

  Alert.alert("Add to chat", "Choose an attachment type", [
    { text: "Add photo", onPress: () => Alert.alert("Coming soon", "Photo uploads are not available yet.") },
    { text: "Add document", onPress: () => Alert.alert("Coming soon", "Document uploads are not available yet.") },
    { text: "Cancel", style: "cancel" },
  ]);
}
