import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import React, { Fragment } from "react";
import { StatusBar, View, Image, Text, StyleSheet } from "react-native";
import themes from "../../styles/themes";
import { SafeAreaView } from "react-navigation";
import commonStyles from "../resources/commonStyles";
import strings from "../resources/strings";
import DidiButton from "../../util/DidiButton";
import NavigationHeaderStyle from "../../styles/NavigationHeaderStyle";

export type ForgotPasswordEmailSentProps = {};

export interface ForgotPasswordEmailSentNavigation {}

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
						<Image source={require("../resources/images/emailRecoverSent.png")} style={styles.imageBig} />

						<Text>{""}</Text>

						<Text style={[commonStyles.text.normal, styles.message]}>
							{strings.recovery.passwordRecoverEmailSent.message}
						</Text>

						<Text>{""}</Text>

						<DidiButton onPress={() => {}} title={strings.recovery.passwordRecoverEmailSent.buttonText} />
					</View>
				</SafeAreaView>
			</Fragment>
		);
	}
}

const styles = StyleSheet.create({
	imageBig: {
		width: 236,
		height: 182,
		alignSelf: "center"
	},
	message: {
		fontSize: 20,
		textAlign: "center"
	}
});
