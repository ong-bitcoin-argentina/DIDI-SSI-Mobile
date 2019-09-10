import React, { Fragment } from "react";
import { SafeAreaView, StatusBar, StyleSheet, View, Image } from "react-native";

import NavigationEnabledComponent from "../util/NavigationEnabledComponent";
import { LoginEnterPhoneProps } from "./login/LoginEnterPhone";
import { SignupOnboardingProps } from "./signup/SignupOnboarding";
import { RecoveryExplanationProps } from "./recovery/RecoveryExplanation";
import DidiButton from "../util/DidiButton";
import NavigationHeaderStyle from "../resources/NavigationHeaderStyle";
import themes from "../resources/themes";
import commonStyles from "./resources/commonStyles";
import strings from "./resources/strings";

export type StartAccessProps = {};

export interface StartAccessNavigation {
	LoginEnterPhone: LoginEnterPhoneProps;
	SignupOnboarding: SignupOnboardingProps;
	RecoveryExplanation: RecoveryExplanationProps;
}

export class StartAccessScreen extends NavigationEnabledComponent<StartAccessProps, {}, StartAccessNavigation> {
	static navigationOptions = NavigationHeaderStyle.gone;

	render() {
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<SafeAreaView style={commonStyles.view.area}>
					<View style={[commonStyles.view.body, styles.imageContainer]}>
						<Image style={styles.didiLogo} source={require("../resources/images/didiLogo.png")} />
					</View>
					<View style={[commonStyles.view.body, styles.buttonContainer]}>
						<DidiButton
							onPress={() => this.navigate("LoginEnterPhone", {})}
							style={styles.secondaryButton}
							title={strings.recovery.startAccess.loginButton}
						/>
						<DidiButton
							onPress={() => this.navigate("SignupOnboarding", {})}
							style={styles.primaryButton}
							title={strings.recovery.startAccess.createButton}
						/>
						<DidiButton
							onPress={() => this.navigate("RecoveryExplanation", {})}
							style={styles.transparentButton}
							titleStyle={styles.transparentButtonText}
							title={strings.recovery.startAccess.recoveryButton + " >"}
						/>
					</View>
				</SafeAreaView>
			</Fragment>
		);
	}
}

const styles = StyleSheet.create({
	imageContainer: {
		flex: 2,
		flexDirection: "row"
	},
	buttonContainer: {
		flex: 1,
		justifyContent: "flex-end",
		marginBottom: 10
	},
	didiLogo: {
		height: 200,
		width: 200,
		resizeMode: "contain",
		alignSelf: "flex-end"
	},
	transparentButton: {
		backgroundColor: themes.background
	},
	transparentButtonText: {
		color: themes.foreground,
		fontWeight: "bold"
	},
	primaryButton: {
		backgroundColor: themes.primaryTheme.button
	},
	secondaryButton: {
		backgroundColor: themes.secondaryTheme.button
	}
});
