import React from "react";

import { VerifyPhoneScreen } from "../../common/VerifyPhone";
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
			<VerifyPhoneScreen
				contentImageSource={require("../resources/images/phoneRecover.png")}
				onPressContinueButton={() => this.onPressContinueButton()}
			/>
		);
	}

	private onPressContinueButton() {
		this.navigate("SignupPhoneVerified", {});
	}
}
