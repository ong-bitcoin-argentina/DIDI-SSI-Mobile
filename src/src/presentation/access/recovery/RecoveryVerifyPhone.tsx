import React from "react";

import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import { VerifyCodeWrapper } from "../../common/VerifyCodeWrapper";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import { changePhoneNumber } from "../../../services/user/changePhoneNumber";
import { DashboardScreenProps } from "../../dashboard/home/Dashboard";
import strings from "../../resources/strings";

export interface RecoveryVerifyPhoneProps {
	newPhoneNumber: string;
	password: string;
}

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
				description={strings.accessCommon.verify.phoneMessageHead}
				contentImageSource={require("../../resources/images/phoneRecover.png")}
				serviceCall={(serviceKey, validationCode) =>
					changePhoneNumber(serviceKey, this.props.password, this.props.newPhoneNumber, validationCode)
				}
				onServiceSuccess={() => this.navigate("Dashboard", {})}
			/>
		);
	}
}
