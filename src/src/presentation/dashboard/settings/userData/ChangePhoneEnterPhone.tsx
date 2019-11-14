import React from "react";

import { EnterPhoneWrapper } from "../../../common/EnterPhoneWrapper";
import NavigationHeaderStyle from "../../../common/NavigationHeaderStyle";
import NavigationEnabledComponent from "../../../util/NavigationEnabledComponent";

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
				shouldCreateDid={false}
				isPasswordRequired={true}
				password={null}
				contentImageSource={require("../../../resources/images/loginVerify.png")}
				onServiceSuccess={(phoneNumber, password) =>
					this.navigate("ChangePhoneVerify", { newPhoneNumber: phoneNumber, password: password! })
				}
			/>
		);
	}
}
