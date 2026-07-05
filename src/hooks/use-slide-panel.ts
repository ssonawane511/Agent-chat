import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Gesture } from "react-native-gesture-handler";
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const CLOSE_SNAP_RATIO = 0.25;
const CLOSE_VELOCITY = 450;

type SlideAxis = "left" | "bottom";

type UseSlidePanelOptions = {
  visible: boolean;
  axis: SlideAxis;
  distance: number;
  onClose?: () => void;
  dismissGestureEnabled?: boolean;
  openDuration?: number;
  closeDuration?: number;
};

export function useSlidePanel({
  visible,
  axis,
  distance,
  onClose,
  dismissGestureEnabled = false,
  openDuration = 280,
  closeDuration = 240,
}: UseSlidePanelOptions) {
  const [mounted, setMounted] = useState(visible);
  const closedOffset = axis === "left" ? -distance : distance;
  const offset = useSharedValue(visible ? 0 : closedOffset);
  const backdropOpacity = useSharedValue(visible ? 1 : 0);
  const dragStartOffset = useSharedValue(0);
  const isDraggingRef = useRef(false);

  const setDragging = useCallback((dragging: boolean) => {
    isDraggingRef.current = dragging;
  }, []);

  const finishClose = useCallback(() => {
    setMounted(false);
  }, []);

  useEffect(() => {
    if (visible) {
      setMounted(true);
      if (isDraggingRef.current) return;

      offset.value = closedOffset;
      offset.value = withTiming(0, { duration: openDuration });
      backdropOpacity.value = withTiming(1, { duration: openDuration });
      return;
    }

    if (!mounted) return;

    offset.value = withTiming(closedOffset, { duration: closeDuration }, (finished) => {
      if (finished) {
        runOnJS(finishClose)();
      }
    });
    backdropOpacity.value = withTiming(0, { duration: closeDuration });
  }, [
    backdropOpacity,
    closeDuration,
    closedOffset,
    finishClose,
    mounted,
    offset,
    openDuration,
    visible,
  ]);

  const dismissGesture = useMemo(() => {
    if (axis !== "bottom") return undefined;

    return Gesture.Pan()
      .enabled(dismissGestureEnabled && visible)
      .activeOffsetY(8)
      .failOffsetX([-24, 24])
      .onBegin(() => {
        runOnJS(setDragging)(true);
        dragStartOffset.value = offset.value;
      })
      .onUpdate((event) => {
        const nextOffset = dragStartOffset.value + Math.max(0, event.translationY);
        offset.value = Math.max(0, Math.min(distance, nextOffset));
        backdropOpacity.value = distance > 0 ? 1 - offset.value / distance : 0;
      })
      .onEnd((event) => {
        const shouldClose =
          offset.value > distance * CLOSE_SNAP_RATIO ||
          event.velocityY > CLOSE_VELOCITY;

        runOnJS(setDragging)(false);

        if (shouldClose && onClose) {
          offset.value = withTiming(distance, { duration: closeDuration }, (finished) => {
            if (finished) {
              runOnJS(onClose)();
            }
          });
          backdropOpacity.value = withTiming(0, { duration: closeDuration });
          return;
        }

        offset.value = withTiming(0, { duration: openDuration });
        backdropOpacity.value = withTiming(1, { duration: openDuration });
      })
      .onFinalize(() => {
        runOnJS(setDragging)(false);
      });
  }, [
    axis,
    backdropOpacity,
    closeDuration,
    dismissGestureEnabled,
    distance,
    dragStartOffset,
    offset,
    onClose,
    openDuration,
    setDragging,
    visible,
  ]);

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  const panelStyle = useAnimatedStyle(() => ({
    transform:
      axis === "left"
        ? [{ translateX: offset.value }]
        : [{ translateY: offset.value }],
  }));

  return { mounted, backdropStyle, panelStyle, dismissGesture };
}
