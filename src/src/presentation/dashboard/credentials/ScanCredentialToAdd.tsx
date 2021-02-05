import { CredentialDocument, EthrDID } from "didi-sdk";
import React, { Fragment } from "react";
import { StyleSheet } from "react-native";

import { DidiScrollScreen } from "../../common/DidiScreen";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import DidiButton from "../../util/DidiButton";
import { DidiText } from "../../util/DidiText";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { DocumentCredentialCard, DocumentCredentialCardContext, extractContext } from "../common/documentToCard";

import { RecentActivity } from "../../../model/RecentActivity";
import { getIssuerNames } from "../../../services/user/getIssuerNames";
import { didiConnect } from "../../../store/store";
import strings from "../../resources/strings";

import { ScanCredentialProps } from "./ScanCredential";

export interface ScanCredentialToAddProps {
	credentials: CredentialDocument[];
}
interface ScanCredentialToAddStateProps {
	credentialContext: DocumentCredentialCardContext;
	existingTokens: string[];
}
interface ScanCredentialToAddDispatchProps {
	addCredentials: (credentials: CredentialDocument[]) => void;
	loadIssuerNames: (issuers: EthrDID[]) => void;
}
type ScanCredentialToAddInternalProps = ScanCredentialToAddProps &
	ScanCredentialToAddStateProps &
	ScanCredentialToAddDispatchProps;

type ScanCredentialToAddState = {};
export interface ScanCredentialToAddNavigation {
	ScanCredential: ScanCredentialProps;
}

const serviceKey = "ScanCredentialToAddScreen";

class ScanCredentialToAddScreen extends NavigationEnabledComponent<
	ScanCredentialToAddInternalProps,
	ScanCredentialToAddState,
	ScanCredentialToAddNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitleAndRightButtonClose(strings.scanCredential.barTitle);

	render() {
		return (
			<DidiScrollScreen style={styles.body}>
				{this.props.credentials.map((credential, index) => {
					return (
						<DocumentCredentialCard
							key={index}
							preview={false}
							document={credential}
							context={this.props.credentialContext}
							style={{ marginBottom: 10 }}
						/>
					);
				})}
				{this.props.credentials.some(doc => this.props.existingTokens.includes(doc.jwt))
					? this.renderExisting()
					: this.renderNew()}
			</DidiScrollScreen>
		);
	}

	componentDidMount() {
		this.props.loadIssuerNames(this.props.credentials.map(CredentialDocument.displayedIssuer));
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
		credentialContext: extractContext(state),
		existingTokens: state.tokens
	}),
	(dispatch): ScanCredentialToAddDispatchProps => ({
		addCredentials: (credentials: CredentialDocument[]) => {
			dispatch({
				type: "RECENT_ACTIVITY_ADD",
				value: RecentActivity.from("RECEIVE", credentials)
			});
			dispatch({ type: "TOKEN_ENSURE", content: credentials.map(doc => doc.jwt) });
		},
		loadIssuerNames: (issuers: EthrDID[]) => {
			dispatch(getIssuerNames(serviceKey, issuers));
		}
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
