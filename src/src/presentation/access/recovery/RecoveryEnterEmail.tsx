import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

import { DidiScreen } from "../../common/DidiScreen";
import { ServiceObserver } from "../../common/ServiceObserver";
import { DidiServiceButton } from "../../util/DidiServiceButton";
import DidiTextInput from "../../util/DidiTextInput";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import commonStyles from "../resources/commonStyles";

import { isPendingService } from "../../../services/ServiceStateStore";
import { recoverAccount } from "../../../services/user/recoverAccount";
import { didiConnect } from "../../../store/store";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import strings from "../../resources/strings";
import { ForgotPasswordEnterEmailProps } from "../forgotPassword/ForgotPasswordEnterEmail";
import Validator from "../helpers/validator";

import { RecoveryEnterPhoneProps } from "./RecoveryEnterPhone";

export type RecoveryEnterEmailProps = {};
interface RecoveryEnterEmailStateProps {
	recoverAccountPending: boolean;
}
interface RecoveryEnterEmailDispatchProps {
	recoverAccount: (email: string, password: string) => void;
}
type RecoveryEnterEmailInternalProps = RecoveryEnterEmailProps &
	RecoveryEnterEmailStateProps &
	RecoveryEnterEmailDispatchProps;

interface RecoverEnterEmailState {
	email: string;
	password: string;
}

export interface RecoveryEnterEmailNavigation {
	ForgotPasswordEnterEmail: ForgotPasswordEnterEmailProps;
	RecoveryEnterPhone: RecoveryEnterPhoneProps;
}

const serviceKey = "RecoveryEnterEmail";

class RecoveryEnterEmailScreen extends NavigationEnabledComponent<
	RecoveryEnterEmailInternalProps,
	RecoverEnterEmailState,
	RecoveryEnterEmailNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.recovery.barTitle);

	private canPressContinueButton(): boolean {
		return this.state && this.state.password
			? this.state.password.length > 0 && Validator.isEmail(this.state.email)
			: false;
	}

	render() {
		return (
			<DidiScreen>
				<Text style={commonStyles.text.emphasis}>{strings.recovery.enterEmail.messageHead}</Text>

				<Image source={require("../resources/images/emailRecover.png")} style={commonStyles.image.image} />

				<DidiTextInput.Email onChangeText={text => this.setState({ email: text })} />

				<DidiTextInput.Password onChangeText={text => this.setState({ password: text })} descriptionType="BASIC" />

				<TouchableOpacity onPress={() => this.navigate("ForgotPasswordEnterEmail", {})} style={styles.forgotPassword}>
					<Text>{strings.recovery.enterEmail.forgotPasswordMessage + " >"}</Text>
				</TouchableOpacity>

				<ServiceObserver
					serviceKey={serviceKey}
					onSuccess={() => this.navigate("RecoveryEnterPhone", { password: this.state.password })}
				/>
				<DidiServiceButton
					onPress={() => this.onPressContinue()}
					disabled={!this.canPressContinueButton()}
					title={strings.accessCommon.recoverButtonText}
					isPending={this.props.recoverAccountPending}
				/>
			</DidiScreen>
		);
	}

	private onPressContinue() {
		this.props.recoverAccount(this.state.email, this.state.password);
	}
}

const connected = didiConnect(
	RecoveryEnterEmailScreen,
	(state): RecoveryEnterEmailStateProps => ({
		recoverAccountPending: isPendingService(state.serviceCalls[serviceKey])
	}),
	(dispatch): RecoveryEnterEmailDispatchProps => ({
		recoverAccount: (email: string, password: string) => dispatch(recoverAccount(serviceKey, email, password))
	})
);

export { connected as RecoveryEnterEmailScreen };

const styles = StyleSheet.create({
	forgotPassword: {
		flexDirection: "row",
		marginLeft: "auto",
		alignSelf: "flex-end"
	}
});
