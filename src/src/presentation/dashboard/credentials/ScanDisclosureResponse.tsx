import { parseJWT, unverifiedParseJWT } from "didi-sdk";
import { DisclosureDocument } from "didi-sdk/src/model/DisclosureDocument";
import { array } from "fp-ts/lib/Array";
import { isLeft } from "fp-ts/lib/Either";
import React, { Fragment } from "react";
import { Alert, StatusBar, Vibration } from "react-native";

import { assertUnreachable } from "../../../util/assertUnreachable";
import TypedArray from "../../../util/TypedArray";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { DidiCamera } from "../common/DidiCamera";

import { ActiveDid } from "../../../store/reducers/didReducer";
import { didiConnect } from "../../../store/store";
import strings from "../../resources/strings";
import themes from "../../resources/themes";

import { ScanCredentialToAddProps } from "./ScanCredentialToAdd";

export interface ScanDisclosureResponseProps {
	request: string;
}
interface ScanDisclosureResponseStateProps {
	activeDid: ActiveDid;
	ethrDidUri: string;
}
type ScanDisclosureResponseInternalProps = ScanDisclosureResponseProps & ScanDisclosureResponseStateProps;

interface ScanDisclosureResponseState {
	scanPaused: boolean;
	collected?: {
		accumulatedToken: string;
		currentIndex: number;
		maxIndex: number;
	};
}
export interface ScanDisclosureResponseNavigation {
	ScanCredentialToAdd: ScanCredentialToAddProps;
}

class ScanDisclosureResponseScreen extends NavigationEnabledComponent<
	ScanDisclosureResponseInternalProps,
	ScanDisclosureResponseState,
	ScanDisclosureResponseNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Credenciales");

	constructor(props: ScanDisclosureResponseInternalProps) {
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
					explanation={
						this.state.collected === undefined
							? strings.camera.scanQRInstruction
							: `Codigo ${this.state.collected.currentIndex + 1}/${this.state.collected.maxIndex + 1}`
					}
				/>
			</Fragment>
		);
	}

	private async onScanQR(content: string) {
		if (this.state.scanPaused) {
			return;
		}
		this.setState({ scanPaused: true });

		const matched = content.match("^_(\\d+)/(\\d+)_:(.*)$");
		if (matched?.length !== 4) {
			this.showAlert("Formato inesperado en QR");
			return;
		}
		const [_, currentIndexString, maxIndexString, tokenPart] = matched;
		const currentIndex = Number(currentIndexString);
		const maxIndex = Number(maxIndexString);

		if (this.state.collected === undefined) {
			if (currentIndex !== 0) {
				this.showAlert("Por favor comenza desde el primer codigo QR");
				return;
			}
			this.setState({
				scanPaused: false,
				collected: {
					accumulatedToken: tokenPart,
					currentIndex,
					maxIndex
				}
			});
			return;
		}

		if (this.state.collected.maxIndex !== maxIndex) {
			this.showAlert("Este codigo QR pertenece a otra secuencia");
			return;
		} else if (this.state.collected.currentIndex === currentIndex) {
			// This can happen if the user waits to switch until the code is recognized
			this.setState({ scanPaused: false });
			return;
		} else if (this.state.collected.currentIndex + 1 !== currentIndex) {
			this.showAlert(
				`Este codigo QR no es el esperado (actual: ${currentIndex + 1}, esperado: ${this.state.collected.currentIndex +
					2})`
			);
			return;
		}
		const nextCollected = {
			accumulatedToken: this.state.collected.accumulatedToken + tokenPart,
			currentIndex,
			maxIndex
		};
		if (nextCollected.currentIndex >= nextCollected.maxIndex) {
			this.onCompleteQR(nextCollected.accumulatedToken);
		} else {
			this.setState({ scanPaused: false, collected: nextCollected });
		}
	}

	private async onCompleteQR(content: string) {
		const tokenPart = "[-_=a-zA-Z0-9]+";
		const matches = content.match(new RegExp(`${tokenPart}\\.${tokenPart}\\.${tokenPart}`, "g")) || [];
		if (matches.length === 0) {
			this.showAlert(strings.camera.noCredentials.title, strings.camera.noCredentials.message);
			this.setState({ collected: undefined });
			return;
		}
		const parseResults = matches.map(unverifiedParseJWT);
		const { left: errors, right: successfulParses } = array.separate(parseResults);

		if (successfulParses.length === 0) {
			if (errors.length !== 0) {
				const errorData = strings.jwtParseError(errors[0]);
				this.showAlert(errorData.title || "Error", errorData.message);
				this.setState({ collected: undefined });
			}
			return;
		}

		Vibration.vibrate(400, false);

		const parse = await parseJWT(successfulParses[0].jwt, this.props.ethrDidUri, this.props.activeDid ?? undefined);

		if (isLeft(parse)) {
			const errorData = strings.jwtParseError(parse.left);
			this.showAlert(errorData.title || "Error", errorData.message);
		} else {
			switch (parse.right.type) {
				case "DisclosureDocument":
					this.handleDisclosure(parse.right);
					break;
				case "CredentialDocument":
				case "RequestDocument":
				case "ProposalDocument":
					break;
				default:
					assertUnreachable(parse.right);
			}
		}
	}

	private async handleDisclosure(disclosure: DisclosureDocument) {
		const promises = disclosure.verifiedClaims.map(jwt =>
			parseJWT(jwt, this.props.ethrDidUri, this.props.activeDid ?? undefined)
		);
		const parsed = await Promise.all(promises);
		const { left: errors, right: successfulParses } = array.separate(parsed);

		if (successfulParses.length === 0) {
			if (errors.length !== 0) {
				const errorData = strings.jwtParseError(errors[0]);
				this.showAlert(errorData.title || "Error", errorData.message);
				this.setState({ collected: undefined });
			}
			return;
		}

		const credentials = TypedArray.flatMap(successfulParses, parse =>
			parse.type === "CredentialDocument" ? parse : undefined
		);

		this.replace("ScanCredentialToAdd", { credentials });
	}

	private showAlert(title: string, subtitle?: string) {
		const unpause = () => this.setState({ scanPaused: false });
		Alert.alert(title, subtitle, [{ text: "OK", onPress: unpause }], { onDismiss: unpause });
	}
}

const connected = didiConnect(
	ScanDisclosureResponseScreen,
	(state): ScanDisclosureResponseStateProps => ({
		activeDid: state.did,
		ethrDidUri: state.serviceSettings.ethrDidUri
	})
);

export { connected as ScanDisclosureResponseScreen };
