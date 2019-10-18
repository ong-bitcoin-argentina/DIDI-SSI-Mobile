import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { DidiScreen } from "../../common/DidiScreen";
import DidiButton from "../../util/DidiButton";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import commonStyles from "../resources/commonStyles";

import { DashboardScreenProps } from "../../dashboard/home/Dashboard";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import strings from "../../resources/strings";

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
			<DidiScreen>
				<View />

				<Text style={[commonStyles.text.normal, styles.message]}>{strings.signup.registrationValidated.message}</Text>

				<Image source={require("../resources/images/emailConfirmed.png")} style={commonStyles.image.image} />

				<View />

				<DidiButton
					onPress={() => {
						this.navigate("Dashboard", {});
					}}
					title={strings.signup.registrationValidated.buttonEnter}
				/>
			</DidiScreen>
		);
	}
}

const styles = StyleSheet.create({
	message: {
		fontSize: 20,
		textAlign: "center"
	}
});
