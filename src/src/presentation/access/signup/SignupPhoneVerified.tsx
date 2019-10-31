import React from "react";
import { Image, Text } from "react-native";

import { DidiScreen } from "../../common/DidiScreen";
import DidiButton from "../../util/DidiButton";
import DidiTextInput from "../../util/DidiTextInput";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import commonStyles from "../resources/commonStyles";

import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import strings from "../../resources/strings";

import { SignupEnterEmailProps } from "./SignupEnterEmail";

export type SignupPhoneVerifiedProps = {};

export interface SignupPhoneVerifiedNavigation {
	SignupEnterEmail: SignupEnterEmailProps;
}

export class SignupPhoneVerifiedScreen extends NavigationEnabledComponent<
	SignupPhoneVerifiedProps,
	{},
	SignupPhoneVerifiedNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.signup.barTitle);

	render() {
		return (
			<DidiScreen>
				<Text style={commonStyles.text.emphasis}>{strings.signup.phoneVerified.messageHead}</Text>

				<DidiTextInput
					description={strings.signup.phoneVerified.cellNumber}
					placeholder={"<PHONE NUMBER>"}
					tagImage={require("../resources/images/phone.png")}
					textInputProps={{
						editable: false
					}}
				/>

				<Image source={require("../resources/images/accountCreate.png")} style={commonStyles.image.image} />

				<Text style={commonStyles.text.emphasis}>{strings.signup.phoneVerified.message}</Text>

				<DidiButton
					onPress={() => {
						this.navigate("SignupEnterEmail", {});
					}}
					title={strings.signup.phoneVerified.next}
				/>
			</DidiScreen>
		);
	}
}
