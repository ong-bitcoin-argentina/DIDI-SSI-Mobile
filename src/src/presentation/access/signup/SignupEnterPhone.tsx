import React from "react";

import { EnterPhoneScreen } from "../../common/EnterPhone";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import strings from "../../resources/strings";

import { SignupVerifyPhoneProps } from "./SignupVerifyPhone";

export type SignupEnterPhoneProps = {};

export interface SignupEnterPhoneNavigation {
	SignupVerifyPhone: SignupVerifyPhoneProps;
}

export class SignupEnterPhoneScreen extends NavigationEnabledComponent<
	SignupEnterPhoneProps,
	{},
	SignupEnterPhoneNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.signup.barTitle);

	render() {
		return (
			<EnterPhoneScreen
				contentImageSource={require("../resources/images/loginVerify.png")}
				onPressContinueButton={inputPhoneNumber => this.onPressContinueButton(inputPhoneNumber)}
			/>
		);
	}

	private onPressContinueButton(inputPhoneNumber: string) {
		this.navigate("SignupVerifyPhone", { phoneNumber: inputPhoneNumber });
	}
}
