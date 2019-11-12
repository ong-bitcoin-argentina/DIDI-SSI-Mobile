import React from "react";

import { EnterEmailScreen } from "../../../common/EnterEmail";
import { ServiceObserver } from "../../../common/ServiceObserver";
import NavigationEnabledComponent from "../../../util/NavigationEnabledComponent";

import { isPendingService } from "../../../../services/ServiceStateStore";
import { sendMailValidator } from "../../../../services/user/sendMailValidator";
import { didiConnect } from "../../../../store/store";
import NavigationHeaderStyle from "../../../resources/NavigationHeaderStyle";
import strings from "../../../resources/strings";

import { ChangeEmailVerifyScreenProps } from "./ChangeEmailVerifyEmail";

export type ChangeEmailEnterEmailProps = {};
interface ChangeEmailEnterEmailStateProps {
	sendMailValidatorPending: boolean;
}
interface ChangeEmailEnterEmailDispatchProps {
	sendMailValidator: (newEmail: string, password: string) => void;
}
type ChangeEmailEnterEmailInternalProps = ChangeEmailEnterEmailProps &
	ChangeEmailEnterEmailStateProps &
	ChangeEmailEnterEmailDispatchProps;

interface ChangeEmailEnterEmailState {
	email: string;
}

export interface ChangeEmailEnterEmailNavigation {
	ChangeEmailVerifyEmail: ChangeEmailVerifyScreenProps;
}

const serviceKey = "ChangeEmailEnterEmail";

class ChangeEmailEnterEmailScreen extends NavigationEnabledComponent<
	ChangeEmailEnterEmailInternalProps,
	ChangeEmailEnterEmailState,
	ChangeEmailEnterEmailNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Cambiar Email");

	render() {
		return (
			<ServiceObserver serviceKey={serviceKey} onSuccess={() => this.advance()}>
				<EnterEmailScreen
					description={strings.recovery.enterEmail.messageHead}
					contentImageSource={require("../../../resources/images/emailRecover.png")}
					buttonTitle={strings.accessCommon.recoverButtonText}
					isPasswordRequired={true}
					onPressContinueButton={(email, password) => this.onPressContinueButton(email, password!)}
					isContinuePending={this.props.sendMailValidatorPending}
				/>
			</ServiceObserver>
		);
	}

	private onPressContinueButton(email: string, password: string) {
		this.setState({ email });
		this.props.sendMailValidator(email, password);
	}

	private advance() {
		this.navigate("ChangeEmailVerifyEmail", { email: this.state.email });
	}
}

const connected = didiConnect(
	ChangeEmailEnterEmailScreen,
	(state): ChangeEmailEnterEmailStateProps => ({
		sendMailValidatorPending: isPendingService(state.serviceCalls[serviceKey])
	}),
	(dispatch): ChangeEmailEnterEmailDispatchProps => ({
		sendMailValidator: (newEmail: string, password: string) =>
			dispatch(sendMailValidator(serviceKey, newEmail, password))
	})
);

export { connected as ChangeEmailEnterEmailScreen };
