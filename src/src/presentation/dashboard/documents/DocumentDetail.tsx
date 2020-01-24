import { CredentialDocument } from "didi-sdk";
import React from "react";
import { StyleSheet } from "react-native";

import { DidiScreen } from "../../common/DidiScreen";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { DocumentCredentialCard } from "../common/documentToCard";

import { ActiveDid } from "../../../store/reducers/didReducer";
import { IssuerRegistry } from "../../../store/reducers/issuerReducer";
import { SpecialCredentialMap } from "../../../store/selector/credentialSelector";
import strings from "../../resources/strings";

export interface DocumentDetailProps {
	document: CredentialDocument;
	did: ActiveDid;
	knownIssuers: IssuerRegistry;
	activeSpecialCredentials: SpecialCredentialMap;
}

export class DocumentDetailScreen extends NavigationEnabledComponent<DocumentDetailProps, {}, {}> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.documents.detailBarTitle);

	render() {
		const docList = this.props.document.nested.length === 0 ? [this.props.document] : this.props.document.nested;
		return (
			<DidiScreen style={styles.body}>
				{docList.map((doc, index) => {
					return (
						<DocumentCredentialCard
							preview={false}
							document={doc}
							key={index}
							context={{
								activeDid: this.props.did,
								knownIssuers: this.props.knownIssuers,
								specialCredentials: this.props.activeSpecialCredentials
							}}
						/>
					);
				})}
			</DidiScreen>
		);
	}
}

const styles = StyleSheet.create({
	body: {
		width: "100%",
		paddingHorizontal: 20,
		alignContent: "flex-start",
		justifyContent: "flex-start"
	}
});
