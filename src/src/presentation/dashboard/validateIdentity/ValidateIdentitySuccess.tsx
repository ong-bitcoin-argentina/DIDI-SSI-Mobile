import React, { Fragment } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { DidiScreen } from "../../common/DidiScreen";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import commonStyles from "../../resources/commonStyles";
import DidiButton from "../../util/DidiButton";
import { DidiText } from "../../util/DidiText";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import strings from "../../resources/strings";

export interface ValidateIdentitySuccessNavigation {
	DashboardRoot: {};
}
export type ValidateIdentitySuccessProps = {};

export class ValidateIdentitySuccessScreen extends NavigationEnabledComponent<
	ValidateIdentitySuccessProps,
	{},
	ValidateIdentitySuccessNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.validateIdentity.header);

	render() {
		return (
			<DidiScreen>
				<DidiText.ValidateIdentity.Title>{strings.validateIdentity.success.header}</DidiText.ValidateIdentity.Title>
				<View>
					<DidiText.ValidateIdentity.Congrats>
						{strings.validateIdentity.success.congrats}
					</DidiText.ValidateIdentity.Congrats>
					<DidiText.ValidateIdentity.Reminder>
						{strings.validateIdentity.success.reminder}
					</DidiText.ValidateIdentity.Reminder>
				</View>
				<Image style={commonStyles.image.image} source={require("../../resources/images/validateIdentityHow.png")} />
				<DidiButton
					title={strings.validateIdentity.success.buttonText}
					onPress={() => this.navigate("DashboardRoot", {})}
				/>
			</DidiScreen>
		);
	}
}
