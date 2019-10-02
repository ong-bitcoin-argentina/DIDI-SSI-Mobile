import React from "react";
import { Fragment } from "react";
import { StatusBar, View, Vibration } from "react-native";
import { SafeAreaView } from "react-navigation";

import parseJWT from "../../../uPort/parseJWT";

import themes from "../../resources/themes";
import commonStyles from "../../access/resources/commonStyles";
import DidiQRScanner from "../common/DidiQRScanner";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { ScanCredentialToAddProps } from "./ScanCredentialToAdd";
import { ScanDisclosureRequestProps } from "./ScanDisclosureRequest";

export type ScanCredentialProps = {};

interface ScanCredentialState {
	pendingScan?: string;
}
export interface ScanCredentialNavigation {
	ScanCredentialToAdd: ScanCredentialToAddProps;
	ScanDisclosureRequest: ScanDisclosureRequestProps;
}

export default class ScanCredentialScreen extends NavigationEnabledComponent<
	ScanCredentialProps,
	ScanCredentialState,
	ScanCredentialNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Credenciales");

	constructor(props: ScanCredentialProps) {
		super(props);
		this.state = {};
	}

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
		if (this.state.pendingScan === content) {
			return;
		}
		this.setState({ pendingScan: content });

		Vibration.vibrate(400, false);

		const prefix = "me.uport:req/";
		const toParse = content.replace(prefix, "");
		const parse = await parseJWT(toParse);

		switch (parse._tag) {
			case "Left":
				this.setState({ pendingScan: undefined });
				if (__DEV__) {
					console.warn(parse.left);
				} else {
					alert("Hubo un error al leer el codigo QR");
				}
				break;
			case "Right":
				switch (parse.right.type) {
					case "SelectiveDisclosureRequest":
						this.replace("ScanDisclosureRequest", {
							request: parse.right,
							requestJWT: toParse
						});
						break;
					case "VerifiedClaim":
						this.replace("ScanCredentialToAdd", {
							credential: parse.right,
							jwt: toParse
						});
						break;
				}
				break;
		}
	}
}
