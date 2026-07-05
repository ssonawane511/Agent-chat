import { StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";

import { TeamChatProvider } from "../context/team-chat-context";
import { colors } from "../constants/tokens";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <KeyboardProvider>
        <TeamChatProvider>
          <StatusBar style="dark" />
          <Stack screenOptions={{ headerShown: false }} />
        </TeamChatProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    minHeight: "100%",
    backgroundColor: colors.surface0,
  },
});
