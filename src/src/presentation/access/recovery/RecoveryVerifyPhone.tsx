import React from "react";

import { VerifyPhoneWrapper } from "../../common/VerifyPhoneWrapper";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

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
			<VerifyPhoneWrapper
				contentImageSource={require("../resources/images/phoneRecover.png")}
				onServiceSuccess={() => this.navigate("Dashboard", {})}
			/>
		);
	}
}
