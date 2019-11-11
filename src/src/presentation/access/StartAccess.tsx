import React, { Fragment } from "react";
import { StyleSheet } from "react-native";

import DidiButton from "../util/DidiButton";
import NavigationEnabledComponent from "../util/NavigationEnabledComponent";

import colors from "../resources/colors";
import NavigationHeaderStyle from "../resources/NavigationHeaderStyle";
import strings from "../resources/strings";
import themes from "../resources/themes";
import { SplashContent } from "../SplashContent";

import { AccessSettingsProps } from "./AccessSettings";
import { LoginScreenProps } from "./login/LoginScreen";
import { RecoveryExplanationProps } from "./recovery/RecoveryExplanation";
import { SignupOnboardingProps } from "./signup/SignupOnboarding";

export type StartAccessProps = {};

export interface StartAccessNavigation {
	Login: LoginScreenProps;
	SignupOnboarding: SignupOnboardingProps;
	RecoveryExplanation: RecoveryExplanationProps;
	AccessSettings: AccessSettingsProps;
}

export class StartAccessScreen extends NavigationEnabledComponent<StartAccessProps, {}, StartAccessNavigation> {
	static navigationOptions = NavigationHeaderStyle.gone;

	render() {
		return (
			<Fragment>
				<SplashContent>
					<DidiButton
						onPress={() => this.navigate("Login", {})}
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
				<DidiButton
					title="DEBUG"
					style={{ position: "absolute", top: 20, right: 20 }}
					onPress={() => this.navigate("AccessSettings", {})}
				/>
			</Fragment>
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
