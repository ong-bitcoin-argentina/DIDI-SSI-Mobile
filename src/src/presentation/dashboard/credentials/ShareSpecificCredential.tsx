import React, { Fragment } from "react";
import { Dimensions, SafeAreaView, Share, StatusBar, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

import commonStyles from "../../resources/commonStyles";
import { DidiScreen } from "../../common/DidiScreen";
import DidiButton from "../../util/DidiButton";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import { CredentialDocument } from "../../../model/CredentialDocument";
import { didiConnect } from "../../../store/store";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import strings from "../../resources/strings";
import themes from "../../resources/themes";

export interface ShareSpecificCredentialProps {
	document: CredentialDocument;
}
interface ShareSpecificCredentialStateProps {
	sharePrefix: string;
}
type ShareSpecificCredentialInternalProps = ShareSpecificCredentialProps & ShareSpecificCredentialStateProps;

type ShareSpecificCredentialState = {};

export type ShareSpecificCredentialNavigation = {};

class ShareSpecificCredentialScreen extends NavigationEnabledComponent<
	ShareSpecificCredentialInternalProps,
	ShareSpecificCredentialState,
	ShareSpecificCredentialNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Compartir");

	render() {
		return (
			<DidiScreen style={{ width: "90%" }}>
				<Text style={commonStyles.text.normal}>{strings.share.explanation}</Text>
				<QRCode size={0.9 * Dimensions.get("window").width} value={this.props.document.jwt} />
				<DidiButton
					title="Compartir Enlace"
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
