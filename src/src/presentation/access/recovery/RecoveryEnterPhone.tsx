import React from "react";

import { EnterPhoneWrapper } from "../../common/EnterPhoneWrapper";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

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
	static navigationOptions = NavigationHeaderStyle.withTitle("Recuperar Cuenta");

	render() {
		return (
			<EnterPhoneWrapper
				shouldCreateDid={false}
				isPasswordRequired={true}
				password={this.props.password}
				contentImageSource={require("../../resources/images/phoneRecover.png")}
				onServiceSuccess={() => this.navigate("RecoveryVerifyPhone", {})}
			/>
		);
	}
}
