import React from "react";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { Fragment } from "react";
import { StatusBar, View, Modal, Text } from "react-native";
import { SafeAreaView } from "react-navigation";

import parseJWT from "../../../uPort/parseJWT";

import themes from "../../resources/themes";
import commonStyles from "../../access/resources/commonStyles";
import DidiQRScanner from "../common/DidiQRScanner";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import { Document } from "../../../model/data/Document";
import { connect } from "react-redux";
import { ScanCredentialToAddProps } from "./ScanCredentialToAdd";
import { ScanDisclosureRequestProps } from "./ScanDisclosureRequest";

export type ScanCredentialProps = {};
interface ScanCredentialsDispatchProps {
	addCredential(credential: Document): void;
}
type ScanCredentialInternalProps = ScanCredentialProps & ScanCredentialsDispatchProps;

type ScanCredentialState = {};
export interface ScanCredentialNavigation {
	ScanCredentialToAdd: ScanCredentialToAddProps;
	ScanDisclosureRequest: ScanDisclosureRequestProps;
}

export default class ScanCredentialScreen extends NavigationEnabledComponent<
	ScanCredentialInternalProps,
	ScanCredentialState,
	ScanCredentialNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Credenciales");

	render() {
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<SafeAreaView style={commonStyles.view.area}>
					<View style={commonStyles.view.body}>
						<DidiQRScanner onQRScanned={content => this.onScanQR(content)} />
					</View>
				</SafeAreaView>
			</Fragment>
		);
	}

	private async onScanQR(content: string) {
		const prefix = "me.uport:req/";
		const toParse = content.replace(prefix, "");
		try {
			const res = await parseJWT(toParse);
			if (res.error !== null) {
				alert(JSON.stringify(res));
			} else {
				switch (res.payload.type) {
					case "SelectiveDisclosureRequest":
						this.navigate("ScanDisclosureRequest", {
							request: res.payload,
							requestJWT: toParse
						});
					case "SelectiveDisclosureResponse":
						return;
					case "VerifiedClaim":
						this.navigate("ScanCredentialToAdd", {
							credential: res.payload,
							jwt: toParse
						});
				}
			}
		} catch (error) {
			alert(error);
		}
	}
}
