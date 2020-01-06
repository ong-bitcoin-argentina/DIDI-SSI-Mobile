import React from "react";
import { Alert, StyleSheet, View } from "react-native";

import TypedObject from "../../../util/TypedObject";
import { DidiScreen } from "../../common/DidiScreen";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import { ServiceObserver } from "../../common/ServiceObserver";
import { DidiServiceButton } from "../../util/DidiServiceButton";
import { DidiText } from "../../util/DidiText";
import DidiTextInput from "../../util/DidiTextInput";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import { Validations } from "../../../model/Validations";
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
	oldKey: string;
	key: string;
	keyDup: string;
};

const serviceKey = "ChangePassword";

class ChangePasswordScreen extends NavigationEnabledComponent<ChangePasswordInternalProps, ChangePasswordState, {}> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.userData.changePassword.barTitle);

	constructor(props: ChangePasswordInternalProps) {
		super(props);
		this.state = {
			oldKey: "",
			key: "",
			keyDup: ""
		};
	}

	private canPressContinueButton(): boolean {
		return (
			Validations.isPassword(this.state.oldKey) &&
			Validations.isPassword(this.state.key) &&
			this.state.key === this.state.keyDup
		);
	}

	render() {
		return (
			<DidiScreen>
				<DidiText.Explanation.Emphasis>{strings.userData.changePassword.explanation}</DidiText.Explanation.Emphasis>

				<DidiTextInput.Password onChangeText={text => this.setState({ oldKey: text })} descriptionType="OLD" />

				<View>
					<DidiText.Explanation.Normal style={styles.explanation}>
						{strings.userData.changePassword.requirementHeader}
					</DidiText.Explanation.Normal>
					{TypedObject.keys(strings.userData.changePassword.requirements).map(key => {
						const text = strings.userData.changePassword.requirements[key];
						return (
							<DidiText.ValidateIdentity.EnumerationItem key={key}>{text}</DidiText.ValidateIdentity.EnumerationItem>
						);
					})}
				</View>

				<View>
					<DidiTextInput.Password onChangeText={text => this.setState({ key: text })} descriptionType="NEW" />

					<DidiTextInput.Password onChangeText={text => this.setState({ keyDup: text })} descriptionType="REPEAT" />
				</View>

				<ServiceObserver serviceKey={serviceKey} onSuccess={() => this.onSuccess()} />
				<DidiServiceButton
					title={strings.userData.changePassword.changePassword}
					disabled={!this.canPressContinueButton()}
					onPress={() => this.props.changePassword(this.state.oldKey, this.state.key)}
					isPending={this.props.changePasswordPending}
				/>
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
	explanation: {
		textAlign: undefined
	}
});
