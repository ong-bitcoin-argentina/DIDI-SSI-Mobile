import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { RNUportHDSigner } from "react-native-uport-signer";

import { ServiceWrapper } from "../../../services/common/ServiceWrapper";
import { DidiScreen } from "../../common/DidiScreen";
import DidiButton from "../../util/DidiButton";
import { DidiServiceButton } from "../../util/DidiServiceButton";
import DidiTextInput from "../../util/DidiTextInput";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import commonStyles from "../resources/commonStyles";

import { RecoverAccountState } from "../../../services/user/recoverAccount";
import { didiConnect } from "../../../store/store";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import strings from "../../resources/strings";
import { ForgotPasswordEnterEmailProps } from "../forgotPassword/ForgotPasswordEnterEmail";
import Validator from "../helpers/validator";

import { RecoveryEnterPhoneProps } from "./RecoveryEnterPhone";

export type RecoveryEnterEmailProps = {};
interface RecoveryEnterEmailStateProps {
	recoverAccountState: RecoverAccountState;
}
interface RecoveryEnterEmailDispatchProps {
	recoverAccount(email: string, password: string): void;
	dropRecoverAccount(): void;
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

				<ServiceWrapper
					serviceState={this.props.recoverAccountState}
					onServiceSuccess={() => this.regenerateAccount()}
					resetService={() => this.props.dropRecoverAccount()}
				/>
				<DidiServiceButton
					onPress={() => this.onPressContinue()}
					disabled={!this.canPressContinueButton()}
					title={strings.accessCommon.recoverButtonText}
					isPending={this.props.recoverAccountState.state === "PENDING"}
				/>
			</DidiScreen>
		);
	}

	private onPressContinue() {
		this.props.recoverAccount(this.state.email, this.state.password);
	}

	private async regenerateAccount() {
		if (this.props.recoverAccountState.state !== "SUCCESS") {
			return;
		}
		const phrase = this.props.recoverAccountState.value.privateKeySeed;
		await RNUportHDSigner.importSeed(phrase, "simple");
		this.navigate("RecoveryEnterPhone", {});
	}
}

const connected = didiConnect(
	RecoveryEnterEmailScreen,
	(state): RecoveryEnterEmailStateProps => ({
		recoverAccountState: state.serviceCalls.recoverAccount
	}),
	(dispatch): RecoveryEnterEmailDispatchProps => ({
		recoverAccount: (email: string, password: string) =>
			dispatch({ type: "SERVICE_RECOVER_ACCOUNT", serviceAction: { type: "START", args: { email, password } } }),
		dropRecoverAccount: () => dispatch({ type: "SERVICE_RECOVER_ACCOUNT", serviceAction: { type: "DROP" } })
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
