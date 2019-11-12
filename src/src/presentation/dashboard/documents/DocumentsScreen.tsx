import React, { Fragment } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";

import commonStyles from "../../resources/commonStyles";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { sampleDocumentToCard, uPortDocumentToCard } from "../common/documentToCard";

import { CredentialDocument } from "../../../model/CredentialDocument";
import { DerivedCredential } from "../../../model/DerivedCredential";
import { DocumentFilterType, SampleDocument } from "../../../model/SampleDocument";
import { didiConnect } from "../../../store/store";
import themes from "../../resources/themes";
import { DashboardScreenProps } from "../home/Dashboard";

export type DocumentsScreenNavigation = {
	DashboardHome: DashboardScreenProps;
};

export type DocumentsScreenProps = {};
interface DocumentsScreenInternalProps extends DocumentsScreenProps {
	credentials: Array<DerivedCredential<CredentialDocument>>;
	samples: SampleDocument[];
	filter: (type: DocumentFilterType) => boolean;
}

type DocumentsScreenState = {};

class DocumentsScreen extends NavigationEnabledComponent<
	DocumentsScreenInternalProps,
	DocumentsScreenState,
	DocumentsScreenNavigation
> {
	render() {
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<SafeAreaView style={commonStyles.view.area}>
					<ScrollView style={styles.body} contentContainerStyle={styles.scrollContent}>
						{this.props.filter("other") && this.props.credentials.map(uPortDocumentToCard)}
						{this.props.samples.filter(sample => this.props.filter(sample.filterType)).map(sampleDocumentToCard)}
					</ScrollView>
				</SafeAreaView>
			</Fragment>
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
				credentials: state.credentials
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
	},
	text: {
		fontSize: 14
	},
	textStyleWhite: {
		color: "#FFF"
	}
});
