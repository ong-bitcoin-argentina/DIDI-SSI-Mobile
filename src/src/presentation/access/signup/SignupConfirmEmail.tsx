import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { Text, View, Image, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import React, { Fragment } from "react";

import DidiButton from "../../util/DidiButton";
import strings from "../resources/strings";
import themes from "../../styles/themes";
import NavigationHeaderStyle from "../../styles/NavigationHeaderStyle";
import commonStyles from "../resources/commonStyles";

export interface SignupConfirmEmailNavigation {}

export type SignupConfirmEmailProps = {};

export class SignupConfirmEmailScreen extends NavigationEnabledComponent<
	SignupConfirmEmailProps,
	{},
	SignupConfirmEmailNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.recovery.barTitle);

	render() {
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />

				<SafeAreaView style={commonStyles.view.area}>
					<View style={commonStyles.view.body}>
						<Text>{""}</Text>

						<Text style={[commonStyles.text.normal, styles.message]}>
							{strings.signup.registrationEmailSent.message}
						</Text>

						<Image source={require("../resources/images/emailRecoverSent.png")} style={commonStyles.image.image} />

						<Text>{""}</Text>

						<DidiButton onPress={() => {}} title={strings.signup.registrationEmailSent.buttonText} />
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
