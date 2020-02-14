import { CredentialDocument } from "didi-sdk";
import React, { Fragment } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet } from "react-native";

import { DidiScreen, DidiScrollScreen } from "../../common/DidiScreen";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import commonStyles from "../../resources/commonStyles";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { DocumentCredentialCard } from "../common/documentToCard";

import { ActiveDid } from "../../../store/reducers/didReducer";
import { IssuerRegistry } from "../../../store/reducers/issuerReducer";
import { SpecialCredentialMap } from "../../../store/selector/credentialSelector";
import strings from "../../resources/strings";
import themes from "../../resources/themes";

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
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<SafeAreaView style={commonStyles.view.area}>
					<FlatList
						style={styles.body}
						contentContainerStyle={styles.scrollContent}
						data={docList}
						keyExtractor={(_, index) => index.toString()}
						renderItem={item => this.renderCard(item.item, item.index)}
					/>
				</SafeAreaView>
			</Fragment>
		);
	}

	private renderCard(document: CredentialDocument, index: number) {
		return (
			<DocumentCredentialCard
				preview={false}
				document={document}
				key={index}
				context={{
					activeDid: this.props.did,
					knownIssuers: this.props.knownIssuers,
					specialCredentials: this.props.activeSpecialCredentials
				}}
			/>
		);
	}
}

const styles = StyleSheet.create({
	body: {
		width: "100%"
	},
	scrollContent: {
		paddingHorizontal: 20,
		paddingVertical: 8
	}
});
