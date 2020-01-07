import React, { Fragment } from "react";
import { StyleSheet, Text } from "react-native";

import { DidiScreen } from "../../common/DidiScreen";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import DidiButton from "../../util/DidiButton";
import { DidiText } from "../../util/DidiText";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { DocumentCredentialCard } from "../common/documentToCard";

import { CredentialDocument } from "../../../model/CredentialDocument";
import { SpecialCredentialMap } from "../../../store/selector/credentialSelector";
import { didiConnect } from "../../../store/store";
import strings from "../../resources/strings";

import { ScanCredentialProps } from "./ScanCredential";

export interface ScanCredentialToAddProps {
	credential: CredentialDocument;
}
interface ScanCredentialToAddStateProps {
	existingTokens: string[];
	activeSpecialCredentials: SpecialCredentialMap;
}
interface ScanCredentialToAddDispatchProps {
	addCredential(credential: CredentialDocument): void;
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
			<DidiScreen style={styles.body}>
				{
					<DocumentCredentialCard
						preview={false}
						document={this.props.credential}
						context={this.props.activeSpecialCredentials}
					/>
				}
				{this.props.existingTokens.includes(this.props.credential.jwt) ? this.renderExisting() : this.renderNew()}
			</DidiScreen>
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
		this.props.addCredential(this.props.credential);
		this.goBack();
	}
}

const connected = didiConnect(
	ScanCredentialToAddScreen,
	(state): ScanCredentialToAddStateProps => {
		return {
			existingTokens: state.tokens,
			activeSpecialCredentials: state.activeSpecialCredentials
		};
	},
	(dispatch): ScanCredentialToAddDispatchProps => {
		return {
			addCredential: (credential: CredentialDocument) => dispatch({ type: "TOKEN_ENSURE", content: [credential.jwt] })
		};
	}
);
export { connected as ScanCredentialToAddScreen };

const styles = StyleSheet.create({
	body: {
		width: "100%",
		paddingHorizontal: 20
	},
	button: {
		width: "80%",
		alignSelf: "center"
	}
});
