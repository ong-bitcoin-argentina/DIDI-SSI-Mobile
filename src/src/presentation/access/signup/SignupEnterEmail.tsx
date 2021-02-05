import React from "react";

import { EnterEmailScreen } from "../../common/EnterEmail";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import { ServiceObserver } from "../../common/ServiceObserver";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import { isPendingService } from "../../../services/ServiceStateStore";
import { sendMailValidator } from "../../../services/user/sendMailValidator";
import { didiConnect } from "../../../store/store";
import strings from "../../resources/strings";

import { SignupConfirmEmailProps } from "./SignupConfirmEmail";

export interface SignupEnterEmailProps {
	phoneNumber: string;
}
interface SignupEnterEmailStateProps {
	requestEmailCodePending: boolean;
}
interface SignupEnterEmailDispatchProps {
	requestEmailCode: (email: string) => void;
}
type SignupEnterEmailInternalProps = SignupEnterEmailStateProps & SignupEnterEmailDispatchProps & SignupEnterEmailProps;

interface SignupEnterEmailState {
	email: string;
}

export interface SignupEnterEmailNavigation {
	SignupConfirmEmail: SignupConfirmEmailProps;
}

const serviceKey = "SignupEnterEmail";

class SignupEnterEmailScreen extends NavigationEnabledComponent<
	SignupEnterEmailInternalProps,
	SignupEnterEmailState,
	SignupEnterEmailNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.signup.barTitle);

	render() {
		return (
			<ServiceObserver serviceKey={serviceKey} onSuccess={() => this.advance()}>
				<EnterEmailScreen
					description={strings.signup.enterEmail.messageHead}
					contentImageSource={require("../../resources/images/saveClean.png")}
					buttonTitle={strings.accessCommon.validateButtonText}
					isPasswordRequired={false}
					onPressContinueButton={email => this.onPressContinueButton(email)}
					isContinuePending={this.props.requestEmailCodePending}
				/>
			</ServiceObserver>
		);
	}

	private onPressContinueButton(email: string) {
		this.props.requestEmailCode(email);
		this.setState({ email });
	}

	private advance() {
		this.navigate("SignupConfirmEmail", {
			phoneNumber: this.props.phoneNumber,
			email: this.state.email
		});
	}
}

const connected = didiConnect(
	SignupEnterEmailScreen,
	(state): SignupEnterEmailStateProps => ({
		requestEmailCodePending: isPendingService(state.serviceCalls[serviceKey])
	}),
	(dispatch): SignupEnterEmailDispatchProps => ({
		requestEmailCode: (email: string) => dispatch(sendMailValidator(serviceKey, email, null, true))
	})
);

export { connected as SignupEnterEmailScreen };
