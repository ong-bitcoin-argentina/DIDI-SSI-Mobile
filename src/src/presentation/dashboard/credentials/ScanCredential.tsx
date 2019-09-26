import React from "react";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { Fragment } from "react";
import { StatusBar, View, Text, Alert } from "react-native";
import { SafeAreaView } from "react-navigation";

import parseJWT from "../../../uPort/parseJWT";

import themes from "../../resources/themes";
import commonStyles from "../../access/resources/commonStyles";
import DidiQRScanner from "../common/DidiQRScanner";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";

export type ScanCredentialProps = {};
type ScanCredentialState = {};
export interface ScanCredentialNavigation {}

export default class ScanCredentialScreen extends NavigationEnabledComponent<
	ScanCredentialProps,
	ScanCredentialState,
	ScanCredentialNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Credenciales");

	render() {
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<SafeAreaView style={commonStyles.view.area}>
					<View style={commonStyles.view.body}>
						<DidiQRScanner onQRScanned={content => this.onScanQR(content)} />
					</View>
				</SafeAreaView>
			</Fragment>
		);
	}

	private async onScanQR(content: string) {
		const prefix = "me.uport:req/";
		const toParse = content.replace(prefix, "");
		try {
			const res = await parseJWT(toParse);
			alert(JSON.stringify(res.payload));
		} catch (error) {
			alert(error);
		}
	}
}
