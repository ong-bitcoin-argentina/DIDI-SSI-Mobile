import React from "react";
import { Image, View } from "react-native";

import { DidiScreen } from "../../common/DidiScreen";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import commonStyles from "../../resources/commonStyles";
import DidiButton from "../../util/DidiButton";
import { DidiText } from "../../util/DidiText";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import strings from "../../resources/strings";

export interface ValidateIdentityFailureNavigation {
	DashboardRoot: {};
}
export interface ValidateIdentityFailureProps {}

export class ValidateIdentityFailureScreen extends NavigationEnabledComponent<
	ValidateIdentityFailureProps,
	{},
	ValidateIdentityFailureNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.validateIdentity.header);

	render() {
		//
		return (
			<DidiScreen>
				<DidiText.ValidateIdentity.Title>{strings.validateIdentity.failure.header}</DidiText.ValidateIdentity.Title>
				<View>
					<DidiText.ValidateIdentity.Congrats>
						{strings.validateIdentity.failure.congrats}
					</DidiText.ValidateIdentity.Congrats>
					<DidiText.ValidateIdentity.Reminder>
						{strings.validateIdentity.failure.reminder}
					</DidiText.ValidateIdentity.Reminder>
				</View>
				<Image style={commonStyles.image.image} source={require("../../resources/images/validateIdentityHow.png")} />
				<DidiButton
					title={strings.validateIdentity.failure.buttonText}
					onPress={() => this.navigate("DashboardRoot", {})}
				/>
			</DidiScreen>
		);
	}
}