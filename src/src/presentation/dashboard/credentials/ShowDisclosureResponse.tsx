import { CredentialDocument } from "didi-sdk";
import React from "react";
import { Dimensions, Share } from "react-native";
import QRCode from "react-native-qrcode-svg";

import { DidiScreen } from "../../common/DidiScreen";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import { DidiText } from "../../util/DidiText";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import strings from "../../resources/strings";

export interface ShowDisclosureResponseProps {
	token: string;
}

export type ShowDisclosureResponseNavigation = {};

export class ShowDisclosureResponseScreen extends NavigationEnabledComponent<
	ShowDisclosureResponseProps,
	{},
	ShowDisclosureResponseNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.disclose.title);

	render() {
		return (
			<DidiScreen style={{ width: "90%" }}>
				<DidiText.Explanation.Normal>{strings.disclose.explanation}</DidiText.Explanation.Normal>
				<QRCode size={0.9 * Dimensions.get("window").width} value={this.props.token} />
			</DidiScreen>
		);
	}
}
