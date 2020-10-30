import React, { Fragment } from "react";
import { Image, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity, View, ScrollView } from "react-native";
import RNRestart from "react-native-restart";

import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import DidiButton from "../../util/DidiButton";
import { DidiText } from "../../util/DidiText";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import { AppConfig } from "../../../AppConfig";
import { ValidatedIdentity } from "../../../store/selector/combinedIdentitySelector";
import { didiConnect } from "../../../store/store";
import { StartAccessProps } from "../../access/StartAccess";
import colors from "../../resources/colors";
import ChevronBlueRight from "../../resources/images/chevronBlueRight.svg";
import OpenPersonDetail from "../../resources/images/openPersonDetail.svg";
import strings from "../../resources/strings";
import themes from "../../resources/themes";
import { DashboardScreenProps } from "../home/Dashboard";

import { AboutThisAppScreenProps } from "./AboutThisApp";
import { ChangePasswordProps } from "./ChangePassword";
import { IdentitySettingsProps } from "./identity/IdentitySettings";
import { JWTDecoderScanScreenProps } from "./JWTDecoderScanScreen";
import { ServiceSettingsScreenProps } from "./ServiceSettingsScreen";
import { UserDataProps } from "./userData/UserData";
import Option from "./Option";
import Divider from "../common/Divider";

export type SettingsScreenProps = {};
interface SettingsScreenStateProps {
	person: ValidatedIdentity;
}
interface SettingsScreenDispatchProps {
	logout(): void;
}
type SettingsScreenInternalProps = SettingsScreenProps & SettingsScreenStateProps & SettingsScreenDispatchProps;

export interface SettingsScreenNavigation {
	Access: StartAccessProps;
	DashboardHome: DashboardScreenProps;
	UserData: UserDataProps;
	IdentitySettings: IdentitySettingsProps;
	ChangePassword: ChangePasswordProps;
	AboutThisAppScreen: AboutThisAppScreenProps;
	ServiceSettings: ServiceSettingsScreenProps;
	JWTDecoderScreen: JWTDecoderScanScreenProps;
}

interface SettingsButton {
	name: string;
	action: () => void;
}

const { settings } = strings;

class SettingsScreen extends NavigationEnabledComponent<SettingsScreenInternalProps, {}, SettingsScreenNavigation> {
	static navigationOptions = NavigationHeaderStyle.withTitleAndFakeBackButton<
		SettingsScreenNavigation,
		"DashboardHome"
	>(strings.tabNames.settings, "DashboardHome", {});

	buttons(): SettingsButton[] {
		const base = [
			{ name: strings.settings.editProfile, action: () => this.navigate("ChangePassword", {}) },
			{ name: strings.settings.changePassword, action: () => this.navigate("ChangePassword", {}) },
			{ name: strings.settings.changePassword, action: () => this.navigate("ChangePassword", {}) },
			{ name: strings.settings.changePassword, action: () => this.navigate("ChangePassword", {}) },
			{ name: strings.settings.about.title, action: () => this.navigate("AboutThisAppScreen", {}) }
		];
		const debug = [
			...base,
			{ name: strings.settings.identityBackup, action: () => this.navigate("IdentitySettings", {}) },
			{ name: strings.debug.serviceConfig.barTitle, action: () => this.navigate("ServiceSettings", {}) },
			{ name: strings.debug.decodeJWT, action: () => this.navigate("JWTDecoderScreen", {}) }
		];
		return AppConfig.debug ? debug : base;
	}

	private logout() {
		this.props.logout();
		RNRestart.Restart();
	}

	navigateTo = (route: keyof SettingsScreenNavigation) => {
		this.navigate(route, {});
	};

	render() {
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<SafeAreaView style={styles.area}>
					<ScrollView contentContainerStyle={styles.container}>
						<Option onPress={() => this.navigateTo("ChangePassword")} label={settings.editProfile} icon="person" />
						<Option onPress={() => this.navigateTo("ChangePassword")} label={settings.changeEmail} icon="email" />
						<Option
							onPress={() => this.navigateTo("ChangePassword")}
							label={settings.changePhone}
							icon="phone_iphone"
						/>
						<Option onPress={() => this.navigateTo("ChangePassword")} label={settings.changePassword} icon="lock" />

						<Divider />

						<Option onPress={() => this.navigateTo("AboutThisAppScreen")} label={settings.aboutAidi} icon="info" />
						<Option
							onPress={() => this.navigateTo("AboutThisAppScreen")}
							label={settings.aboutRonda}
							icon="filter_tilt_shift"
						/>

						<Divider />

						<Option onPress={() => this.logout()} label={settings.endSession} icon="exit_to_app" />
					</ScrollView>
				</SafeAreaView>
			</Fragment>
		);
	}
}

export default didiConnect(
	SettingsScreen,
	(state): SettingsScreenStateProps => ({ person: state.validatedIdentity }),
	(dispatch): SettingsScreenDispatchProps => ({
		logout: () => dispatch({ type: "SESSION_LOGOUT" })
	})
);

const baseStyles = {
	cartoucheWidth: {
		marginHorizontal: "5%"
	},
	logoutButtonWidth: {
		width: "80%"
	}
};

const styles = StyleSheet.create({
	area: {
		backgroundColor: colors.background,
		flex: 1,
		alignItems: "stretch"
	},
	identityContainer: {
		backgroundColor: colors.background
	},
	identityCartouche: {
		...baseStyles.cartoucheWidth,
		marginVertical: 20,
		padding: 10,
		borderColor: colors.backgroundSeparator,
		borderWidth: 1,
		borderRadius: 10,
		backgroundColor: colors.lightBackground
	},
	borderedAtTop: {
		borderTopColor: colors.darkGray,
		borderTopWidth: 1,
		paddingTop: 26
	},
	identityImage: {
		marginRight: 10,

		width: 70,
		height: 70,
		borderRadius: 35,

		backgroundColor: colors.darkBackground,
		borderColor: "#FFF",
		borderWidth: 2
	},
	identityIdContainer: {
		flex: 1,
		flexDirection: "column"
	},
	container: {
		paddingTop: 20,
		paddingHorizontal: 26
		// backgroundColor: colors.lightBackground
	},
	buttonSpacer: {
		flex: 1
	},
	buttonText: {
		marginTop: 10,
		marginBottom: 10,
		flex: 8,
		alignSelf: "center",
		flexDirection: "row"
	},
	buttonChevron: {
		flex: 1,
		justifyContent: "center"
	},
	buttonUnderline: {
		...baseStyles.cartoucheWidth,
		height: 1,
		backgroundColor: colors.backgroundSeparator
	},
	logoutButtonContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	logoutButton: {
		...baseStyles.logoutButtonWidth,
		alignSelf: "center"
	}
});
