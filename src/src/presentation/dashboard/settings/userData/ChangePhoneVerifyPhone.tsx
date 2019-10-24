import React from "react";

import { VerifyPhoneScreen } from "../../../common/VerifyPhone";
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
			<VerifyPhoneScreen
				contentImageSource={require("../../../access/resources/images/loginVerify.png")}
				onPressContinueButton={() => this.onPressContinueButton()}
			/>
		);
	}

	onPressContinueButton() {
		this.navigate("UserData", {});
	}
}
