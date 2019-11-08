import React from "react";
import { Image, Text } from "react-native";

import commonStyles from "../../../access/resources/commonStyles";
import { DidiScreen } from "../../../common/DidiScreen";
import { ServiceObserver } from "../../../common/ServiceObserver";
import { DidiServiceButton } from "../../../util/DidiServiceButton";
import DidiTextInput from "../../../util/DidiTextInput";
import NavigationEnabledComponent from "../../../util/NavigationEnabledComponent";

import { isPendingService } from "../../../../services/ServiceStateStore";
import { sendMailValidator } from "../../../../services/user/sendMailValidator";
import { didiConnect } from "../../../../store/store";
import Validator from "../../../access/helpers/validator";
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

interface RecoverEnterEmailState {
	email: string;
	password: string;
}

export interface ChangeEmailEnterEmailNavigation {
	ChangeEmailVerifyEmail: ChangeEmailVerifyScreenProps;
}

const serviceKey = "ChangeEmailEnterEmail";

class ChangeEmailEnterEmailScreen extends NavigationEnabledComponent<
	ChangeEmailEnterEmailInternalProps,
	RecoverEnterEmailState,
	ChangeEmailEnterEmailNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Cambiar Email");

	private canPressContinueButton(): boolean {
		return this.state && this.state.password
			? this.state.password.length > 0 && Validator.isEmail(this.state.email)
			: false;
	}

	render() {
		return (
			<DidiScreen>
				<Text style={commonStyles.text.emphasis}>{strings.recovery.enterEmail.messageHead}</Text>

				<Image source={require("../../../access/resources/images/emailRecover.png")} style={commonStyles.image.image} />

				<DidiTextInput.Email onChangeText={text => this.setState({ email: text })} />

				<DidiTextInput.Password onChangeText={text => this.setState({ password: text })} descriptionType="BASIC" />

				<ServiceObserver
					serviceKey={serviceKey}
					onSuccess={() => this.navigate("ChangeEmailVerifyEmail", { email: this.state.email })}
				/>
				<DidiServiceButton
					onPress={() => this.onPressContinue()}
					disabled={!this.canPressContinueButton()}
					title={strings.accessCommon.recoverButtonText}
					isPending={this.props.sendMailValidatorPending}
				/>
			</DidiScreen>
		);
	}

	private onPressContinue() {
		this.props.sendMailValidator(this.state.email, this.state.password);
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
