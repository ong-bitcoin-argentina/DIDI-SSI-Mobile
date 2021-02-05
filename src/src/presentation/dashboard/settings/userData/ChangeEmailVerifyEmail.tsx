import React from "react";
import { Alert } from "react-native";

import NavigationHeaderStyle from "../../../common/NavigationHeaderStyle";
import { VerifyCodeWrapper } from "../../../common/VerifyCodeWrapper";
import NavigationEnabledComponent from "../../../util/NavigationEnabledComponent";

import { changeEmail } from "../../../../services/user/changeEmail";
import { sendMailValidator } from "../../../../services/user/sendMailValidator";
import strings from "../../../resources/strings";

import { UserDataProps } from "./UserData";

export interface ChangeEmailVerifyScreenProps {
	newEmail: string;
	password: string;
}
export interface ChangeEmailVerifyScreenNavigation {
	UserData: UserDataProps;
}

export class ChangeEmailVerifyScreen extends NavigationEnabledComponent<
	ChangeEmailVerifyScreenProps,
	{},
	ChangeEmailVerifyScreenNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.userData.changeEmail.screenTitle);

	render() {
		return (
			<VerifyCodeWrapper
				description={strings.accessCommon.verify.emailMessageHead}
				contentImageSource={require("../../../resources/images/loginVerify.png")}
				serviceCall={(serviceKey, validationCode) =>
					changeEmail(serviceKey, this.props.password, this.props.newEmail, validationCode)
				}
				onServiceSuccess={() => this.onSuccess()}
				onResendCodePress={serviceKey => sendMailValidator(serviceKey, this.props.newEmail, this.props.password, true)}
			/>
		);
	}

	private onSuccess() {
		Alert.alert(strings.services.changeEmailSuccess);
		this.navigate("UserData", {});
	}
}
