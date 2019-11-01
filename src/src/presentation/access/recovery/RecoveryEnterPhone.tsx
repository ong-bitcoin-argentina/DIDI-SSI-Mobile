import React from "react";

import { EnterPhoneWrapper } from "../../common/EnterPhoneWrapper";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";

import { RecoveryVerifyPhoneProps } from "./RecoveryVerifyPhone";

export type RecoveryEnterPhoneProps = {};

export interface RecoveryEnterPhoneNavigation {
	RecoveryVerifyPhone: RecoveryVerifyPhoneProps;
}

export class RecoveryEnterPhoneScreen extends NavigationEnabledComponent<
	RecoveryEnterPhoneProps,
	{},
	RecoveryEnterPhoneNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Recuperar Cuenta");

	render() {
		return (
			<EnterPhoneWrapper
				contentImageSource={require("../resources/images/phoneRecover.png")}
				onServiceSuccess={() => this.navigate("RecoveryVerifyPhone", {})}
			/>
		);
	}
}
