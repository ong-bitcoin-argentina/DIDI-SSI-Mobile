import React from "react";
import { Image, Text } from "react-native";

import { DidiScreen } from "../../common/DidiScreen";
import DidiButton from "../../util/DidiButton";
import DidiTextInput from "../../util/DidiTextInput";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import commonStyles from "../resources/commonStyles";

import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import strings from "../../resources/strings";
import Validator from "../helpers/validator";

import { SignupConfirmEmailProps } from "./SignupConfirmEmail";

export type SignupEnterEmailProps = {};

export interface SignupEnterEmailNavigation {
	SignupConfirmEmail: SignupConfirmEmailProps;
}

interface SignupEnterEmailState {
	email: string;
	key: string;
	keyDup: string;
}

export class SignupEnterEmailScreen extends NavigationEnabledComponent<
	SignupEnterEmailProps,
	SignupEnterEmailState,
	SignupEnterEmailNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.signup.barTitle);

	private canPressContinueButton(): boolean {
		if (!this.state || !Validator.isEmail(this.state.email)) {
			return false;
		}
		return this.state.key ? this.state.key.length > 0 && this.state.keyDup == this.state.key : false;
	}

	render() {
		return (
			<DidiScreen>
				<Text style={commonStyles.text.emphasis}>{strings.signup.enterEmail.messageHead}</Text>

				<Image
					source={
						this.canPressContinueButton()
							? require("../resources/images/save.png")
							: require("../resources/images/saveClean.png")
					}
					style={commonStyles.image.image}
				/>

				<DidiTextInput
					description={strings.signup.enterEmail.emailTitle}
					placeholder=""
					tagImage={require("../resources/images/email.png")}
					textInputProps={{
						keyboardType: "email-address",
						onChangeText: text => this.setState({ email: text })
					}}
				/>

				<DidiTextInput
					description={strings.signup.enterEmail.passwordTitle}
					placeholder=""
					tagImage={require("../resources/images/key.png")}
					textInputProps={{
						secureTextEntry: true,
						onChangeText: text => this.setState({ key: text })
					}}
				/>

				<DidiTextInput
					description={strings.signup.enterEmail.repeatPasswordTitle}
					placeholder=""
					tagImage={require("../resources/images/key.png")}
					textInputProps={{
						secureTextEntry: true,
						onChangeText: text => this.setState({ keyDup: text })
					}}
				/>

				<DidiButton
					onPress={() => {
						this.navigate("SignupConfirmEmail", {});
					}}
					disabled={!this.canPressContinueButton()}
					title={strings.signup.enterEmail.backupGenerate}
				/>
			</DidiScreen>
		);
	}
}
