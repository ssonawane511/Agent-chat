import { useCallback, useState } from "react";
import {
  Keyboard,
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { Link } from "expo-router";
import { GestureDetector } from "react-native-gesture-handler";
import Animated, {
  FadeIn,
  FadeInRight,
  FadeOut,
  FadeOutLeft,
} from "react-native-reanimated";
import {
  KeyboardStickyView,
  useKeyboardState,
} from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppHeader } from "../components/chat/app-header";
import { AgentSelectorSheet } from "../components/chat/agent-selector-sheet";
import { ChatHistoryDrawer } from "../components/chat/chat-history-drawer/chat-history-drawer";
import { getDrawerWidth, PUSH_DRAWER_INSETS } from "../components/chat/chat-history-drawer/chat-history-drawer.utils";
import {
  ChatThread,
  ChatThreadBottomOffsetProvider,
} from "../components/chat/chat-thread/chat-thread";
import { HeroPrompt } from "../components/chat/hero-prompt";
import { InputDock } from "../components/chat/input-dock";
import { ScreenBackground } from "../components/chat/screen-background";
import { usePushDrawer } from "../hooks/use-push-drawer";
import { useTeamChat } from "../hooks/use-team-chat";
import { colors, radius, shadowMd } from "../constants/tokens";

const DEFAULT_INPUT_DOCK_HEIGHT = 120;

export default function Index() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const drawerWidth = getDrawerWidth(width);
  const isKeyboardVisible = useKeyboardState((state) => state.isVisible);
  const [inputDockHeight, setInputDockHeight] = useState(DEFAULT_INPUT_DOCK_HEIGHT);

  const {
    messages,
    inputText,
    setInputText,
    isEmpty,
    activeSessionId,
    activeAgents,
    previousChats,
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

  const hideEmptyChatChrome = isEmpty && isKeyboardVisible;

  const scrollBottomOffset = inputDockHeight;

  const handleInputDockLayout = useCallback((event: LayoutChangeEvent) => {
    setInputDockHeight(event.nativeEvent.layout.height);
  }, []);

  const handleStartVoiceInput = useCallback(() => {}, []);

  const handleStopVoiceInput = useCallback(() => {}, []);

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
        <ScreenBackground>
          <View style={[styles.flex, { paddingTop: insets.top }]}>
            <Pressable
              style={styles.flex}
              onPress={Keyboard.dismiss}
              accessible={false}
            >
              <AppHeader onOpenHistory={openHistory} onNewChat={startNewChat} />

              {__DEV__ ? (
                <Link href="/storybook" style={styles.storybookLink}>
                  <Text style={styles.storybookLinkText}>Storybook</Text>
                </Link>
              ) : null}

              <View style={styles.content}>
              {isEmpty ? (
                <Animated.View
                  key="hero"
                  entering={FadeIn.duration(260)}
                  exiting={FadeOutLeft.duration(220)}
                  style={styles.flex}
                >
                  <View style={[styles.flex, styles.heroContent]}>
                    {!hideEmptyChatChrome ? (
                      <Animated.View
                        entering={FadeIn.duration(180)}
                        exiting={FadeOut.duration(140)}
                        style={styles.heroWrap}
                      >
                        <HeroPrompt />
                      </Animated.View>
                    ) : null}
                  </View>
                </Animated.View>
              ) : (
                <Animated.View
                  key="chat"
                  entering={FadeInRight.duration(280)}
                  style={styles.flex}
                >
                  <ChatThreadBottomOffsetProvider value={scrollBottomOffset}>
                    <ChatThread messages={messages} />
                  </ChatThreadBottomOffsetProvider>
                </Animated.View>
              )}
              </View>
            </Pressable>

            <KeyboardStickyView>
              <View
                style={{
                  paddingBottom: isKeyboardVisible ? 0 : insets.bottom,
                }}
              >
                <View onLayout={handleInputDockLayout}>
                  <InputDock
                    value={inputText}
                    onChangeText={setInputText}
                    onSubmit={sendMessage}
                    activeAgents={activeAgents}
                    onOpenAgentSheet={openAgentSheet}
                    onStartVoiceInput={handleStartVoiceInput}
                    onStopVoiceInput={handleStopVoiceInput}
                  />
                </View>
              </View>
            </KeyboardStickyView>
          </View>
        </ScreenBackground>

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
  },
  mainLayer: {
    flex: 1,
    width: "100%",
    overflow: "hidden",
  },
  mainLayerPushed: {
    ...shadowMd(),
  },
  mainLayerDismiss: {
    ...StyleSheet.absoluteFill,
    zIndex: 10,
  },
  flex: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  heroContent: {
    justifyContent: "center",
  },
  heroWrap: {
    width: "100%",
  },
  storybookLink: {
    alignSelf: "flex-end",
    marginRight: 16,
    marginBottom: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: colors.brandPurpleLight,
  },
  storybookLinkText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.brandPurpleText,
  },
});
