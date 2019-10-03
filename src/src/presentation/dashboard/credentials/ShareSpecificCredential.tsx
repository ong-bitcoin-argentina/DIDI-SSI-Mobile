import React from "react";
import { Fragment } from "react";
import { Text, StatusBar, SafeAreaView, View, Dimensions, Clipboard, ToastAndroid } from "react-native";
import QRCode from "react-native-qrcode-svg";

import themes from "../../resources/themes";
import commonStyles from "../../access/resources/commonStyles";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { UPortDocument } from "../../../model/data/UPortDocument";
import DidiButton from "../../util/DidiButton";

export interface ShareSpecificCredentialProps {
	document: UPortDocument;
}

type ShareSpecificCredentialState = {};

export type ShareSpecificCredentialNavigation = {};

export class ShareSpecificCredentialScreen extends NavigationEnabledComponent<
	ShareSpecificCredentialProps,
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
						<Text style={commonStyles.text.normal}>Escanea el siguiente codigo QR con otra aplicacion Didi</Text>
						<QRCode size={0.9 * Dimensions.get("window").width} value={this.props.document.jwt} />
						<Text style={commonStyles.text.normal}>O copia un texto equivalente</Text>
						<DidiButton
							title="Copiar"
							onPress={() => {
								Clipboard.setString(this.props.document.jwt);
								ToastAndroid.show("Copiado", ToastAndroid.SHORT);
							}}
						/>
					</View>
				</SafeAreaView>
			</Fragment>
		);
	}
}
