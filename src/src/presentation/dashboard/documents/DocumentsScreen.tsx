import React, { Fragment } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, TouchableOpacity } from "react-native";

import commonStyles from "../../resources/commonStyles";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { DocumentCredentialCard, sampleDocumentToCard } from "../common/documentToCard";

import { CredentialDocument } from "../../../model/CredentialDocument";
import { DocumentFilterType, SampleDocument } from "../../../model/SampleDocument";
import { SpecialCredentialData } from "../../../store/selector/credentialSelector";
import { didiConnect } from "../../../store/store";
import themes from "../../resources/themes";
import { DashboardScreenProps } from "../home/Dashboard";

import { DocumentDetailProps } from "./DocumentDetail";

export type DocumentsScreenProps = {};
interface DocumentsScreenInternalProps extends DocumentsScreenProps {
	credentials: Array<CredentialDocument | SpecialCredentialData>;
	samples: SampleDocument[];
	filter: (type: DocumentFilterType) => boolean;
}

export type DocumentsScreenNavigation = {
	DashboardHome: DashboardScreenProps;
	DocumentDetail: DocumentDetailProps;
};

class DocumentsScreen extends NavigationEnabledComponent<DocumentsScreenInternalProps, {}, DocumentsScreenNavigation> {
	render() {
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<SafeAreaView style={commonStyles.view.area}>
					<ScrollView style={styles.body} contentContainerStyle={styles.scrollContent}>
						{this.props.filter("other") && this.renderAllDocuments()}
						{this.props.samples.filter(sample => this.props.filter(sample.filterType)).map(sampleDocumentToCard)}
					</ScrollView>
				</SafeAreaView>
			</Fragment>
		);
	}

	private renderAllDocuments() {
		return this.props.credentials.map(
			(document, index): JSX.Element => {
				return (
					<TouchableOpacity key={index} onPress={() => this.navigate("DocumentDetail", { document })}>
						<DocumentCredentialCard preview={true} document={document} />
					</TouchableOpacity>
				);
			}
		);
	}
}

export default function(filter: (type: DocumentFilterType) => boolean) {
	return didiConnect(
		DocumentsScreen,
		(state): DocumentsScreenInternalProps => {
			return {
				filter,
				samples: state.samples,
				credentials: state.credentials.toplevel
			};
		}
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
