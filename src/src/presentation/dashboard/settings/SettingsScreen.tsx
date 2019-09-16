import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { Fragment } from "react";
import React from "react";
import { StatusBar, SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import themes from "../../resources/themes";
import strings from "../../resources/strings";
import colors from "../../resources/colors";
import DidiButton from "../../util/DidiButton";
import { connect } from "react-redux";
import { Identity, LoggedInStoreContent } from "../../../model/StoreContent";
import { DashboardScreenProps } from "../Dashboard";
import { StartAccessProps } from "../../access/StartAccess";
import { UserDataProps } from "./UserData";
import { PersonalDataStatus } from "./PersonalData";

export interface SettingsScreenProps {
	person: Identity;
}

type SettingsScreenState = {};

export interface SettingsScreenNavigation {
	Access: StartAccessProps;
	DashboardHome: DashboardScreenProps;
	UserData: UserDataProps;
	SettingsAccount: {};
	SettingsPreferences: {};
	SettingsAbout: {};
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
	static navigationOptions = NavigationHeaderStyle.withTitleAndBackButton<SettingsScreenNavigation, "DashboardHome">(
		strings.tabNames.settings,
		"DashboardHome",
		{}
	);

	buttons(): SettingsButton[] {
		return [
			{ name: strings.settings.account, action: () => this.navigate("SettingsAccount", {}) },
			{ name: strings.settings.preferences, action: () => this.navigate("SettingsPreferences", {}) },
			{ name: strings.settings.about, action: () => this.navigate("SettingsAbout", {}) }
		];
	}

	getPersonalData() {
		return [
			{
				label: "Nombre Completo",
				value: "Liliana Beatriz Martinez",
				state: PersonalDataStatus.Null
			},
			{
				label: "Celular",
				value: "15 3344 6677",
				state: PersonalDataStatus.Approved
			},
			{
				label: "E-mail",
				value: "lilita87@hotmail.com",
				state: PersonalDataStatus.Approved
			},
			{
				label: "DU / CI / Pasaporte",
				value: "30.000.111",
				state: PersonalDataStatus.Pending
			},
			{
				label: "Nacionalidad",
				value: "Argentina",
				state: PersonalDataStatus.Pending
			},
			{
				label: "Domicilio",
				value: "Manzana 24, Seccion 3, Edificio 1",
				state: PersonalDataStatus.Rejected
			}
		];
	}

	renderCartouche() {
		return (
			<TouchableOpacity onPress={() => this.navigate("UserData", { personalData: this.getPersonalData() })}>
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
						<Image style={{ marginHorizontal: 10 }} source={require("../resources/images/openPersonDetail.png")} />
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
						<Image source={require("../resources/images/chevronBlueRight.png")} />
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

export default connect(
	(state: LoggedInStoreContent): SettingsScreenProps => {
		return { person: state.identity };
	}
)(SettingsScreen);

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
