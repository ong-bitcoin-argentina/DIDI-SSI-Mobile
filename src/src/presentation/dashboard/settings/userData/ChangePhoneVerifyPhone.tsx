import React from "react";
import { Alert } from "react-native";

import { VerifyCodeWrapper } from "../../../common/VerifyCodeWrapper";
import NavigationEnabledComponent from "../../../util/NavigationEnabledComponent";

import { changePhoneNumber } from "../../../../services/user/changePhoneNumber";
import NavigationHeaderStyle from "../../../common/NavigationHeaderStyle";
import strings from "../../../resources/strings";

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
			<VerifyCodeWrapper
				description={strings.accessCommon.verify.phoneMessageHead}
				contentImageSource={require("../../../resources/images/loginVerify.png")}
				serviceCall={(serviceKey, validationCode) =>
					changePhoneNumber(serviceKey, this.props.phoneNumber, validationCode)
				}
				onServiceSuccess={() => this.onSuccess()}
			/>
		);
	}

	private onSuccess() {
		Alert.alert(strings.services.changePhoneSuccess);
		this.navigate("UserData", {});
	}
}
