import React, { Fragment } from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";

import NavigationEnabledComponent from "../util/NavigationEnabledComponent";
import { LoginEnterPhoneProps } from "./login/LoginEnterPhone";
import { SignupOnboardingProps } from "./signup/SignupOnboarding";
import { RecoveryExplanationProps } from "./recovery/RecoveryExplanation";
import DidiButton from "../util/DidiButton";
import NavigationHeaderStyle from "../styles/NavigationHeaderStyle";
import themes from "../styles/themes";

export type StartAccessProps = {};

export interface StartAccessNavigation {
	LoginEnterPhone: LoginEnterPhoneProps;
	SignupOnboarding: SignupOnboardingProps;
	RecoveryExplanation: RecoveryExplanationProps;
}

export class StartAccessScreen extends NavigationEnabledComponent<
	StartAccessProps,
	{},
	StartAccessNavigation
> {
	static navigationOptions = NavigationHeaderStyle.gone;

	render() {
		return (
			<Fragment>
				<StatusBar
					backgroundColor={themes.darkNavigation}
					barStyle="light-content"
				/>
				<SafeAreaView style={styles.area}>
					<View style={styles.body} />
					<View style={styles.body}>
						<DidiButton
							onPress={() => this.navigate("LoginEnterPhone", {})}
							style={styles.secondaryButton}
							title="Ingresar"
						/>
						<DidiButton
							onPress={() => this.navigate("SignupOnboarding", {})}
							style={styles.primaryButton}
							title="Crear Cuenta"
						/>
						<DidiButton
							onPress={() => this.navigate("RecoveryExplanation", {})}
							style={styles.transparentButton}
							titleStyle={styles.transparentButtonText}
							title="Recuperar Cuenta"
						/>
					</View>
				</SafeAreaView>
			</Fragment>
		);
	}
}

const styles = StyleSheet.create({
	area: {
		backgroundColor: themes.background,
		flex: 1
	},
	body: {
		alignItems: "center",
		justifyContent: "space-evenly",
		flex: 1
	},
	transparentButton: {
		backgroundColor: themes.background
	},
	transparentButtonText: {
		color: themes.foreground
	},
	primaryButton: {
		backgroundColor: themes.primaryTheme.button
	},
	secondaryButton: {
		backgroundColor: themes.secondaryTheme.button
	}
});
