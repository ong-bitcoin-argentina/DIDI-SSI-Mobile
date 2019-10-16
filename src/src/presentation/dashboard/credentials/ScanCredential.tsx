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
import { didiConnect } from "../../../model/store";

export type ScanCredentialProps = {};
interface ScanCredentialStateProps {
	ethrDidUri: string;
}
type ScanCredentialInternalProps = ScanCredentialProps & ScanCredentialStateProps;

interface ScanCredentialState {
	pendingScan?: string;
	failedScans: string[];
}
export interface ScanCredentialNavigation {
	ScanCredentialToAdd: ScanCredentialToAddProps;
	ScanDisclosureRequest: ScanDisclosureRequestProps;
}

class ScanCredentialScreen extends NavigationEnabledComponent<
	ScanCredentialInternalProps,
	ScanCredentialState,
	ScanCredentialNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Credenciales");

	constructor(props: ScanCredentialInternalProps) {
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
		const parse = await parseJWT(toParse, this.props.ethrDidUri);

		switch (parse._tag) {
			case "Left":
				alert("Hubo un error al leer el codigo QR");
				if (parse.left instanceof Error) {
					console.warn(`${parse.left.name}\n\n${parse.left.message}\n\n${parse.left.stack}`);
				} else {
					console.warn(parse.left);
				}

				this.setState({ failedScans: [content, ...this.state.failedScans] });
				setTimeout(() => {
					this.setState({ pendingScan: undefined });
				}, 1000);
				break;
			case "Right":
				switch (parse.right.type) {
					case "SelectiveDisclosureRequest":
						this.replace("ScanDisclosureRequest", {
							request: {
								content: parse.right,
								jwt: toParse
							},
							onGoBack: screen => {
								screen.replace("ScanCredential", {});
							}
						});
						break;
					case "VerifiedClaim":
						this.replace("ScanCredentialToAdd", {
							credential: {
								content: parse.right,
								jwt: toParse
							}
						});
						break;
				}
				break;
		}
	}
}

const connected = didiConnect(
	ScanCredentialScreen,
	(state): ScanCredentialStateProps => {
		return { ethrDidUri: state.serviceSettings.ethrDidUri };
	}
);

export { connected as ScanCredentialScreen };
