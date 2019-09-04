import colors, { Color } from "./colors";

interface Theme {
	background: Color;
	foreground: Color;
	foregroundFaded: Color;

	navigation: Color;
	darkNavigation: Color;
	navigationText: Color;

	button: Color;
	buttonText: Color;

	buttonDisabled: Color;
	buttonDisabledText: Color;
}

const primaryTheme: Theme = {
	background: colors.background,
	foreground: colors.text,
	foregroundFaded: colors.textFaded,

	navigation: colors.primary,
	darkNavigation: colors.primaryDark,
	navigationText: colors.primaryText,

	button: colors.primary,
	buttonText: colors.primaryText,

	buttonDisabled: colors.textFaded,
	buttonDisabledText: colors.text
};

const secondaryTheme: Theme = {
	background: colors.background,
	foreground: colors.text,
	foregroundFaded: colors.textFaded,

	navigation: colors.secondary,
	darkNavigation: colors.secondaryDark,
	navigationText: colors.secondaryText,

	button: colors.secondary,
	buttonText: colors.secondaryText,

	buttonDisabled: colors.textFaded,
	buttonDisabledText: colors.text
};

export default {
	...primaryTheme,
	primaryTheme,
	secondaryTheme
};
