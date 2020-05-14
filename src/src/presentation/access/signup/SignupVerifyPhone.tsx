import React from "react";

import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import { VerifyCodeWrapper } from "../../common/VerifyCodeWrapper";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import { sendSmsValidator } from "../../../services/user/sendSmsValidator";
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
				onResendCodePress={serviceKey => sendSmsValidator(serviceKey, this.props.phoneNumber, null)}
			/>
		);
	}
}
