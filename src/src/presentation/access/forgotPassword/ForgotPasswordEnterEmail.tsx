import React, { Fragment } from "react";

import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { ForgotPasswordEmailSentProps } from "./ForgotPasswordEmailSent";

import strings from "../resources/strings";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import { StatusBar, View, Text, Image, StyleSheet } from "react-native";
import themes from "../../resources/themes";
import { SafeAreaView } from "react-navigation";
import commonStyles from "../resources/commonStyles";
import DidiTextInput from "../../util/DidiTextInput";
import DidiButton from "../../util/DidiButton";
import Validator from "../helpers/validator";

export type ForgotPasswordEnterEmailProps = {};

export interface ForgotPasswordEnterEmailNavigation {
	ForgotPasswordEmailSent: ForgotPasswordEmailSentProps;
}

interface ForgotPasswordEnterEmailState {
	inputEmail: string;
}

export class ForgotPasswordEnterEmailScreen extends NavigationEnabledComponent<
	ForgotPasswordEnterEmailProps,
	ForgotPasswordEnterEmailState,
	ForgotPasswordEnterEmailNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.recovery.barTitle);

	private canPressContinueButton(): boolean {
		return this.state ? Validator.isEmail(this.state.inputEmail) : false;
	}

	sendEmail = () => {
		// TODO send verification email....
		this.navigate("ForgotPasswordEmailSent", { email: this.state.inputEmail });
	};

	render() {
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<SafeAreaView style={commonStyles.view.area}>
					<View style={commonStyles.view.body}>
						<Text style={[commonStyles.text.emphasis, styles.messageHead]}>
							{strings.recovery.passwordRecover.messageHead}
						</Text>
						<Image source={require("../resources/images/recoverPassword.png")} style={commonStyles.image.image} />

						<DidiTextInput
							description={strings.recovery.passwordRecover.emailTitle}
							placeholder=""
							tagImage={require("../resources/images/email.png")}
							textInputProps={{
								keyboardType: "email-address",
								onChangeText: text => this.setState({ inputEmail: text })
							}}
						/>

						<View />

						<DidiButton
							onPress={this.sendEmail}
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
	messageHead: {
		fontSize: 19
	}
});
