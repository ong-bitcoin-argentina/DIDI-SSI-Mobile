import React, { Fragment } from "react";
import { Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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

class SettingsScreen extends NavigationEnabledComponent<SettingsScreenInternalProps, {}, SettingsScreenNavigation> {
	static navigationOptions = NavigationHeaderStyle.withTitleAndFakeBackButton<
		SettingsScreenNavigation,
		"DashboardHome"
	>(strings.tabNames.settings, "DashboardHome", {});

	buttons(): SettingsButton[] {
		const base = [
			{ name: strings.settings.changePassword, action: () => this.navigate("ChangePassword", {}) },
			{ name: strings.settings.about, action: () => this.navigate("AboutThisAppScreen", {}) }
		];
		const debug = [
			{ name: strings.settings.identityBackup, action: () => this.navigate("IdentitySettings", {}) },
			...base,
			{ name: strings.debug.serviceConfig.barTitle, action: () => this.navigate("ServiceSettings", {}) },
			{ name: strings.debug.decodeJWT, action: () => this.navigate("JWTDecoderScreen", {}) }
		];
		return AppConfig.debug ? debug : base;
	}

	renderCartouche() {
		return (
			<TouchableOpacity onPress={() => this.navigate("UserData", {})}>
				<View style={styles.identityCartouche}>
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<Image
							style={styles.identityImage}
							source={
								this.props.person.visual.image !== undefined
									? this.props.person.visual.image
									: require("../../resources/images/defaultProfileImage.png")
							}
						/>
						<View style={styles.identityIdContainer}>
							<DidiText.Settings.Name>{this.props.person.visual.name}</DidiText.Settings.Name>
							<View style={{ marginTop: 3, flexDirection: "row" }}>
								<DidiText.Settings.IdLabel>{strings.settings.idLabel + " "}</DidiText.Settings.IdLabel>
								<DidiText.Settings.IdContent>{this.props.person.visual.id}</DidiText.Settings.IdContent>
							</View>
						</View>
						<OpenPersonDetail width="24" height="18" style={{ marginHorizontal: 10 }} />
					</View>
				</View>
			</TouchableOpacity>
		);
	}

	renderButton(button: SettingsButton, index: number) {
		return (
			<View key={index}>
				<TouchableOpacity onPress={button.action} style={{ marginTop: 10, flexDirection: "row" }}>
					<View style={styles.buttonSpacer} />
					<DidiText.Settings.Button style={styles.buttonText}>{button.name}</DidiText.Settings.Button>
					<View style={styles.buttonChevron}>
						<ChevronBlueRight />
					</View>
				</TouchableOpacity>
				<View style={styles.buttonUnderline} />
			</View>
		);
	}

	render() {
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<SafeAreaView style={styles.area}>
					<View style={styles.identityContainer}>{this.renderCartouche()}</View>
					<View style={styles.buttonContainer}>
						{this.buttons().map((button, index) => this.renderButton(button, index))}
						<View style={styles.logoutButtonContainer}>
							<DidiButton
								style={styles.logoutButton}
								title={strings.settings.endSession}
								onPress={() => this.logout()}
							/>
						</View>
					</View>
				</SafeAreaView>
			</Fragment>
		);
	}

	private logout() {
		this.props.logout();
		this.navigate("Access", {});
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
	buttonContainer: {
		flex: 1,
		backgroundColor: colors.lightBackground
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
