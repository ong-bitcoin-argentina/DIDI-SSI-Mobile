import colors from "./colors";
import DidiTheme from "./DidiTheme";
import { ENV_CODE } from "../../AppConfig";

const colorThemes: any = {
	STG: {
		header: {
			background: colors.primaryGray,
			text: colors.background
		},
		navigation: {
			background: colors.primaryGray,
			iconActive: colors.background,
			iconInactive: colors.primaryLight
		}
	},
	PROD: {
		header: {
			background: colors.primary,
			text: colors.background
		},
		navigation: {
			background: colors.white,
			iconActive: colors.primary,
			iconInactive: colors.primaryGray
		}
	}
};

const getTheme = () => {
	return colorThemes[ENV_CODE] ?? colorThemes.PROD;
};

const primaryTheme: DidiTheme = {
	background: colors.background,
	foreground: colors.text,
	foregroundFaded: colors.textFaded,

	header: getTheme().header.background,
	navigation: getTheme().navigation.background,
	darkNavigation: colors.primaryDark,
	navigationText: colors.primaryText,

	button: colors.primaryShadow,
	buttonText: colors.primaryText,

	buttonDisabled: colors.darkBackground,
	buttonDisabledText: colors.textFaded,

	headerText: getTheme().header.text,
	navigationIconActive: getTheme().navigation.iconActive,
	navigationIconInactive: getTheme().navigation.iconInactive
};

export default {
	...primaryTheme,
	primaryTheme
};
