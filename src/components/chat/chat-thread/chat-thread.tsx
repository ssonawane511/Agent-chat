import { createContext, useContext, useEffect, useRef, type ReactNode } from "react";
import {
  KeyboardAwareScrollView,
  type KeyboardAwareScrollViewRef,
} from "react-native-keyboard-controller";

import { spacing } from "../../../constants/tokens";
import type { Message } from "../../../types/chat";
import { AgentMessageBubble } from "../agent-message";
import { UserMessageBubble } from "../user-message";

import { styles } from "./chat-thread.styles";

const ChatThreadBottomOffsetContext = createContext(0);

export function ChatThreadBottomOffsetProvider({
  value,
  children,
}: {
  value: number;
  children: ReactNode;
}) {
  return (
    <ChatThreadBottomOffsetContext.Provider value={value}>
      {children}
    </ChatThreadBottomOffsetContext.Provider>
  );
}

export type ChatThreadProps = {
  messages: Message[];
};

export function ChatThread({ messages }: ChatThreadProps) {
  const bottomOffset = useContext(ChatThreadBottomOffsetContext);
  const scrollRef = useRef<KeyboardAwareScrollViewRef>(null);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <KeyboardAwareScrollView
      ref={scrollRef}
      style={styles.scroll}
      contentContainerStyle={[
        styles.content,
        { paddingBottom: spacing.xxl + bottomOffset },
      ]}
      bottomOffset={bottomOffset}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="interactive"
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}
      accessibilityLabel="Chat messages"
      accessibilityRole="list"
    >
      {messages.map((message, index) => {
        switch (message.role) {
          case "user":
            return (
              <UserMessageBubble
                key={message.id}
                text={message.text}
                index={index}
              />
            );
          case "agent":
            return (
              <AgentMessageBubble
                key={message.id}
                agentId={message.agentId}
                text={message.text}
                index={index}
              />
            );
        }
      })}
    </KeyboardAwareScrollView>
  );
}
