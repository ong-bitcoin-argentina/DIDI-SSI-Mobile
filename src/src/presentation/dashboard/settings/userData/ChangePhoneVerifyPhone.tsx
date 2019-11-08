import React from "react";

import { VerifyPhoneWrapper } from "../../../common/VerifyPhoneWrapper";
import NavigationEnabledComponent from "../../../util/NavigationEnabledComponent";

import { changePhoneNumber } from "../../../../services/user/changePhoneNumber";
import NavigationHeaderStyle from "../../../resources/NavigationHeaderStyle";

import { UserDataProps } from "./UserData";

export interface ChangePhoneVerifyScreenProps {
	phoneNumber: string;
}
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
				serviceCall={(serviceKey, validationCode) =>
					changePhoneNumber(serviceKey, this.props.phoneNumber, validationCode)
				}
				onServiceSuccess={() => this.navigate("UserData", {})}
			/>
		);
	}
}
