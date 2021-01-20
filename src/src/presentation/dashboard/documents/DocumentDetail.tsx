import { CredentialDocument } from "didi-sdk";
import React, { Fragment } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet } from "react-native";

import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import commonStyles from "../../resources/commonStyles";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { DocumentCredentialCard, DocumentCredentialCardContext } from "../common/documentToCard";

import strings from "../../resources/strings";
import themes from "../../resources/themes";
import Divider from "../common/Divider";
import colors from "../../resources/colors";

export interface DocumentDetailProps {
	document: CredentialDocument;
	credentialContext: DocumentCredentialCardContext;
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
						ItemSeparatorComponent={() => <Divider color={colors.white} />}
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
			<DocumentCredentialCard preview={false} document={document} key={index} context={this.props.credentialContext} />
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
