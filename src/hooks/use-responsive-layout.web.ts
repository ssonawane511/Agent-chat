import { useWindowDimensions } from "react-native";

import {
  BREAKPOINTS,
  DESKTOP_CHAT_MAX_WIDTH,
} from "../constants/layout.web";

export function useResponsiveLayout() {
  const { width, height } = useWindowDimensions();
  const isMobileWeb = width <= BREAKPOINTS.mobileWebMax;
  const isDesktopWeb = width >= BREAKPOINTS.desktopWebMin;
  const contentMaxWidth = isDesktopWeb ? DESKTOP_CHAT_MAX_WIDTH : width;

  return {
    isMobileWeb,
    isDesktopWeb,
    contentMaxWidth,
    windowWidth: width,
    windowHeight: height,
  };
}
