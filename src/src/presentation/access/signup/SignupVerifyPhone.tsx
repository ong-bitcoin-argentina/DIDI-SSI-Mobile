import React from "react";
import { Alert } from "react-native";

import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import { VerifyCodeWrapper } from "../../common/VerifyCodeWrapper";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import { verifySmsCode } from "../../../services/user/verifySmsCode";
import strings from "../../resources/strings";

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
			<VerifyCodeWrapper
				description={strings.accessCommon.verify.phoneMessageHead}
				contentImageSource={require("../../resources/images/phoneRecover.png")}
				serviceCall={(serviceKey, validationCode) => verifySmsCode(serviceKey, this.props.phoneNumber, validationCode)}
				onServiceSuccess={() => this.navigate("SignupPhoneVerified", { phoneNumber: this.props.phoneNumber })}
			/>
		);
	}
}
