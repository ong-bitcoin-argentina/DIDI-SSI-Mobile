import React from "react";

import { ServiceObserver } from "../../common/ServiceObserver";
import { VerifyCodeScreen } from "../../common/VerifyCode";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import { isPendingService } from "../../../services/ServiceStateStore";
import { registerUser } from "../../../services/user/registerUser";
import { verifyEmailCode } from "../../../services/user/verifyEmailCode";
import { didiConnect } from "../../../store/store";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import strings from "../../resources/strings";

import { SignupConfirmedProps } from "./SignupConfirmed";

export interface SignupConfirmEmailProps {
	phoneNumber: string;
	email: string;
	password: string;
}
interface SignupConfirmEmailStateProps {
	verifyEmailCodePending: boolean;
	registerUserPending: boolean;
}
interface SignupConfirmEmailDispatchProps {
	verifyEmailCode(validationCode: string): void;
	registerUser: (email: string, password: string, phoneNumber: string) => void;
}
type SignupConfirmEmailInternalProps = SignupConfirmEmailProps &
	SignupConfirmEmailStateProps &
	SignupConfirmEmailDispatchProps;

export interface SignupConfirmEmailNavigation {
	SignupConfirmed: SignupConfirmedProps;
}

const serviceKeyVerify = "SignupConfirmEmail_Verify";
const serviceKeyRegister = "SignupConfirmEmail_Register";

class SignupConfirmEmailScreen extends NavigationEnabledComponent<
	SignupConfirmEmailInternalProps,
	{},
	SignupConfirmEmailNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.signup.barTitle);

	render() {
		return (
			<ServiceObserver serviceKey={serviceKeyVerify} onSuccess={() => this.registerUser()}>
				<ServiceObserver serviceKey={serviceKeyRegister} onSuccess={() => this.navigate("SignupConfirmed", {})} />
				<VerifyCodeScreen
					description={strings.signup.registrationEmailSent.message}
					contentImageSource={require("../../resources/images/emailSent.png")}
					onPressContinueButton={inputCode => this.onPressContinueButton(inputCode)}
					isContinuePending={this.props.registerUserPending || this.props.verifyEmailCodePending}
				/>
			</ServiceObserver>
		);
	}

	private onPressContinueButton(inputCode: string) {
		this.props.verifyEmailCode(inputCode);
	}

	private registerUser() {
		this.props.registerUser(this.props.email, this.props.password, this.props.phoneNumber);
	}
}

const connected = didiConnect(
	SignupConfirmEmailScreen,
	(state): SignupConfirmEmailStateProps => ({
		verifyEmailCodePending: isPendingService(state.serviceCalls[serviceKeyVerify]),
		registerUserPending: isPendingService(state.serviceCalls[serviceKeyRegister])
	}),
	(dispatch): SignupConfirmEmailDispatchProps => ({
		verifyEmailCode: (validationCode: string) => dispatch(verifyEmailCode(serviceKeyVerify, validationCode)),

		registerUser: (email: string, password: string, phoneNumber: string) =>
			dispatch(registerUser(serviceKeyRegister, email, password, phoneNumber))
	})
);

export { connected as SignupConfirmEmailScreen };
