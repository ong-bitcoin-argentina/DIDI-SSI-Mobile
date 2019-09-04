import { NavigationStackScreenOptions } from "react-navigation";
import themes from "../styles/themes";
import DidiTheme from "./DidiTheme";

function defaultStyle(theme: DidiTheme): NavigationStackScreenOptions {
	return {
		headerStyle: {
			backgroundColor: theme.navigation
		},
		headerTintColor: theme.navigationText
	};
}

const goneStyle: NavigationStackScreenOptions = {
	header: null
};

const styles = {
	withTitle(title: string, theme?: DidiTheme): NavigationStackScreenOptions {
		return { ...defaultStyle(theme ? theme : themes.primaryTheme), title };
	},

	gone: goneStyle
};

export default styles;
