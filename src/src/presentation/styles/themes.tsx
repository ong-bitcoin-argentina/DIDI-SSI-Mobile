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

	opposite(): DidiTheme {
		return secondaryTheme;
	}
};

const secondaryTheme: DidiTheme = {
	background: colors.background,
	foreground: colors.text,
	foregroundFaded: colors.textFaded,

	navigation: colors.secondary,
	darkNavigation: colors.secondaryDark,
	navigationText: colors.secondaryText,

	button: colors.secondary,
	buttonText: colors.secondaryText,

	buttonDisabled: colors.textFaded,
	buttonDisabledText: colors.text,

	opposite(): DidiTheme {
		return primaryTheme;
	}
};

export default {
	...primaryTheme,
	primaryTheme,
	secondaryTheme
};
