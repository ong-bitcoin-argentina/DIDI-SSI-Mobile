import React from "react";

import { EnterPhoneWrapper } from "../../../common/EnterPhoneWrapper";
import NavigationHeaderStyle from "../../../common/NavigationHeaderStyle";
import NavigationEnabledComponent from "../../../util/NavigationEnabledComponent";

import strings from "../../../resources/strings";

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
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.userData.changePhone.screenTitle);

	render() {
		return (
			<EnterPhoneWrapper
				explanation={strings.userData.changePhone.messageHead}
				shouldCreateDid={false}
				isPasswordRequired={true}
				password={null}
				contentImageSource={require("../../../resources/images/loginVerify.png")}
				onServiceSuccess={(phoneNumber, password) =>
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					this.navigate("ChangePhoneVerify", { newPhoneNumber: phoneNumber, password: password! })
				}
			/>
		);
	}
}
