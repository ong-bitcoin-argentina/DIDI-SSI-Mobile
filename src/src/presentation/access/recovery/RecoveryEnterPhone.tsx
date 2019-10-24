import React from "react";

import { EnterPhoneScreen } from "../../common/EnterPhone";
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
			<EnterPhoneScreen
				contentImageSource={require("../resources/images/phoneRecover.png")}
				onPressContinueButton={() => this.onPressContinueButton()}
			/>
		);
	}

	private onPressContinueButton() {
		this.navigate("RecoveryVerifyPhone", {});
	}
}
