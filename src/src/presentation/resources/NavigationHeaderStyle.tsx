import { NavigationStackScreenOptions, HeaderBackButton } from "react-navigation";
import themes from "../resources/themes";
import DidiTheme from "./DidiTheme";
import React from "react";
import { Text } from "react-native";
import { HeaderButtons, HeaderButton, Item, HeaderButtonProps } from "react-navigation-header-buttons";
import { defaultOnOverflowMenuPress } from "react-navigation-header-buttons/src/overflowMenuPressHandlers";

import VerticalMore from "./images/verticalMore.svg";

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

const MaterialHeaderButton = (props: HeaderButtonProps) => (
	<HeaderButton {...props} iconSize={23} color={themes.navigationIconActive} />
);

const styles = {
	withTitle(title: string): NavigationStackScreenOptions {
		return { ...defaultStyle(themes.primaryTheme), title };
	},

	withTitleAndRightButtonActions(
		title: string,
		actions: Array<{ actionTitle: string; onPress: (navigation: any) => void }>
	): NavigationOptions {
		return ({ navigation }) => {
			return {
				...defaultStyle(themes.primaryTheme),
				title,
				headerRight: (
					<HeaderButtons
						HeaderButtonComponent={MaterialHeaderButton}
						OverflowIcon={<VerticalMore width={44} height={16} />}
						onOverflowMenuPress={({ overflowButtonRef, hiddenButtons }) =>
							defaultOnOverflowMenuPress({
								overflowButtonRef,
								hiddenButtons,
								cancelButtonLabel: "Cancel"
							})
						}
					>
						{actions.map(({ actionTitle, onPress }, index) => {
							return <Item key={index} title={actionTitle} onPress={() => onPress(navigation)} show="never" />;
						})}
					</HeaderButtons>
				)
			};
		};
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
