import React from "react";

import { EnterEmailScreen } from "../../common/EnterEmail";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import { ServiceObserver } from "../../common/ServiceObserver";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import { isPendingService } from "../../../services/ServiceStateStore";
import { sendMailValidator } from "../../../services/user/sendMailValidator";
import { didiConnect } from "../../../store/store";
import strings from "../../resources/strings";

import { ForgotPasswordEmailSentProps } from "./ForgotPasswordEmailSent";

export interface ForgotPasswordEnterEmailProps {}
interface ForgotPasswordEnterEmailStateProps {
	sendMailValidatorPending: boolean;
}
interface ForgotPasswordEnterEmailDispatchProps {
	sendMailValidator: (newEmail: string) => void;
}
type ForgotPasswordEnterEmailInternalProps = ForgotPasswordEnterEmailProps &
	ForgotPasswordEnterEmailStateProps &
	ForgotPasswordEnterEmailDispatchProps;

interface ForgotPasswordEnterEmailState {
	email: string;
}

export interface ForgotPasswordEnterEmailNavigation {
	ForgotPasswordEmailSent: ForgotPasswordEmailSentProps;
}

const serviceKey = "ForgotPasswordEnterEmail";

class ForgotPasswordEnterEmailScreen extends NavigationEnabledComponent<
	ForgotPasswordEnterEmailInternalProps,
	ForgotPasswordEnterEmailState,
	ForgotPasswordEnterEmailNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.recovery.barTitle);

	constructor(props: ForgotPasswordEnterEmailInternalProps) {
		super(props);
		this.state = {
			email: ""
		};
	}

	render() {
		return (
			<ServiceObserver
				serviceKey={serviceKey}
				onSuccess={() => this.navigate("ForgotPasswordEmailSent", { email: this.state.email })}
			>
				<EnterEmailScreen
					description={strings.recovery.passwordRecover.messageHead}
					contentImageSource={require("../../resources/images/recoverPassword.png")}
					buttonTitle={strings.accessCommon.recoverButtonText}
					isPasswordRequired={false}
					onPressContinueButton={(email, password) => this.onPressContinueButton(email)}
					isContinuePending={false}
				/>
			</ServiceObserver>
		);
	}

	private onPressContinueButton(email: string) {
		this.setState({ email });
		this.props.sendMailValidator(email);
	}
}

const connected = didiConnect(
	ForgotPasswordEnterEmailScreen,
	(state): ForgotPasswordEnterEmailStateProps => ({
		sendMailValidatorPending: isPendingService(state.serviceCalls[serviceKey])
	}),
	(dispatch): ForgotPasswordEnterEmailDispatchProps => ({
		sendMailValidator: (newEmail: string) => dispatch(sendMailValidator(serviceKey, newEmail, null))
	})
);

export { connected as ForgotPasswordEnterEmailScreen };
