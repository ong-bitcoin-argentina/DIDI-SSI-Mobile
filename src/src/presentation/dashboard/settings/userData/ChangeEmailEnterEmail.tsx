import React from "react";

import { EnterEmailScreen } from "../../../common/EnterEmail";
import NavigationHeaderStyle from "../../../common/NavigationHeaderStyle";
import { ServiceObserver } from "../../../common/ServiceObserver";
import NavigationEnabledComponent from "../../../util/NavigationEnabledComponent";

import { isPendingService } from "../../../../services/ServiceStateStore";
import { sendMailValidator } from "../../../../services/user/sendMailValidator";
import { didiConnect } from "../../../../store/store";
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
	newEmail: string;
	password: string;
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
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.userData.changeEmail.screenTitle);

	constructor(props: ChangeEmailEnterEmailInternalProps) {
		super(props);
		this.state = {
			newEmail: "",
			password: ""
		};
	}

	render() {
		return (
			<ServiceObserver serviceKey={serviceKey} onSuccess={() => this.advance()}>
				<EnterEmailScreen
					description={strings.userData.changeEmail.messageHead}
					contentImageSource={require("../../../resources/images/emailRecover.png")}
					buttonTitle={strings.accessCommon.validateButtonText}
					isPasswordRequired={true}
					onPressContinueButton={(email, password) => this.onPressContinueButton(email, password)}
					isContinuePending={this.props.sendMailValidatorPending}
				/>
			</ServiceObserver>
		);
	}

	private onPressContinueButton(newEmail: string, password: string) {
		this.setState({ newEmail, password });
		this.props.sendMailValidator(newEmail, password);
	}

	private advance() {
		this.navigate("ChangeEmailVerifyEmail", { newEmail: this.state.newEmail, password: this.state.password });
	}
}

const connected = didiConnect(
	ChangeEmailEnterEmailScreen,
	(state): ChangeEmailEnterEmailStateProps => ({
		sendMailValidatorPending: isPendingService(state.serviceCalls[serviceKey])
	}),
	(dispatch): ChangeEmailEnterEmailDispatchProps => ({
		sendMailValidator: (newEmail: string, password: string) =>
			dispatch(sendMailValidator(serviceKey, newEmail, password, true))
	})
);

export { connected as ChangeEmailEnterEmailScreen };
