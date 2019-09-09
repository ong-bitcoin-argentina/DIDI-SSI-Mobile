import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, StatusBar } from "react-native";
import React, { Fragment } from "react";

import DidiButton from "../../util/DidiButton";
import strings from "../resources/strings";
import themes from "../../styles/themes";
import DidiTextInput from "../../util/DidiTextInput";
import NavigationHeaderStyle from "../../styles/NavigationHeaderStyle";
import { RecoveryEnterPhoneProps } from "./RecoveryEnterPhone";
import { ForgotPasswordEnterEmailProps } from "../forgotPassword/ForgotPasswordEnterEmail";
import commonStyles from "../resources/commonStyles";
import Validator from "../helpers/validator";

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
