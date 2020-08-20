import React, { Fragment } from "react";

import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import { VerifyCodeWrapper } from "../../common/VerifyCodeWrapper";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import { sendSmsValidator } from "../../../services/user/sendSmsValidator";
import { verifySmsCode } from "../../../services/user/verifySmsCode";
import strings from "../../resources/strings";

import { SignupPhoneVerifiedProps } from "./SignupPhoneVerified";
import { didiConnect } from "../../../store/store";
import { CodeState } from "../../../store/reducers/phoneVerificationReducer";
import { Text, StyleSheet } from "react-native";
import { DidiText } from "../../util/DidiText";

interface SignupVerifyPhoneStateProps {
	codeConfirmation: CodeState;
}
export interface SignupVerifyPhoneProps {
	phoneNumber: string;
}

export interface SignupVerifyPhoneNavigation {
	SignupPhoneVerified: SignupPhoneVerifiedProps;
}

const SignupVerifyPhoneScreen = class SignupVerifyPhoneScreen extends NavigationEnabledComponent<
	SignupVerifyPhoneProps & SignupVerifyPhoneStateProps,
	{},
	SignupVerifyPhoneNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Registro");

	render() {
		return (
			<Fragment>
				<DidiText.Explanation.Emphasis style={styles.description}>
					QA: {this.props.codeConfirmation.code}
				</DidiText.Explanation.Emphasis>
				<VerifyCodeWrapper
					description={strings.accessCommon.verify.phoneMessageHead}
					contentImageSource={require("../../resources/images/phoneRecover.png")}
					serviceCall={(serviceKey, validationCode) => verifySmsCode(serviceKey, this.props.phoneNumber, validationCode)}
					onServiceSuccess={() => this.navigate("SignupPhoneVerified", { phoneNumber: this.props.phoneNumber })}
					onResendCodePress={serviceKey => sendSmsValidator(serviceKey, this.props.phoneNumber, null)}
				/>
			</Fragment>
		);
	}
}

const connected = didiConnect(
	SignupVerifyPhoneScreen,
	(state) : SignupVerifyPhoneStateProps => ({
		codeConfirmation: state.codeConfirmation
	})
);

export { connected as SignupVerifyPhoneScreen };

const styles = StyleSheet.create({
	description: {
		fontSize: 14
	}
});
