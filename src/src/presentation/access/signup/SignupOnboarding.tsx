import React, { Fragment } from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";

import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import themes from "../../styles/themes";
import DidiButton from "../../util/DidiButton";
import NavigationHeaderStyle from "../../styles/NavigationHeaderStyle";
import { SignupEnterPhoneProps } from "./SignupEnterPhone";

export type SignupOnboardingProps = {};

export interface SignupOnboardingNavigation {
	SignupEnterPhone: SignupEnterPhoneProps;
}

export class SignupOnboardingScreen extends NavigationEnabledComponent<
	SignupOnboardingProps,
	{},
	SignupOnboardingNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Registro");

	render() {
		return (
			<Fragment>
				<StatusBar
					backgroundColor={themes.darkNavigation}
					barStyle="light-content"
				/>
				<SafeAreaView style={styles.area}>
					<View style={styles.body}>
						<DidiButton
							onPress={() => this.navigate("SignupEnterPhone", {})}
							title="Siguiente"
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
	}
});
