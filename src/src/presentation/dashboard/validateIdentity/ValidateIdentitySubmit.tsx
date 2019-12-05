import React from "react";
import { Image, View } from "react-native";
import { TakePictureResponse } from "react-native-camera/types";

import { DidiScreen } from "../../common/DidiScreen";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import commonStyles from "../../resources/commonStyles";
import DidiButton from "../../util/DidiButton";
import { DidiText } from "../../util/DidiText";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import strings from "../../resources/strings";

export interface ValidateIdentitySubmitNavigation {
	DashboardRoot: {};
}
export interface ValidateIdentitySubmitProps {
	front: TakePictureResponse;
	back: TakePictureResponse;
	selfie: TakePictureResponse;
}

export class ValidateIdentitySubmitScreen extends NavigationEnabledComponent<
	ValidateIdentitySubmitProps,
	{},
	ValidateIdentitySubmitNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.validateIdentity.header);

	render() {
		return (
			<DidiScreen>
				<DidiText.ValidateIdentity.Title>{strings.validateIdentity.submit.header}</DidiText.ValidateIdentity.Title>
				<DidiText.ValidateIdentity.Congrats>
					{strings.validateIdentity.submit.congrats}
				</DidiText.ValidateIdentity.Congrats>
				<View style={{ justifyContent: "space-around", flexDirection: "row" }}>
					<Image style={commonStyles.image.image} width={100} height={100} source={{ uri: this.props.front.uri }} />
					<Image style={commonStyles.image.image} width={100} height={100} source={{ uri: this.props.back.uri }} />
				</View>
				<Image style={commonStyles.image.image} width={100} height={100} source={{ uri: this.props.selfie.uri }} />
				<DidiText.ValidateIdentity.Reminder>
					{strings.validateIdentity.submit.reminder}
				</DidiText.ValidateIdentity.Reminder>
				<DidiButton
					title={strings.validateIdentity.submit.buttonText}
					onPress={() => this.navigate("DashboardRoot", {})}
				/>
			</DidiScreen>
		);
	}
}
