import React from "react";
import { GestureResponderEvent } from "react-native";

import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { VerifyPhoneScreen } from "../common/VerifyPhone";

import { DashboardScreenProps } from "../../dashboard/home/Dashboard";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";

export type LoginVerifyPhoneProps = {};

export type LoginVerifyPhoneNavigation = {
	Dashboard: DashboardScreenProps;
};

export class LoginVerifyPhoneScreen extends NavigationEnabledComponent<
	LoginVerifyPhoneProps,
	{},
	LoginVerifyPhoneNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Ingresar");

	render() {
		return (
			<VerifyPhoneScreen
				contentImageSource={require("../resources/images/loginVerify.png")}
				onPressContinueButton={() => this.onPressContinueButton()}
			/>
		);
	}

	private onPressContinueButton() {
		this.navigate("Dashboard", {});
	}
}
