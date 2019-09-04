import colors, { Color } from "./colors";

interface Theme {
	background: Color;
	foreground: Color;

	navigation: Color;
	darkNavigation: Color;
	navigationText: Color;

	button: Color;
	buttonText: Color;
}

const primaryTheme: Theme = {
	background: colors.background,
	foreground: colors.text,

	navigation: colors.primary,
	darkNavigation: colors.primaryDark,
	navigationText: colors.primaryText,

	button: colors.primary,
	buttonText: colors.primaryText
};

const secondaryTheme: Theme = {
	background: colors.background,
	foreground: colors.text,

	navigation: colors.secondary,
	darkNavigation: colors.secondaryDark,
	navigationText: colors.secondaryText,

	button: colors.secondary,
	buttonText: colors.secondaryText
};

export default {
	...primaryTheme,
	primaryTheme,
	secondaryTheme
};
