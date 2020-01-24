import React from "react";
import { Alert, TouchableOpacity, View } from "react-native";

import TypedObject from "../../../util/TypedObject";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import { ServiceObserver } from "../../common/ServiceObserver";
import { VerifyCodeScreen } from "../../common/VerifyCode";
import { DidiText } from "../../util/DidiText";
import DidiTextInput from "../../util/DidiTextInput";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { ValidationStateIcon } from "../../util/ValidationStateIcon";

import { Validations } from "../../../model/Validations";
import { isPendingService } from "../../../services/ServiceStateStore";
import { registerUser } from "../../../services/user/registerUser";
import { verifyEmailCode } from "../../../services/user/verifyEmailCode";
import { ValidationState } from "../../../store/selector/combinedIdentitySelector";
import { didiConnect } from "../../../store/store";
import strings from "../../resources/strings";

import { SignupConfirmedProps } from "./SignupConfirmed";

export interface SignupConfirmEmailProps {
	phoneNumber: string;
	email: string;
}
interface SignupConfirmEmailStateProps {
	verifyEmailCodePending: boolean;
	registerUserPending: boolean;
}
interface SignupConfirmEmailDispatchProps {
	verifyEmailCode(email: string, validationCode: string): void;
	registerUser: (email: string, password: string, phoneNumber: string) => void;
}
type SignupConfirmEmailInternalProps = SignupConfirmEmailProps &
	SignupConfirmEmailStateProps &
	SignupConfirmEmailDispatchProps;

interface SignupConfirmEmailState {
	password?: string;
	passwordCopy?: string;
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
		this.state = {};
	}

	render() {
		return (
			<ServiceObserver serviceKey={serviceKeyVerify} onSuccess={() => this.registerUser()}>
				<ServiceObserver serviceKey={serviceKeyRegister} onSuccess={() => this.navigate("SignupConfirmed", {})} />
				<VerifyCodeScreen
					description={strings.signup.registrationEmailSent.message}
					isContinueBlocked={this.passwordErrors().length > 0 || this.arePasswordsDifferent()}
					onPressContinueButton={inputCode => this.onPressContinueButton(inputCode)}
					isContinuePending={this.props.registerUserPending || this.props.verifyEmailCodePending}
				>
					<DidiTextInput.Password
						onChangeText={text => this.setState({ password: text })}
						descriptionType="NEW"
						stateIndicator={this.renderPasswordStateIndicator()}
					/>
					<DidiText.SignupPasswordInfo>
						(8 caracteres minimo, una de cada una de: mayusculas, minusculas, numeros, caracteres especiales)
					</DidiText.SignupPasswordInfo>
					<DidiTextInput.Password
						onChangeText={text => this.setState({ passwordCopy: text })}
						descriptionType="REPEAT"
						stateIndicator={this.renderPasswordCopyStateIndicator()}
					/>
				</VerifyCodeScreen>
			</ServiceObserver>
		);
	}

	private passwordErrors() {
		return Validations.validatePassword(this.state.password);
	}

	private arePasswordsDifferent() {
		return this.state.password !== this.state.passwordCopy;
	}

	private renderPasswordStateIndicator() {
		if (!this.state.password) {
			return undefined;
		}

		const errors = this.passwordErrors();
		if (errors.length === 0) {
			return (
				<View style={{ padding: 10, justifyContent: "center" }}>
					<ValidationStateIcon validationState={ValidationState.Approved} useWords={false} />
				</View>
			);
		} else {
			return (
				<TouchableOpacity style={{ padding: 10, justifyContent: "center" }} onPress={() => this.alertPasswordErrors()}>
					<ValidationStateIcon validationState={ValidationState.Rejected} useWords={false} />
				</TouchableOpacity>
			);
		}
	}

	private alertPasswordErrors() {
		const errors = this.passwordErrors();

		const messages = TypedObject.keys(strings.userData.changePassword.requirements).map(key => {
			const accepted = errors.find(e => e.toString() === key) === undefined;

			const indicator = accepted
				? strings.userData.changePassword.indicator.ok
				: strings.userData.changePassword.indicator.missing;
			const text = strings.userData.changePassword.requirements[key];
			return `${indicator}${text}`;
		});
		Alert.alert("Requisitos de contraseña", messages.join("\n"));
	}

	private renderPasswordCopyStateIndicator() {
		if (!this.state.passwordCopy) {
			return undefined;
		} else if (this.arePasswordsDifferent()) {
			return (
				<View style={{ padding: 10, justifyContent: "center" }}>
					<ValidationStateIcon validationState={ValidationState.Rejected} useWords={false} />
				</View>
			);
		} else {
			return (
				<View style={{ padding: 10, justifyContent: "center" }}>
					<ValidationStateIcon validationState={ValidationState.Approved} useWords={false} />
				</View>
			);
		}
	}

	private onPressContinueButton(inputCode: string) {
		this.props.verifyEmailCode(this.props.email, inputCode);
	}

	private registerUser() {
		this.props.registerUser(this.props.email, this.state.password!, this.props.phoneNumber);
	}
}

const connected = didiConnect(
	SignupConfirmEmailScreen,
	(state): SignupConfirmEmailStateProps => ({
		verifyEmailCodePending: isPendingService(state.serviceCalls[serviceKeyVerify]),
		registerUserPending: isPendingService(state.serviceCalls[serviceKeyRegister])
	}),
	(dispatch): SignupConfirmEmailDispatchProps => ({
		verifyEmailCode: (email: string, validationCode: string) =>
			dispatch(verifyEmailCode(serviceKeyVerify, email, validationCode)),

		registerUser: (email: string, password: string, phoneNumber: string) =>
			dispatch(registerUser(serviceKeyRegister, email, password, phoneNumber))
	})
);

export { connected as SignupConfirmEmailScreen };
