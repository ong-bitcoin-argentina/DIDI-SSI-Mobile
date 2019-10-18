import React from "react";
import { StyleSheet } from "react-native";

import DidiButton from "../util/DidiButton";
import NavigationEnabledComponent from "../util/NavigationEnabledComponent";

import colors from "../resources/colors";
import NavigationHeaderStyle from "../resources/NavigationHeaderStyle";
import strings from "../resources/strings";
import themes from "../resources/themes";
import { SplashContent } from "../SplashScreen";

import { LoginEnterPhoneProps } from "./login/LoginEnterPhone";
import { RecoveryExplanationProps } from "./recovery/RecoveryExplanation";
import { SignupOnboardingProps } from "./signup/SignupOnboarding";

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
			<SplashContent>
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
			</SplashContent>
		);
	}
}

const styles = StyleSheet.create({
	transparentButton: {
		backgroundColor: "transparent"
	},
	transparentButtonText: {
		color: themes.foreground,
		fontWeight: "bold"
	},
	primaryButton: {
		backgroundColor: colors.primary
	},
	secondaryButton: {
		backgroundColor: colors.secondary
	}
});
