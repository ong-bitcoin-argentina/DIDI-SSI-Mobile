import React from "react";
import { Alert } from "react-native";

import NavigationHeaderStyle from "../../../common/NavigationHeaderStyle";
import { VerifyCodeWrapper } from "../../../common/VerifyCodeWrapper";
import NavigationEnabledComponent from "../../../util/NavigationEnabledComponent";

import { changePhoneNumber } from "../../../../services/user/changePhoneNumber";
import { sendSmsValidator } from "../../../../services/user/sendSmsValidator";
import strings from "../../../resources/strings";

import { EditProfileProps } from "../userMenu/EditProfile";

export interface ChangePhoneVerifyScreenProps {
	newPhoneNumber: string;
	password: string;
}
export interface ChangePhoneVerifyScreenNavigation {
	EditProfile: EditProfileProps;
}

export class ChangePhoneVerifyScreen extends NavigationEnabledComponent<
	ChangePhoneVerifyScreenProps,
	{},
	ChangePhoneVerifyScreenNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.userData.changePhone.screenTitle);

	render() {
		return (
			<VerifyCodeWrapper
				description={strings.accessCommon.verify.phoneMessageHead}
				contentImageSource={require("../../../resources/images/loginVerify.png")}
				serviceCall={(serviceKey, validationCode) =>
					changePhoneNumber(serviceKey, this.props.password, this.props.newPhoneNumber, validationCode)
				}
				onServiceSuccess={() => this.onSuccess()}
				onResendCodePress={serviceKey => sendSmsValidator(serviceKey, this.props.newPhoneNumber, this.props.password)}
			/>
		);
	}

	private onSuccess() {
		Alert.alert(strings.services.changePhoneSuccess);
		this.navigate("EditProfile", {});
	}
}
