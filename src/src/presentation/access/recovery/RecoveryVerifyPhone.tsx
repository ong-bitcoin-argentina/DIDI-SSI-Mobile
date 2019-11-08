import React from "react";

import { VerifyCodeWrapper } from "../../common/VerifyCodeWrapper";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import { verifySmsCode } from "../../../services/user/verifySmsCode";
import { DashboardScreenProps } from "../../dashboard/home/Dashboard";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import strings from "../../resources/strings";

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
			<VerifyCodeWrapper
				description={strings.accessCommon.verifyPhone.messageHead}
				contentImageSource={require("../resources/images/phoneRecover.png")}
				serviceCall={verifySmsCode}
				onServiceSuccess={() => this.navigate("Dashboard", {})}
			/>
		);
	}
}
