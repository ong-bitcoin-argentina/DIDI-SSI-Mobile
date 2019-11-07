import React from "react";
import { Image, StyleSheet, Text } from "react-native";

import { DidiScreen } from "../../common/DidiScreen";
import { ServiceObserver } from "../../common/ServiceObserver";
import { DidiServiceButton } from "../../util/DidiServiceButton";
import DidiTextInput from "../../util/DidiTextInput";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import commonStyles from "../resources/commonStyles";

import { isPendingService } from "../../../services/ServiceStateStore";
import { registerUser } from "../../../services/user/registerUser";
import { verifyEmailCode } from "../../../services/user/verifyEmailCode";
import { didiConnect } from "../../../store/store";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import strings from "../../resources/strings";
import Validator from "../helpers/validator";

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

interface SignupConfirmEmailState {
	inputCode: string;
}

export interface SignupConfirmEmailNavigation {
	SignupConfirmed: SignupConfirmedProps;
}

const serviceKeyVerify = "SignupConfirmEmail_Verify";
const serviceKeyRegister = "SignupConfirmEmail_Register";

class SignupConfirmEmailScreen extends NavigationEnabledComponent<
	SignupConfirmEmailInternalProps,
	SignupConfirmEmailState,
	SignupConfirmEmailNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.signup.barTitle);

	constructor(props: SignupConfirmEmailInternalProps) {
		super(props);
		this.state = {
			inputCode: ""
		};
	}

	render() {
		return (
			<DidiScreen>
				<Text style={[commonStyles.text.normal, styles.message]}>{strings.signup.registrationEmailSent.message}</Text>

				<DidiTextInput.VerificationCode onChangeText={text => this.setState({ inputCode: text })} />

				<Image source={require("../resources/images/emailSent.png")} style={commonStyles.image.image} />

				<ServiceObserver serviceKey={serviceKeyVerify} onSuccess={() => this.registerUser()} />
				<ServiceObserver serviceKey={serviceKeyRegister} onSuccess={() => this.navigate("SignupConfirmed", {})} />
				<DidiServiceButton
					disabled={!this.canPressContinueButton()}
					onPress={() => this.onPressContinueButton()}
					title={strings.accessCommon.validateButtonText}
					isPending={this.props.registerUserPending || this.props.verifyEmailCodePending}
				/>
			</DidiScreen>
		);
	}

	private canPressContinueButton(): boolean {
		return Validator.isValidationCode(this.state.inputCode);
	}

	private onPressContinueButton() {
		this.props.verifyEmailCode(this.state.inputCode);
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

const styles = StyleSheet.create({
	message: {
		fontSize: 20,
		textAlign: "center"
	}
});
