import { NavigationStackScreenOptions } from "react-navigation";
import themes from "../styles/themes";

const defaultStyle: NavigationStackScreenOptions = {
	headerStyle: {
		backgroundColor: themes.navigation
	},
	headerTintColor: themes.navigationText
};

const goneStyle: NavigationStackScreenOptions = {
	header: null
};

const styles = {
	withTitle(title: string): NavigationStackScreenOptions {
		return { ...defaultStyle, title };
	},

	gone: goneStyle
};

export default styles;
