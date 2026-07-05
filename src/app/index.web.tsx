import { useResponsiveLayout } from "../hooks/use-responsive-layout.web";
import { ChatDesktopWebShell } from "../components/chat/chat-shell/chat-desktop-shell.web";
import { ChatMobileWebShell } from "../components/chat/chat-shell/chat-mobile-shell.web";

export default function Index() {
  const { isDesktopWeb } = useResponsiveLayout();

  if (isDesktopWeb) {
    return <ChatDesktopWebShell />;
  }

  return <ChatMobileWebShell />;
}
