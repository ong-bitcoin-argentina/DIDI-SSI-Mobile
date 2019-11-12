import React from "react";
import { Alert, StyleSheet, View } from "react-native";

import { DidiScreen } from "../../common/DidiScreen";
import { ServiceObserver } from "../../common/ServiceObserver";
import { DidiServiceButton } from "../../util/DidiServiceButton";
import DidiTextInput from "../../util/DidiTextInput";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import { isPendingService } from "../../../services/ServiceStateStore";
import { changePassword } from "../../../services/user/changePassword";
import { didiConnect } from "../../../store/store";
import Validator from "../../access/helpers/validator";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
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
	oldKey: string;
	key: string;
	keyDup: string;
};

const serviceKey = "ChangePassword";

class ChangePasswordScreen extends NavigationEnabledComponent<ChangePasswordInternalProps, ChangePasswordState, {}> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.dashboard.userData.changePassword.barTitle);

	constructor(props: ChangePasswordInternalProps) {
		super(props);
		this.state = {
			oldKey: "",
			key: "",
			keyDup: ""
		};
	}

	private canPressContinueButton(): boolean {
		return this.state.key.length > 0 && Validator.isPassword(this.state.key) && this.state.key === this.state.keyDup;
	}

	render() {
		return (
			<DidiScreen>
				<View style={styles.inputs}>
					<DidiTextInput.Password onChangeText={text => this.setState({ oldKey: text })} descriptionType="OLD" />

					<DidiTextInput.Password onChangeText={text => this.setState({ key: text })} descriptionType="NEW" />

					<DidiTextInput.Password onChangeText={text => this.setState({ keyDup: text })} descriptionType="REPEAT" />
				</View>

				<View style={styles.button}>
					<ServiceObserver serviceKey={serviceKey} onSuccess={() => this.onSuccess()} />
					<DidiServiceButton
						title={strings.dashboard.userData.changePassword.changePassword}
						disabled={!this.canPressContinueButton()}
						onPress={() => this.props.changePassword(this.state.oldKey, this.state.key)}
						isPending={this.props.changePasswordPending}
					/>
				</View>
			</DidiScreen>
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

const styles = StyleSheet.create({
	inputs: {
		marginTop: 30,
		flex: 1
	},
	button: {
		marginBottom: 30,
		flex: 0
	}
});
