import React from "react";
import { Fragment } from "react";
import { Text, StatusBar, SafeAreaView, View, Dimensions, Share } from "react-native";
import QRCode from "react-native-qrcode-svg";

import themes from "../../resources/themes";
import commonStyles from "../../access/resources/commonStyles";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { CredentialDocument } from "../../../model/data/CredentialDocument";
import DidiButton from "../../util/DidiButton";
import strings from "../../resources/strings";
import { didiConnect } from "../../../model/store";

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
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<SafeAreaView style={commonStyles.view.area}>
					<View style={[commonStyles.view.body, { width: "90%" }]}>
						<Text style={commonStyles.text.normal}>strings.share.explanation</Text>
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
					</View>
				</SafeAreaView>
			</Fragment>
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
