import React from "react";

import { EnterPhoneWrapper } from "../../common/EnterPhoneWrapper";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import strings from "../../resources/strings";

import { RecoveryVerifyPhoneProps } from "./RecoveryVerifyPhone";

export interface RecoveryEnterPhoneProps {
	password: string;
}

export interface RecoveryEnterPhoneNavigation {
	RecoveryVerifyPhone: RecoveryVerifyPhoneProps;
}

export class RecoveryEnterPhoneScreen extends NavigationEnabledComponent<
	RecoveryEnterPhoneProps,
	{},
	RecoveryEnterPhoneNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.recovery.barTitle);

	render() {
		return (
			<EnterPhoneWrapper
				explanation={strings.accessCommon.enterPhone.messageHead}
				shouldCreateDid={false}
				isPasswordRequired={true}
				password={this.props.password}
				contentImageSource={require("../../resources/images/phoneRecover.png")}
				onServiceSuccess={phoneNumber =>
					this.navigate("RecoveryVerifyPhone", { newPhoneNumber: phoneNumber, password: this.props.password })
				}
			/>
		);
	}
}
