import React from "react";

import { EnterPhoneWrapper } from "../../common/EnterPhoneWrapper";
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
			<EnterPhoneWrapper
				contentImageSource={require("../resources/images/loginVerify.png")}
				onServiceSuccess={() => this.navigate("SignupVerifyPhone", {})}
			/>
		);
	}
}
