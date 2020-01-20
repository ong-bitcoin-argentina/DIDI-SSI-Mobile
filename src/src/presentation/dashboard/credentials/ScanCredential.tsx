import { parseJWT, unverifiedParseJWT } from "didi-sdk";
import { array } from "fp-ts/lib/Array";
import { isLeft } from "fp-ts/lib/Either";
import React, { Fragment } from "react";
import { Alert, StatusBar, Vibration } from "react-native";

import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { DidiCamera } from "../common/DidiCamera";

import { didiConnect } from "../../../store/store";
import strings from "../../resources/strings";
import themes from "../../resources/themes";

import { ScanCredentialToAddProps } from "./ScanCredentialToAdd";
import { ScanDisclosureRequestProps } from "./ScanDisclosureRequest";

export type ScanCredentialProps = {};
interface ScanCredentialStateProps {
	ethrDidUri: string;
}
type ScanCredentialInternalProps = ScanCredentialProps & ScanCredentialStateProps;

interface ScanCredentialState {
	scanPaused: boolean;
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
			scanPaused: false
		};
	}

	render() {
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<DidiCamera
					onBarcodeScanned={(content, type) => type === "qr" && this.onScanQR(content)}
					explanation={strings.camera.scanQRInstruction}
				/>
			</Fragment>
		);
	}

	private async onScanQR(content: string) {
		if (this.state.scanPaused) {
			return;
		}
		this.setState({ scanPaused: true });

		const tokenPart = "[-_=a-zA-Z0-9]+";
		const matches = content.match(new RegExp(`${tokenPart}\\.${tokenPart}\\.${tokenPart}`, "g")) || [];
		if (matches.length === 0) {
			this.showAlert("No hay credenciales", "El codigo QR escaneado no contiene credenciales");
			return;
		}
		const parseResults = matches.map(unverifiedParseJWT);
		const { left: errors, right: successfulParses } = array.separate(parseResults);

		if (successfulParses.length === 0) {
			if (errors.length !== 0) {
				const errorData = strings.jwtParseError(errors[0]);
				this.showAlert(errorData.title || "Error", errorData.message);
			}
			return;
		}

		Vibration.vibrate(400, false);

		const parse = await parseJWT(successfulParses[0].jwt, this.props.ethrDidUri);

		if (isLeft(parse)) {
			const errorData = strings.jwtParseError(parse.left);
			this.showAlert(errorData.title || "Error", errorData.message);
		} else {
			switch (parse.right.type) {
				case "RequestDocument":
					this.replace("ScanDisclosureRequest", {
						request: parse.right,
						onGoBack: screen => {
							screen.replace("ScanCredential", {});
						}
					});
					break;
				case "CredentialDocument":
					this.replace("ScanCredentialToAdd", {
						credential: parse.right
					});
					break;
			}
		}
	}

	private showAlert(title: string, subtitle?: string) {
		const unpause = () => this.setState({ scanPaused: false });
		Alert.alert(title, subtitle, [{ text: "OK", onPress: unpause }], { onDismiss: unpause });
	}
}

const connected = didiConnect(
	ScanCredentialScreen,
	(state): ScanCredentialStateProps => {
		return { ethrDidUri: state.serviceSettings.ethrDidUri };
	}
);

export { connected as ScanCredentialScreen };
