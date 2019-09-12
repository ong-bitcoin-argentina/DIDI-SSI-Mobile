import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { Fragment } from "react";
import React from "react";
import { StatusBar, SafeAreaView, View, Text, StyleSheet, Image, ImageSourcePropType } from "react-native";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import themes from "../../resources/themes";
import strings from "../resources/strings";
import colors from "../../resources/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import DidiButton from "../../util/DidiButton";

export interface SettingsScreenProps {}

type SettingsScreenState = {};

export interface SettingsScreenNavigation {
	Access: {};
	SettingsAccount: {};
	SettingsPreferences: {};
	SettingsAbout: {};
}

interface SettingsButton {
	name: string;
	action: () => void;
}

interface SettingsPerson {
	name: string;
	id: string;
	image: ImageSourcePropType;
}

export class SettingsScreen extends NavigationEnabledComponent<
	SettingsScreenProps,
	SettingsScreenState,
	SettingsScreenNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.tabNames.settings);

	private person: SettingsPerson = {
		id: "<persona.id>",
		name: "<Nombre Persona>",
		image: require("../../access/resources/images/arg.png")
	};

	buttons(): SettingsButton[] {
		return [
			{ name: strings.settings.account, action: () => this.navigate("SettingsAccount", {}) },
			{ name: strings.settings.preferences, action: () => this.navigate("SettingsPreferences", {}) },
			{ name: strings.settings.about, action: () => this.navigate("SettingsAbout", {}) }
		];
	}

	renderCartouche() {
		return (
			<View style={styles.identityCartouche}>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<Image style={{ marginRight: 10, width: 70, height: 70 }} source={this.person.image} />
					<View style={{ flex: 1, flexDirection: "column" }}>
						<Text style={{ fontSize: 18 }}>{this.person.name}</Text>
						<View style={{ marginTop: 3, flexDirection: "row" }}>
							<Text style={{ fontSize: 12, color: colors.primary, fontWeight: "bold" }}>ID: </Text>
							<Text style={{ fontSize: 12 }}>{this.person.id}</Text>
						</View>
					</View>
					<Image style={{ marginHorizontal: 10 }} source={require("../resources/images/openPersonDetail.png")} />
				</View>
			</View>
		);
	}

	renderButton(button: SettingsButton, index: number) {
		return (
			<View key={index}>
				<TouchableOpacity onPress={button.action} style={{ marginTop: 10, flexDirection: "row" }}>
					<View style={{ flex: 1 }} />
					<Text
						style={{
							marginTop: 10,
							marginBottom: 10,
							flex: 8,
							alignSelf: "center",
							flexDirection: "row"
						}}
					>
						{button.name}
					</Text>
					<View style={{ flex: 1, justifyContent: "center" }}>
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
	buttonContainer: {
		flex: 1,
		backgroundColor: colors.lightBackground
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
