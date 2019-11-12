import React from "react";
import { Alert } from "react-native";

import { VerifyCodeWrapper } from "../../../common/VerifyCodeWrapper";
import NavigationEnabledComponent from "../../../util/NavigationEnabledComponent";

import { changeEmail } from "../../../../services/user/changeEmail";
import NavigationHeaderStyle from "../../../common/NavigationHeaderStyle";
import strings from "../../../resources/strings";

import { UserDataProps } from "./UserData";

export interface ChangeEmailVerifyScreenProps {
	email: string;
}
export interface ChangeEmailVerifyScreenNavigation {
	UserData: UserDataProps;
}

export class ChangeEmailVerifyScreen extends NavigationEnabledComponent<
	ChangeEmailVerifyScreenProps,
	{},
	ChangeEmailVerifyScreenNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Cambiar Teléfono");

	render() {
		return (
			<VerifyCodeWrapper
				description={strings.accessCommon.verify.emailMessageHead}
				contentImageSource={require("../../../resources/images/loginVerify.png")}
				serviceCall={(serviceKey, validationCode) => changeEmail(serviceKey, this.props.email, validationCode)}
				onServiceSuccess={() => this.onSuccess()}
			/>
		);
	}

	private onSuccess() {
		Alert.alert(strings.services.changeEmailSuccess);
		this.navigate("UserData", {});
	}
}
