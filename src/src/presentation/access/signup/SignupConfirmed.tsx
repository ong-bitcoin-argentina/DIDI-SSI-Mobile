import React from "react";
import { Image, View } from "react-native";

import { DidiScreen } from "../../common/DidiScreen";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import commonStyles from "../../resources/commonStyles";
import DidiButton from "../../util/DidiButton";
import { DidiText } from "../../util/DidiText";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import { DashboardScreenProps } from "../../dashboard/home/Dashboard";
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

				<DidiText.Explanation.Normal>{strings.signup.registrationValidated.message}</DidiText.Explanation.Normal>

				<Image source={require("../../resources/images/emailConfirmed.png")} style={commonStyles.image.image} />

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
