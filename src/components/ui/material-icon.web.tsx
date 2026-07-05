import { loadAsync } from "expo-font";
import { androidSymbolToString } from "expo-symbols/build/android";
import { getFont } from "expo-symbols/build/utils";
import { useEffect, useMemo, useState } from "react";
import { Text, View, type ColorValue, type TextStyle } from "react-native";

import {
  MATERIAL_ICONS,
  type MaterialIconName,
} from "../../constants/material-icons.web";

type MaterialIconProps = {
  name: MaterialIconName;
  size?: number;
  color?: ColorValue;
};

/** Renders a Material Symbol on web — `@expo/ui` Icon is native-only. */
export function MaterialIcon({
  name,
  size = 24,
  color = "#1A1A1A",
}: MaterialIconProps) {
  const symbol = MATERIAL_ICONS[name];
  const font = useMemo(() => getFont("regular"), []);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadAsync({
      [font.name]: {
        uri: font.font,
        testString: androidSymbolToString(symbol) ?? undefined,
      },
    })
      .then(() => setLoaded(true))
      .catch(() => {});
  }, [font.font, font.name, symbol]);

  if (!loaded) {
    return <View style={{ width: size, height: size }} />;
  }

  const glyphStyle: TextStyle = {
    fontFamily: font.name,
    fontSize: size,
    color,
    width: size,
    height: size,
    lineHeight: size,
    textAlign: "center",
    textAlignVertical: "center",
    padding: 0,
    margin: 0,
    // Material Symbol fonts sit slightly high without this on web.
    transform: [{ translateY: size * 0.04 }],
  };

  return (
    <View
      style={{
        width: size,
        height: size,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <Text style={glyphStyle} accessibilityElementsHidden importantForAccessibility="no">
        {androidSymbolToString(symbol)}
      </Text>
    </View>
  );
}
