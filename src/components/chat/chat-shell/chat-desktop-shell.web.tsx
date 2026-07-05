import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import {
  DESKTOP_PANEL_INSETS,
  DESKTOP_SIDEBAR_WIDTH,
} from "../../../constants/layout.web";
import { useTeamChat } from "../../../hooks/use-team-chat";
import { colors, radius, shadowMd } from "../../../constants/tokens";
import { AgentSelectorSheet } from "../agent-selector-sheet";
import { ChatHistorySidebar } from "../chat-history-sidebar/chat-history-sidebar.web";
import { ChatMainPanel } from "./chat-main-panel.web";

const OPEN_DURATION = 280;
const CLOSE_DURATION = 240;

/** Desktop-web layout — collapsible sidebar + inset chat card when open. */
export function ChatDesktopWebShell() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const sidebarProgress = useSharedValue(1);

  const {
    messages,
    inputText,
    setInputText,
    isEmpty,
    activeAgents,
    previousChats,
    activeSessionId,
    isAgentSheetOpen,
    startNewChat,
    openAgentSheet,
    closeAgentSheet,
    toggleAllAgents,
    toggleAgent,
    loadChat,
    sendMessage,
  } = useTeamChat();

  useEffect(() => {
    sidebarProgress.value = withTiming(isSidebarOpen ? 1 : 0, {
      duration: isSidebarOpen ? OPEN_DURATION : CLOSE_DURATION,
    });
  }, [isSidebarOpen, sidebarProgress]);

  const handleToggleSidebar = useCallback(() => {
    setIsSidebarOpen((open) => !open);
  }, []);

  const sidebarStyle = useAnimatedStyle(() => ({
    width: interpolate(sidebarProgress.value, [0, 1], [0, DESKTOP_SIDEBAR_WIDTH]),
    opacity: interpolate(sidebarProgress.value, [0, 0.35, 1], [0, 1, 1]),
  }));

  const mainPanelStyle = useAnimatedStyle(() => {
    const insetY = DESKTOP_PANEL_INSETS.vertical;
    const insetX = DESKTOP_PANEL_INSETS.horizontal;

    return {
      marginTop: interpolate(sidebarProgress.value, [0, 1], [0, insetY]),
      marginBottom: interpolate(sidebarProgress.value, [0, 1], [0, insetY]),
      marginRight: interpolate(sidebarProgress.value, [0, 1], [0, insetX]),
      borderRadius: interpolate(sidebarProgress.value, [0, 1], [0, radius.xl]),
      borderWidth: interpolate(sidebarProgress.value, [0, 1], [0, 1]),
      borderColor: colors.border,
    };
  });

  return (
    <View style={styles.rootShell}>
      <Animated.View style={[styles.sidebarSlot, sidebarStyle]}>
        <ChatHistorySidebar
          sessions={previousChats}
          activeSessionId={activeSessionId}
          onSelectChat={loadChat}
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.mainArea,
          isSidebarOpen && styles.mainAreaCard,
          mainPanelStyle,
        ]}
      >
        <ChatMainPanel
          layout="desktop"
          messages={messages}
          inputText={inputText}
          setInputText={setInputText}
          isEmpty={isEmpty}
          activeAgents={activeAgents}
          onOpenHistory={handleToggleSidebar}
          onNewChat={startNewChat}
          onOpenAgentSheet={openAgentSheet}
          onSendMessage={sendMessage}
        />
      </Animated.View>

      <AgentSelectorSheet
        visible={isAgentSheetOpen}
        activeAgents={activeAgents}
        onClose={closeAgentSheet}
        onToggleAll={toggleAllAgents}
        onToggleAgent={toggleAgent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rootShell: {
    flex: 1,
    flexDirection: "row",
    overflow: "hidden",
    backgroundColor: colors.surface0,
    minHeight: "100%",
  },
  sidebarSlot: {
    flexShrink: 0,
    overflow: "hidden",
  },
  mainArea: {
    flex: 1,
    overflow: "hidden",
    backgroundColor: colors.bgPrimary,
  },
  mainAreaCard: {
    ...shadowMd(),
    boxShadow: "0 4px 14px rgba(17, 24, 39, 0.06)",
  },
});
