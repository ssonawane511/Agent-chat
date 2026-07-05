import { Host, Icon } from "@expo/ui";

import { ICONS } from "../../../../../constants/icons";
import { colors } from "../../../../../constants/tokens";

type MicIconProps = {
  recording: boolean;
};

export function MicIcon({ recording }: MicIconProps) {
  return (
    <Host matchContents>
      <Icon
        name={ICONS.mic}
        size={18}
        color={recording ? colors.brandPurpleText : colors.textSecondary}
      />
    </Host>
  );
}
