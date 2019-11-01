import React from "react";

import { VerifyPhoneWrapper } from "../../common/VerifyPhoneWrapper";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

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
			<VerifyPhoneWrapper
				contentImageSource={require("../resources/images/loginVerify.png")}
				onServiceSuccess={() => this.navigate("Dashboard", {})}
			/>
		);
	}
}
