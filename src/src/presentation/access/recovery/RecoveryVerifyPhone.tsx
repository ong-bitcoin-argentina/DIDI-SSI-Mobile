import React from "react";

import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { VerifyPhoneProps, VerifyPhoneScreen } from "../common/VerifyPhone";

import { DashboardScreenProps } from "../../dashboard/home/Dashboard";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";

export type RecoveryVerifyPhoneProps = {};

export type RecoveryVerifyPhoneNavigation = {
	Dashboard: DashboardScreenProps;
};

export class RecoveryVerifyPhoneScreen extends NavigationEnabledComponent<
	RecoveryVerifyPhoneProps,
	{},
	RecoveryVerifyPhoneNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Recuperar cuenta");

	render() {
		return (
			<VerifyPhoneScreen
				contentImageSource={require("../resources/images/phoneRecover.png")}
				onPressContinueButton={() => this.onPressContinueButton()}
			/>
		);
	}

	private onPressContinueButton() {
		this.navigate("Dashboard", {});
	}
}
