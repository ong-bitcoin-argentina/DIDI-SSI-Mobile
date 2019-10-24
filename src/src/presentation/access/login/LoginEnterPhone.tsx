import React from "react";

import { EnterPhoneScreen } from "../../common/EnterPhone";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";

import { LoginVerifyPhoneProps } from "./LoginVerifyPhone";

export type LoginEnterPhoneProps = {};

export interface LoginEnterPhoneNavigation {
	LoginVerifyPhone: LoginVerifyPhoneProps;
}

export class LoginEnterPhoneScreen extends NavigationEnabledComponent<
	LoginEnterPhoneProps,
	{},
	LoginEnterPhoneNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Ingresar");

	render() {
		return (
			<EnterPhoneScreen
				contentImageSource={require("../resources/images/login.png")}
				onPressContinueButton={() => this.onPressContinueButton()}
			/>
		);
	}

	private onPressContinueButton() {
		this.navigate("LoginVerifyPhone", {});
	}
}
