import React from "react";

import { EnterPhoneScreen } from "../../../common/EnterPhone";
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
			<EnterPhoneScreen
				contentImageSource={require("../../../access/resources/images/loginVerify.png")}
				onPressContinueButton={inputPhoneNumber => this.onPressContinueButton(inputPhoneNumber)}
			/>
		);
	}

	onPressContinueButton(inputPhoneNumber: string) {
		this.navigate("ChangePhoneVerify", {
			inputPhoneNumber
		});
	}
}
