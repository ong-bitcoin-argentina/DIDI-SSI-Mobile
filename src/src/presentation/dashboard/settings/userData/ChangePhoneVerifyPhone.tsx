import React from "react";

import { VerifyPhoneWrapper } from "../../../common/VerifyPhoneWrapper";
import NavigationEnabledComponent from "../../../util/NavigationEnabledComponent";

import NavigationHeaderStyle from "../../../resources/NavigationHeaderStyle";

import { UserDataProps } from "./UserData";

export type ChangePhoneVerifyScreenProps = {};
export interface ChangePhoneVerifyScreenNavigation {
	UserData: UserDataProps;
}

export class ChangePhoneVerifyScreen extends NavigationEnabledComponent<
	ChangePhoneVerifyScreenProps,
	{},
	ChangePhoneVerifyScreenNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Cambiar Teléfono");

	render() {
		return (
			<VerifyPhoneWrapper
				contentImageSource={require("../../../access/resources/images/loginVerify.png")}
				onServiceSuccess={() => this.navigate("UserData", {})}
			/>
		);
	}
}
