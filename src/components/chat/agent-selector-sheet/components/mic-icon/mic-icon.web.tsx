import { MaterialIcon } from "../../../../ui/material-icon.web";
import { colors } from "../../../../../constants/tokens";

type MicIconProps = {
  recording: boolean;
};

export function MicIcon({ recording }: MicIconProps) {
  return (
    <MaterialIcon
      name="mic"
      size={18}
      color={recording ? colors.brandPurpleText : colors.textSecondary}
    />
  );
}
