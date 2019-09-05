import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	SafeAreaView,
	StatusBar
} from "react-native";
import React, { Fragment } from "react";

import DidiButton from "../../util/DidiButton";
import themes from "../../styles/themes";
import colors from "../../styles/colors";
import DidiTextInput from "../../util/DidiTextInput";
import NavigationHeaderStyle from "../../styles/NavigationHeaderStyle";

export type RecoveryEnterEmailProps = {};

interface RecoverEnterEmailState {
	email: string;
	password: string;
}

const strings = {
	recoveryEnterEmail: {
		barTitle: "Recuperar Cuenta",
		messageHead: "Ingresa tu email y contraseña",
		emailTitle: "E-mail",
		passwordTitle: "Password",
		forgotPasswordMessage: "No recuerdo la contraseña",
		recoverButtonText: "Recuperar"
	}
};

export class RecoveryEnterEmailScreen extends NavigationEnabledComponent<
	RecoveryEnterEmailProps,
	RecoverEnterEmailState,
	{}
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(
		strings.recoveryEnterEmail.barTitle
	);

	render() {
		return (
			<Fragment>
				<StatusBar
					backgroundColor={themes.darkNavigation}
					barStyle="light-content"
				/>
				<SafeAreaView style={styles.area}>
					<Text style={styles.head}>
						{strings.recoveryEnterEmail.messageHead}
					</Text>

					<Image
						source={require("../resources/images/emailRecover.png")}
						style={styles.image}
					></Image>

					<View style={styles.inputContainer}>
						<DidiTextInput
							description={strings.recoveryEnterEmail.emailTitle}
							placeholder=""
							tagImage={require("../resources/images/email.png")}
							textInputProps={{
								onChangeText: text => this.setState({ email: text })
							}}
						/>
					</View>

					<View style={styles.inputContainer}>
						<DidiTextInput
							description={strings.recoveryEnterEmail.passwordTitle}
							placeholder=""
							tagImage={require("../resources/images/key.png")}
							textInputProps={{
								onChangeText: text => this.setState({ password: text })
							}}
						/>
					</View>

					<View style={styles.forgotPasswordContainer}>
						<TouchableOpacity onPress={() => {}} style={styles.forgotPassword}>
							<Text>
								{strings.recoveryEnterEmail.forgotPasswordMessage + " >"}
							</Text>
						</TouchableOpacity>
					</View>

					<DidiButton
						style={styles.recoverButton}
						onPress={() => {}}
						title={strings.recoveryEnterEmail.recoverButtonText}
					/>
				</SafeAreaView>
			</Fragment>
		);
	}
}

const styles = StyleSheet.create({
	area: {
		flex: 1,
		backgroundColor: colors.background,
		alignItems: "center",
		justifyContent: "space-evenly"
	},
	head: {
		textAlign: "center",
		paddingTop: 30,
		width: "80%",
		fontSize: 19,
		fontWeight: "bold",
		color: colors.text
	},
	inputContainer: {
		width: "80%"
	},
	inputTitle: {},
	forgotPasswordContainer: {
		width: "80%"
	},
	forgotPassword: {
		flexDirection: "row",
		marginLeft: "auto"
	},
	image: {
		width: "50%"
	},
	recoverButton: {
		backgroundColor: themes.primaryTheme.button,
		width: "90%"
	}
});
