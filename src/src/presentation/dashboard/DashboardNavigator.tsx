import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import { StartAccessProps } from "../access/StartAccess";
import DashboardScreen, { DashboardScreenProps } from "./Dashboard";
import NavMap, { NavTree, NavigationEnabledComponentConstructor } from "../util/NavMap";
import React from "react";
import { Image, ImageSourcePropType, ViewProps, View, StyleSheet } from "react-native";
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
	function screen(InnerNavigator: NavigationContainer, title: string, image: ImageSourcePropType) {
		class DashboardNavigator extends React.Component<DashboardNavigatorProps> {
			static router = InnerNavigator.router;
			render() {
				const { navigation } = this.props;
				return (
					<View style={{ flex: 1 }}>
						<DashboardJumpMenu
							navigation={navigation}
							showJumpButton={true}
							style={[StyleSheet.absoluteFill, { zIndex: 1 }]}
						/>
						<InnerNavigator navigation={navigation} style={[StyleSheet.absoluteFill, { zIndex: 0 }]} />
					</View>
				);
			}
		}

		return {
			screen: DashboardNavigator,
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
				SettingsNavigator.stackNavigator("DashboardSettings"),
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
