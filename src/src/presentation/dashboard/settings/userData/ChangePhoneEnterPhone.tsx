import React from "react";

import { EnterPhoneWrapper } from "../../../common/EnterPhoneWrapper";
import NavigationEnabledComponent from "../../../util/NavigationEnabledComponent";

import NavigationHeaderStyle from "../../../resources/NavigationHeaderStyle";

import { ChangePhoneVerifyScreenProps } from "./ChangePhoneVerifyPhone";

export type ChangePhoneEnterScreenProps = {};
export interface ChangePhoneEnterScreenNavigation {
	ChangePhoneVerify: ChangePhoneVerifyScreenProps;
}

export class ChangePhoneEnterScreen extends NavigationEnabledComponent<
	ChangePhoneEnterScreenProps,
	{},
	ChangePhoneEnterScreenNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Cambiar Teléfono");

	render() {
		return (
			<EnterPhoneWrapper
				contentImageSource={require("../../../access/resources/images/loginVerify.png")}
				onServiceSuccess={() => this.navigate("ChangePhoneVerify", {})}
			/>
		);
	}
}
