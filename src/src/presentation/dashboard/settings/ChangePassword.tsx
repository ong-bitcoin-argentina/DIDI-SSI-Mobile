import React from "react";
import { Alert } from "react-native";

import { DidiScrollScreen } from "../../common/DidiScreen";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import { ServiceObserver } from "../../common/ServiceObserver";
import { DidiServiceButton } from "../../util/DidiServiceButton";
import { DidiText } from "../../util/DidiText";
import DidiTextInput from "../../util/DidiTextInput";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { PasswordPickComponent } from "../common/PasswordPickComponent";

import { isPendingService } from "../../../services/ServiceStateStore";
import { changePassword } from "../../../services/user/changePassword";
import { didiConnect } from "../../../store/store";
import strings from "../../resources/strings";

export type ChangePasswordProps = {};
interface ChangePasswordStateProps {
	changePasswordPending: boolean;
}
interface ChangePasswordDispatchProps {
	changePassword: (oldPass: string, newPass: string) => void;
}
type ChangePasswordInternalProps = ChangePasswordProps & ChangePasswordStateProps & ChangePasswordDispatchProps;

type ChangePasswordState = {
	oldPassword: string;
	password: string | null;
};

const serviceKey = "ChangePassword";

class ChangePasswordScreen extends NavigationEnabledComponent<ChangePasswordInternalProps, ChangePasswordState, {}> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.userData.changePassword.barTitle);

	constructor(props: ChangePasswordInternalProps) {
		super(props);
		this.state = {
			oldPassword: "",
			password: null
		};
	}

	render() {
		return (
			<DidiScrollScreen>
				<DidiText.ChangePassword.Emphasis>
					{strings.userData.changePassword.explanation}
				</DidiText.ChangePassword.Emphasis>

				<DidiTextInput.Password onChangeText={text => this.setState({ oldPassword: text })} descriptionType="OLD" />

				<PasswordPickComponent
					showFullPasswordRequirements={true}
					onPasswordChange={password => this.setState({ password })}
				/>

				<ServiceObserver serviceKey={serviceKey} onSuccess={() => this.onSuccess()} />
				<DidiServiceButton
					title={strings.userData.changePassword.changePassword}
					disabled={this.state.oldPassword.length === 0 || this.state.password === null}
					onPress={() => this.props.changePassword(this.state.oldPassword, this.state.password!)}
					isPending={this.props.changePasswordPending}
				/>
			</DidiScrollScreen>
		);
	}

	private onSuccess() {
		Alert.alert(strings.services.changePasswordSuccess);
		this.goBack();
	}
}

const connected = didiConnect(
	ChangePasswordScreen,
	(state): ChangePasswordStateProps => ({
		changePasswordPending: isPendingService(state.serviceCalls[serviceKey])
	}),
	(dispatch): ChangePasswordDispatchProps => ({
		changePassword: (oldPassword, newPassword) => dispatch(changePassword(serviceKey, oldPassword, newPassword))
	})
);

export { connected as ChangePasswordScreen };
