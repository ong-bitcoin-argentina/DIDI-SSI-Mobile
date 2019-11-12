import React from "react";

import { EnterEmailScreen } from "../../common/EnterEmail";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import strings from "../../resources/strings";

import { ForgotPasswordEmailSentProps } from "./ForgotPasswordEmailSent";

export type ForgotPasswordEnterEmailProps = {};

export interface ForgotPasswordEnterEmailNavigation {
	ForgotPasswordEmailSent: ForgotPasswordEmailSentProps;
}

export class ForgotPasswordEnterEmailScreen extends NavigationEnabledComponent<
	ForgotPasswordEnterEmailProps,
	{},
	ForgotPasswordEnterEmailNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.recovery.barTitle);

	render() {
		return (
			<EnterEmailScreen
				description={strings.recovery.passwordRecover.messageHead}
				contentImageSource={require("../../resources/images/recoverPassword.png")}
				buttonTitle={strings.accessCommon.recoverButtonText}
				isPasswordRequired={false}
				onPressContinueButton={(email, password) => this.sendEmail(email, password)}
				isContinuePending={false}
			/>
		);
	}

	private sendEmail(email: string, password: string | null) {
		// TODO send verification email....
		this.navigate("ForgotPasswordEmailSent", { email });
	}
}
