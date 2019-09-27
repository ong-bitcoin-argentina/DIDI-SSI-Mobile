import React from "react";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { Fragment } from "react";
import { StatusBar, View } from "react-native";
import { SafeAreaView } from "react-navigation";

import parseJWT from "../../../uPort/parseJWT";

import themes from "../../resources/themes";
import commonStyles from "../../access/resources/commonStyles";
import DidiQRScanner from "../common/DidiQRScanner";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import { Document } from "../../../model/data/Document";
import { connect } from "react-redux";

export type ScanCredentialProps = {};
interface ScanCredentialsDispatchProps {
	addCredential(credential: Document): void;
}
type ScanCredentialInternalProps = ScanCredentialProps & ScanCredentialsDispatchProps;

type ScanCredentialState = {};
export interface ScanCredentialNavigation {}

class ScanCredentialScreen extends NavigationEnabledComponent<
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
			if (res.error === null && res.payload.type === "VerifiedClaim") {
				this.props.addCredential({
					type: "uPort",
					claim: res.payload,
					filterType: "other",
					jwt: toParse
				});
				alert("YES");
			} else {
				alert(JSON.stringify(res));
			}
		} catch (error) {
			alert(error);
		}
	}
}

export default connect(
	null,
	(dispatch): ScanCredentialsDispatchProps => {
		return {
			addCredential: (credential: Document) => dispatch({ type: "DOCUMENT_ENSURE", content: credential })
		};
	}
)(ScanCredentialScreen);
