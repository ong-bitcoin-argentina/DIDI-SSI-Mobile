import React from "react";
import { TouchableOpacity } from "react-native";
import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation";
import { HeaderButton, HeaderButtonProps, HeaderButtons, Item } from "react-navigation-header-buttons";
import { defaultOnOverflowMenuPress } from "react-navigation-header-buttons/src/overflowMenuPressHandlers";
import { HeaderBackButton, NavigationStackOptions } from "react-navigation-stack";

import { styleToUse, DidiText } from "../util/DidiText";

import DidiTheme from "../resources/DidiTheme";
import VerticalMore from "../resources/images/verticalMore.svg";
import themes from "../resources/themes";

function defaultStyle(theme: DidiTheme): NavigationStackOptions {
	return {
		headerStyle: {
			backgroundColor: theme.header
		},
		headerTintColor: theme.navigationText,
		headerTitleStyle: styleToUse.navigationHeader
	};
}

const goneStyle: NavigationStackOptions = {
	header: null
};

type NavigationFunction = (args: {
	props: any;
	navigation: any;
	screenProps: any;
	navigationOptions: NavigationStackOptions;
}) => NavigationStackOptions;

export type NavigationOptions = NavigationFunction | NavigationStackOptions;

const MaterialHeaderButton = (props: HeaderButtonProps) => (
	<HeaderButton {...props} iconSize={23} color={themes.headerText} />
);

const styles = {
	withTitle(title: string): NavigationStackOptions {
		return { ...defaultStyle(themes.primaryTheme), title };
	},

	withDynamicTitle(propName: string): NavigationOptions {
		return ({ navigation }) => {
			const Dynamic = navigation.state.params[propName];
			return {
				...defaultStyle(themes.primaryTheme),
				title: Dynamic ?? 'new',
			};
		};
	},

	withTitleAndRightButtonActions<Nav>(
		title: string,
		actions: Array<{
			actionTitle: string;
			onPress: (
				navigation: Omit<NavigationScreenProp<NavigationState, NavigationParams>, "navigate"> & {
					navigate<Target extends Extract<keyof Nav, string>>(target: Target, props: Nav[Target]): void;
				}
			) => void;
		}>
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
							return (
								<Item
									key={index}
									title={actionTitle}
									onPress={() => onPress(navigation)}
									show={actions.length === 1 ? "always" : "never"}
								/>
							);
						})}
					</HeaderButtons>
				)
			};
		};
	},

	withTitleAndRightButton<Navigation, K extends keyof Navigation>(
		title: string,
		icon: string,
		target: K
	): NavigationOptions {
		return ({ navigation }) => {
			return {
				...defaultStyle(themes.primaryTheme),
				title,
				headerRight: (
					<TouchableOpacity style={{ paddingHorizontal: 16 }} onPress={() => navigation.navigate(target, {})}>
						<DidiText.Icon fontSize={22}>{icon}</DidiText.Icon>
					</TouchableOpacity>
				)
			};
		};
	},

	withTitleAndRightButtonClose(title: string): NavigationOptions {
		return ({ navigation }) => {
			return {
				...defaultStyle(themes.primaryTheme),
				title,
				headerRight: (
					<TouchableOpacity style={{ paddingHorizontal: 16 }} onPress={() => navigation.navigate("DashboardHome", {})}>
						<DidiText.Icon fontSize={22}>close</DidiText.Icon>
					</TouchableOpacity>
				)
			};
		};
	},

	withTitleAndFakeBackButton<Navigation, K extends keyof Navigation>(
		title: string,
		target: K,
		props: Navigation[K]
	): NavigationOptions {
		return ({ navigation }) => {
			return {
				...defaultStyle(themes.primaryTheme),
				title,
				headerLeft: (
					<HeaderBackButton tintColor={themes.headerText} onPress={() => navigation.navigate(target, props)} />
				)
			};
		};
	},

	gone: goneStyle
};

export default styles;
