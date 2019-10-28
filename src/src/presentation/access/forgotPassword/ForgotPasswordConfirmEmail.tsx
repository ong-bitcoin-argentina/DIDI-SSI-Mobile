import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import {} from "react-navigation";

import { DidiScreen } from "../../common/DidiScreen";
import DidiButton from "../../util/DidiButton";
import DidiTextInput from "../../util/DidiTextInput";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import commonStyles from "../resources/commonStyles";

import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import strings from "../../resources/strings";
import Validator from "../helpers/validator";

import { ForgotPasswordNewPasswordProps } from "./ForgotPasswordNewPassword";

export type ForgotPasswordConfirmEmailProps = {};

export interface ForgotPasswordConfirmEmailNavigation {
	ForgotPasswordNewPassword: ForgotPasswordNewPasswordProps;
}

interface ForgotPasswordConfirmEmailState {
	code: string;
}

export class ForgotPasswordConfirmEmailScreen extends NavigationEnabledComponent<
	ForgotPasswordConfirmEmailProps,
	ForgotPasswordConfirmEmailState,
	ForgotPasswordConfirmEmailNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.recovery.barTitle);

	private canPressContinueButton(): boolean {
		// TODO validar codigo!!!
		return this.state ? this.state.code.length > 0 && Validator.isNumber(this.state.code) : false;
	}

	render() {
		return (
			<DidiScreen>
				<Text style={commonStyles.text.emphasis}>{strings.recovery.passwordRecoverConfirmationCode.messageHead}</Text>

				<Image source={require("../resources/images/phoneRecover.png")} style={commonStyles.image.image} />

				<DidiTextInput
					description={strings.recovery.passwordRecoverConfirmationCode.codeTitle}
					placeholder=""
					tagImage={require("../resources/images/phone.png")}
					textInputProps={{
						keyboardType: "number-pad",
						onChangeText: text => this.setState({ code: text })
					}}
				/>

				<View />

				<DidiButton
					onPress={() => {
						this.navigate("ForgotPasswordNewPassword", {});
					}}
					disabled={!this.canPressContinueButton()}
					title={strings.recovery.passwordRecoverConfirmationCode.buttonText}
				/>
			</DidiScreen>
		);
	}
}
