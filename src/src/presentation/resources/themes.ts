import colors, { Color } from "./colors";
import DidiTheme from "./DidiTheme";
import { QA } from "../../AppConfig";

const primaryTheme: DidiTheme = {
	background: colors.background,
	foreground: colors.text,
	foregroundFaded: colors.textFaded,

	navigation: QA ? colors.primaryGray : colors.primary,
	darkNavigation: colors.primaryDark,
	navigationText: colors.primaryText,

	button: colors.primaryShadow,
	buttonText: colors.primaryText,

	buttonDisabled: colors.darkBackground,
	buttonDisabledText: colors.textFaded,

	navigationIconActive: colors.background,
	navigationIconInactive: colors.primaryLight
};

export default {
	...primaryTheme,
	primaryTheme
};
