import React from "react";
import { Fragment } from "react";
import { StatusBar, View, Vibration, YellowBox, Alert } from "react-native";

import parseJWT, { JWTParseError, unverifiedParseJWT } from "../../../uPort/parseJWT";

import themes from "../../resources/themes";
import DidiQRScanner from "../common/DidiQRScanner";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { ScanCredentialToAddProps } from "./ScanCredentialToAdd";
import { ScanDisclosureRequestProps } from "./ScanDisclosureRequest";
import { didiConnect } from "../../../store/store";
import { isLeft } from "fp-ts/lib/Either";

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
				<DidiQRScanner onQRScanned={content => this.onScanQR(content)} />
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
		const toParse = matches[0];

		const unverifiedParse = unverifiedParseJWT(toParse);
		if (isLeft(unverifiedParse)) {
			const { title, subtitle } = this.errorMessage(unverifiedParse.left);
			this.showAlert(title, subtitle);
			return;
		}

		Vibration.vibrate(400, false);

		const parse = await parseJWT(toParse, this.props.ethrDidUri);

		if (isLeft(parse)) {
			const { title, subtitle } = this.errorMessage(parse.left);
			this.showAlert(title, subtitle);
		} else {
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
		}
	}

	private errorMessage(error: JWTParseError): { title: string; subtitle?: string } {
		const displayTimestamp = (ts: number) => new Date(ts * 1000).toLocaleString();
		const displayError = (e: unknown) => (e instanceof Error ? e.message : JSON.stringify(e));

		switch (error.type) {
			case "AFTER_EXP":
				return {
					title: "Credencial Vencida",
					subtitle: `Hora actual: ${displayTimestamp(error.current)}, Vencimiento: ${displayTimestamp(error.expected)}`
				};
			case "BEFORE_IAT":
				return {
					title: "Error de Horario",
					subtitle: "Esta credencial indica que fue emitida en el futuro. Verifique la hora de su dispositivo."
				};
			case "RESOLVER_CREATION_ERROR":
				return { title: "Error de Conexión", subtitle: "Verifique tener acceso a internet." };
			case "JWT_DECODE_ERROR":
				console.warn(displayError(error.error));
				return { title: "Error al Decodificar", subtitle: "Error al extraer credenciales." };
			case "SHAPE_DECODE_ERROR":
				return { title: "Error al Interpretar Credencial", subtitle: displayError(error.error) };
			case "VERIFICATION_ERROR":
				console.warn(displayError(error.error));
				return { title: "Error al Verificar Credencial", subtitle: "Verifique tener acceso a internet." };
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
