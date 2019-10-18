import React, { Fragment } from "react";
import { Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import DidiButton from "../../util/DidiButton";
import DidiTextInput from "../../util/DidiTextInput";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import commonStyles from "../resources/commonStyles";

import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import strings from "../../resources/strings";
import themes from "../../resources/themes";
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
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<SafeAreaView style={commonStyles.view.area}>
					<View style={commonStyles.view.body}>
						<Text style={commonStyles.text.emphasis}>{strings.recovery.enterEmail.messageHead}</Text>

						<Image source={require("../resources/images/emailRecover.png")} style={commonStyles.image.image} />

						<DidiTextInput
							description={strings.recovery.enterEmail.emailTitle}
							placeholder=""
							tagImage={require("../resources/images/email.png")}
							textInputProps={{
								keyboardType: "email-address",
								onChangeText: text => this.setState({ email: text })
							}}
						/>

						<DidiTextInput
							description={strings.recovery.enterEmail.passwordTitle}
							placeholder=""
							tagImage={require("../resources/images/key.png")}
							textInputProps={{
								secureTextEntry: true,
								onChangeText: text => this.setState({ password: text })
							}}
						/>

						<TouchableOpacity
							onPress={() => this.navigate("ForgotPasswordEnterEmail", {})}
							style={styles.forgotPassword}
						>
							<Text>{strings.recovery.enterEmail.forgotPasswordMessage + " >"}</Text>
						</TouchableOpacity>

						<DidiButton
							onPress={() => this.navigate("RecoveryEnterPhone", {})}
							disabled={!this.canPressContinueButton()}
							title={strings.accessCommon.recoverButtonText}
						/>
					</View>
				</SafeAreaView>
			</Fragment>
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
