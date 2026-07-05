import { useCallback, useState } from "react";
import {
  Keyboard,
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Link } from "expo-router";
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

import { AppHeader } from "../app-header";
import { DesktopAppHeader } from "../app-header/app-header-desktop";
import {
  ChatThread,
  ChatThreadBottomOffsetProvider,
} from "../chat-thread/chat-thread";
import { HeroPrompt } from "../hero-prompt";
import { InputDock } from "../input-dock";
import { ScreenBackground } from "../screen-background";
import { DESKTOP_CHAT_MAX_WIDTH, DESKTOP_INPUT_DOCK_MAX_WIDTH } from "../../../constants/layout.web";
import { colors } from "../../../constants/tokens";
import type { AgentId } from "../../../types/chat";
import type { Message } from "../../../types/chat";

const DEFAULT_INPUT_DOCK_HEIGHT = 120;

export type ChatMainPanelProps = {
  messages: Message[];
  inputText: string;
  setInputText: (text: string) => void;
  isEmpty: boolean;
  activeAgents: AgentId[];
  layout: "mobile" | "desktop";
  contentMaxWidth?: number;
  onOpenHistory: () => void;
  onNewChat: () => void;
  onOpenAgentSheet: () => void;
  onSendMessage: () => void;
};

export function ChatMainPanel({
  messages,
  inputText,
  setInputText,
  isEmpty,
  activeAgents,
  layout,
  contentMaxWidth,
  onOpenHistory,
  onNewChat,
  onOpenAgentSheet,
  onSendMessage,
}: ChatMainPanelProps) {
  const insets = useSafeAreaInsets();
  const isKeyboardVisible = useKeyboardState((state) => state.isVisible);
  const [inputDockHeight, setInputDockHeight] = useState(DEFAULT_INPUT_DOCK_HEIGHT);

  const hideEmptyChatChrome = isEmpty && isKeyboardVisible;
  const scrollBottomOffset = inputDockHeight;
  const isDesktop = layout === "desktop";

  const handleInputDockLayout = useCallback((event: LayoutChangeEvent) => {
    setInputDockHeight(event.nativeEvent.layout.height);
  }, []);

  const handleStartVoiceInput = useCallback(() => {}, []);
  const handleStopVoiceInput = useCallback(() => {}, []);

  return (
    <ScreenBackground>
      <View
        style={[
          styles.screen,
          { paddingTop: insets.top },
          isDesktop && styles.screenDesktop,
        ]}
      >
        <View
          style={[
            styles.column,
            isDesktop
              ? styles.columnDesktop
              : contentMaxWidth != null && {
                  maxWidth: contentMaxWidth,
                  alignSelf: "center",
                  width: "100%",
                },
          ]}
        >
          {isDesktop ? (
            <DesktopAppHeader
              onOpenHistory={onOpenHistory}
              onNewChat={onNewChat}
            />
          ) : (
            <AppHeader onOpenHistory={onOpenHistory} onNewChat={onNewChat} />
          )}

          {__DEV__ ? (
            <Link href="/storybook" style={styles.storybookLink}>
              <Text style={styles.storybookLinkText}>Storybook</Text>
            </Link>
          ) : null}

          <View style={[styles.content, { paddingBottom: inputDockHeight }]}>
            {isEmpty ? (
              <Pressable
                style={styles.flex}
                onPress={Keyboard.dismiss}
                accessible={false}
              >
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
              </Pressable>
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

          <KeyboardStickyView
            style={[styles.inputDockSticky, isDesktop && styles.inputDockStickyDesktop]}
          >
            <View
              onLayout={handleInputDockLayout}
              style={[
                isDesktop && styles.inputDockDesktop,
                { paddingBottom: isKeyboardVisible ? 0 : insets.bottom },
              ]}
            >
              <InputDock
                value={inputText}
                onChangeText={setInputText}
                onSubmit={onSendMessage}
                activeAgents={activeAgents}
                onOpenAgentSheet={onOpenAgentSheet}
                onStartVoiceInput={handleStartVoiceInput}
                onStopVoiceInput={handleStopVoiceInput}
              />
            </View>
          </KeyboardStickyView>
        </View>
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    position: "relative",
  },
  screenDesktop: {
    alignItems: "center",
  },
  column: {
    flex: 1,
  },
  columnDesktop: {
    width: "100%",
    maxWidth: DESKTOP_CHAT_MAX_WIDTH,
    position: "relative",
  },
  flex: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  inputDockSticky: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  inputDockStickyDesktop: {
    alignItems: "center",
  },
  inputDockDesktop: {
    width: "100%",
    maxWidth: DESKTOP_INPUT_DOCK_MAX_WIDTH,
  },
  heroContent: {
    justifyContent: "center",
  },
  heroWrap: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
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
