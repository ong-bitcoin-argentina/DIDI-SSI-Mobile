import colors from "./colors";
import DidiTheme from "./DidiTheme";
import { ENV_CODE } from "../../AppConfig";

const colorThemes = {
	UAT: colors.primary,
	STG: colors.primaryGray,
	PROD: colors.primary
};

const primaryTheme: DidiTheme = {
	background: colors.background,
	foreground: colors.text,
	foregroundFaded: colors.textFaded,

	navigation: colorThemes[ENV_CODE] ?? colors.primaryGray,
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
