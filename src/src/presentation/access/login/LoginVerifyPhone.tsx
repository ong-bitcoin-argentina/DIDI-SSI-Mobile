import React from "react";

import { VerifyCodeWrapper } from "../../common/VerifyCodeWrapper";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import { verifySmsCode } from "../../../services/user/verifySmsCode";
import { DashboardScreenProps } from "../../dashboard/home/Dashboard";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import strings from "../../resources/strings";

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
			<VerifyCodeWrapper
				description={strings.accessCommon.verify.phoneMessageHead}
				contentImageSource={require("../resources/images/loginVerify.png")}
				serviceCall={verifySmsCode}
				onServiceSuccess={() => this.navigate("Dashboard", {})}
			/>
		);
	}
}
