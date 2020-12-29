import { parseJWT, unverifiedParseJWT, CredentialDocument } from "didi-sdk";
import { array } from "fp-ts/lib/Array";
import { isLeft } from "fp-ts/lib/Either";
import React, { Fragment } from "react";
import { ActivityIndicator, Alert, StatusBar, StyleSheet, Vibration, View } from "react-native";

import { assertUnreachable } from "../../../util/assertUnreachable";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { DidiCamera } from "../common/DidiCamera";

import { ActiveDid } from "../../../store/reducers/didReducer";
import { didiConnect } from "../../../store/store";
import strings from "../../resources/strings";
import themes from "../../resources/themes";

import { ScanCredentialToAddProps } from "./ScanCredentialToAdd";
import { ScanDisclosureRequestProps } from "./ScanDisclosureRequest";
import { ShowDisclosureRequestProps } from "./ShowDisclosureRequest";
import { AppConfig } from "../../../AppConfig";

export type ScanCredentialProps = {
	documents: CredentialDocument[];
};
interface ScanCredentialStateProps {
	activeDid: ActiveDid;
	ethrDidUri: string;
	ethrDelegateUri: string;
}
type ScanCredentialInternalProps = ScanCredentialProps & ScanCredentialStateProps;

interface ScanCredentialState {
	scanPaused: boolean;
	isVerifying: boolean;
}
export interface ScanCredentialNavigation {
	ScanCredentialToAdd: ScanCredentialToAddProps;
	ScanDisclosureRequest: ScanDisclosureRequestProps;
	ShowDisclosureRequest: ShowDisclosureRequestProps;
}

class ScanCredentialScreen extends NavigationEnabledComponent<
	ScanCredentialInternalProps,
	ScanCredentialState,
	ScanCredentialNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.scanCredential.barTitle);

	constructor(props: ScanCredentialInternalProps) {
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
					explanation={this.state.isVerifying ? strings.camera.processing : strings.camera.scanQRInstruction}
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
		this.setState({ scanPaused: true });

		const segmentedCredentialMatch = content.match("^_(\\d+)/(\\d+)_:(.*)$");
		if (segmentedCredentialMatch?.length === 4) {
			this.showAlert(strings.camera.wrongShare.title, strings.camera.wrongShare.message);
			return;
		}

		const tokenPart = "[-_=a-zA-Z0-9]+";
		const matches = content.match(new RegExp(`${tokenPart}\\.${tokenPart}\\.${tokenPart}`, "g")) || [];
		if (matches.length === 0) {
			this.showAlert(strings.camera.noCredentials.title, strings.camera.noCredentials.message);
			return;
		}
		const parseResults = matches.map(unverifiedParseJWT);
		const { left: errors, right: successfulParses } = array.separate(parseResults);

		if (successfulParses.length === 0) {
			if (errors.length !== 0) {
				const errorData = strings.jwtParseError(errors[0]);
				this.showAlert(errorData.title, errorData.message);
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
		this.setState({ isVerifying: false });

		if (isLeft(parse)) {
			const errorData = strings.jwtParseError(parse.left);
			this.showAlert(errorData.title, errorData.message);
		} else {
			switch (parse.right.type) {
				case "SelectiveDisclosureResponse":
					this.showAlert(strings.scanCredential.wrongType.title, strings.scanCredential.wrongType.message);
					break;
				case "SelectiveDisclosureRequest":
					this.replace("ScanDisclosureRequest", {
						request: parse.right,
						documents: this.props.documents,
						onGoBack: screen => {
							screen.replace("ScanCredential", {
								documents: this.props.documents
							});
						}
					});
					break;
				case "CredentialDocument":
					if (parse.right.subject.did() === this.props.activeDid?.did?.()) {
						this.replace("ScanCredentialToAdd", {
							credentials: [parse.right]
						});
					} else {
						this.showAlert(strings.scanCredential.foreign.title, strings.scanCredential.foreign.message);
					}
					break;
				case "SelectiveDisclosureProposal":
					this.replace("ShowDisclosureRequest", {
						proposal: parse.right
					});
					break;
				default:
					assertUnreachable(parse.right);
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
	(state): ScanCredentialStateProps => ({
		activeDid: state.did.activeDid,
		ethrDidUri: state.serviceSettings.ethrDidUri,
		ethrDelegateUri: state.serviceSettings.ethrDelegateUri
	})
);

export { connected as ScanCredentialScreen };

const styles = StyleSheet.create({
	verifyingBackground: {
		...StyleSheet.absoluteFillObject,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#00000088"
	}
});
