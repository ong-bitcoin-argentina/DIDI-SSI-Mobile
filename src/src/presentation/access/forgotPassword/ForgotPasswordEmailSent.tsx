import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import React, { Fragment } from "react";
import { StatusBar, View, Image, Text, StyleSheet } from "react-native";
import themes from "../../resources/themes";
import { SafeAreaView } from "react-navigation";
import commonStyles from "../resources/commonStyles";
import strings from "../resources/strings";
import DidiButton from "../../util/DidiButton";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import { ForgotPasswordConfirmEmailProps } from "./ForgotPasswordConfirmEmail";

export type ForgotPasswordEmailSentProps = {};

export interface ForgotPasswordEmailSentNavigation {
	ForgotPasswordConfirmEmail: ForgotPasswordConfirmEmailProps;
}

export class ForgotPasswordEmailSentScreen extends NavigationEnabledComponent<
	ForgotPasswordEmailSentProps,
	{},
	ForgotPasswordEmailSentNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.recovery.barTitle);

	render() {
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<SafeAreaView style={commonStyles.view.area}>
					<View style={commonStyles.view.body}>
						<View />

						<Image source={require("../resources/images/emailSent.png")} style={commonStyles.image.image} />

						<Text style={[commonStyles.text.normal, styles.message]}>
							{strings.recovery.passwordRecoverEmailSent.message}
						</Text>

						<View />

						<DidiButton
							onPress={() => {
								this.navigate("ForgotPasswordConfirmEmail", {});
							}}
							title={strings.recovery.passwordRecoverEmailSent.buttonText}
						/>
					</View>
				</SafeAreaView>
			</Fragment>
		);
	}
}

const styles = StyleSheet.create({
	message: {
		fontSize: 20,
		textAlign: "center"
	}
});
