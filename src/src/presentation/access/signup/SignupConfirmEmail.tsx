import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { DidiScreen } from "../../common/DidiScreen";
import DidiButton from "../../util/DidiButton";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import commonStyles from "../resources/commonStyles";

import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import strings from "../../resources/strings";

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
			<DidiScreen>
				<View />

				<Text style={[commonStyles.text.normal, styles.message]}>{strings.signup.registrationEmailSent.message}</Text>

				<Image source={require("../resources/images/emailSent.png")} style={commonStyles.image.image} />

				<View />

				<DidiButton
					onPress={() => {
						this.navigate("SignupConfirmed", {});
					}}
					title={strings.signup.registrationEmailSent.buttonText}
				/>
			</DidiScreen>
		);
	}
}

const styles = StyleSheet.create({
	message: {
		fontSize: 20,
		textAlign: "center"
	}
});
