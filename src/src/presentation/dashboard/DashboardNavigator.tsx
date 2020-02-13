import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { NavigationContainer, NavigationScreenProp, NavigationState } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

import NavigationHeaderStyle from "../common/NavigationHeaderStyle";
import { ServiceObserver } from "../common/ServiceObserver";
import { DidiText } from "../util/DidiText";
import NavigationEnabledComponent from "../util/NavigationEnabledComponent";
import NavMap, { NavTree } from "../util/NavMap";

import { recoverTokensServiceKey } from "../../services/trustGraph/recoverTokens";
import { StartAccessProps } from "../access/StartAccess";
import strings from "../resources/strings";
import themes from "../resources/themes";

import CredentialNavigator from "./credentials/CredentialNavigator";
import { ScanCredentialScreen } from "./credentials/ScanCredential";
import ScanDisclosureRequestScreen from "./credentials/ScanDisclosureRequest";
import ShareCredentialScreen from "./credentials/ShareCredential";
import { ShareExplanationScreen } from "./credentials/ShareExplanationScreen";
import { ShareMicroCredentialScreen } from "./credentials/ShareMicroCredential";
import { ShareSpecificCredentialScreen } from "./credentials/ShareSpecificCredential";
import DashboardJumpMenu from "./DashboardJumpMenu";
import { DocumentDetailScreen } from "./documents/DocumentDetail";
import DocumentsNavigator from "./documents/DocumentsNavigator";
import DashboardScreen, { DashboardScreenProps } from "./home/Dashboard";
import { NotificationScreen } from "./home/NotificationScreen";
import SettingsNavigator from "./settings/SettingsNavigator";
import UserData from "./settings/userData/UserData";
import { ValidateIdentityExplainWhatScreen } from "./validateIdentity/ValidateIdentityExplainWhat";
import ValidateIdentityNavigator from "./validateIdentity/ValidateIdentityNavigator";

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
					<View style={{ alignItems: "center" }}>
						<View style={{ width: 24, height: 24 }}>
							<DidiText.Icon color={tintColor} fontSize={24}>
								{image}
							</DidiText.Icon>
						</View>
						{focused && <DidiText.TabNavigationTitle>{title}</DidiText.TabNavigationTitle>}
					</View>
				)
			}
		};
	}

	const dashboardHome: NavMap<DashboardScreenProps> = NavMap.from(DashboardScreen, {
		NotificationScreen: NavMap.from(NotificationScreen, {
			ScanDisclosureRequest: NavMap.placeholder(ScanDisclosureRequestScreen)
		}),
		DashDocumentDetail: NavMap.from(DocumentDetailScreen, {}),
		ValidateID: NavMap.placeholder(ValidateIdentityExplainWhatScreen),
		UserData: NavMap.placeholder(UserData)
	});
	const dashboardPlaceholder: NavMap<DashboardScreenProps> = NavMap.placeholder(DashboardScreen);

	const BottomNavigator = createBottomTabNavigator(
		{
			DashboardHome: screen(dashboardHome.stackNavigator("DashboardHome"), strings.tabNames.home, ""),
			/*
			DashboardRounds: screen(
				NavMap.from(RoundsScreen, { DashboardHome: dashboardPlaceholder }).stackNavigator("DashboardRounds"),
				strings.tabNames.rounds,
				""
			),
			*/
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
			tabBarOptions: {
				activeBackgroundColor: themes.navigation,
				inactiveBackgroundColor: themes.navigation,
				activeTintColor: themes.navigationIconActive,
				inactiveTintColor: themes.navigationIconInactive,
				keyboardHidesTabBar: false,
				showLabel: false
			},
			backBehavior: "initialRoute"
		}
	);

	class BottomNavigatorComponent extends NavigationEnabledComponent<NavigatorProps, {}, {}> {
		static navigationOptions = NavigationHeaderStyle.gone;
		static router = BottomNavigator.router;

		render() {
			const { navigation } = this.props;
			return (
				<ServiceObserver serviceKey={recoverTokensServiceKey} onSuccess={() => null}>
					<BottomNavigator navigation={navigation} />
				</ServiceObserver>
			);
		}
	}

	return NavMap.from(BottomNavigatorComponent, {
		ValidateID: ValidateIdentityNavigator,
		ScanCredential: CredentialNavigator,
		ShareCredential: NavMap.from(ShareCredentialScreen, {
			ShareMicroCredential: NavMap.from(ShareMicroCredentialScreen, {
				ShareSpecificCredential: NavMap.placeholder(ShareSpecificCredentialScreen)
			}),
			ShareExplanation: NavMap.from(ShareExplanationScreen, {
				ShareSpecificCredential: NavMap.from(ShareSpecificCredentialScreen, {
					ScanCredential: NavMap.placeholder(ScanCredentialScreen)
				})
			})
		})
	}).stackNavigator("DashboardRoot");
}
