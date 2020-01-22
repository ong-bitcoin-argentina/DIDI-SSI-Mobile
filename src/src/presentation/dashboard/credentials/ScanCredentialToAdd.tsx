import { CredentialDocument } from "didi-sdk";
import React, { Fragment } from "react";
import { StyleSheet, Text } from "react-native";

import { DidiScreen, DidiScrollScreen } from "../../common/DidiScreen";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import DidiButton from "../../util/DidiButton";
import { DidiText } from "../../util/DidiText";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { DocumentCredentialCard } from "../common/documentToCard";

import { ActiveDid } from "../../../store/reducers/didReducer";
import { didiConnect } from "../../../store/store";
import strings from "../../resources/strings";

import { ScanCredentialProps } from "./ScanCredential";

export interface ScanCredentialToAddProps {
	credentials: CredentialDocument[];
}
interface ScanCredentialToAddStateProps {
	did: ActiveDid;
	existingTokens: string[];
}
interface ScanCredentialToAddDispatchProps {
	addCredentials: (credentials: CredentialDocument[]) => void;
}
type ScanCredentialToAddInternalProps = ScanCredentialToAddProps &
	ScanCredentialToAddStateProps &
	ScanCredentialToAddDispatchProps;

type ScanCredentialToAddState = {};
export interface ScanCredentialToAddNavigation {
	ScanCredential: ScanCredentialProps;
}

class ScanCredentialToAddScreen extends NavigationEnabledComponent<
	ScanCredentialToAddInternalProps,
	ScanCredentialToAddState,
	ScanCredentialToAddNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Credenciales");

	render() {
		return (
			<DidiScrollScreen style={styles.body}>
				{this.props.credentials.map((credential, index) => {
					return (
						<DocumentCredentialCard
							key={index}
							preview={false}
							document={credential}
							context={{ activeDid: this.props.did, specialCredentials: null }}
						/>
					);
				})}
				{this.props.credentials.every(doc => this.props.existingTokens.includes(doc.jwt))
					? this.renderExisting()
					: this.renderNew()}
			</DidiScrollScreen>
		);
	}

	private renderExisting() {
		return <DidiText.Explanation.Normal>{strings.credentialReceivedInScan.alreadyScanned}</DidiText.Explanation.Normal>;
	}

	private renderNew() {
		return (
			<Fragment>
				<DidiText.Explanation.Normal>{strings.credentialReceivedInScan.addCredential}</DidiText.Explanation.Normal>
				<DidiButton
					style={styles.button}
					title={strings.credentialReceivedInScan.doAdd}
					onPress={() => this.acceptCredential()}
				/>
				<DidiButton
					style={styles.button}
					title={strings.credentialReceivedInScan.goBack}
					onPress={() => this.replace("ScanCredential", {})}
				/>
			</Fragment>
		);
	}

	private acceptCredential() {
		this.props.addCredentials(this.props.credentials);
		this.goToRoot();
	}
}

const connected = didiConnect(
	ScanCredentialToAddScreen,
	(state): ScanCredentialToAddStateProps => ({
		did: state.did,
		existingTokens: state.tokens
	}),
	(dispatch): ScanCredentialToAddDispatchProps => ({
		addCredentials: (credentials: CredentialDocument[]) =>
			dispatch({ type: "TOKEN_ENSURE", content: credentials.map(doc => doc.jwt) })
	})
);
export { connected as ScanCredentialToAddScreen };

const styles = StyleSheet.create({
	body: {
		width: "100%"
	},
	button: {
		width: "100%",
		alignSelf: "center"
	}
});
