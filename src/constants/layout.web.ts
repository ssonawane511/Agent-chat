export const BREAKPOINTS = {
  /** Viewports at or below this width use the mobile-web layout. */
  mobileWebMax: 767,
  /** Viewports at or above this width use the desktop-web layout. */
  desktopWebMin: 768,
} as const;

export const DESKTOP_SIDEBAR_WIDTH = 280;

/** Max width of the centered chat content column on desktop web. */
export const DESKTOP_CHAT_MAX_WIDTH = 768;

/** Max width of the input dock on desktop web. */
export const DESKTOP_INPUT_DOCK_MAX_WIDTH = 768;

/** Inset around the chat card when the desktop sidebar is open. */
export const DESKTOP_PANEL_INSETS = {
  vertical: 12,
  horizontal: 12,
} as const;
