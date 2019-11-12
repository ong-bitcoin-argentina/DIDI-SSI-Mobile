import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { DidiScreen } from "../../common/DidiScreen";
import commonStyles from "../../resources/commonStyles";
import DidiButton from "../../util/DidiButton";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import strings from "../../resources/strings";

import { ForgotPasswordConfirmEmailProps } from "./ForgotPasswordConfirmEmail";

export type ForgotPasswordEmailSentProps = {};

export interface ForgotPasswordEmailSentNavigation {
	ForgotPasswordConfirmEmail: ForgotPasswordConfirmEmailProps;
}

export class ForgotPasswordEmailSentScreen extends NavigationEnabledComponent<
	ForgotPasswordEmailSentProps,
	{},
	ForgotPasswordEmailSentNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.recovery.barTitle);

	render() {
		return (
			<DidiScreen>
				<View />

				<Image source={require("../../resources/images/emailSent.png")} style={commonStyles.image.image} />

				<Text style={[commonStyles.text.normal, styles.message]}>
					{strings.recovery.passwordRecoverEmailSent.message}
				</Text>

				<View />

				<DidiButton
					onPress={() => {
						this.navigate("ForgotPasswordConfirmEmail", {});
					}}
					title={strings.recovery.passwordRecoverEmailSent.buttonText}
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
