import React from "react";

import { VerifyPhoneWrapper } from "../../common/VerifyPhoneWrapper";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";

import { SignupPhoneVerifiedProps } from "./SignupPhoneVerified";

export type SignupVerifyPhoneProps = {};

export interface SignupVerifyPhoneNavigation {
	SignupPhoneVerified: SignupPhoneVerifiedProps;
}

export class SignupVerifyPhoneScreen extends NavigationEnabledComponent<
	SignupVerifyPhoneProps,
	{},
	SignupVerifyPhoneNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Registro");

	render() {
		return (
			<VerifyPhoneWrapper
				contentImageSource={require("../resources/images/phoneRecover.png")}
				onServiceSuccess={() => this.navigate("SignupPhoneVerified", {})}
			/>
		);
	}
}
