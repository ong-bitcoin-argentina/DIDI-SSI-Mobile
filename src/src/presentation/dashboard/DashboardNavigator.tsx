import React from "react";
import { Image, ImageSourcePropType, StyleSheet, View, ViewProps } from "react-native";
import { NavigationContainer, NavigationScreenProp, NavigationState, StackActions } from "react-navigation";
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
/* don't remove these lines
import SemillasNavigator from "./semillas/SemillasNavigator";
*/
/* don't remove these lines
import { RoundsScreen } from "./rounds/RoundsScreen";
*/
import CoopsolNavigator from "./coopsol/CoopsolNavigator";
import { EditProfileScreen } from "./settings/userMenu/EditProfile";
import DocumentsScreen from "./documents/DocumentsScreen";
import IssuersScreen  from "./issuers/IssuersScreen";
import VuIdentityNavigator from './vuIdentity/VuIdentityNavigator';
import { IdentityScreen } from './vuIdentity/IdentityScreen';
import issuersNavigator from './issuers/IssuersNavigator';

interface DashboardSwitchTarget {
	Access: StartAccessProps;
}

export interface NavigatorProps extends ViewProps {
	navigation: NavigationScreenProp<NavigationState>;
}

export default function (then: NavTree<DashboardSwitchTarget>) {
	function screen(
		InnerNavigator: NavigationContainer,
		title: string,
		image: string | { url: ImageSourcePropType },
		withFloatButton = true
	) {
		class DashboardNavigator extends React.Component<NavigatorProps> {
			static router = InnerNavigator.router;
			render() {
				const { navigation } = this.props;
				return (
					<View style={{ flex: 1 }}>
						<InnerNavigator navigation={navigation} style={[StyleSheet.absoluteFill, { zIndex: 0, elevation: 0 }]} />
						{withFloatButton && (
							<DashboardJumpMenu
								navigation={navigation}
								showJumpButton={true}
								style={[StyleSheet.absoluteFill, { zIndex: 1, elevation: 1 }]}
							/>
						)}
					</View>
				);
			}
		}

		return {
			screen: DashboardNavigator,
			navigationOptions: {
				title,
				tabBarIcon({ tintColor }: { tintColor: string }){
					return (
						<View style={{ alignItems: "center" }}>
							{typeof image === "string" ? (
								<DidiText.Icon color={tintColor} fontSize={24}>
									{image}
								</DidiText.Icon>
							) : (
								<Image 
								style={{width: 30, height: 30, marginRight: '5%'}} 
								source={image.url} />
							)}
						</View>
				)}
			}
		};
	}

	const dashboardPlaceholder: NavMap<DashboardScreenProps> = NavMap.placeholder(DashboardScreen);

	const dashboardHome: NavMap<DashboardScreenProps> = NavMap.from(DashboardScreen, {
		NotificationScreen: NavMap.from(NotificationScreen, {
			ScanDisclosureRequest: NavMap.placeholder(ScanDisclosureRequestScreen),
			DocumentDetail: NavMap.placeholder(DocumentDetailScreen)
		}),
		DashDocumentDetail: NavMap.from(DocumentDetailScreen, {}),
		DashboardDocuments: NavMap.placeholder(DocumentsScreen),
		DashboardIssuers: NavMap.placeholder(IssuersScreen),
		ValidateID: NavMap.placeholder(IdentityScreen),
		EditProfile: NavMap.placeholder(EditProfileScreen),
		__DashboardSettings: SettingsNavigator({
			...then,
			DashboardHome: dashboardPlaceholder
		})
	});

	const BottomNavigator = createBottomTabNavigator(
		{
			DashboardHome: screen(dashboardHome.stackNavigator("DashboardHome"), strings.tabNames.home, "home"),
			/* don't remove these lines
			DashboardRounds: screen(
				NavMap.from(RoundsScreen, { DashboardHome: dashboardPlaceholder }).stackNavigator("DashboardRounds"),
				strings.tabNames.rounds,
				"",
				false
			),*/
			DashboardDocuments: screen(
				DocumentsNavigator({
					...then,
					DashboardHome: dashboardPlaceholder
				}).stackNavigator("DashboardDocuments"),
				strings.tabNames.documents,
				"perm_contact_calendar"
			),
			DashboardIssuers: screen(
				issuersNavigator({
					...then,
					DashboardHome: dashboardPlaceholder
				}).stackNavigator("DashboardIssuers"),
				strings.tabNames.issuers,
				"assignment_returned",
				false
			),
			/* don't remove these lines
			DashboardSemillas: screen(
				SemillasNavigator().stackNavigator("DashboardSemillas"),
				strings.tabNames.semillas,
				"spa",
				false
			),
			*/
			DashboardCoopsol: screen(
				CoopsolNavigator().stackNavigator("DashboardCoopsol"),
				strings.tabNames.coopsol,
				{url: require('../resources/images/logo-gris-coopsol.png')},
				false
			),
			DashboardSettings: screen(
				SettingsNavigator({
					...then,
					DashboardHome: dashboardPlaceholder
				}).stackNavigator("DashboardSettings"),
				strings.tabNames.settings,
				"person",
				false
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
			backBehavior: "initialRoute",
			defaultNavigationOptions: {
				tabBarOnPress: props => {
					props.navigation.dispatch(StackActions.popToTop());
					props.defaultHandler();
				}
			}
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
		ValidateID: VuIdentityNavigator,
		ScanCredential: CredentialNavigator,
		ShareCredential: NavMap.from(ShareCredentialScreen, {
			ShareMicroCredential: NavMap.from(ShareMicroCredentialScreen, {
				ShareExplanation: NavMap.placeholder(ShareExplanationScreen)
			}),
			ShareExplanation: NavMap.from(ShareExplanationScreen, {
				ShareSpecificCredential: NavMap.from(ShareSpecificCredentialScreen, {
					ScanCredential: NavMap.placeholder(ScanCredentialScreen)
				})
			})
		})
	}).stackNavigator("DashboardRoot");
}
