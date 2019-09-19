import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import { StartAccessProps } from "../access/StartAccess";
import DashboardScreen, { DashboardScreenProps } from "./home/Dashboard";
import NavMap, { NavTree, NavigationEnabledComponentConstructor } from "../util/NavMap";
import React from "react";
import { Text, ViewProps, View, StyleSheet } from "react-native";
import themes from "../resources/themes";
import strings from "../resources/strings";
import { RoundsScreen } from "./rounds/RoundsScreen";
import DocumentsNavigator from "./documents/DocumentsNavigator";
import { NavigationContainer, NavigationScreenProp, NavigationState } from "react-navigation";
import DashboardJumpMenu from "./DashboardJumpMenu";
import SettingsNavigator from "./settings/SettingsNavigator";

interface DashboardSwitchTarget {
	Access: StartAccessProps;
}

interface DashboardNavigatorProps extends ViewProps {
	navigation: NavigationScreenProp<NavigationState>;
}

export default function(then: NavTree<DashboardSwitchTarget>) {
	function screen(InnerNavigator: NavigationContainer, title: string, image: string) {
		class DashboardNavigator extends React.Component<DashboardNavigatorProps> {
			static router = InnerNavigator.router;
			render() {
				const { navigation } = this.props;
				return (
					<View style={{ flex: 1 }}>
						<InnerNavigator navigation={navigation} style={[StyleSheet.absoluteFill, { zIndex: 0, elevation: 0 }]} />
						<DashboardJumpMenu
							navigation={navigation}
							showJumpButton={true}
							style={[StyleSheet.absoluteFill, { zIndex: 1, elevation: 1 }]}
						/>
					</View>
				);
			}
		}

		return {
			screen: DashboardNavigator,
			navigationOptions: {
				title,
				tabBarIcon: ({ focused, tintColor }: { focused: boolean; tintColor: string }) => (
					<View style={{ width: 24, height: 24 }}>
						<Text style={{ color: tintColor, fontSize: 24, fontFamily: "MaterialIcons-Regular" }}>{image}</Text>
					</View>
				)
			}
		};
	}

	const dashboardHome: NavMap<DashboardScreenProps> = NavMap.from(DashboardScreen, then);

	return createMaterialBottomTabNavigator(
		{
			DashboardHome: screen(dashboardHome.stackNavigator("DashboardHome"), strings.tabNames.home, ""),
			DashboardRounds: screen(
				NavMap.from(RoundsScreen, { ...then, DashboardHome: dashboardHome }).stackNavigator("DashboardRounds"),
				strings.tabNames.rounds,
				""
			),
			DashboardDocuments: screen(DocumentsNavigator, strings.tabNames.documents, ""),
			DashboardSettings: screen(SettingsNavigator.stackNavigator("DashboardSettings"), strings.tabNames.settings, "")
		},
		{
			initialRouteName: "DashboardHome",
			activeTintColor: themes.navigationIconActive,
			inactiveTintColor: themes.navigationIconInactive,
			barStyle: { backgroundColor: themes.navigation }
		}
	);
}
