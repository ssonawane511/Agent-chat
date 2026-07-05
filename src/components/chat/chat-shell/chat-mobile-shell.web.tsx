import { useCallback } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

import { usePushDrawer } from "../../../hooks/use-push-drawer";
import { useTeamChat } from "../../../hooks/use-team-chat";
import { colors, radius, shadowMd } from "../../../constants/tokens";
import { AgentSelectorSheet } from "../agent-selector-sheet";
import { ChatHistoryDrawer } from "../chat-history-drawer";
import {
  getDrawerWidth,
  PUSH_DRAWER_INSETS,
} from "../chat-history-drawer/chat-history-drawer.utils";
import { ChatMainPanel } from "./chat-main-panel.web";

/** Mobile-web layout — same push-drawer UX as native. */
export function ChatMobileWebShell() {
  const { width } = useWindowDimensions();
  const drawerWidth = getDrawerWidth(width);

  const {
    messages,
    inputText,
    setInputText,
    isEmpty,
    activeAgents,
    previousChats,
    activeSessionId,
    isHistoryOpen,
    isAgentSheetOpen,
    openHistory,
    closeHistory,
    openAgentSheet,
    closeAgentSheet,
    toggleAllAgents,
    toggleAgent,
    loadChat,
    startNewChat,
    sendMessage,
  } = useTeamChat();

  const handleHistoryOpenChange = useCallback(
    (open: boolean) => {
      if (open) {
        openHistory();
      } else {
        closeHistory();
      }
    },
    [closeHistory, openHistory],
  );

  const { contentStyle, panGesture } = usePushDrawer({
    open: isHistoryOpen,
    offset: drawerWidth,
    onOpenChange: handleHistoryOpenChange,
    enabled: !isAgentSheetOpen,
    verticalInset: PUSH_DRAWER_INSETS.vertical,
    horizontalInset: PUSH_DRAWER_INSETS.horizontal,
    borderRadius: radius.xl,
  });

  return (
    <View style={styles.rootShell}>
      <ChatHistoryDrawer
        sessions={previousChats}
        activeSessionId={activeSessionId}
        onSelectChat={loadChat}
      />

      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[
            styles.mainLayer,
            isHistoryOpen && styles.mainLayerPushed,
            contentStyle,
          ]}
        >
          <ChatMainPanel
            layout="mobile"
            messages={messages}
            inputText={inputText}
            setInputText={setInputText}
            isEmpty={isEmpty}
            activeAgents={activeAgents}
            onOpenHistory={openHistory}
            onNewChat={startNewChat}
            onOpenAgentSheet={openAgentSheet}
            onSendMessage={sendMessage}
          />

          {isHistoryOpen ? (
            <View
              style={styles.mainLayerDismiss}
              accessibilityRole="button"
              accessibilityLabel="Close chat history"
              importantForAccessibility="yes"
            />
          ) : null}
        </Animated.View>
      </GestureDetector>

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
    overflow: "hidden",
    backgroundColor: colors.surface0,
    minHeight: "100%",
  },
  mainLayer: {
    flex: 1,
    width: "100%",
    overflow: "hidden",
  },
  mainLayerPushed: {
    ...shadowMd(),
    boxShadow: "0 4px 14px rgba(17, 24, 39, 0.06)",
    borderWidth: 1,
    borderColor: colors.border,
  },
  mainLayerDismiss: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
  },
});
