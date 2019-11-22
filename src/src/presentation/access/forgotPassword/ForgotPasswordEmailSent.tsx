import React from "react";
import { Image, StyleSheet, View } from "react-native";

import { DidiScreen } from "../../common/DidiScreen";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import commonStyles from "../../resources/commonStyles";
import DidiButton from "../../util/DidiButton";
import { DidiText } from "../../util/DidiText";
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

				<DidiText.Explanation.Normal style={styles.message}>
					{strings.recovery.passwordRecoverEmailSent.message}
				</DidiText.Explanation.Normal>

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
