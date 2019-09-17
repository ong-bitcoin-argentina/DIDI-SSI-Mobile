import { NavigationStackScreenOptions, HeaderBackButton } from "react-navigation";
import themes from "../resources/themes";
import DidiTheme from "./DidiTheme";
import React from "react";

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

type NavigationFunction = (args: {
	props: any;
	navigation: any;
	screenProps: any;
	navigationOptions: NavigationStackScreenOptions;
}) => NavigationStackScreenOptions;

export type NavigationOptions = NavigationFunction | NavigationStackScreenOptions;

const styles = {
	withTitle(title: string): NavigationOptions {
		return { ...defaultStyle(themes.primaryTheme), title };
	},

	withTitleAndBackButton<Navigation, K extends keyof Navigation>(
		title: string,
		target: K,
		props: Navigation[K]
	): NavigationOptions {
		return ({ navigation }) => {
			return {
				...defaultStyle(themes.primaryTheme),
				title,
				headerLeft: (
					<HeaderBackButton tintColor={themes.navigationText} onPress={() => navigation.navigate(target, props)} />
				)
			};
		};
	},

	gone: goneStyle
};

export default styles;
