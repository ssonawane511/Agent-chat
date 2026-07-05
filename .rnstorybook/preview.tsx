import type { Preview } from "@storybook/react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View } from "react-native";

import { TeamChatProvider } from "../src/context/team-chat-context";
import { ScreenBackground } from "../src/components/chat/screen-background";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <KeyboardProvider>
            <TeamChatProvider>
              <ScreenBackground>
                <View style={{ flex: 1, padding: 16, justifyContent: "center" }}>
                  <Story />
                </View>
              </ScreenBackground>
            </TeamChatProvider>
          </KeyboardProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    ),
  ],
};

export default preview;
