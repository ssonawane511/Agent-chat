import { useCallback, useEffect, useMemo, useRef } from "react";
import { Gesture } from "react-native-gesture-handler";
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const OPEN_SNAP_RATIO = 0.35;
const OPEN_VELOCITY = 400;
const CLOSE_VELOCITY = -400;

type UsePushDrawerOptions = {
  open: boolean;
  offset: number;
  onOpenChange?: (open: boolean) => void;
  enabled?: boolean;
  verticalInset?: number;
  horizontalInset?: number;
  borderRadius?: number;
  openDuration?: number;
  closeDuration?: number;
};

export function usePushDrawer({
  open,
  offset,
  onOpenChange,
  enabled = true,
  verticalInset = 0,
  horizontalInset = 0,
  borderRadius = 0,
  openDuration = 280,
  closeDuration = 240,
}: UsePushDrawerOptions) {
  const translateX = useSharedValue(open ? offset : 0);
  const insetY = useSharedValue(open ? verticalInset : 0);
  const insetX = useSharedValue(open ? horizontalInset : 0);
  const radius = useSharedValue(open ? borderRadius : 0);
  const dragStartX = useSharedValue(0);
  const isDraggingRef = useRef(false);

  const setDragging = useCallback((dragging: boolean) => {
    isDraggingRef.current = dragging;
  }, []);

  useEffect(() => {
    if (isDraggingRef.current) return;

    const timing = { duration: open ? openDuration : closeDuration };
    translateX.value = withTiming(open ? offset : 0, timing);
    insetY.value = withTiming(open ? verticalInset : 0, timing);
    insetX.value = withTiming(open ? horizontalInset : 0, timing);
    radius.value = withTiming(open ? borderRadius : 0, timing);
  }, [
    borderRadius,
    closeDuration,
    horizontalInset,
    insetX,
    insetY,
    offset,
    open,
    openDuration,
    radius,
    translateX,
    verticalInset,
  ]);

  const panGesture = useMemo(
    () =>
      Gesture.Pan()
        .enabled(enabled)
        .activeOffsetX([-16, 16])
        .failOffsetY([-14, 14])
        .onBegin(() => {
          runOnJS(setDragging)(true);
          dragStartX.value = translateX.value;
        })
        .onUpdate((event) => {
          translateX.value = Math.max(
            0,
            Math.min(offset, dragStartX.value + event.translationX),
          );

          const progress = offset > 0 ? translateX.value / offset : 0;
          insetY.value = verticalInset * progress;
          insetX.value = horizontalInset * progress;
          radius.value = borderRadius * progress;
        })
        .onEnd((event) => {
          let shouldOpen: boolean;
          if (event.velocityX <= CLOSE_VELOCITY) {
            shouldOpen = false;
          } else if (event.velocityX >= OPEN_VELOCITY) {
            shouldOpen = true;
          } else {
            shouldOpen = translateX.value > offset * OPEN_SNAP_RATIO;
          }

          const timing = {
            duration: shouldOpen ? openDuration : closeDuration,
          };

          translateX.value = withTiming(shouldOpen ? offset : 0, timing);
          insetY.value = withTiming(shouldOpen ? verticalInset : 0, timing);
          insetX.value = withTiming(shouldOpen ? horizontalInset : 0, timing);
          radius.value = withTiming(shouldOpen ? borderRadius : 0, timing);
          runOnJS(setDragging)(false);

          if (shouldOpen !== open && onOpenChange) {
            runOnJS(onOpenChange)(shouldOpen);
          }
        })
        .onFinalize(() => {
          runOnJS(setDragging)(false);
        }),
    [
      borderRadius,
      closeDuration,
      dragStartX,
      enabled,
      horizontalInset,
      insetX,
      insetY,
      offset,
      onOpenChange,
      open,
      openDuration,
      radius,
      setDragging,
      translateX,
      verticalInset,
    ],
  );

  const tapToCloseGesture = useMemo(
    () =>
      Gesture.Tap()
        .enabled(enabled && open)
        .onEnd(() => {
          if (onOpenChange) {
            runOnJS(onOpenChange)(false);
          }
        }),
    [enabled, onOpenChange, open],
  );

  const drawerGesture = useMemo(
    () => Gesture.Exclusive(panGesture, tapToCloseGesture),
    [panGesture, tapToCloseGesture],
  );

  const contentStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    marginTop: insetY.value,
    marginBottom: insetY.value,
    marginRight: insetX.value,
    borderRadius: radius.value,
  }));

  return { contentStyle, panGesture: drawerGesture };
}
