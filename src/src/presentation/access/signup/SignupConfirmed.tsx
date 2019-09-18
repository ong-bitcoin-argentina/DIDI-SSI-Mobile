import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { Text, View, Image, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import React, { Fragment } from "react";

import DidiButton from "../../util/DidiButton";
import strings from "../../resources/strings";
import themes from "../../resources/themes";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import commonStyles from "../resources/commonStyles";
import { DashboardScreenProps } from "../../dashboard/home/Dashboard";

export interface SignupConfirmedNavigation {
	Dashboard: DashboardScreenProps;
}

export type SignupConfirmedProps = {};

export class SignupConfirmedScreen extends NavigationEnabledComponent<
	SignupConfirmedProps,
	{},
	SignupConfirmedNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.signup.barTitle);

	render() {
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />

				<SafeAreaView style={commonStyles.view.area}>
					<View style={commonStyles.view.body}>
						<View />

						<Text style={[commonStyles.text.normal, styles.message]}>
							{strings.signup.registrationValidated.message}
						</Text>

						<Image source={require("../resources/images/emailConfirmed.png")} style={commonStyles.image.image} />

						<View />

						<DidiButton
							onPress={() => {
								this.navigate("Dashboard", {});
							}}
							title={strings.signup.registrationValidated.buttonEnter}
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
