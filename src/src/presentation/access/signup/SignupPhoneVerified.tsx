import React from "react";
import { Image } from "react-native";

import { DidiScreen } from "../../common/DidiScreen";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import commonStyles from "../../resources/commonStyles";
import DidiButton from "../../util/DidiButton";
import { DidiText } from "../../util/DidiText";
import DidiTextInput from "../../util/DidiTextInput";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import strings from "../../resources/strings";

import { SignupEnterEmailProps } from "./SignupEnterEmail";

export interface SignupPhoneVerifiedProps {
	phoneNumber: string;
}

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
				<DidiText.Explanation.Emphasis>{strings.signup.phoneVerified.messageHead}</DidiText.Explanation.Emphasis>

				<DidiTextInput
					description={strings.signup.phoneVerified.cellNumber}
					placeholder={this.props.phoneNumber}
					tagImage={require("../../resources/images/phone.png")}
					textInputProps={{
						editable: false
					}}
				/>

				<Image source={require("../../resources/images/accountCreate.png")} style={commonStyles.image.image} />

				<DidiText.Explanation.Emphasis>{strings.signup.phoneVerified.message}</DidiText.Explanation.Emphasis>

				<DidiButton
					onPress={() => {
						this.navigate("SignupEnterEmail", { phoneNumber: this.props.phoneNumber });
					}}
					title={strings.signup.phoneVerified.next}
				/>
			</DidiScreen>
		);
	}
}
