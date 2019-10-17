import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import { StartAccessProps } from "../access/StartAccess";
import DashboardScreen, { DashboardScreenProps, DashboardScreenNavigation } from "./home/Dashboard";
import NavMap, { NavTree, NavigationEnabledComponentConstructor } from "../util/NavMap";
import React from "react";
import { Text, ViewProps, View, StyleSheet } from "react-native";
import themes from "../resources/themes";
import strings from "../resources/strings";
import { RoundsScreen } from "./rounds/RoundsScreen";
import DocumentsNavigator from "./documents/DocumentsNavigator";
import { NavigationContainer, NavigationScreenProp, NavigationState, createStackNavigator } from "react-navigation";
import DashboardJumpMenu from "./DashboardJumpMenu";
import SettingsNavigator from "./settings/SettingsNavigator";
import ValidateIdentityNavigator from "./validateIdentity/ValidateIdentityNavigator";
import NavigationHeaderStyle from "../resources/NavigationHeaderStyle";
import CredentialNavigator from "./credentials/CredentialNavigator";
import NavigationEnabledComponent from "../util/NavigationEnabledComponent";
import ShareCredentialScreen from "./credentials/ShareCredential";
import { ShareSpecificCredentialScreen } from "./credentials/ShareSpecificCredential";
import { NotificationScreen } from "./home/NotificationScreen";
import ScanDisclosureRequestScreen from "./credentials/ScanDisclosureRequest";
import { ShareMicroCredentialScreen } from "./credentials/ShareMicroCredential";

interface DashboardSwitchTarget {
	Access: StartAccessProps;
}

export interface NavigatorProps extends ViewProps {
	navigation: NavigationScreenProp<NavigationState>;
}

export default function(then: NavTree<DashboardSwitchTarget>) {
	function screen(InnerNavigator: NavigationContainer, title: string, image: string) {
		class DashboardNavigator extends React.Component<NavigatorProps> {
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
	const dashboardPlaceholder: NavMap<DashboardScreenProps> = NavMap.placeholder(DashboardScreen);

	const BottomNavigator = createMaterialBottomTabNavigator(
		{
			DashboardHome: screen(dashboardHome.stackNavigator("DashboardHome"), strings.tabNames.home, ""),
			DashboardRounds: screen(
				NavMap.from(RoundsScreen, { DashboardHome: dashboardPlaceholder }).stackNavigator("DashboardRounds"),
				strings.tabNames.rounds,
				""
			),
			DashboardDocuments: screen(DocumentsNavigator, strings.tabNames.documents, ""),
			DashboardSettings: screen(
				SettingsNavigator({
					...then,
					DashboardHome: dashboardPlaceholder
				}).stackNavigator("DashboardSettings"),
				strings.tabNames.settings,
				""
			)
		},
		{
			initialRouteName: "DashboardHome",
			activeTintColor: themes.navigationIconActive,
			inactiveTintColor: themes.navigationIconInactive,
			barStyle: { backgroundColor: themes.navigation }
		}
	);

	class BottomNavigatorComponent extends NavigationEnabledComponent<NavigatorProps, {}, {}> {
		static navigationOptions = NavigationHeaderStyle.gone;
		static router = BottomNavigator.router;

		render() {
			const { navigation } = this.props;
			return <BottomNavigator navigation={navigation} />;
		}
	}

	return NavMap.from(BottomNavigatorComponent, {
		ValidateID: ValidateIdentityNavigator(NavMap.placeholder(DashboardScreen)),
		ScanCredential: CredentialNavigator(NavMap.placeholder(DashboardScreen)),
		ShareCredential: NavMap.from(ShareCredentialScreen, {
			ShareMicroCredential: NavMap.from(ShareMicroCredentialScreen, {
				ShareSpecificCredential: NavMap.placeholder(ShareSpecificCredentialScreen)
			}),
			ShareSpecificCredential: NavMap.from(ShareSpecificCredentialScreen, {})
		}),
		NotificationScreen: NavMap.from(NotificationScreen, {
			ScanDisclosureRequest: NavMap.placeholder(ScanDisclosureRequestScreen)
		})
	}).stackNavigator("DashboardRoot");
}
