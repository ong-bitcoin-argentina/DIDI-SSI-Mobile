import React from "react";
import { Fragment } from "react";
import { StatusBar, View, Vibration, YellowBox } from "react-native";

import parseJWT from "../../../uPort/parseJWT";

import themes from "../../resources/themes";
import DidiQRScanner from "../common/DidiQRScanner";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { ScanCredentialToAddProps } from "./ScanCredentialToAdd";
import { ScanDisclosureRequestProps } from "./ScanDisclosureRequest";

export type ScanCredentialProps = {};

interface ScanCredentialState {
	pendingScan?: string;
	failedScans: string[];
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
		this.state = {
			failedScans: []
		};
	}

	render() {
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<DidiQRScanner onQRScanned={content => this.onScanQR(content)} />
			</Fragment>
		);
	}

	private async onScanQR(content: string) {
		if (this.state.pendingScan === content || this.state.failedScans.includes(content)) {
			return;
		}
		this.setState({ pendingScan: content });

		Vibration.vibrate(400, false);

		const startIndex = content.lastIndexOf("/");
		const endIndex = content.lastIndexOf("?");
		const toParse = content.substring(startIndex === -1 ? 0 : startIndex + 1, endIndex === -1 ? undefined : endIndex);
		const parse = await parseJWT(toParse);

		switch (parse._tag) {
			case "Left":
				alert("Hubo un error al leer el codigo QR");
				console.warn(parse.left);

				this.setState({ failedScans: [content, ...this.state.failedScans] });
				setTimeout(() => {
					this.setState({ pendingScan: undefined });
				}, 1000);
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
