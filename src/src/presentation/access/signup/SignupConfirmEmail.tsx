import React, { Fragment } from "react";
import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";

import DidiButton from "../../util/DidiButton";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import commonStyles from "../resources/commonStyles";

import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import strings from "../../resources/strings";
import themes from "../../resources/themes";

import { SignupConfirmedProps } from "./SignupConfirmed";

export interface SignupConfirmEmailNavigation {
	SignupConfirmed: SignupConfirmedProps;
}

export type SignupConfirmEmailProps = {};

export class SignupConfirmEmailScreen extends NavigationEnabledComponent<
	SignupConfirmEmailProps,
	{},
	SignupConfirmEmailNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.signup.barTitle);

	render() {
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />

				<SafeAreaView style={commonStyles.view.area}>
					<View style={commonStyles.view.body}>
						<View />

						<Text style={[commonStyles.text.normal, styles.message]}>
							{strings.signup.registrationEmailSent.message}
						</Text>

						<Image source={require("../resources/images/emailSent.png")} style={commonStyles.image.image} />

						<View />

						<DidiButton
							onPress={() => {
								this.navigate("SignupConfirmed", {});
							}}
							title={strings.signup.registrationEmailSent.buttonText}
						/>
					</View>
				</SafeAreaView>
			</Fragment>
		);
	}
}

const styles = StyleSheet.create({
	message: {
		fontSize: 20,
		textAlign: "center"
	}
});
