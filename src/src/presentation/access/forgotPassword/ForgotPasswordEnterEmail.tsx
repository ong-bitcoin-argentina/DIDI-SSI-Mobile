import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { DidiScreen } from "../../common/DidiScreen";
import DidiButton from "../../util/DidiButton";
import DidiTextInput from "../../util/DidiTextInput";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import commonStyles from "../resources/commonStyles";

import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import strings from "../../resources/strings";
import Validator from "../helpers/validator";

import { ForgotPasswordEmailSentProps } from "./ForgotPasswordEmailSent";

export type ForgotPasswordEnterEmailProps = {};

export interface ForgotPasswordEnterEmailNavigation {
	ForgotPasswordEmailSent: ForgotPasswordEmailSentProps;
}

interface ForgotPasswordEnterEmailState {
	inputEmail: string;
}

export class ForgotPasswordEnterEmailScreen extends NavigationEnabledComponent<
	ForgotPasswordEnterEmailProps,
	ForgotPasswordEnterEmailState,
	ForgotPasswordEnterEmailNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.recovery.barTitle);

	private canPressContinueButton(): boolean {
		return this.state ? Validator.isEmail(this.state.inputEmail) : false;
	}

	sendEmail = () => {
		// TODO send verification email....
		this.navigate("ForgotPasswordEmailSent", { email: this.state.inputEmail });
	};

	render() {
		return (
			<DidiScreen>
				<Text style={[commonStyles.text.emphasis, styles.messageHead]}>
					{strings.recovery.passwordRecover.messageHead}
				</Text>
				<Image source={require("../resources/images/recoverPassword.png")} style={commonStyles.image.image} />

				<DidiTextInput
					description={strings.recovery.passwordRecover.emailTitle}
					placeholder=""
					tagImage={require("../resources/images/email.png")}
					textInputProps={{
						keyboardType: "email-address",
						onChangeText: text => this.setState({ inputEmail: text })
					}}
				/>

				<View />

				<DidiButton
					onPress={this.sendEmail}
					disabled={!this.canPressContinueButton()}
					title={strings.accessCommon.recoverButtonText}
				/>
			</DidiScreen>
		);
	}
}

const styles = StyleSheet.create({
	messageHead: {
		fontSize: 19
	}
});
