import { isLeft, isRight } from "fp-ts/lib/Either";
import React, { Fragment } from "react";
import { Alert, StatusBar, Vibration, View, YellowBox } from "react-native";

import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import DidiQRScanner from "../common/DidiQRScanner";

import { didiConnect } from "../../../store/store";
import parseJWT, { compareParseResults, JWTParseError, unverifiedParseJWT } from "../../../uPort/parseJWT";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
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
		const parseResults = matches.map(unverifiedParseJWT);
		const unverifiedParse = parseResults.sort(compareParseResults)[0];

		if (isLeft(unverifiedParse)) {
			const { title, subtitle } = this.errorMessage(unverifiedParse.left);
			this.showAlert(title, subtitle);
			return;
		}

		Vibration.vibrate(400, false);

		const parse = await parseJWT(unverifiedParse.right.jwt, this.props.ethrDidUri);

		if (isLeft(parse)) {
			const { title, subtitle } = this.errorMessage(parse.left);
			this.showAlert(title, subtitle);
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
			case "DID_PARSE":
				return {
					title: "Error al Interpretar DID",
					subtitle: `Verifique la configuracion de ${error.field}: "${error.value}"`
				};
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
