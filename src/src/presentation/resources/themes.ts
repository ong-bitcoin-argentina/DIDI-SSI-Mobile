import colors, { Color } from "./colors";
import DidiTheme from "./DidiTheme";

const primaryTheme: DidiTheme = {
	background: colors.background,
	foreground: colors.text,
	foregroundFaded: colors.textFaded,

	navigation: colors.primary,
	darkNavigation: colors.primaryDark,
	navigationText: colors.primaryText,

	button: colors.primary,
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
