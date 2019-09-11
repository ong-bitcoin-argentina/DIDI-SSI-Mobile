import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import { StartAccessProps } from "../access/StartAccess";
import { DashboardScreen } from "./Dashboard";
import NavMap, { NavTree, NavigationEnabledComponentConstructor } from "../util/NavMap";
import React from "react";
import { Image, ImageSourcePropType } from "react-native";
import themes from "../resources/themes";
import strings from "./resources/strings";
import { RoundsScreen } from "./rounds/RoundsScreen";
import { DocumentsScreen } from "./documents/DocumentsScreen";
import { SettingsScreen } from "./settings/SettingsScreen";

interface DashboardSwitchTarget {
	Access: StartAccessProps;
}

export default function(then: NavTree<DashboardSwitchTarget>) {
	function screen(
		constructor: NavigationEnabledComponentConstructor<any, any>,
		navName: string,
		title: string,
		image: ImageSourcePropType
	) {
		return {
			screen: NavMap.from(constructor, then).stackNavigator(navName),
			navigationOptions: {
				title,
				tabBarIcon: ({ focused, tintColor }: { focused: boolean; tintColor: string }) => (
					<Image source={image} style={{ tintColor, width: 24, height: 24 }} />
				)
			}
		};
	}

	return createMaterialBottomTabNavigator(
		{
			DashboardHome: screen(
				DashboardScreen,
				"DashboardHome",
				strings.tabNames.home,
				require("./resources/images/homeIcon.png")
			),
			DashboardRounds: screen(
				RoundsScreen,
				"DashboardRounds",
				strings.tabNames.rounds,
				require("./resources/images/roundIcon.png")
			),
			DashboardDocuments: screen(
				DocumentsScreen,
				"DashboardDocuments",
				strings.tabNames.documents,
				require("./resources/images/documentIcon.png")
			),
			DashboardSettings: screen(
				SettingsScreen,
				"DashboardSettings",
				strings.tabNames.settings,
				require("./resources/images/settingsIcon.png")
			)
		},
		{
			initialRouteName: "DashboardHome",
			activeTintColor: themes.navigationIconActive,
			inactiveTintColor: themes.navigationIconInactive,
			barStyle: { backgroundColor: themes.navigation }
		}
	);
}
