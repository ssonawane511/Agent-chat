import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";

import { TeamChatProvider } from "../context/team-chat-context";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardProvider>
        <TeamChatProvider>
          <StatusBar style="dark" />
          <Stack screenOptions={{ headerShown: false }} />
        </TeamChatProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}
