import React from "react";
import { Fragment } from "react";
import { StatusBar, View, Modal, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-navigation";
import { connect } from "react-redux";

import { Credentials } from "uport-credentials";
import { RNUportHDSigner } from "react-native-uport-signer";

import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import themes from "../../resources/themes";
import commonStyles from "../../access/resources/commonStyles";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import DidiButton from "../../util/DidiButton";

import { Document } from "../../../model/data/Document";
import { SelectiveDisclosureRequest } from "../../../uPort/SelectiveDisclosureRequest";
import { StoreContent } from "../../../model/store";
import { Identity } from "../../../model/data/Identity";

export interface ScanDisclosureRequestProps {
	request: SelectiveDisclosureRequest;
	requestJWT: string;
}
interface ScanDisclosureRequestStateProps {
	identity: Identity;
	documents: Document[];
}
type ScanDisclosureRequestInternalProps = ScanDisclosureRequestProps & ScanDisclosureRequestStateProps;

type ScanDisclosureRequestState = {};
export interface ScanDisclosureRequestNavigation {}

class ScanDisclosureRequestScreen extends NavigationEnabledComponent<
	ScanDisclosureRequestInternalProps,
	ScanDisclosureRequestState,
	ScanDisclosureRequestNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Credenciales");

	render() {
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<SafeAreaView style={commonStyles.view.area}>
					<View style={styles.body}>
						<Text>{JSON.stringify(this.props.request)}</Text>
						<Text style={commonStyles.text.normal}>¿Enviar datos?</Text>
						<DidiButton style={styles.button} title="Si" onPress={() => this.answerRequest()} />
						<DidiButton style={styles.button} title="No" onPress={() => this.goBack()} />
					</View>
				</SafeAreaView>
			</Fragment>
		);
	}

	private normalizeRecoveryParam(v: number): 0 | 1 {
		switch (v) {
			case 0:
			case 27:
				return 0;
			case 1:
			case 28:
				return 1;
			default:
				throw new Error(`Signing library returned invalid recovery param '${v}'`);
		}
	}

	private async answerRequest() {
		const addresses = await RNUportHDSigner.listSeedAddresses();

		const addressToUse = addresses.length === 0 ? (await RNUportHDSigner.createSeed("simple")).address : addresses[0];

		const credentials = new Credentials({
			did: `did:ethr:${addressToUse}`,
			signer: async (data: string) => {
				const { r, s, v } = await RNUportHDSigner.signJwt(
					addressToUse,
					RNUportHDSigner.UPORT_ROOT_DERIVATION_PATH,
					Buffer.from(data).toString("base64"),
					"firmar la respuesta"
				);
				return {
					r: Buffer.from(r, "base64").toString("hex"),
					s: Buffer.from(s, "base64").toString("hex"),
					recoveryParam: this.normalizeRecoveryParam(v)
				};
			}
		});

		// tslint:disable-next-line: variable-name
		const access_token = await credentials.createDisclosureResponse({
			req: this.props.requestJWT,
			own: this.selectOwnClaims(),
			verified: this.selectVerifiedClaims()
		});

		return fetch(this.props.request.callback, {
			method: "POST",
			body: JSON.stringify({ access_token })
		});
	}

	private selectOwnClaims(): { [name: string]: string } {
		return {};
	}

	private selectVerifiedClaims(): string[] {
		return [];
	}
}

export default connect(
	(state: StoreContent): ScanDisclosureRequestStateProps => {
		return {
			identity: state.identity,
			documents: state.documents
		};
	}
)(ScanDisclosureRequestScreen);

const styles = StyleSheet.create({
	body: {
		width: "100%",
		alignItems: "stretch",
		justifyContent: "space-evenly",
		flex: 1
	},
	button: {
		width: "80%",
		alignSelf: "center"
	}
});
