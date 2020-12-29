import { CredentialDocument, EthrDID } from "didi-sdk";
import React, { Fragment } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity } from "react-native";

import commonStyles from "../../resources/commonStyles";
import { DidiText } from "../../util/DidiText";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { DocumentCredentialCard, DocumentCredentialCardContext, extractContext } from "../common/documentToCard";

import { ActiveDid } from "../../../store/reducers/didReducer";
import { didiConnect } from "../../../store/store";
import strings from "../../resources/strings";
import themes from "../../resources/themes";
import { DashboardScreenProps } from "../home/Dashboard";

import { DocumentDetailProps } from "./DocumentDetail";
import Divider from "../common/Divider";

export type DocumentsScreenProps = {};
interface DocumentsScreenStateProps {
	filter: (doc: CredentialDocument, did: EthrDID) => boolean;
	did: ActiveDid;
	validCredentials: CredentialDocument[];
	credentialContext: DocumentCredentialCardContext;
}

export type DocumentsScreenNavigation = {
	DashboardHome: DashboardScreenProps;
	DocumentDetail: DocumentDetailProps;
};

type DocumentsScreenInternalProps = DocumentsScreenProps & DocumentsScreenStateProps;

class DocumentsScreen extends NavigationEnabledComponent<DocumentsScreenInternalProps, {}, DocumentsScreenNavigation> {
	render() {
		const { did, filter, validCredentials } = this.props;
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<SafeAreaView style={commonStyles.view.area}>
					{!did?.did ? (
						this.renderEmpty()
					) : (
						<FlatList
							style={styles.body}
							contentContainerStyle={styles.scrollContent}
							data={validCredentials.filter(doc => filter(doc, did))}
							keyExtractor={(_, index) => index.toString()}
							renderItem={item => this.renderCard(item.item, item.index)}
							ItemSeparatorComponent={() => <Divider height={8} color="transparent" />}
							ListEmptyComponent={this.renderEmpty()}
							maxToRenderPerBatch={5}
							updateCellsBatchingPeriod={30}
							windowSize={6}
						/>
					)}
				</SafeAreaView>
			</Fragment>
		);
	}

	private renderEmpty() {
		return (
			<DidiText.Explanation.Normal style={{ marginVertical: 30 }}>
				{strings.documents.emptyFilter}
			</DidiText.Explanation.Normal>
		);
	}

	private renderCard(document: CredentialDocument, index: number) {
		return (
			<TouchableOpacity
				key={index}
				onPress={() =>
					this.navigate("DocumentDetail", {
						document,
						credentialContext: this.props.credentialContext
					})
				}
			>
				<DocumentCredentialCard preview={true} document={document} context={this.props.credentialContext} />
			</TouchableOpacity>
		);
	}
}

export default function (filter: (type: CredentialDocument, did: EthrDID) => boolean) {
	return didiConnect(
		DocumentsScreen,
		(state): DocumentsScreenStateProps => ({
			filter,
			did: state.did.activeDid,
			validCredentials: state.validCredentials,
			credentialContext: extractContext(state)
		})
	);
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
