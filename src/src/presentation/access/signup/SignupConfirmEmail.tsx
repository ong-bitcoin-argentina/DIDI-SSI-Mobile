import React from "react";
import { Image, StyleSheet, Text } from "react-native";

import { ServiceWrapper } from "../../../services/common/ServiceWrapper";
import { DidiScreen } from "../../common/DidiScreen";
import { DidiServiceButton } from "../../util/DidiServiceButton";
import DidiTextInput from "../../util/DidiTextInput";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import commonStyles from "../resources/commonStyles";

import { VerifyEmailCodeState } from "../../../services/user/verifyEmailCode";
import { didiConnect } from "../../../store/store";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import strings from "../../resources/strings";
import Validator from "../helpers/validator";

import { SignupConfirmedProps } from "./SignupConfirmed";

export type SignupConfirmEmailProps = {};
interface SignupConfirmEmailStateProps {
	verifyEmailCodeState: VerifyEmailCodeState;
}
interface SignupConfirmEmailDispatchProps {
	verifyEmailCode(validationCode: string): void;
	dropVerifyEmailCode(): void;
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
					onServiceSuccess={() => this.navigate("SignupConfirmed", {})}
					resetService={() => this.props.dropVerifyEmailCode()}
				>
					<DidiServiceButton
						disabled={!this.canPressContinueButton()}
						onPress={() => this.onPressContinueButton()}
						title={strings.accessCommon.validateButtonText}
						isPending={this.props.verifyEmailCodeState.state === "PENDING"}
					/>
				</ServiceWrapper>
			</DidiScreen>
		);
	}

	private canPressContinueButton(): boolean {
		return Validator.isValidationCode(this.state.inputCode);
	}

	private onPressContinueButton() {
		this.props.verifyEmailCode(this.state.inputCode);
	}
}

const connected = didiConnect(
	SignupConfirmEmailScreen,
	(state): SignupConfirmEmailStateProps => ({
		verifyEmailCodeState: state.serviceCalls.verifyEmailCode
	}),
	(dispatch): SignupConfirmEmailDispatchProps => ({
		verifyEmailCode: (validationCode: string) =>
			dispatch({
				type: "SERVICE_VERIFY_EMAIL_CODE",
				serviceAction: {
					type: "START",
					args: { did: "did:ethr:0x460fec23bd53610bf6d0ed6c6a1bef5ec86e740d", validationCode }
				}
			}),
		dropVerifyEmailCode: () => dispatch({ type: "SERVICE_VERIFY_EMAIL_CODE", serviceAction: { type: "DROP" } })
	})
);

export { connected as SignupConfirmEmailScreen };

const styles = StyleSheet.create({
	message: {
		fontSize: 20,
		textAlign: "center"
	}
});
