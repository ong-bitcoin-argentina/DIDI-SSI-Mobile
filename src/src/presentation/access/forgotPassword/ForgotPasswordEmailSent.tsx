import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { DidiScreen } from "../../common/DidiScreen";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import commonStyles from "../../resources/commonStyles";
import DidiButton from "../../util/DidiButton";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import strings from "../../resources/strings";

import { ForgotPasswordNewPasswordProps } from "./ForgotPasswordNewPassword";

export interface ForgotPasswordEmailSentProps {
	email: string;
}

export interface ForgotPasswordEmailSentNavigation {
	ForgotPasswordNewPassword: ForgotPasswordNewPasswordProps;
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
						this.navigate("ForgotPasswordNewPassword", { email: this.props.email });
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
