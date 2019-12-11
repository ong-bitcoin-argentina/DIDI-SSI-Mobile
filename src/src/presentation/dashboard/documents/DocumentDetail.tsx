import React from "react";
import { StyleSheet } from "react-native";

import { DidiScreen } from "../../common/DidiScreen";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { DocumentCredentialCard } from "../common/documentToCard";

import { CredentialDocument } from "../../../model/CredentialDocument";
import strings from "../../resources/strings";

export interface DocumentDetailProps {
	document: CredentialDocument;
}

export class DocumentDetailScreen extends NavigationEnabledComponent<DocumentDetailProps, {}, {}> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.documents.detailBarTitle);

	render() {
		return (
			<DidiScreen style={styles.body}>
				<DocumentCredentialCard preview={false} document={this.props.document} />
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
