import React from "react";
import { Image, Text, View } from "react-native";

import { DidiScreen } from "../../common/DidiScreen";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import { ServiceObserver } from "../../common/ServiceObserver";
import commonStyles from "../../resources/commonStyles";
import { DidiServiceButton } from "../../util/DidiServiceButton";
import DidiTextInput from "../../util/DidiTextInput";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import { isPendingService } from "../../../services/ServiceStateStore";
import { recoverPassword } from "../../../services/user/recoverPassword";
import { didiConnect } from "../../../store/store";
import { DashboardScreenProps } from "../../dashboard/home/Dashboard";
import strings from "../../resources/strings";
import Validator from "../helpers/validator";

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
	password: string;
	passwordCopy: string;
	verificationCode: string;
}

export interface ForgotPasswordNewPasswordNavigation {
	Dashboard: DashboardScreenProps;
}

const serviceKey = "RecoverPassword";

class ForgotPasswordNewPasswordScreen extends NavigationEnabledComponent<
	ForgotPasswordNewPasswordInternalProps,
	ForgotPasswordNewPasswordState,
	ForgotPasswordNewPasswordNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.recovery.passwordChange.barTitle);

	constructor(props: ForgotPasswordNewPasswordInternalProps) {
		super(props);
		this.state = {
			verificationCode: "",
			password: "",
			passwordCopy: ""
		};
	}

	private canPressContinueButton(): boolean {
		return Validator.isPassword(this.state.password) && this.state.passwordCopy === this.state.password;
	}

	render() {
		return (
			<DidiScreen>
				<Text style={commonStyles.text.emphasis}>{strings.recovery.passwordChange.messageHead}</Text>

				<Image source={require("../../resources/images/recoverPassword.png")} style={commonStyles.image.image} />

				<DidiTextInput.VerificationCode onChangeText={text => this.setState({ verificationCode: text })} />

				<DidiTextInput.Password onChangeText={text => this.setState({ password: text })} descriptionType="NEW" />

				<DidiTextInput.Password onChangeText={text => this.setState({ passwordCopy: text })} descriptionType="REPEAT" />

				<View />

				<ServiceObserver serviceKey={serviceKey} onSuccess={() => this.navigate("Dashboard", {})} />
				<DidiServiceButton
					title={strings.accessCommon.recoverButtonText}
					disabled={!this.canPressContinueButton()}
					onPress={() => this.props.recoverPassword(this.props.email, this.state.verificationCode, this.state.password)}
					isPending={this.props.recoverPasswordPending}
				/>
			</DidiScreen>
		);
	}
}

const connected = didiConnect(
	ForgotPasswordNewPasswordScreen,
	(state): ForgotPasswordNewPasswordStateProps => ({
		recoverPasswordPending: isPendingService(state.serviceCalls[serviceKey])
	}),
	(dispatch): ForgotPasswordNewPasswordDispatchProps => ({
		recoverPassword: (email: string, validationCode: string, newPassword: string) =>
			dispatch(recoverPassword(serviceKey, email, validationCode, newPassword))
	})
);

export { connected as ForgotPasswordNewPasswordScreen };
