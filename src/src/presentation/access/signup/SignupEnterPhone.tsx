import React from "react";

import { EnterPhoneWrapper } from "../../common/EnterPhoneWrapper";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
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
			<EnterPhoneWrapper
				isPasswordRequired={false}
				password={null}
				contentImageSource={require("../../resources/images/loginVerify.png")}
				onServiceSuccess={phoneNumber => this.navigate("SignupVerifyPhone", { phoneNumber })}
			/>
		);
	}
}
