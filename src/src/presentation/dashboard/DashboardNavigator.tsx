import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import { StartAccessProps } from "../access/StartAccess";
import DashboardScreen, { DashboardScreenProps } from "./Dashboard";
import NavMap, { NavTree, NavigationEnabledComponentConstructor } from "../util/NavMap";
import React from "react";
import { Image, ImageSourcePropType } from "react-native";
import themes from "../resources/themes";
import strings from "../resources/strings";
import { RoundsScreen } from "./rounds/RoundsScreen";
import SettingsScreen from "./settings/SettingsScreen";
import DocumentsNavigator from "./documents/DocumentsNavigator";
import { NavigationContainer } from "react-navigation";

interface DashboardSwitchTarget {
	Access: StartAccessProps;
}

export default function(then: NavTree<DashboardSwitchTarget>) {
	function screen(constructor: NavigationContainer, title: string, image: ImageSourcePropType) {
		return {
			screen: constructor,
			navigationOptions: {
				title,
				tabBarIcon: ({ focused, tintColor }: { focused: boolean; tintColor: string }) => (
					<Image source={image} style={{ tintColor, width: 24, height: 24 }} />
				)
			}
		};
	}

	const dashboardHome: NavMap<DashboardScreenProps> = NavMap.from(DashboardScreen, then);

	return createMaterialBottomTabNavigator(
		{
			DashboardHome: screen(
				dashboardHome.stackNavigator("DashboardHome"),
				strings.tabNames.home,
				require("./resources/images/homeIcon.png")
			),
			DashboardRounds: screen(
				NavMap.from(RoundsScreen, { ...then, DashboardHome: dashboardHome }).stackNavigator("DashboardRounds"),
				strings.tabNames.rounds,
				require("./resources/images/roundIcon.png")
			),
			DashboardDocuments: screen(
				DocumentsNavigator,
				strings.tabNames.documents,
				require("./resources/images/documentIcon.png")
			),
			DashboardSettings: screen(
				NavMap.from(SettingsScreen, then).stackNavigator("DashboardSettings"),
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
