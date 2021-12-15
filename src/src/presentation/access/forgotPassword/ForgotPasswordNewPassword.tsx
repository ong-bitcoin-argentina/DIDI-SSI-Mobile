import React from "react";

import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import { VerifyCodeWrapper } from "../../common/VerifyCodeWrapper";
import { PasswordPickComponent } from "../../dashboard/common/PasswordPickComponent";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import { recoverPassword } from "../../../services/user/recoverPassword";
import { sendMailValidator } from "../../../services/user/sendMailValidator";
import { DashboardScreenProps } from "../../dashboard/home/Dashboard";
import strings from "../../resources/strings";

export interface ForgotPasswordNewPasswordProps {
	email: string;
}
interface ForgotPasswordNewPasswordStateProps {
	recoverPasswordPending: boolean;
}
interface ForgotPasswordNewPasswordDispatchProps {
	recoverPassword: (email: string, validationCode: string, newPassword: string) => void;
}
type ForgotPasswordNewPasswordInternalProps = ForgotPasswordNewPasswordProps &
	ForgotPasswordNewPasswordStateProps &
	ForgotPasswordNewPasswordDispatchProps;

interface ForgotPasswordNewPasswordState {
	password: string | null;
}

export interface ForgotPasswordNewPasswordNavigation {
	Dashboard: DashboardScreenProps;
}

export class ForgotPasswordNewPasswordScreen extends NavigationEnabledComponent<
	ForgotPasswordNewPasswordInternalProps,
	ForgotPasswordNewPasswordState,
	ForgotPasswordNewPasswordNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.recovery.passwordChange.barTitle);

	constructor(props: ForgotPasswordNewPasswordInternalProps) {
		super(props);
		this.state = {
			password: null
		};
	}

	render() {
		console.log('ForgotPasswordNewPasswordScreen');
		console.log(this.props);
		return (
			<VerifyCodeWrapper
				description={strings.recovery.passwordChange.messageHead}
				contentImageSource={require("../../resources/images/recoverPassword.png")}
				serviceButtonText={strings.accessCommon.recoverButtonText+'FFFFFFFFFFFF'}
				isServiceBlocked={this.state.password === null}
				serviceCall={(serviceKey, validationCode) =>
					recoverPassword(serviceKey, this.props.email, validationCode, this.state.password!)
				}
				onServiceSuccess={() => this.navigate("Dashboard", {})}
				onResendCodePress={serviceKey => sendMailValidator(serviceKey, this.props.email, null)}
			>
				<PasswordPickComponent onPasswordChange={password => this.setState({ password })} />
			</VerifyCodeWrapper>
		);
	}
}
