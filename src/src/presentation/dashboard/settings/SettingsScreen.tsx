import React, { Fragment } from "react";
import { Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";

import DidiButton from "../../util/DidiButton";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import { Identity } from "../../../model/Identity";
import { didiConnect, StoreContent } from "../../../store/store";
import { StartAccessProps } from "../../access/StartAccess";
import colors from "../../resources/colors";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import strings from "../../resources/strings";
import themes from "../../resources/themes";
import { DashboardScreenProps } from "../home/Dashboard";
import ChevronBlueRight from "../resources/images/chevronBlueRight.svg";
import OpenPersonDetail from "../resources/images/openPersonDetail.svg";

import { AboutThisAppScreenProps } from "./AboutThisApp";
import { IdentitySettingsProps } from "./identity/IdentitySettings";
import { JWTDecoderScanScreenProps } from "./JWTDecoderScanScreen";
import { ServiceSettingsScreenProps } from "./ServiceSettingsScreen";
import { UserDataProps } from "./userData/UserData";
import { ChangePasswordProps } from "./userMenu/ChangePassword";

export interface SettingsScreenProps {
	person: Identity;
}

type SettingsScreenState = {};

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

class SettingsScreen extends NavigationEnabledComponent<
	SettingsScreenProps,
	SettingsScreenState,
	SettingsScreenNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitleAndFakeBackButton<
		SettingsScreenNavigation,
		"DashboardHome"
	>(strings.tabNames.settings, "DashboardHome", {});

	buttons(): SettingsButton[] {
		return [
			{ name: strings.settings.identityBackup, action: () => this.navigate("IdentitySettings", {}) },
			{ name: strings.settings.changePassword, action: () => this.navigate("ChangePassword", {}) },
			{ name: strings.settings.about, action: () => this.navigate("AboutThisAppScreen", {}) },
			{ name: "Configuracion de Servicios", action: () => this.navigate("ServiceSettings", {}) },
			{ name: "Decodificar JWT", action: () => this.navigate("JWTDecoderScreen", {}) }
		];
	}

	renderCartouche() {
		return (
			<TouchableOpacity onPress={() => this.navigate("UserData", {})}>
				<View style={styles.identityCartouche}>
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<Image style={styles.identityImage} source={this.props.person.image} />
						<View style={styles.identityIdContainer}>
							<Text style={styles.identityName}>{this.props.person.name}</Text>
							<View style={{ marginTop: 3, flexDirection: "row" }}>
								<Text style={styles.identityIdLabel}>ID: </Text>
								<Text style={styles.identityId}>{this.props.person.id}</Text>
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
					<Text style={styles.buttonText}>{button.name}</Text>
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
								title="Cerrar Sesion"
								onPress={() => this.navigate("Access", {})}
							/>
						</View>
					</View>
				</SafeAreaView>
			</Fragment>
		);
	}
}

export default didiConnect(
	SettingsScreen,
	(state): SettingsScreenProps => {
		return { person: state.identity };
	}
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
	identityName: {
		fontSize: 18
	},
	identityImage: {
		marginRight: 10,
		width: 70,
		height: 70
	},
	identityIdContainer: {
		flex: 1,
		flexDirection: "column"
	},
	identityIdLabel: {
		fontSize: 12,
		color: colors.primary,
		fontWeight: "bold"
	},
	identityId: {
		fontSize: 12
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
