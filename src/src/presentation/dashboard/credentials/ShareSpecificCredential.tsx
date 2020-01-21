import { CredentialDocument } from "didi-sdk";
import React from "react";
import { Dimensions, Share } from "react-native";
import QRCode from "react-native-qrcode-svg";

import { DidiScreen } from "../../common/DidiScreen";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import DidiButton from "../../util/DidiButton";
import { DidiText } from "../../util/DidiText";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import { didiConnect } from "../../../store/store";
import strings from "../../resources/strings";

export interface ShareSpecificCredentialProps {
	document: CredentialDocument;
}
interface ShareSpecificCredentialStateProps {
	sharePrefix: string;
}
type ShareSpecificCredentialInternalProps = ShareSpecificCredentialProps & ShareSpecificCredentialStateProps;

export type ShareSpecificCredentialNavigation = {};

class ShareSpecificCredentialScreen extends NavigationEnabledComponent<
	ShareSpecificCredentialInternalProps,
	{},
	ShareSpecificCredentialNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.share.title);

	render() {
		return (
			<DidiScreen style={{ width: "90%" }}>
				<DidiText.Explanation.Normal>{strings.share.explanation}</DidiText.Explanation.Normal>
				<QRCode size={0.9 * Dimensions.get("window").width} value={this.props.document.jwt} />
				<DidiButton
					title={strings.share.shareLink}
					onPress={() => {
						const jwt = this.props.document.jwt;
						Share.share({
							title: strings.share.title,
							message: `${this.props.sharePrefix}/${jwt}`
						});
					}}
				/>
			</DidiScreen>
		);
	}
}

const connected = didiConnect(
	ShareSpecificCredentialScreen,
	(state): ShareSpecificCredentialStateProps => {
		return {
			sharePrefix: state.serviceSettings.sharePrefix
		};
	}
);

export { connected as ShareSpecificCredentialScreen };
