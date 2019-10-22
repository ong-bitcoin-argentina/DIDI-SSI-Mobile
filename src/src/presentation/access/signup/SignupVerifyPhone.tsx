import React from "react";

import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { VerifyPhoneScreen } from "../common/VerifyPhone";

import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";

import { SignupPhoneVerifiedProps } from "./SignupPhoneVerified";

export interface SignupVerifyPhoneProps {
	phoneNumber: string;
}

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
		this.navigate("SignupPhoneVerified", { phoneNumber: this.props.phoneNumber });
	}
}
