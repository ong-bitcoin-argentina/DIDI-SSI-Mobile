import { parseJWT, SelectiveDisclosureResponse, unverifiedParseJWT } from "didi-sdk";
import { array } from "fp-ts/lib/Array";
import { isLeft } from "fp-ts/lib/Either";
import React, { Fragment } from "react";
import { ActivityIndicator, Alert, StatusBar, StyleSheet, Vibration, View } from "react-native";

import { assertUnreachable } from "../../../util/assertUnreachable";
import TypedArray from "../../../util/TypedArray";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { DidiCamera } from "../common/DidiCamera";

import { ActiveDid } from "../../../store/reducers/didReducer";
import { didiConnect } from "../../../store/store";
import colors from "../../resources/colors";
import strings from "../../resources/strings";
import themes from "../../resources/themes";

import { ScanCredentialToAddProps } from "./ScanCredentialToAdd";
import { AppConfig } from "../../../AppConfig";
import { getShareRequest } from "../../../services/user/getShareRequest";
import { createToken } from "../../util/appRouter";

export interface ScanDisclosureResponseProps {
	request: string;
}
interface ScanDisclosureResponseStateProps {
	activeDid: ActiveDid;
	ethrDidUri: string;
	ethrDelegateUri: string;
}
type ScanDisclosureResponseInternalProps = ScanDisclosureResponseProps & ScanDisclosureResponseStateProps;

interface ScanDisclosureResponseState {
	scanPaused: boolean;
	isVerifying: boolean;
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
	static navigationOptions = NavigationHeaderStyle.withTitleAndRightButtonClose(strings.scanCredential.barTitle);

	constructor(props: ScanDisclosureResponseInternalProps) {
		super(props);
		this.state = {
			scanPaused: false,
			isVerifying: false
		};
	}

	render() {
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<DidiCamera
					onBarcodeScanned={(content, type) => type === "qr" && this.onScanQR(content)}
					explanation={
						this.state.isVerifying
							? "Procesando..."
							: this.state.collected === undefined
							? strings.camera.scanQRInstruction
							: `Código ${this.state.collected.currentIndex + 1}/${this.state.collected.maxIndex + 1}`
					}
				/>
				{this.state.isVerifying ? (
					<View style={styles.verifyingBackground}>
						<ActivityIndicator size={72} />
					</View>
				) : null}
			</Fragment>
		);
	}

	private async onScanQR(content: string) {
		if (this.state.scanPaused) {
			return;
		}
		this.setState({ scanPaused: true, isVerifying: true });
		Vibration.vibrate(400, false);

		this.onCompleteQR(content);
	}

	private async onCompleteQR(idShareRequest: string) {
		const token = await createToken(this.props.activeDid);
		const response = await getShareRequest(token, idShareRequest);

		const tokenPart = "[-_=a-zA-Z0-9]+";
		const matches = response.match(new RegExp(`${tokenPart}\\.${tokenPart}\\.${tokenPart}`, "g")) || [];

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
				this.showAlert(errorData.title, errorData.message);
				this.setState({ collected: undefined });
			}
			return;
		}

		Vibration.vibrate(400, false);

		this.setState({ isVerifying: true });
		const parse = await parseJWT(successfulParses[0].jwt, {
			identityResolver: {
				ethrUri: this.props.ethrDidUri
			},
			providerConfig: AppConfig.defaultServiceSettings.providerConfig,
			delegation: {
				ethrUri: this.props.ethrDelegateUri
			},
			audience: this.props.activeDid ?? undefined
		});

		if (isLeft(parse)) {
			const errorData = strings.jwtParseError(parse.left);
			this.showAlert(errorData.title, errorData.message);
			this.setState({ collected: undefined });
		} else {
			switch (parse.right.type) {
				case "SelectiveDisclosureResponse":
					await this.handleDisclosure(parse.right);
					break;
				case "CredentialDocument":
				case "SelectiveDisclosureRequest":
				case "SelectiveDisclosureProposal":
					break;
				default:
					assertUnreachable(parse.right);
			}
		}

		this.setState({ isVerifying: false });
	}

	private async handleDisclosure(disclosure: SelectiveDisclosureResponse) {
		const promises = disclosure.verifiedClaims.map(jwt =>
			parseJWT(jwt, {
				identityResolver: {
					ethrUri: this.props.ethrDidUri
				},
				providerConfig: AppConfig.defaultServiceSettings.providerConfig,
				delegation: {
					ethrUri: this.props.ethrDelegateUri
				},
				audience: this.props.activeDid ?? undefined
			})
		);
		const parsed = await Promise.all(promises);
		const { left: errors, right: successfulParses } = array.separate(parsed);

		if (successfulParses.length === 0) {
			if (errors.length !== 0) {
				const errorData = strings.jwtParseError(errors[0]);
				this.showAlert(errorData.title, errorData.message);
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
		activeDid: state.did.activeDid,
		ethrDidUri: state.serviceSettings.ethrDidUri,
		ethrDelegateUri: state.serviceSettings.ethrDelegateUri
	})
);

export { connected as ScanDisclosureResponseScreen };

const styles = StyleSheet.create({
	verifyingBackground: {
		...StyleSheet.absoluteFillObject,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#00000088"
	}
});
