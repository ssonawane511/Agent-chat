import { IconSlot } from "../../ui/icon-slot.web";
import { MaterialIcon } from "../../ui/material-icon.web";
import { useCallback, useMemo, useState } from "react";
import { Pressable, ScrollView, Text, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, spacing } from "../../../constants/tokens";
import { useTeamChat } from "../../../hooks/use-team-chat";
import type { ChatSession } from "../../../types/chat";

import { styles } from "./chat-history-drawer.styles";
import { getDrawerWidth, sortSessionsByRecent } from "./chat-history-drawer.utils";

export type ChatHistoryDrawerProps = {
  sessions: ChatSession[];
  activeSessionId: string;
  onSelectChat: (sessionId: string) => void;
};

type ChatRowProps = {
  session: ChatSession;
  isActive: boolean;
  isMenuOpen: boolean;
  onPress: (sessionId: string) => void;
  onLongPress: (sessionId: string) => void;
  onDelete: (sessionId: string) => void;
};

function ChatRow({
  session,
  isActive,
  isMenuOpen,
  onPress,
  onLongPress,
  onDelete,
}: ChatRowProps) {
  return (
    <View style={styles.chatRowWrap}>
      <Pressable
        onPress={() => onPress(session.id)}
        onLongPress={() => onLongPress(session.id)}
        delayLongPress={400}
        style={({ pressed }) => [
          styles.chatRow,
          pressed && styles.chatRowPressed,
        ]}
        accessibilityRole="button"
        accessibilityLabel={`Open chat: ${session.title}`}
        accessibilityState={{ selected: isActive }}
        testID={`chat-session-${session.id}`}
      >
        <Text
          style={[styles.chatTitle, isActive && styles.chatTitleActive]}
          numberOfLines={1}
        >
          {session.title}
        </Text>
      </Pressable>

      {isMenuOpen ? (
        <View style={styles.rowTooltip}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Delete ${session.title}`}
            onPress={() => onDelete(session.id)}
            style={({ pressed }) => [
              pressed && styles.rowTooltipPressed,
            ]}
          >
            <Text style={styles.rowTooltipLabel}>Delete</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}

export function ChatHistoryDrawer({
  sessions,
  activeSessionId,
  onSelectChat,
}: ChatHistoryDrawerProps) {
  const { deleteChat } = useTeamChat();
  const insets = useSafeAreaInsets();
  const { width: screenWidth } = useWindowDimensions();
  const width = getDrawerWidth(screenWidth);
  const [openMenuSessionId, setOpenMenuSessionId] = useState<string | null>(
    null,
  );

  const sortedSessions = useMemo(
    () => sortSessionsByRecent(sessions),
    [sessions],
  );

  const handleSelectChat = useCallback(
    (sessionId: string) => {
      if (openMenuSessionId === sessionId) {
        setOpenMenuSessionId(null);
        return;
      }

      setOpenMenuSessionId(null);
      onSelectChat(sessionId);
    },
    [onSelectChat, openMenuSessionId],
  );

  const handleOpenMenu = useCallback((sessionId: string) => {
    setOpenMenuSessionId(sessionId);
  }, []);

  const handleDeleteChat = useCallback(
    (sessionId: string) => {
      setOpenMenuSessionId(null);
      deleteChat(sessionId);
    },
    [deleteChat],
  );

  const handleCloseMenu = useCallback(() => {
    setOpenMenuSessionId(null);
  }, []);

  const hasSessions = sortedSessions.length > 0;

  return (
    <>
      <View style={styles.backdrop} pointerEvents="none" />
      <View
        style={[
          styles.panel,
          {
            width,
            paddingTop: insets.top + spacing.lg,
            paddingBottom: insets.bottom + spacing.lg,
          },
        ]}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          onScrollBeginDrag={handleCloseMenu}
        >
          <View style={styles.navRow}>
            <View style={styles.navIcon} accessibilityElementsHidden importantForAccessibility="no">
              <IconSlot>
                <MaterialIcon
                  name="synthesis"
                  size={20}
                  color={colors.textPrimary}
                />
              </IconSlot>
            </View>
            <Text style={styles.navLabel} accessibilityRole="header">
              Recent Chats
            </Text>
          </View>

          {hasSessions ? (
            <View style={styles.chatList}>
              {sortedSessions.map((session) => (
                <ChatRow
                  key={session.id}
                  session={session}
                  isActive={session.id === activeSessionId}
                  isMenuOpen={session.id === openMenuSessionId}
                  onPress={handleSelectChat}
                  onLongPress={handleOpenMenu}
                  onDelete={handleDeleteChat}
                />
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyBody}>
                Start a conversation and it will appear here.
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </>
  );
}
