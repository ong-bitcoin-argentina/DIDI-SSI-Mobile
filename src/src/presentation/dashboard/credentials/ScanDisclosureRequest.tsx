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

import { UPortDocument } from "../../../model/data/UPortDocument";
import { SelectiveDisclosureRequest } from "../../../uPort/SelectiveDisclosureRequest";
import { StoreContent } from "../../../model/store";
import { Identity } from "../../../model/data/Identity";
import { flattenClaim, Claim } from "../../../uPort/VerifiedClaim";
import TypedObject from "../../../util/TypedObject";
import { ScanCredentialProps } from "./ScanCredential";

export interface ScanDisclosureRequestProps {
	request: SelectiveDisclosureRequest;
	requestJWT: string;
}
interface ScanDisclosureRequestStateProps {
	identity: Identity;
	documents: UPortDocument[];
}
type ScanDisclosureRequestInternalProps = ScanDisclosureRequestProps & ScanDisclosureRequestStateProps;

type ScanDisclosureRequestState = {};
export interface ScanDisclosureRequestNavigation {
	ScanCredential: ScanCredentialProps;
}

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
						<DidiButton style={styles.button} title="No" onPress={() => this.replace("ScanCredential", {})} />
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
		const { missing, own, verified } = this.selectClaims();
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
			own,
			verified
		});

		const result = await fetch(this.props.request.callback, {
			method: "POST",
			body: JSON.stringify({ access_token })
		});

		if (missing.length > 0) {
			alert(`Respuesta enviada. Puede ocurrir un error por falta de credenciales: ${missing.join(", ")}`);
		} else {
			alert("Respuesta enviada");
		}

		this.replace("ScanCredential", {});

		return result;
	}

	private selectClaims(): { missing: string[]; own: Claim; verified: string[] } {
		const verified: { [selector: string]: UPortDocument } = {};
		const missing: string[] = [];

		this.selectVerifiedClaims().forEach(vc => {
			if (vc.value) {
				verified[vc.selector] = vc.value;
			} else {
				missing.push(vc.selector);
			}
		});

		const own = this.selectOwnClaims();
		return {
			missing,
			own: {
				...own,
				...TypedObject.mapValues(verified, v => {
					return v.claim.claims;
				})
			},
			verified: TypedObject.values(verified).map(d => d.jwt)
		};
	}

	private selectOwnClaims(): Claim {
		const result: Claim = {};
		for (const value of this.props.request.ownClaims) {
			switch (value) {
				case "name":
					result.name = this.props.identity.name;
				case "email":
					result.email = this.props.identity.email.value;
					break;
				case "image":
					// TODO: Handle image request
					break;
				case "country":
					result.country = this.props.identity.nationality.value;
					break;
				case "phone":
					result.phone = this.props.identity.cellPhone.value;
					break;
				default:
					break;
			}
		}
		return result;
	}

	private selectVerifiedClaims(): Array<{ selector: string; value?: UPortDocument }> {
		const { request, documents } = this.props;
		return request.verifiedClaims.map(selector => {
			const selected = documents.find(document => {
				const { root } = flattenClaim(document.claim.claims);
				return root === selector;
			});
			return { selector, value: selected };
		});
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
