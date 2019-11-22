import React, { Fragment } from "react";
import { StyleSheet, Text } from "react-native";

import { DidiScreen } from "../../common/DidiScreen";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import commonStyles from "../../resources/commonStyles";
import DidiButton from "../../util/DidiButton";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { uPortDocumentToCard } from "../common/documentToCard";

import { CredentialDocument } from "../../../model/CredentialDocument";
import { liftToDerivedCredential } from "../../../model/DerivedCredential";
import { didiConnect } from "../../../store/store";
import strings from "../../resources/strings";

import { ScanCredentialProps } from "./ScanCredential";

export interface ScanCredentialToAddProps {
	credential: CredentialDocument;
}
interface ScanCredentialToAddStateProps {
	existingTokens: string[];
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
				{uPortDocumentToCard(liftToDerivedCredential(this.props.credential), 0)}
				{this.props.existingTokens.includes(this.props.credential.jwt) ? this.renderExisting() : this.renderNew()}
			</DidiScreen>
		);
	}

	private renderExisting() {
		return <Text style={commonStyles.text.normal}>{strings.credentialReceivedInScan.alreadyScanned}</Text>;
	}

	private renderNew() {
		return (
			<Fragment>
				<Text style={commonStyles.text.normal}>{strings.credentialReceivedInScan.addCredential}</Text>
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
			existingTokens: state.tokens
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
