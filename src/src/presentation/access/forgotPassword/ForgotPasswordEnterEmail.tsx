import React, { Fragment } from "react";

import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { ForgotPasswordEmailSentProps } from "./ForgotPasswordEmailSent";

import strings from "../resources/strings";
import { ForgotPasswordEnterEmailProps } from "../forgotPassword/ForgotPasswordEnterEmail";
import NavigationHeaderStyle from "../../styles/NavigationHeaderStyle";

export type ForgotPasswordEnterEmailProps = {};

export interface ForgotPasswordEnterEmailNavigation {
	ForgotPasswordEmailSent: ForgotPasswordEmailSentProps;
}

interface ForgotPasswordEnterEmailState {
	inputPhoneNumber: string;
}

export class ForgotPasswordEnterEmailScreen extends NavigationEnabledComponent<
	ForgotPasswordEnterEmailProps,
	ForgotPasswordEnterEmailState,
	ForgotPasswordEnterEmailNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.recovery.barTitle);

	private canPressContinueButton(): boolean {
		return this.state && this.state.inputPhoneNumber ? this.state.inputPhoneNumber.length > 0 : false;
	}

	render() {
		return <Fragment></Fragment>;
	}
}
