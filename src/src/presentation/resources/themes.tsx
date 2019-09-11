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

	buttonDisabled: colors.textFaded,
	buttonDisabledText: colors.text,

	navigationIconEnabled: colors.background,
	navigationIconDisabled: colors.primaryLight
};

export default {
	...primaryTheme,
	primaryTheme
};
