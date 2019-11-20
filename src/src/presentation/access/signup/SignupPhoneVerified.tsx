import React from "react";
import { Alert, Image, Text } from "react-native";

import { DidiScreen } from "../../common/DidiScreen";
import commonStyles from "../../resources/commonStyles";
import DidiButton from "../../util/DidiButton";
import DidiTextInput from "../../util/DidiTextInput";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
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
				<Text style={commonStyles.text.emphasis}>{strings.signup.phoneVerified.messageHead}</Text>

				<DidiTextInput
					description={strings.signup.phoneVerified.cellNumber}
					placeholder={this.props.phoneNumber}
					tagImage={require("../../resources/images/phone.png")}
					textInputProps={{
						editable: false
					}}
				/>

				<Image source={require("../../resources/images/accountCreate.png")} style={commonStyles.image.image} />

				<Text style={commonStyles.text.emphasis}>{strings.signup.phoneVerified.message}</Text>

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
