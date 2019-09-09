import { Text, View, Image, SafeAreaView, StatusBar } from "react-native";
import React, { Fragment } from "react";

import DidiButton from "../../util/DidiButton";
import strings from "../resources/strings";
import themes from "../../styles/themes";
import DidiTextInput from "../../util/DidiTextInput";
import NavigationHeaderStyle from "../../styles/NavigationHeaderStyle";
import commonStyles from "../resources/commonStyles";

import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { SignupEnterEmailProps } from "./SignupEnterEmail";

export type SignupPhoneVerifiedProps = {
	phoneNumber: string;
};

export interface SignupPhoneVerifiedNavigation {
	SignupEnterEmail: SignupEnterEmailProps;
}

export class SignupPhoneVerifiedScreen extends NavigationEnabledComponent<
	SignupPhoneVerifiedProps,
	{},
	SignupPhoneVerifiedNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.recovery.barTitle);

	render() {
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<SafeAreaView style={commonStyles.view.area}>
					<View style={commonStyles.view.body}>
						<Text style={commonStyles.text.emphasis}>{strings.signup.phoneVerified.messageHead}</Text>

						<DidiTextInput
							description={strings.signup.phoneVerified.cellNumber}
							placeholder={this.props.phoneNumber}
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
					</View>
				</SafeAreaView>
			</Fragment>
		);
	}
}
