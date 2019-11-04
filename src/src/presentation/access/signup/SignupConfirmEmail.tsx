import React from "react";
import { Alert, Image, StyleSheet, Text } from "react-native";

import { ServiceWrapper } from "../../../services/common/ServiceWrapper";
import { DidiScreen } from "../../common/DidiScreen";
import { DidiServiceButton } from "../../util/DidiServiceButton";
import DidiTextInput from "../../util/DidiTextInput";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import commonStyles from "../resources/commonStyles";

import { RegisterUserArguments, RegisterUserState } from "../../../services/user/registerUser";
import { VerifyEmailCodeState } from "../../../services/user/verifyEmailCode";
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
	verifyEmailCodeState: VerifyEmailCodeState;
	registerUserState: RegisterUserState;
}
interface SignupConfirmEmailDispatchProps {
	verifyEmailCode(validationCode: string): void;
	dropVerifyEmailCode(): void;

	registerUser(args: RegisterUserArguments): void;
	dropRegisterUser(): void;
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

				<ServiceWrapper
					serviceState={this.props.verifyEmailCodeState}
					onServiceSuccess={() => this.registerUser()}
					resetService={() => this.props.dropVerifyEmailCode()}
				/>
				<ServiceWrapper
					serviceState={this.props.registerUserState}
					onServiceSuccess={() => this.navigate("SignupConfirmed", {})}
					resetService={() => this.props.dropRegisterUser()}
				/>
				<DidiServiceButton
					disabled={!this.canPressContinueButton()}
					onPress={() => this.onPressContinueButton()}
					title={strings.accessCommon.validateButtonText}
					isPending={
						this.props.verifyEmailCodeState.state === "PENDING" || this.props.registerUserState.state === "PENDING"
					}
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
		this.props.registerUser({
			email: this.props.email,
			password: this.props.password,
			phoneNumber: this.props.phoneNumber
		});
	}
}

const connected = didiConnect(
	SignupConfirmEmailScreen,
	(state): SignupConfirmEmailStateProps => ({
		verifyEmailCodeState: state.serviceCalls.verifyEmailCode,
		registerUserState: state.serviceCalls.registerUser
	}),
	(dispatch): SignupConfirmEmailDispatchProps => ({
		verifyEmailCode: (validationCode: string) =>
			dispatch({
				type: "SERVICE_VERIFY_EMAIL_CODE",
				serviceAction: {
					type: "START",
					args: { validationCode }
				}
			}),
		dropVerifyEmailCode: () => dispatch({ type: "SERVICE_VERIFY_EMAIL_CODE", serviceAction: { type: "DROP" } }),

		registerUser: (args: RegisterUserArguments) =>
			dispatch({ type: "SERVICE_REGISTER_USER", serviceAction: { type: "START", args } }),
		dropRegisterUser: () => dispatch({ type: "SERVICE_REGISTER_USER", serviceAction: { type: "DROP" } })
	})
);

export { connected as SignupConfirmEmailScreen };

const styles = StyleSheet.create({
	message: {
		fontSize: 20,
		textAlign: "center"
	}
});
