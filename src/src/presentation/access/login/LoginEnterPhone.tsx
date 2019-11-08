import React from "react";

import { EnterPhoneWrapper } from "../../common/EnterPhoneWrapper";
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
			<EnterPhoneWrapper
				isPasswordRequired={true}
				password={null}
				contentImageSource={require("../resources/images/login.png")}
				onServiceSuccess={() => this.navigate("LoginVerifyPhone", {})}
			/>
		);
	}
}
