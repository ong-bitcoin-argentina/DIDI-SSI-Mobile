import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

import { DidiScreen } from "../../common/DidiScreen";
import DidiButton from "../../util/DidiButton";
import DidiTextInput from "../../util/DidiTextInput";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import commonStyles from "../resources/commonStyles";

import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import strings from "../../resources/strings";
import { ForgotPasswordEnterEmailProps } from "../forgotPassword/ForgotPasswordEnterEmail";
import Validator from "../helpers/validator";

import { RecoveryEnterPhoneProps } from "./RecoveryEnterPhone";

export type RecoveryEnterEmailProps = {};

interface RecoverEnterEmailState {
	email: string;
	password: string;
}

export interface RecoveryEnterEmailNavigation {
	ForgotPasswordEnterEmail: ForgotPasswordEnterEmailProps;
	RecoveryEnterPhone: RecoveryEnterPhoneProps;
}

export class RecoveryEnterEmailScreen extends NavigationEnabledComponent<
	RecoveryEnterEmailProps,
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

				<DidiButton
					onPress={() => this.navigate("RecoveryEnterPhone", {})}
					disabled={!this.canPressContinueButton()}
					title={strings.accessCommon.recoverButtonText}
				/>
			</DidiScreen>
		);
	}
}

const styles = StyleSheet.create({
	forgotPassword: {
		flexDirection: "row",
		marginLeft: "auto",
		alignSelf: "flex-end"
	}
});
